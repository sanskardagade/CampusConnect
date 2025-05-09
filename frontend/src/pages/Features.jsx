import React from 'react';
import { Users, Calendar, Brain, Bell, Book, ChartBar, MessageSquare, FileText } from 'lucide-react';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';

const Features = () => {
  const featuresList = [
    {
      icon: <Users size={40} />,
      title: "CCTV Face Recognition Attendance",
      description: "Automated attendance tracking using AI-powered face recognition through existing CCTV infrastructure, eliminating manual roll calls and reducing administrative burden."
    },
    {
      icon: <Calendar size={40} />,
      title: "Student Tracking",
      description: "Comprehensive tracking system for monitoring student activities, academic progress, and campus presence to enhance security and provide valuable insights to educators."
    },
    {
      icon: <Brain size={40} />,
      title: "Student Stress Management",
      description: "Mental wellness tools and resources to help students manage academic stress, including mood tracking, meditation resources, and direct counselor connections."
    },
    {
      icon: <Bell size={40} />,
      title: "Real-Time Notifications",
      description: "Instant alerts for important campus announcements, emergency notifications, and personalized academic updates."
    },
    {
      icon: <Book size={40} />,
      title: "Course Management",
      description: "Centralized platform for syllabus access, assignment submissions, and educational resource distribution."
    },
    {
      icon: <ChartBar size={40} />,
      title: "Performance Analytics",
      description: "Data-driven insights on academic performance with visual representations of progress and improvement areas."
    },
    {
      icon: <MessageSquare size={40} />,
      title: "Communication Hub",
      description: "Secure messaging system connecting students, faculty, and administrative staff for seamless communication."
    },
    {
      icon: <FileText size={40} />,
      title: "Document Management",
      description: "Digital repository for academic documents, certificates, and important institutional paperwork."
    }
  ];

  return (
    <>
    <Navbar/>
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Campus Connect Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transforming campus management with cutting-edge technology and student-centered solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresList.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="text-red-900 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-red-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="bg-red-900 text-white font-semibold py-3 px-8 rounded-lg hover:bg-red-800 transition-all duration-300">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default Features;