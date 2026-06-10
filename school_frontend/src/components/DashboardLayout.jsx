import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function DashboardLayout({ onLogout, children }) {
  return (
    <div className="layout">
      <Sidebar onLogout={onLogout} />

      <div className="main-content">
        <Navbar />

        <main className="main">{children}</main>
      </div>
    </div>
  )
}

