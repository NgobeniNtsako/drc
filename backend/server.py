from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend setup
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
QUOTE_RECIPIENT_EMAIL = os.environ.get('QUOTE_RECIPIENT_EMAIL', 'mbewuh@yahoo.com')
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# Create the main app
app = FastAPI(title="DRC Plant Hire & Sand API")
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# =========================
# Models
# =========================
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class QuoteRequestCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    phone: str = Field(min_length=6, max_length=40)
    email: Optional[EmailStr] = None
    service: str = Field(min_length=2, max_length=120)
    location: str = Field(min_length=2, max_length=200)
    message: Optional[str] = Field(default="", max_length=2000)


class QuoteRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    service: str
    location: str
    message: Optional[str] = ""
    email_sent: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# =========================
# Helpers
# =========================
def _build_quote_html(payload: QuoteRequestCreate) -> str:
    rows = [
        ("Name", payload.name),
        ("Phone", payload.phone),
        ("Email", payload.email or "—"),
        ("Service needed", payload.service),
        ("Location / Area", payload.location),
        ("Message", (payload.message or "").replace("\n", "<br/>") or "—"),
    ]
    body_rows = "".join(
        f'<tr><td style="padding:10px 14px;border-bottom:1px solid #193E2A;color:#8EA698;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;width:170px;">{k}</td>'
        f'<td style="padding:10px 14px;border-bottom:1px solid #193E2A;color:#F4F7F5;font-size:15px;">{v}</td></tr>'
        for k, v in rows
    )
    return f"""
    <table style="width:100%;max-width:640px;margin:0 auto;background:#06130C;border:1px solid #193E2A;border-radius:6px;font-family:Arial,Helvetica,sans-serif;">
      <tr>
        <td style="padding:24px 28px;background:#0C2317;border-bottom:2px solid #FFB81C;">
          <div style="color:#FFB81C;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;">DRC Plant Hire &amp; Sand</div>
          <div style="color:#F4F7F5;font-size:22px;font-weight:700;margin-top:4px;">New Quote Request</div>
        </td>
      </tr>
      <tr><td style="padding:8px 0;"><table style="width:100%;border-collapse:collapse;">{body_rows}</table></td></tr>
      <tr>
        <td style="padding:18px 28px;background:#0C2317;color:#8EA698;font-size:12px;border-top:1px solid #193E2A;">
          Sent automatically from drcplanthire.co.za — reply directly to the customer.
        </td>
      </tr>
    </table>
    """


async def _send_quote_email(payload: QuoteRequestCreate) -> bool:
    if not RESEND_API_KEY:
        logger.info("RESEND_API_KEY not configured; skipping email send.")
        return False
    params = {
        "from": SENDER_EMAIL,
        "to": [QUOTE_RECIPIENT_EMAIL],
        "subject": f"New Quote Request — {payload.name} ({payload.service})",
        "html": _build_quote_html(payload),
        "reply_to": payload.email if payload.email else None,
    }
    params = {k: v for k, v in params.items() if v is not None}
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Quote email sent: {result.get('id') if isinstance(result, dict) else result}")
        return True
    except Exception as e:
        logger.error(f"Failed to send quote email: {e}")
        return False


# =========================
# Routes
# =========================
@api_router.get("/")
async def root():
    return {"message": "DRC Plant Hire & Sand API"}


@api_router.get("/health")
async def health():
    return {
        "status": "ok",
        "email_configured": bool(RESEND_API_KEY),
        "recipient": QUOTE_RECIPIENT_EMAIL,
    }


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check.get('timestamp'), str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/quote", response_model=QuoteRequest)
async def create_quote_request(payload: QuoteRequestCreate):
    try:
        sent = await _send_quote_email(payload)
        quote = QuoteRequest(
            **payload.model_dump(),
            email_sent=sent,
        )
        doc = quote.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.quote_requests.insert_one(doc)
        return quote
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to create quote request: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit quote request")


@api_router.get("/quotes", response_model=List[QuoteRequest])
async def list_quote_requests():
    items = await db.quote_requests.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
