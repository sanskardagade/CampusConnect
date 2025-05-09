import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import { AiOutlineLogout } from 'react-icons/ai'

const FacultyProfile = () => {
  const navigate = useNavigate()
  const { logout } = useUser()

  const handleLogout = () => {
    try {
      // Clear all auth data
      logout()
      // Clear any additional local storage items
      localStorage.clear()
      // Redirect to signin page
      navigate('/signin', { replace: true })
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Faculty Profile</h1>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
      >
        <AiOutlineLogout />
        Logout
      </button>
    </div>
  )
}

export default FacultyProfile
