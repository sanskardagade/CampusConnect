import React, { useState } from 'react';
import { Save, X, User, Mail, Phone, Calendar, Award, Building, MapPin, Book, Clock, ArrowLeft } from 'lucide-react';

const HODProfileEdit = () => {
  const [formData, setFormData] = useState({
    name: "Dr. Sarah Johnson",
    facultyID: "FAC-78901",
    department: "Computer Science",
    position: "Head of Department",
    email: "sarah.johnson@university.edu",
    mobileNo: "+1 (555) 123-4567",
    dob: "1975-03-15",
    qualification: "Ph.D. in Computer Science",
    experience: "18 years",
    specialization: "Artificial Intelligence & Machine Learning",
    officeLocation: "Building D, Room 405",
    officeHours: "Mon-Thu: 10:00 AM - 12:00 PM"
  });

  const [isSuccess, setIsSuccess] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted with data:", formData);
    
    // Show success message
    setIsSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center py-8">
      <div className="max-w-4xl w-full bg-white rounded-lg overflow-hidden shadow-xl">
        {/* Header */}
        <div className="bg-red-800 p-6">
          <div className="flex items-center">
            <ArrowLeft className="text-white mr-3 cursor-pointer" size={24} />
            <div>
              <h1 className="text-3xl font-bold text-white">Edit HOD Profile</h1>
              <p className="text-red-100">Update your profile information</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          {/* Success Message */}
          {isSuccess && (
            <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline"> Profile updated successfully.</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information Section */}
            <div className="bg-red-50 p-5 rounded-lg border border-red-100">
              <h2 className="text-xl font-bold border-b border-red-800 pb-2 mb-4 text-red-800 flex items-center">
                <User className="mr-2" size={20} />
                Personal Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-1">Faculty ID</label>
                  <input
                    type="text"
                    name="facultyID"
                    value={formData.facultyID}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-1">
                    <Calendar className="inline mr-1" size={16} /> Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-1">
                    <Award className="inline mr-1" size={16} /> Qualification
                  </label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Contact Information Section */}
            <div className="bg-red-50 p-5 rounded-lg border border-red-100">
              <h2 className="text-xl font-bold border-b border-red-800 pb-2 mb-4 text-red-800 flex items-center">
                <Mail className="mr-2" size={20} />
                Contact Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-1">
                    <Phone className="inline mr-1" size={16} /> Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-1">
                    <MapPin className="inline mr-1" size={16} /> Office Location
                  </label>
                  <input
                    type="text"
                    name="officeLocation"
                    value={formData.officeLocation}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-1">
                    <Clock className="inline mr-1" size={16} /> Office Hours
                  </label>
                  <input
                    type="text"
                    name="officeHours"
                    value={formData.officeHours}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Professional Information Section */}
            <div className="bg-red-50 p-5 rounded-lg border border-red-100 md:col-span-2">
              <h2 className="text-xl font-bold border-b border-red-800 pb-2 mb-4 text-red-800 flex items-center">
                <Building className="mr-2" size={20} />
                Professional Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-1">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-1">Position</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-1">
                    <Book className="inline mr-1" size={16} /> Specialization
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-1">
                    <Clock className="inline mr-1" size={16} /> Experience
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              className="px-4 py-2 border border-red-800 text-red-800 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <X className="inline mr-1 w-4 h-4" /> Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <Save className="inline mr-1 w-4 h-4" /> Save Changes
            </button>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-red-800 p-4 text-center">
          <p className="text-sm text-white">
            © {new Date().getFullYear()} {formData.department} Department - University Name
          </p>
        </div>
      </div>

    </div>
  );
};

export default HODProfileEdit;