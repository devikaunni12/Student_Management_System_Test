// src/pages/AddStudent.jsx
// Add Student page with full validation and inline error messages.
// This page uses the same sidebar layout style as other protected pages.

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

export default function AddStudent() {
  const navigate = useNavigate()

  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  // Reuse sidebar logout behavior.
  const onLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  const validate = () => {
    const next = {}

    // Required fields
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

  const onChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    try {
      // Create student
      await api.post('/api/students/', {
        ...form
      })

      // Popup + redirect as requested
      window.alert('Student created successfully')
      navigate('/students')
    } catch (err) {
      // Map backend validation errors to UI (DRF can return field errors or a detail message)
      const data = err?.response?.data
      if (data && typeof data === 'object') {
        const normalized = {}
        for (const [k, v] of Object.entries(data)) {
          if (Array.isArray(v)) normalized[k] = v.join(', ')
          else normalized[k] = String(v)
        }
        setErrors(normalized)
      } else {
        window.alert(err?.response?.data?.detail || 'Failed to add student')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const onCancel = () => navigate('/students')

  return (
    <DashboardLayout onLogout={onLogout}>
      <section className="content">


          <div className="page">
            <div className="page__header">
              <div>
                <h2>Add Student</h2>
                <p className="muted">Fill out the information below.</p>
              </div>

              {/* Back arrow button (requested) */}
              <button
                className="btn btn--soft"
                type="button"
                onClick={() => navigate(-1)}
                title="Go back"
              >
                ← Back
              </button>
            </div>

            <div className="card card--form">
              <form className="form" onSubmit={onSubmit}>
                <div className="grid">
                  <div className="field">
                    <label>First Name</label>
                    <input
                      className="input"
                      value={form.first_name}
                      onChange={(e) => onChange('first_name', e.target.value)}
                    />
                    {errors.first_name ? <div className="field__error">{errors.first_name}</div> : null}
                  </div>

                  <div className="field">
                    <label>Last Name</label>
                    <input
                      className="input"
                      value={form.last_name}
                      onChange={(e) => onChange('last_name', e.target.value)}
                    />
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
                    <input
                      type="date"
                      className="input"
                      value={form.date_of_birth}
                      onChange={(e) => onChange('date_of_birth', e.target.value)}
                    />
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
                    <textarea
                      className="input input--textarea"
                      value={form.address}
                      onChange={(e) => onChange('address', e.target.value)}
                    />
                    {errors.address ? <div className="field__error">{errors.address}</div> : null}
                  </div>
                </div>

                <div className="form__actions">
<button className="btn btn--gold btn--sm" type="submit" disabled={submitting}>
                    {submitting ? 'Saving...' : 'Save'}
                  </button>
                  <button className="btn btn--soft btn--sm" type="button" onClick={onCancel} disabled={submitting}>
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


