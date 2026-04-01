"use client";
import { useState, useEffect } from "react";

export default function EtsyLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (document.cookie.includes("etsy_auth=1")) {
      window.location.href = "/etsy";
    }
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/etsy/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.ok) {
        window.location.href = "/etsy";
      } else {
        setError("Mot de passe incorrect");
      }
    } catch {
      setError("Erreur de connexion");
    }

    setLoading(false);
  }

  return (
    <>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #171614; }
        .wrap {
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #171614;
          font-family: 'Satoshi', system-ui, sans-serif;
          padding: 1.5rem;
        }
        .card {
          background: #1c1b19;
          border: 1px solid #393836;
          border-radius: 1rem;
          padding: 2.5rem;
          width: 100%;
          max-width: 380px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.4);
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }
        .logo-icon {
          width: 36px;
          height: 36px;
          background: #f47b39;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          flex-shrink: 0;
        }
        .logo-name {
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #cdccca;
        }
        .logo-sub {
          font-size: 0.8rem;
          color: #797876;
        }
        h1 {
          font-size: clamp(1.125rem, 1rem + 0.75vw, 1.5rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #cdccca;
          margin-bottom: 0.25rem;
        }
        .subtitle {
          font-size: 0.9rem;
          color: #797876;
          margin-bottom: 1.75rem;
        }
        .flbl {
          display: block;
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #797876;
          margin-bottom: 0.5rem;
        }
        .finput {
          width: 100%;
          padding: 0.5rem 0.75rem;
          background: #1d1c1a;
          border: 1px solid #393836;
          border-radius: 0.5rem;
          font-size: 0.9rem;
          color: #cdccca;
          font-family: 'Satoshi', system-ui, sans-serif;
          transition: border-color 180ms cubic-bezier(.16,1,.3,1), box-shadow 180ms;
          outline: none;
        }
        .finput:focus {
          border-color: #f47b39;
          box-shadow: 0 0 0 3px rgba(244,123,57,0.15);
        }
        .finput::placeholder { color: #5a5957; }
        .frow { margin-bottom: 1.25rem; }
        .error {
          background: #4c3d46;
          color: #d163a7;
          border: 1px solid rgba(209,99,167,0.25);
          padding: 0.6rem 0.75rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          font-size: 0.85rem;
        }
        .btn-primary {
          width: 100%;
          padding: 0.6rem 1rem;
          background: #f47b39;
          color: #fff;
          border: none;
          border-radius: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Satoshi', system-ui, sans-serif;
          transition: background 180ms cubic-bezier(.16,1,.3,1), opacity 180ms;
          margin-top: 0.25rem;
        }
        .btn-primary:hover { background: #f26522; }
        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
        .footer {
          text-align: center;
          margin-top: 1.75rem;
          font-size: 0.72rem;
          color: #5a5957;
        }
      `}</style>

      <div className="wrap">
        <div className="card">
          <div className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
            <div>
              <div className="logo-name">EtsyTrack</div>
              <div className="logo-sub">Mon shop Etsy</div>
            </div>
          </div>

          <h1>Connexion</h1>
          <p className="subtitle">Entrez le mot de passe pour accéder au dashboard.</p>

          <form onSubmit={handleLogin}>
            <div className="frow">
              <label className="flbl">Mot de passe</label>
              <input
                type="password"
                className="finput"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </div>

            {error && <div className="error">{error}</div>}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <div className="footer">EtsyTrack v1.0 — inori.tech</div>
        </div>
      </div>
    </>
  );
}