"use client";

import { useState, useCallback } from "react";
import GeminiVoiceRoom from "@/components/GeminiVoiceRoom";
import PDFUploader from "@/components/PDFUploader";
import StatusBar from "@/components/StatusBar";

export type AppState = "idle" | "connecting" | "connected" | "error";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [statusMsg, setStatusMsg] = useState("Awaiting Document");
  const [pdfReady, setPdfReady] = useState(false);
  const [pdfData, setPdfData] = useState<string | null>(null);

  const startSession = useCallback(() => {
    setAppState("connected");
    setStatusMsg("Live Session Active");
  }, []);

  const handlePdfLoaded = useCallback((filename: string, base64: string) => {
    setPdfReady(true);
    setPdfData(base64);
    setStatusMsg(`Loaded: ${filename}`);
  }, []);

  return (
    <div className="page-wrapper">
      <header className="site-header">
        <div className="logo">VOXORA<span className="dot">.</span></div>
        <nav className="filler-nav">
          <span>Overview</span>
          <span>Technology</span>
          <span>Enterprise</span>
        </nav>
      </header>

      <main className="main-layout">
        <section className="editorial-content">
          <span className="section-label">01 // Voice Intelligence</span>
          <h1 className="hero-title">
            Speak directly <br /> to your data.
          </h1>
          <p className="hero-description">
            Experience the seamless intersection of semantic search and realtime voice synthesis. Upload any PDF document, and our RAG-augmented agent will synthesize the context into natural, conversational responses.
          </p>
          
          <div className="filler-stats">
            <div className="stat-block">
              <h3>Sub-200ms</h3>
              <p>Voice Latency</p>
            </div>
            <div className="stat-block">
              <h3>99.9%</h3>
              <p>Context Accuracy</p>
            </div>
            <div className="stat-block">
              <h3>Zero</h3>
              <p>Hallucinations</p>
            </div>
          </div>

          <div className="filler-quote">
            "Redefining human-document interaction through instantaneous, multimodal intelligence."
          </div>
        </section>

        <section className="app-interface">
          <div className="interface-card">
            <div className="card-header">
              <h2>Workspace</h2>
              <StatusBar message={statusMsg} state={appState} />
            </div>

            <div className="upload-container">
              <PDFUploader
                onPdfLoaded={handlePdfLoaded}
                disabled={appState === "connected"}
              />
            </div>

            <div className="action-container">
              {appState === "connected" && pdfData ? (
                <div className="voice-room-wrapper">
                  <GeminiVoiceRoom pdfBase64={pdfData} />
                </div>
              ) : (
                <button
                  onClick={startSession}
                  disabled={!pdfReady || appState === "connecting"}
                  className="primary-button"
                >
                  {appState === "connecting" 
                    ? "Establishing Connection..." 
                    : appState === "error" 
                    ? "Connection Failed - Retry" 
                    : "Initialize Voice Session"}
                </button>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-line"></div>
        <div className="footer-content">
          <span>SYSTEM OF RECORD: ONLINE</span>
          <span>© 2026 VOXORA AI</span>
        </div>
      </footer>
    </div>
  );
}
