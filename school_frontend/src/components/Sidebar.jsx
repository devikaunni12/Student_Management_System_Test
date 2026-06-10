// src/components/Sidebar.jsx

import { NavLink } from 'react-router-dom'
import { FiHome, FiUsers, FiPlusSquare, FiLogOut } from 'react-icons/fi'

export default function Sidebar({ onLogout }) {
  return (
    <aside className="sidebar">
      
      {/* BRAND SECTION */}
      <div className="sidebar__brand">
        <div className="sidebar__logo" />
        <div>
          <div className="sidebar__title">School</div>
          <div className="sidebar__subtitle">Management</div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="sidebar__nav">

        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            isActive ? 'sidebar__link active' : 'sidebar__link'
          }
        >
          <FiHome />
          <span>Dashboard</span>
        </NavLink>

        {/* Students */}
        <NavLink
          to="/students"
          end
          className={({ isActive }) =>
            isActive ? 'sidebar__link active' : 'sidebar__link'
          }
        >
          <FiUsers />
          <span>Students</span>
        </NavLink>

        {/* Add Student */}
        <NavLink
          to="/students/add"
          className={({ isActive }) =>
            isActive ? 'sidebar__link active' : 'sidebar__link'
          }
        >
          <FiPlusSquare />
          <span>Add Student</span>
        </NavLink>

      </nav>

      {/* LOGOUT */}
      <button className="sidebar__logout" onClick={onLogout}>
        <FiLogOut />
        <span>Logout</span>
      </button>

    </aside>
  )
}