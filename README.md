# 🎙️ Voxora AI — Realtime Voice-to-Voice RAG Assistant

> **Talk to your documents.** Upload a PDF, ask questions by voice, get accurate spoken answers — powered by a multi-agent pipeline with semantic retrieval and built-in failure recovery.

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat&logo=python&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat&logo=nextdotjs&logoColor=white)
![LiveKit](https://img.shields.io/badge/LiveKit-Agents-00BFFF?style=flat)
![Redis](https://img.shields.io/badge/Redis-Vector_Search-DC382D?style=flat&logo=redis&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?style=flat&logo=openai&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

---

## What it does

You upload a PDF document. The system indexes it semantically. You then start a voice session — speak naturally, and the AI agent retrieves the most relevant document sections, feeds them to an LLM, and speaks back a grounded, accurate answer — all in under a second of latency.

**No hallucination by default** — the agent is instructed to answer only from retrieved context, and explicitly says so when it doesn't know.

---

## Features

| Feature | Details |
|---|---|
| **Real-time STT** | Sub-200ms transcription |
| **RAG retrieval** | In-memory / Redis vector search with cosine similarity |
| **LLM** | GPT-4o-mini with retrieved context injection |
| **TTS** | High-fidelity voice for natural-sounding speech |
| **PDF chunking** | 500-char overlapping chunks to avoid answer fragmentation |
| **Frontend** | Next.js 14 with a sleek, dark mode glassmorphism UI |

---

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- Accounts: [LiveKit Cloud](https://livekit.io), [OpenAI](https://platform.openai.com), [Deepgram](https://deepgram.com)

### 1. Set up the agent

```bash
cd agent
python -m venv venv
source venv/bin/activate  # macOS/Linux
# .\venv\Scripts\Activate.ps1 # Windows
pip install -r requirements.txt
```

Set up your environment variables in `agent/.env`:
```
LIVEKIT_URL=wss://...
LIVEKIT_API_KEY=...
LIVEKIT_API_SECRET=...
OPENAI_API_KEY=...
DEEPGRAM_API_KEY=...
```

### 2. Set up the frontend

```bash
cd frontend
npm install
```

Set up your environment variables in `frontend/.env.local`:
```
NEXT_PUBLIC_LIVEKIT_URL=wss://...
LIVEKIT_API_KEY=...
LIVEKIT_API_SECRET=...
```

### 3. Run

In one terminal (agent):
```bash
cd agent
python agent.py dev
```

In another terminal (frontend):
```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
