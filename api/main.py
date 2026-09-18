import json
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Karauli Offers API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)

OFFERS = json.loads((Path(__file__).parent / "offers.json").read_text(encoding="utf-8"))


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/api/offers")
def list_offers(city: str | None = None, search: str | None = None):
    results = OFFERS
    if city:
        results = [offer for offer in results if offer["city"].lower() == city.lower()]
    if search:
        term = search.lower()
        results = [
            offer for offer in results
            if term in offer["shop_name"].lower()
            or term in offer["offer"].lower()
            or term in offer["city"].lower()
        ]
    return {"count": len(results), "offers": results}
