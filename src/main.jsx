import React, { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('VYBE Application Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', fontFamily: 'system-ui, -apple-system, sans-serif', textAlign: 'center', background: '#0a0a0c', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '24px', padding: '36px', maxWidth: '520px', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(20px)' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '12px' }}>VYBE • Reconnecting</h1>
            <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '16px', lineHeight: '1.6' }}>
              The application encountered a reload event. Click below to continue browsing.
            </p>
            {this.state.error?.message && (
              <p style={{ fontSize: '12px', color: '#f87171', background: 'rgba(239,68,68,0.1)', padding: '10px 14px', borderRadius: '12px', marginBottom: '20px', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                {this.state.error.message}
              </p>
            )}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => { this.setState({ hasError: false, error: null }); }}
                style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '999px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 24px rgba(124,58,237,0.4)' }}
              >
                Try Again
              </button>
              <button
                onClick={() => { window.location.reload(); }}
                style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 24px', borderRadius: '999px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}
              >
                Reload
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
