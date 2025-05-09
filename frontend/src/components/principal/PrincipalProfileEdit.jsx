import React, { useState } from 'react';

const PrincipalProfileEdit = () => {
  // Initial dummy profile data (replace with real data via props or API)
  const [formData, setFormData] = useState({
    name: 'Dr. Arvind Kumar',
    email: 'arvind.kumar@campus.edu',
    phone: '+91 98765 43210',
    designation: 'Principal',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage('');
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const { name, email, phone, designation } = formData;
    if (!name || !email || !phone || !designation) {
      setError('Please fill all the fields');
      return;
    }

    // TODO: Connect this to an API endpoint using fetch/axios
    console.log('Submitting updated data:', formData);
    setMessage('Profile updated successfully!');
  };

  const handleCancel = () => {
    // Reset form or navigate back
    setFormData({
      name: '',
      email: '',
      phone: '',
      designation: '',
    });
    setMessage('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-white flex items-center justify-center p-6">
      <div className="bg-red-900 w-full max-w-2xl rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Principal Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} />
          <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          <InputField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
          <InputField label="Designation" name="designation" value={formData.designation} onChange={handleChange} />

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-white text-red-900 font-semibold px-6 py-2 rounded hover:bg-red-100 transition"
            >
              Save Changes
            </button>
          </div>

          {error && <p className="text-sm text-red-200 mt-4">{error}</p>}
          {message && <p className="text-sm text-green-300 mt-4">{message}</p>}
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = 'text' }) => (
  <div>
    <label className="block text-sm mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={label}
      className="w-full px-4 py-2 rounded bg-white text-red-900 border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500"
    />
  </div>
);

export default PrincipalProfileEdit;


