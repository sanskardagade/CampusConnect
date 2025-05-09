import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Award, Building, MapPin, Book, Clock } from 'lucide-react';

const HODProfile = () => {
  const [hodData, setHodData] = useState({
    name: "Dr. Sarah Johnson",
    facultyID: "FAC-78901",
    department: "Computer Science",
    position: "Head of Department",
    email: "sarah.johnson@university.edu",
    mobileNo: "+1 (555) 123-4567",
    dob: "15 March 1975",
    qualification: "Ph.D. in Computer Science",
    experience: "18 years",
    specialization: "Artificial Intelligence & Machine Learning",
    officeLocation: "Building D, Room 405",
    officeHours: "Mon-Thu: 10:00 AM - 12:00 PM"
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center py-8">
      <div className="max-w-4xl w-full bg-white rounded-lg overflow-hidden shadow-xl">
        {/* Header Banner */}
        <div className="bg-red-800 p-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-red-700 w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold text-white mr-6">
              {hodData.name.split(" ").map(word => word[0]).join("")}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{hodData.name}</h1>
              <p className="text-red-100 text-lg">{hodData.position}</p>
              <p className="text-red-200">{hodData.department} Department</p>
            </div>
          </div>
          <div className="bg-red-900 px-4 py-2 rounded-md self-start text-white">
            <p className="font-semibold">Faculty ID: {hodData.facultyID}</p>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Info Section */}
          <div className="bg-red-50 p-5 rounded-lg border border-red-100">
            <h2 className="text-xl font-bold border-b border-red-800 pb-2 mb-4 text-red-800">
              Contact Information
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="text-red-700 mr-3" size={20} />
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="text-gray-800">{hodData.email}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="text-red-700 mr-3" size={20} />
                <div>
                  <p className="text-gray-500 text-sm">Mobile</p>
                  <p className="text-gray-800">{hodData.mobileNo}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <MapPin className="text-red-700 mr-3" size={20} />
                <div>
                  <p className="text-gray-500 text-sm">Office</p>
                  <p className="text-gray-800">{hodData.officeLocation}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock className="text-red-700 mr-3" size={20} />
                <div>
                  <p className="text-gray-500 text-sm">Office Hours</p>
                  <p className="text-gray-800">{hodData.officeHours}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Personal Info Section */}
          <div className="bg-red-50 p-5 rounded-lg border border-red-100">
            <h2 className="text-xl font-bold border-b border-red-800 pb-2 mb-4 text-red-800">
              Personal Information
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <User className="text-red-700 mr-3" size={20} />
                <div>
                  <p className="text-gray-500 text-sm">Full Name</p>
                  <p className="text-gray-800">{hodData.name}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="text-red-700 mr-3" size={20} />
                <div>
                  <p className="text-gray-500 text-sm">Date of Birth</p>
                  <p className="text-gray-800">{hodData.dob}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Award className="text-red-700 mr-3" size={20} />
                <div>
                  <p className="text-gray-500 text-sm">Qualification</p>
                  <p className="text-gray-800">{hodData.qualification}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Building className="text-red-700 mr-3" size={20} />
                <div>
                  <p className="text-gray-500 text-sm">Department</p>
                  <p className="text-gray-800">{hodData.department}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Professional Info Section */}
          <div className="bg-red-50 p-5 rounded-lg md:col-span-2 border border-red-100">
            <h2 className="text-xl font-bold border-b border-red-800 pb-2 mb-4 text-red-800">
              Professional Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Book className="text-red-700 mr-3" size={20} />
                <div>
                  <p className="text-gray-500 text-sm">Specialization</p>
                  <p className="text-gray-800">{hodData.specialization}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock className="text-red-700 mr-3" size={20} />
                <div>
                  <p className="text-gray-500 text-sm">Experience</p>
                  <p className="text-gray-800">{hodData.experience}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-red-800 p-4 text-center">
          <p className="text-sm text-white">
            © {new Date().getFullYear()} {hodData.department} Department - University Name
          </p>
        </div>
      </div>
    </div>
  );
};

export default HODProfile;
