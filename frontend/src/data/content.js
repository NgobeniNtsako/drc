// Brand-wide constants for DRC Plant Hire & Sand
export const BRAND = {
  name: "DRC Plant Hire & Sand",
  legal: "DRC Plant Hire & Sand (Pty) Ltd",
  tagline: "Together, we build the future.",
  phone: "069 157 6873",
  cell: "084 986 3991",
  fax: "086 609 8086",
  email: "mbewuh@yahoo.com",
  address: "Stand no 1 R578 road, Hlaneki, Giyani 0826",
};

export const MEDIA = {
  hero: "https://static.prod-images.emergentagent.com/jobs/99031919-dbb8-4612-92e2-5cb2ea82456c/images/b8b5a28847cd3a88513a29a8b6ea716705783350c5903432160452895f2fb350.png",
  sand: "https://static.prod-images.emergentagent.com/jobs/99031919-dbb8-4612-92e2-5cb2ea82456c/images/61aface5dde276efde2b309a3b1d42341d1008856f0e6d4de45d31b933a11fc4.png",
  tlb: "https://static.prod-images.emergentagent.com/jobs/99031919-dbb8-4612-92e2-5cb2ea82456c/images/affe08099491a4583fcb8436ce24c34bce97c3ddb0e51d18b9fc74f27f8eb9e5.png",
  excavator: "https://images.unsplash.com/photo-1580901369227-308f6f40bdeb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwzfHx5ZWxsb3clMjBleGNhdmF0b3IlMjBjb25zdHJ1Y3Rpb258ZW58MHx8fHwxNzgwMTU1Mjk2fDA&ixlib=rb-4.1.0&q=85",
  tipper: "https://images.unsplash.com/photo-1629807472592-2649bfa09f9c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxkdW1wJTIwdHJ1Y2slMjBjb25zdHJ1Y3Rpb258ZW58MHx8fHwxNzgwMTU1Mjk2fDA&ixlib=rb-4.1.0&q=85",
  skidsteer: "https://images.unsplash.com/photo-1630628535113-e1cc025c8c34?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwxfHxza2lkJTIwc3RlZXIlMjBsb2FkZXJ8ZW58MHx8fHwxNzgwMTU1Mjk2fDA&ixlib=rb-4.1.0&q=85",
};

export const FLEET = [
  {
    key: "tlb",
    title: "TLB / Backhoe Loader",
    img: MEDIA.tlb,
    blurb: "Versatile workhorse for trenching, loading and site prep.",
    specs: ["Front loader bucket", "Rear excavator arm", "On-site mobility"],
  },
  {
    key: "excavator",
    title: "Excavator",
    img: MEDIA.excavator,
    blurb: "Heavy-duty digging power for foundations, trenches and bulk earthworks.",
    specs: ["Tracked stability", "Deep reach", "High breakout force"],
  },
  {
    key: "tipper",
    title: "Tipper Truck",
    img: MEDIA.tipper,
    blurb: "Reliable bulk haulage for sand, aggregate and rubble removal.",
    specs: ["High-volume bin", "Local & site delivery", "Quick turnaround"],
  },
  {
    key: "skid",
    title: "Bobcat / Skid Steer",
    img: MEDIA.skidsteer,
    blurb: "Compact, agile loader for tight access and finishing work.",
    specs: ["Tight-radius turning", "Multi-attachment ready", "Fast cycle times"],
  },
];

export const SAND_PRODUCTS = [
  {
    key: "river",
    title: "Riversand",
    desc: "Clean, washed riversand ideal for concrete mixes and plaster.",
  },
  {
    key: "building",
    title: "Building Sand",
    desc: "Graded building sand for mortar, plaster and general construction.",
  },
  {
    key: "filling",
    title: "Filling Sand",
    desc: "Cost-effective fill for backfilling, levelling and bulk infill.",
  },
];

export const PRICING = [
  { area: "Hlaneki - A", amount: "R1 100.00" },
  { area: "Babangu, Gonono", amount: "R1 200.00" },
  { area: "Mavhuza, Ndhengeza", amount: "R1 200.00" },
  { area: "Maxavele, Nwa-Makena, Navelani, Dzingidzingi, Bode", amount: "R1 200.00" },
  { area: "Mapuve Nkuri", amount: "R1 200.00" },
];

export const TRUST_PILLARS = [
  {
    n: "01",
    title: "Reliable Machines",
    sub: "Strong Performance. Built for You.",
    body: "A maintained yellow-machinery fleet ready for the demands of every site, every day.",
  },
  {
    n: "02",
    title: "Trusted Service",
    sub: "Local Commitment. Lasting Relationships.",
    body: "Rooted in Hlaneki and Giyani — we know the roads, the routes, and the people we serve.",
  },
  {
    n: "03",
    title: "Together We Build",
    sub: "The Future Starts on Solid Ground.",
    body: "From bulk sand supply to plant hire, we deliver the foundations your projects stand on.",
  },
];
