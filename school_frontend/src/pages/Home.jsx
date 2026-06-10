// src/pages/Home.jsx
// Home page: login-only entry page for the School Management System.

import { useNavigate } from 'react-router-dom'
import { FiBookOpen, FiLogIn, FiShield } from 'react-icons/fi'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="auth">
      <div className="auth__center">
          <div className="auth__card auth__card--home">
          <h1 className="auth__title">School Management System</h1>
          <p className="auth__subtitle">Welcome! Please log in to continue.</p>

          <div style={{ display: 'grid', gap: 12, marginTop: 14 }}>
            <div className="card" style={{ padding: 14, borderRadius: 16 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <FiShield size={20} />
                <div>
                  <div style={{ fontWeight: 900, color: '#0f172a' }}>Secure Access</div>
                  <div style={{ fontSize: 12, color: 'rgba(15,23,42,0.65)' }}>
                    Login to manage students.
                  </div>
                </div>
              </div>
            </div>

            <button className="btn btn--gold" onClick={() => navigate('/login')}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <FiLogIn /> Login
              </span>
            </button>

            <div className="card" style={{ padding: 14, borderRadius: 16 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <FiBookOpen size={20} style={{ marginTop: 2 }} />
                <div>
                  <div style={{ fontWeight: 900, color: '#0f172a' }}>Default Admin</div>
                  <div style={{ fontSize: 12, color: 'rgba(15,23,42,0.65)' }}>
                    Username: <b>admin</b> <br />
                    Password: <b>admin123</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

