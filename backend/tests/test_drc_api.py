"""Backend tests for DRC Plant Hire & Sand API - quotes, health, validation."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://brand-website-demo.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_health_ok(self, client):
        r = client.get(f"{API}/health", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data["status"] == "ok"
        assert data["email_configured"] is False  # RESEND_API_KEY intentionally empty
        assert data["recipient"] == "mbewuh@yahoo.com"

    def test_root(self, client):
        r = client.get(f"{API}/", timeout=15)
        assert r.status_code == 200
        assert "DRC" in r.json().get("message", "")


# ---------- Quote create ----------
class TestQuoteCreate:
    def test_create_quote_full_payload(self, client):
        payload = {
            "name": "TEST_Thabo Mbewu",
            "phone": "0849863991",
            "email": "test_quote@example.com",
            "service": "TLB",
            "location": "Hlaneki",
            "message": "Need a TLB for two days",
        }
        r = client.post(f"{API}/quote", json=payload, timeout=20)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "id" in data and isinstance(data["id"], str)
        assert data["name"] == payload["name"]
        assert data["phone"] == payload["phone"]
        assert data["email"] == payload["email"]
        assert data["service"] == payload["service"]
        assert data["location"] == payload["location"]
        assert data["email_sent"] is False  # No Resend key
        assert "created_at" in data

        # Verify persistence via GET /quotes
        r2 = client.get(f"{API}/quotes", timeout=15)
        assert r2.status_code == 200
        ids = [q["id"] for q in r2.json()]
        assert data["id"] in ids

    def test_create_quote_without_email(self, client):
        payload = {
            "name": "TEST_NoEmail",
            "phone": "0691576873",
            "service": "Riversand",
            "location": "Babangu",
            "message": "",
        }
        r = client.post(f"{API}/quote", json=payload, timeout=20)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["email"] is None
        assert data["email_sent"] is False

    def test_missing_name_returns_422(self, client):
        payload = {
            "phone": "0849863991",
            "service": "TLB",
            "location": "Hlaneki",
        }
        r = client.post(f"{API}/quote", json=payload, timeout=15)
        assert r.status_code == 422

    def test_name_too_short_returns_422(self, client):
        payload = {
            "name": "A",
            "phone": "0849863991",
            "service": "TLB",
            "location": "Hlaneki",
        }
        r = client.post(f"{API}/quote", json=payload, timeout=15)
        assert r.status_code == 422

    def test_invalid_email_returns_422(self, client):
        payload = {
            "name": "TEST_BadEmail",
            "phone": "0849863991",
            "email": "not-an-email",
            "service": "TLB",
            "location": "Hlaneki",
        }
        r = client.post(f"{API}/quote", json=payload, timeout=15)
        assert r.status_code == 422


# ---------- Quote list ----------
class TestQuoteList:
    def test_list_quotes_sorted_desc(self, client):
        # Create two quotes
        for i in range(2):
            client.post(
                f"{API}/quote",
                json={
                    "name": f"TEST_Sort{i}",
                    "phone": "0849863991",
                    "service": "Excavator",
                    "location": "Mavhuza",
                },
                timeout=20,
            )
        r = client.get(f"{API}/quotes", timeout=15)
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        assert len(items) >= 2
        # sorted desc by created_at
        timestamps = [it["created_at"] for it in items]
        assert timestamps == sorted(timestamps, reverse=True)
        # no _id leak
        assert all("_id" not in it for it in items)
