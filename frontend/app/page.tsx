"use client";

import { useState, useCallback } from "react";
import GeminiVoiceRoom from "@/components/GeminiVoiceRoom";
import PDFUploader from "@/components/PDFUploader";
import StatusBar from "@/components/StatusBar";

export type AppState = "idle" | "connecting" | "connected" | "error";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [statusMsg, setStatusMsg] = useState("Upload a document to begin");
  const [pdfReady, setPdfReady] = useState(false);
  const [pdfData, setPdfData] = useState<string | null>(null);

  const startSession = useCallback(() => {
    setAppState("connected");
    setStatusMsg("Assistant is ready. Start speaking.");
  }, []);

  const handlePdfLoaded = useCallback((filename: string, base64: string) => {
    setPdfReady(true);
    setPdfData(base64);
    setStatusMsg(`Loaded ${filename}. Ready to connect.`);
  }, []);

  return (
    <main className="app-shell">
      <div className="ambient-glow"></div>
      
      {/* Header */}
      <div className="hero-copy">
        <div className="badge">AI-Powered</div>
        <h1>
          Voice RAG <span className="gradient-text">Assistant</span>
        </h1>
        <p className="subtitle">
          Talk to your documents in real-time. Upload a PDF and just speak.
        </p>
      </div>

      {/* Main Interface */}
      <section className="glass-panel">
        <StatusBar message={statusMsg} state={appState} />

        {/* Upload Area */}
        <div className="panel-section">
          <PDFUploader
            onPdfLoaded={handlePdfLoaded}
            disabled={appState === "connected"}
          />
        </div>

        {/* Voice Interface */}
        <div className="panel-section action-area">
          {appState === "connected" && pdfData ? (
            <GeminiVoiceRoom pdfBase64={pdfData} />
          ) : (
            <button
              onClick={startSession}
              disabled={!pdfReady || appState === "connecting"}
              className="primary-button"
            >
              {appState === "connecting" 
                ? "Connecting to Voice Node..." 
                : appState === "error" 
                ? "Connection Failed - Retry" 
                : "Initialize Voice Session"}
            </button>
          )}
        </div>
      </section>

      <footer className="footer">
        <p>Built with LiveKit & Next.js</p>
      </footer>
    </main>
  );
}
