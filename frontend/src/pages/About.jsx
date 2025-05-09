import React from 'react';
import { GraduationCap, Users, Award, Target } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';


const About = () => {
  // Project Guides
  const guides = [
    {
      name: "Prof. Atul Kathole",
      title: "Project Guide",
      image: "/api/placeholder/400/400",
      description: "With over 15 years of experience in computer science education and research, Prof. Kathole specializes in AI and computer vision technologies. His guidance has been instrumental in developing our facial recognition attendance system."
    },
    {
      name: "Prof. Suvarna Patil",
      title: "Co-Guide",
      image: "/api/placeholder/400/400",
      description: "An expert in software engineering and database management, Prof. Patil brings valuable insights into system architecture and data security. Her mentorship ensures our platform meets the highest standards of reliability and performance."
    }
  ];

  // Team Members
  const teamMembers = [
    { name: "Rahul Sharma", role: "Team Lead & Full-Stack Developer", image: "/api/placeholder/200/200" },
    { name: "Priya Patel", role: "AI & Machine Learning Engineer", image: "/api/placeholder/200/200" },
    { name: "Amit Kumar", role: "Frontend Developer", image: "/api/placeholder/200/200" },
    { name: "Neha Singh", role: "Backend Developer", image: "/api/placeholder/200/200" },
    { name: "Vikram Desai", role: "UI/UX Designer", image: "/api/placeholder/200/200" },
    { name: "Anjali Gupta", role: "Database Administrator", image: "/api/placeholder/200/200" },
    { name: "Karan Mehta", role: "Computer Vision Specialist", image: "/api/placeholder/200/200" },
    { name: "Shreya Malhotra", role: "Quality Assurance", image: "/api/placeholder/200/200" },
    { name: "Rohan Joshi", role: "Documentation Specialist", image: "/api/placeholder/200/200" },
    { name: "Divya Verma", role: "System Integration Engineer", image: "/api/placeholder/200/200" }
  ];

  // Core Values
  const coreValues = [
    {
      icon: <GraduationCap size={32} />,
      title: "Educational Excellence",
      description: "We believe in enhancing the educational experience through innovative technology solutions."
    },
    {
      icon: <Users size={32} />,
      title: "Student-Centered Approach",
      description: "Every feature we develop puts student needs and well-being at the forefront."
    },
    {
      icon: <Award size={32} />,
      title: "Quality & Reliability",
      description: "Our systems are built with the highest standards to ensure consistent performance."
    },
    {
      icon: <Target size={32} />,
      title: "Continuous Innovation",
      description: "We constantly evolve our platform to incorporate emerging technologies and methodologies."
    }
  ];

  return (
    <>
     <Navbar/>
     
      <div className="container mx-auto px-4">
        {/* Main Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">About Campus Connect</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionizing campus management through innovative technology solutions
          </p>
        </div>

        {/* Our Story */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-red-900 mb-6">Our Story</h3>
          <div className="prose max-w-none text-gray-700">
            <p>
              Campus Connect began as a final year project with a vision to transform how educational institutions manage their daily operations. 
              Recognizing the challenges faced by administrators, faculty, and students in traditional campus management systems, 
              our team set out to create an integrated platform that leverages cutting-edge technologies like AI, facial recognition, 
              and data analytics to streamline administrative processes and enhance the educational experience.
            </p>
            <p className="mt-4">
              What started as an academic endeavor has evolved into a comprehensive solution addressing key aspects of campus life - 
              from attendance management and student tracking to stress management and performance analytics. Our system not only reduces 
              administrative burden but also creates a more connected, efficient, and supportive campus environment.
            </p>
            <p className="mt-4">
              Today, Campus Connect represents the culmination of innovative thinking, technical expertise, and a deep understanding 
              of educational institutions' needs. Our platform combines practical functionality with forward-thinking features, 
              setting a new standard for campus management technology.
            </p>
          </div>
        </div>

        {/* Project Guides */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-12">Our Project Guides</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {guides.map((guide, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img 
                      src={guide.image} 
                      alt={guide.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <h4 className="text-xl font-bold text-red-900">{guide.name}</h4>
                    <p className="text-red-700 font-medium mb-4">{guide.title}</p>
                    <p className="text-gray-600">{guide.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-12">Meet Our Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-4 text-center hover:shadow-xl transition-all">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full border-4 border-red-900">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-bold text-red-900">{member.name}</h4>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-red-900 rounded-lg shadow-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-12 text-center">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-red-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                <p className="text-red-100">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
      </>
  );
};

export default About;