import os
import re
import time
from collections import defaultdict, deque
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from pydantic import BaseModel

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.1-8b-instant")

if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY is required. Add it to backend-python/.env.")

client = OpenAI(api_key=GROQ_API_KEY, base_url="https://api.groq.com/openai/v1")
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5175",
        "https://edmarkmagsalin.onrender.com",
        "https://edmarkmagsalin.netlify.app",
    ],
    allow_credentials=True,
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["*"],
)

PORTFOLIO = (BASE_DIR / "portfolio.md").read_text(encoding="utf-8")
RATE_LIMIT_REQUESTS = 10
RATE_LIMIT_WINDOW_SECONDS = 60
request_times: dict[str, deque[float]] = defaultdict(deque)


def create_portfolio_chunks(portfolio: str) -> list[str]:
    sections = re.split(r"(?=^#{1,2} )", portfolio, flags=re.MULTILINE)
    return [section.strip() for section in sections if section.strip()]


def search_portfolio(query: str, limit: int = 3) -> list[str]:
    query_terms = set(re.findall(r"[a-z0-9]+", query.lower()))
    scored_chunks = []

    for chunk in PORTFOLIO_CHUNKS:
        chunk_terms = re.findall(r"[a-z0-9]+", chunk.lower())
        score = sum(chunk_terms.count(term) for term in query_terms)
        if score:
            scored_chunks.append((score, chunk))

    scored_chunks.sort(key=lambda item: item[0], reverse=True)
    return [chunk for _, chunk in scored_chunks[:limit]]


def enforce_rate_limit(request: Request) -> None:
    client_ip = request.client.host if request.client else "unknown"
    now = time.monotonic()
    timestamps = request_times[client_ip]

    while timestamps and now - timestamps[0] >= RATE_LIMIT_WINDOW_SECONDS:
        timestamps.popleft()

    if len(timestamps) >= RATE_LIMIT_REQUESTS:
        raise HTTPException(
            status_code=429,
            detail="Too many chat requests. Please try again shortly.",
            headers={"Retry-After": str(RATE_LIMIT_WINDOW_SECONDS)},
        )

    timestamps.append(now)


PORTFOLIO_CHUNKS = create_portfolio_chunks(PORTFOLIO)
SYSTEM_PROMPT = """
You are the AI assistant for Edmark Magsalin's personal portfolio website.

Only answer questions about Edmark using the portfolio information provided.
Do not invent, guess, or infer information. If the answer is not contained in
that information, say: "I don't have that information in Edmark's portfolio."
For unrelated questions, say: "I can only answer questions about Edmark and
his portfolio." Keep answers concise and conversational.

PORTFOLIO INFORMATION:
"""


class ChatRequest(BaseModel):
    message: str


@app.post("/api/chat")
async def chat(request: Request, chat_request: ChatRequest):
    enforce_rate_limit(request)
    relevant_chunks = search_portfolio(chat_request.message)
    instructions = f"{SYSTEM_PROMPT}\n{chr(10).join(relevant_chunks)}"

    try:
        response = client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[
                {"role": "system", "content": instructions},
                {"role": "user", "content": chat_request.message},
            ],
            max_tokens=500,
        )
    except Exception as error:
        raise HTTPException(
            status_code=503,
            detail="Groq is currently unavailable. Check the API key, model, and quota.",
        ) from error

    answer = response.choices[0].message.content if response.choices else None
    if not answer:
        raise HTTPException(status_code=503, detail="Groq returned an empty response.")

    return {"answer": answer}
