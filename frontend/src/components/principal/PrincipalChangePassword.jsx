import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const PrincipalChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setMessage('');
  };

  const toggleVisibility = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = form;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    // Connect with backend API here
    console.log('Password change submitted:', form);
    setMessage('Password changed successfully!');
    setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const renderInput = (label, name, showField) => (
    <div className="mb-4 relative">
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <input
        type={showPassword[showField] ? 'text' : 'password'}
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={label}
        className="w-full px-4 py-2 rounded bg-white text-red-900 border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <button
        type="button"
        className="absolute top-8 right-3 text-red-700"
        onClick={() => toggleVisibility(showField)}
      >
        {showPassword[showField] ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-red-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Change Principal Password</h2>
        <form onSubmit={handleSubmit}>
          {renderInput('Current Password', 'currentPassword', 'current')}
          {renderInput('New Password', 'newPassword', 'new')}
          {renderInput('Confirm New Password', 'confirmPassword', 'confirm')}
          <button
            type="submit"
            className="w-full bg-white text-red-900 font-semibold py-2 rounded hover:bg-red-100 transition duration-300"
          >
            Change Password
          </button>
          {error && <p className="mt-4 text-sm text-red-200">{error}</p>}
          {message && <p className="mt-4 text-sm text-green-300">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default PrincipalChangePassword;
