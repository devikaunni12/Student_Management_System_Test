import { FiShield } from 'react-icons/fi'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__left">
        <FiShield className="navbar__icon" />
        <h2 className="navbar__title">Student Management System</h2>
      </div>

      <div className="navbar__right">
        <span className="navbar__user">Admin</span>
      </div>
    </header>
  )
}


