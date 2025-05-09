import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import { AiOutlineLogout } from 'react-icons/ai'
import { FaUserCircle } from 'react-icons/fa'

const FacultyProfile = () => {
  const navigate = useNavigate()
  const { logout } = useUser()
  const [faculty, setFaculty] = useState(null)

  const handleLogout = () => {
    try {
      logout()
      localStorage.clear()
      navigate('/signin', { replace: true })
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Using dummy data
  useEffect(() => {
    const dummyFaculty = {
      name: '',
      facultyId: '',
      department: 'Computer Engineering',
      email: '',
      mobile: ''
    }

    setTimeout(() => {
      setFaculty(dummyFaculty)
    }, 1000)
  }, [])

  if (!faculty) {
    return <div className="p-4 text-gray-700 animate-pulse">Loading profile...</div>
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow-lg border border-red-100">
      <div className="flex flex-col items-center mb-6">
        <FaUserCircle className="text-[80px] text-red-700 mb-2" />
        <h1 className="text-3xl font-extrabold text-red-800">Faculty Profile</h1>
        <p className="text-gray-500">Welcome back, {faculty.name.split(' ')[1]}!</p>
      </div>

      <div className="space-y-4 px-2">
        <ProfileField label="Name" value={faculty.name} />
        <ProfileField label="Faculty ID" value={faculty.facultyId} />
        <ProfileField label="Department" value={faculty.department} />
        <ProfileField label="Email" value={faculty.email} />
        <ProfileField label="Mobile Number" value={faculty.mobile} />
      </div>

      
    </div>
  )
}

// Reusable field component
const ProfileField = ({ label, value }) => (
  <div className="flex justify-between items-center bg-red-50 p-3 rounded-lg shadow-sm hover:shadow-md transition">
    <span className="font-medium text-red-900">{label}:</span>
    <span className="text-gray-900 font-semibold">{value || 'N/A'}</span>
  </div>
)
export default FacultyProfile
