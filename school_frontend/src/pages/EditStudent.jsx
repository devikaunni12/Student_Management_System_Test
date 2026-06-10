// src/pages/EditStudent.jsx
// Edit Student page. Fetches the student by id and updates it.

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/axios'
import DashboardLayout from '../components/DashboardLayout'

const emptyForm = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  date_of_birth: '',
  gender: 'Male',
  grade: '',
  address: '',
  is_active: true
}

export default function EditStudent() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [errorBanner, setErrorBanner] = useState('')

  const onLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  const onChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      setErrorBanner('')
      try {
        const res = await api.get(`/api/students/${id}/`)
        const s = res.data
        setForm({
          first_name: s.first_name || '',
          last_name: s.last_name || '',
          email: s.email || '',
          phone: s.phone || '',
          date_of_birth: s.date_of_birth || '',
          gender: s.gender || 'Male',
          grade: s.grade || '',
          address: s.address || '',
          is_active: s.is_active ?? true
        })
      } catch (e) {
        setErrorBanner(e?.response?.data?.detail || 'Failed to load student')
      } finally {
        setLoading(false)
      }
    }

    run()
  }, [id])

  const validate = () => {
    const next = {}
    if (!form.first_name.trim()) next.first_name = 'First name is required'
    if (!form.last_name.trim()) next.last_name = 'Last name is required'

    if (!form.email.trim()) next.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Email is invalid'

    if (!form.phone.trim()) next.phone = 'Phone is required'
    else if (!/^[0-9+\-\s]{7,20}$/.test(form.phone.trim())) next.phone = 'Phone must be 7-20 chars (digits/+/-/spaces)'

    if (!form.date_of_birth) next.date_of_birth = 'Date of birth is required'
    if (!form.gender) next.gender = 'Gender is required'
    if (!form.grade.trim()) next.grade = 'Grade is required'
    if (!form.address.trim()) next.address = 'Address is required'
    return next
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    setErrorBanner('')
    try {
      await api.put(`/api/students/${id}/`, form)
      window.alert('Student updated successfully')
      navigate('/students')
    } catch (err) {
      const backendErrors = err?.response?.data || {}
      setErrors(backendErrors)
      setErrorBanner(err?.response?.data?.detail || '')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout onLogout={onLogout}>
        <section className="content">
          <div className="page center">
            <div className="card" style={{ padding: 24 }}>
              Loading...
            </div>
          </div>
        </section>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout onLogout={onLogout}>
      <section className="content">
        <div className="page">
          <div className="page__header">
            <div>
              <h2>Edit Student</h2>
              <p className="muted">Update the fields and save changes.</p>
            </div>
          </div>

          {errorBanner ? <div className="alert alert--error">{errorBanner}</div> : null}

          <div className="card card--form">
            <form className="form" onSubmit={onSubmit}>
              <div className="grid">
                <div className="field">
                  <label>First Name</label>
                  <input className="input" value={form.first_name} onChange={(e) => onChange('first_name', e.target.value)} />
                  {errors.first_name ? <div className="field__error">{errors.first_name}</div> : null}
                </div>

                <div className="field">
                  <label>Last Name</label>
                  <input className="input" value={form.last_name} onChange={(e) => onChange('last_name', e.target.value)} />
                  {errors.last_name ? <div className="field__error">{errors.last_name}</div> : null}
                </div>

                <div className="field">
                  <label>Email</label>
                  <input className="input" value={form.email} onChange={(e) => onChange('email', e.target.value)} />
                  {errors.email ? <div className="field__error">{errors.email}</div> : null}
                </div>

                <div className="field">
                  <label>Phone</label>
                  <input className="input" value={form.phone} onChange={(e) => onChange('phone', e.target.value)} />
                  {errors.phone ? <div className="field__error">{errors.phone}</div> : null}
                </div>

                <div className="field">
                  <label>Date of Birth</label>
                  <input type="date" className="input" value={form.date_of_birth} onChange={(e) => onChange('date_of_birth', e.target.value)} />
                  {errors.date_of_birth ? <div className="field__error">{errors.date_of_birth}</div> : null}
                </div>

                <div className="field">
                  <label>Gender</label>
                  <select className="input" value={form.gender} onChange={(e) => onChange('gender', e.target.value)}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender ? <div className="field__error">{errors.gender}</div> : null}
                </div>

                <div className="field">
                  <label>Grade</label>
                  <select className="input" value={form.grade} onChange={(e) => onChange('grade', e.target.value)}>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => (
                      <option key={g} value={`Grade ${g}`}>
                        {`Grade ${g}`}
                      </option>
                    ))}
                  </select>
                  {errors.grade ? <div className="field__error">{errors.grade}</div> : null}
                </div>

                <div className="field field--full">
                  <label>Address</label>
                  <textarea className="input input--textarea" value={form.address} onChange={(e) => onChange('address', e.target.value)} />
                  {errors.address ? <div className="field__error">{errors.address}</div> : null}
                </div>
              </div>

              <div className="form__actions">
                <button className="btn btn--gold" type="submit" disabled={submitting}>
                  {submitting ? 'Saving...' : 'Save Student'}
                </button>
                <button className="btn btn--soft" type="button" onClick={() => navigate('/students')} disabled={submitting}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </DashboardLayout>
  )
}

