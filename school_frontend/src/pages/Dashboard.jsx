// src/pages/Dashboard.jsx
// Dashboard page with sidebar layout, top navbar, stats cards, and recent students.

import { useEffect, useState } from 'react'
import api from '../api/axios'
import Spinner from '../components/Spinner'
import DashboardLayout from '../components/DashboardLayout'



export default function Dashboard() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  // Derived stats (as requested).
  const totalStudents = students.length
  const activeStudents = students.filter((s) => s.is_active).length
  const latestEnrollment = students.length
    ? students
        .slice(0)
        .sort((a, b) => new Date(b.enrollment_date) - new Date(a.enrollment_date))[0]
        ?.enrollment_date
    : null

  // "Total Grades" = count of distinct grades.
  const totalGrades = new Set(students.map((s) => s.grade)).size

  useEffect(() => {
    // Fetch students for table/stats.
    const run = async () => {
      try {
        const res = await api.get('/api/students/')
        setStudents(res.data)
      } catch (e) {
        console.error('Dashboard students fetch error:', e)

        // Silently ignore for now; UI remains safe.
      } finally {
        setLoading(false)
      }
    }

    run()
  }, [])

  const onLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <DashboardLayout onLogout={onLogout}>
      <section className="content">


          <div className="stats">
            <div className="card stat">
              <div className="stat__label">Total Students</div>
              <div className="stat__value">{loading ? <Spinner /> : totalStudents}</div>
            </div>
            <div className="card stat">
              <div className="stat__label">Active Students</div>
              <div className="stat__value">{loading ? <Spinner /> : activeStudents}</div>
            </div>
            <div className="card stat">
              <div className="stat__label">Latest Enrollment</div>
              <div className="stat__value">{loading ? <Spinner /> : latestEnrollment || '-'}</div>
            </div>
            <div className="card stat">
              <div className="stat__label">Total Grades</div>
              <div className="stat__value">{loading ? <Spinner /> : totalGrades}</div>
            </div>
          </div>

          <div className="card recent">

            <div className="recent__header">
              <h3>Recent Students</h3>
              <span className="recent__hint">Last 5 added</span>
            </div>

            {loading ? (
              <div className="recent__loading">
                <Spinner />
              </div>
            ) : (
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Grade</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students
                      .slice()
                      .sort((a, b) => new Date(b.enrollment_date) - new Date(a.enrollment_date))
                      .slice(0, 5)
                      .map((s) => (
                        <tr key={s.id}>
                          <td>
                            {s.first_name} {s.last_name}
                          </td>
                          <td>{s.email}</td>
                          <td>{s.grade}</td>
                          <td>
                            <span className={s.is_active ? 'badge badge--ok' : 'badge'}>
                              {s.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    {students.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="table__empty">
                          No students yet. Add your first student!
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            )}
          </div>

      </section>
    </DashboardLayout>

  )
}


