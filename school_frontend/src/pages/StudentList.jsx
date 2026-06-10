// src/pages/StudentList.jsx
// Students list page with search/filter, loading spinner, delete confirmation,
// and consistent sidebar layout.

import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../api/axios'
import Spinner from '../components/Spinner'
import DashboardLayout from '../components/DashboardLayout'


export default function StudentList() {

  const navigate = useNavigate()

  const onLogout = () => {
    // Clear token and return to login.
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    // Fetch all students for listing.
    const run = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await api.get('/api/students/')
        setStudents(res.data)
      } catch (e) {
        setError(e?.response?.data?.detail || 'Failed to load students')
      } finally {
        setLoading(false)
      }
    }

    run()
  }, [])

  // Filter students by name or grade.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return students

    return students.filter((s) => {
      const name = `${s.first_name} ${s.last_name}`.toLowerCase()
      const grade = String(s.grade || '').toLowerCase()
      return name.includes(q) || grade.includes(q)
    })
  }, [students, query])

  const onDelete = async (id) => {
    // Confirmation dialog before delete as requested.
    const ok = window.confirm('Are you sure you want to delete this student?')
    if (!ok) return

    try {
      await api.delete(`/api/students/${id}/`)
      // Update UI after successful deletion.
      setStudents((prev) => prev.filter((s) => s.id !== id))
    } catch (e) {
      window.alert(e?.response?.data?.detail || 'Delete failed')
    }
  }

  return (
    <DashboardLayout onLogout={onLogout}>
      <section className="content">


          <div className="page">
            <div className="page__header">
              <div>
                <h2>Students</h2>
                <p className="muted">Search by name or grade.</p>
              </div>

              <button className="btn btn--gold btn--sm" onClick={() => navigate('/students/add')}>
                Add New Student
              </button>
            </div>

            <div className="toolbar">
              <input
                className="input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search (e.g., John, Grade 10)"
              />
            </div>

            {loading ? (
              <div className="center">
                <Spinner />
              </div>
            ) : error ? (
              <div className="alert alert--error">{error}</div>
            ) : (
              <div className="card">
                <div className="table-wrap">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Grade</th>
                        <th>Status</th>
                        <th style={{ width: 200 }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="table__empty">
                            No students match your search.
                          </td>
                        </tr>
                      ) : (
                        filtered.map((s) => (
                          <tr key={s.id}>
                            <td>
                              {s.first_name} {s.last_name}
                            </td>
                            <td>{s.email}</td>
                            <td>{s.phone}</td>
                            <td>{s.grade}</td>
                            <td>
                              <span className={s.is_active ? 'badge badge--ok' : 'badge'}>
                                {s.is_active ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td>
                              <div className="row-actions">
                                <button className="btn btn--soft" onClick={() => navigate(`/students/edit/${s.id}`)}>
                                  Edit
                                </button>
                                <button className="btn btn--danger" onClick={() => onDelete(s.id)}>
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
    </section>
    </DashboardLayout>


  )
}



