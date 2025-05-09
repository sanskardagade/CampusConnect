import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineSave } from 'react-icons/ai'

const FacultyProfileEdit = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    facultyId: '',
    department: '',
    email: '',
    mobile: ''
  })

  // Dummy initial load (simulate API fetch)
  useEffect(() => {
    const dummyData = {
      name: '',
      facultyId: '',
      department: 'Computer Engineering',
      email: '',
      mobile: ''
    }

    setTimeout(() => {
      setFormData(dummyData)
    }, 500)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Updated profile:', formData)

    // In real app, replace with:
    // await axios.put('/api/faculty/profile', formData, { headers: { Authorization: `Bearer token` } })

    alert('Profile updated successfully!')
    navigate('/faculty/faculty-profile')
  }

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-md border border-red-100">
      <h1 className="text-2xl font-bold text-red-800 mb-6 text-center">Edit Faculty Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <InputField label="Name" name="name" value={formData.name} onChange={handleChange} />
        <InputField label="Faculty ID" name="facultyId" value={formData.facultyId} onChange={handleChange} readOnly />
        <InputField label="Department" name="department" value={formData.department} onChange={handleChange} />
        <InputField label="Email" name="email" value={formData.email} onChange={handleChange} />
        <InputField label="Mobile Number" name="mobile" value={formData.mobile} onChange={handleChange} />

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-red-700 text-white py-2 rounded-lg hover:bg-red-800 transition transform hover:scale-105"
        >
          <AiOutlineSave />
          Save Changes
        </button>
      </form>
    </div>
  )
}

const InputField = ({ label, name, value, onChange, readOnly = false }) => (
  <div>
    <label htmlFor={name} className="block text-red-800 font-medium mb-1">
      {label}
    </label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className={`w-full px-4 py-2 border rounded-lg shadow-sm ${
        readOnly ? 'bg-gray-100 cursor-not-allowed' : 'focus:outline-none focus:ring-2 focus:ring-red-300'
      }`}
    />
  </div>
)

export default FacultyProfileEdit

