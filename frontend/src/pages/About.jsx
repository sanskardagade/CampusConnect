import React from 'react';
import { GraduationCap, Users, Award, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const About = () => {
  const guides = [
    {
      name: "Prof. Atul Kathole",
      title: "Project Guide",
      description: "With over 15 years of experience in computer science education and research, Prof. Kathole specializes in AI and computer vision technologies. His guidance has been instrumental in developing our facial recognition attendance system."
    },
    {
      name: "Prof. Suvarna Patil",
      title: "Guide",
      description: "An expert in software engineering and database management, Prof. Patil brings valuable insights into system architecture and data security. Her mentorship ensures our platform meets the highest standards of reliability and performance."
    }
  ];

  const teamMembers = [
    { name: "Master Sanskar Dagade", role: "Team Lead & Full-Stack Developer" },
    { name: "Master Deepak Zamnani", role: "AI & Machine Learning Engineer" },
    { name: "Master Suraj Katkar", role: "UI/UX Designer" },
    { name: "Miss Shazia Khateeb", role: "Computer Vision Specialist" },
    { name: "Master Swaraj Pawar", role: "Quality Assurance" },
    { name: "Master Prasad Kandekar", role: "Frontend Developer" },
    { name: "Master Rehan Mamidwar", role: "Backend Developer" },
    { name: "Master Meet Raval", role: "Flutter App Developer" }
  ];

  const coreValues = [
    {
      icon: <GraduationCap size={28} />,
      title: "Educational Excellence",
      description: "We enhance the learning experience through thoughtful, tech-driven solutions."
    },
    {
      icon: <Users size={28} />,
      title: "Student-Centered Approach",
      description: "Every feature is designed to prioritize student well-being and engagement."
    },
    {
      icon: <Award size={28} />,
      title: "Quality & Reliability",
      description: "We follow high standards to ensure robust and dependable systems."
    },
    {
      icon: <Target size={28} />,
      title: "Continuous Innovation",
      description: "We constantly integrate new technologies to stay ahead."
    }
  ];

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 text-gray-900 min-h-screen px-4 py-12">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-3">About <span className="text-red-600">Campus Connect</span></h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Revolutionizing campus management through innovative technology solutions
          </p>
        </div>

        {/* Our Story */}
        <section className="mb-20">
          <h3 className="text-3xl font-semibold text-red-600 mb-8">Our Story</h3>
          <div className="space-y-6 border-l-4 border-red-500 pl-6">
            {[
              "Campus Connect began as a project with a vision to transform how educational institutions manage daily operations using AI, facial recognition, and data analytics.",
              "It evolved into a full-fledged platform addressing attendance, student tracking, stress management, and performance analytics.",
              "Today, it stands as a beacon of innovation, combining functionality with modern design and educational foresight."
            ].map((text, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-gray-700 text-base"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </section>

        {/* Project Guides */}
        <section className="mb-20">
          <h3 className="text-3xl font-semibold text-center text-red-600 mb-10">Our Project Guides</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {guides.map((guide, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-red-200 rounded-xl shadow-md p-6 border border-red-500"
              >
                <h4 className="text-xl font-bold text-gray-800">{guide.name}</h4>
                <p className="text-sm font-medium text-red-600 mb-2">{guide.title}</p>
                <p className="text-gray-600 text-sm">{guide.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Members */}
        <section className="mb-20">
          <h3 className="text-3xl font-semibold text-center text-red-600 mb-10">Meet Our Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-red-200 border-red-600 rounded-lg shadow-md p-4 text-center transition"
              >
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full border-2 border-red-500">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThWke775M1_jjgJ_xFVlmmo3Spu3DlHk4LrQ&s"
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-bold text-gray-800">{member.name}</h4>
                <p className="text-sm text-gray-500">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Core Values */}
        <section className="bg-white rounded-xl p-10 shadow-lg border border-gray-200">
          <h3 className="text-3xl font-semibold text-center text-red-600 mb-10">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                className="text-center px-4"
              >
                <div className="bg-red-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-md">
                  {value.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{value.title}</h4>
                <p className="text-sm text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default About;


// import React from 'react';
// import { GraduationCap, Users, Award, Target } from 'lucide-react';
// import { motion } from 'framer-motion';
// import Navbar from '../components/common/Navbar';
// import Footer from '../components/common/Footer';

// const About = () => {
//   const guides = [
//     {
//       name: "Prof. Atul Kathole",
//       title: "Project Guide",
//       description: "With over 15 years of experience in computer science education and research, Prof. Kathole specializes in AI and computer vision technologies. His guidance has been instrumental in developing our facial recognition attendance system."
//     },
//     {
//       name: "Prof. Suvarna Patil",
//       title: "Guide",
//       description: "An expert in software engineering and database management, Prof. Patil brings valuable insights into system architecture and data security. Her mentorship ensures our platform meets the highest standards of reliability and performance."
//     }
//   ];

//   const teamMembers = [
//     { name: "Master Sanskar Dagade", role: "Team Lead & Full-Stack Developer" },
//     { name: "Master Deepak Zamnani", role: "AI & Machine Learning Engineer" },
//     { name: "Master Suraj Katkar", role: "UI/UX Designer" },
//     { name: "Miss Shazia Khateeb", role: "Computer Vision Specialist" },
//     { name: "Master Swaraj Pawar", role: "Quality Assurance" },
//     { name: "Master Prasad Kandekar", role: "Frontend Developer" },
//     { name: "Master Rehan Mamidwar", role: "Backend Developer" },
//     { name: "Master Meet Raval", role: "Flutter App Developer" }
//   ];

//   const coreValues = [
//     {
//       icon: <GraduationCap size={32} />,
//       title: "Educational Excellence",
//       description: "We believe in enhancing the educational experience through innovative technology solutions."
//     },
//     {
//       icon: <Users size={32} />,
//       title: "Student-Centered Approach",
//       description: "Every feature we develop puts student needs and well-being at the forefront."
//     },
//     {
//       icon: <Award size={32} />,
//       title: "Quality & Reliability",
//       description: "Our systems are built with the highest standards to ensure consistent performance."
//     },
//     {
//       icon: <Target size={32} />,
//       title: "Continuous Innovation",
//       description: "We constantly evolve our platform to incorporate emerging technologies and methodologies."
//     }
//   ];

//   return (
//     <>
//       <Navbar />

//       <div className="bg-[#2b0000] text-white min-h-screen px-4 py-10">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-extrabold text-white mb-4">About Campus Connect</h2>
//           <p className="text-lg text-red-200 max-w-3xl mx-auto">
//             Revolutionizing campus management through innovative technology solutions
//           </p>
//         </div>

//         {/* Our Story with Timeline style */}
//         <section className="mb-20">
//           <h3 className="text-3xl font-bold text-red-400 mb-10">Our Story</h3>
//           <div className="space-y-6 border-l-4 border-red-600 pl-6">
//             {[
//               "Campus Connect began as a final year project with a vision to transform how educational institutions manage daily operations using AI, facial recognition, and data analytics.",
//               "It evolved into a full-fledged platform addressing attendance, student tracking, stress management, and performance analytics.",
//               "Today, it stands as a beacon of innovation, combining functionality with modern design and educational foresight."
//             ].map((text, index) => (
//               <motion.p
//                 key={index}
//                 initial={{ opacity: 0, x: -30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.2 }}
//                 className="text-red-100 text-md leading-relaxed"
//               >
//                 {text}
//               </motion.p>
//             ))}
//           </div>
//         </section>

//         {/* Project Guides */}
//         <section className="mb-20">
//           <h3 className="text-3xl font-bold text-center text-white mb-10">Our Project Guides</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {guides.map((guide, index) => (
//               <motion.div
//                 key={index}
//                 whileHover={{ scale: 1.02 }}
//                 className="bg-[#3b0a0a] rounded-lg shadow-xl p-6 transition"
//               >
//                 <h4 className="text-xl font-bold text-red-300 mb-1">{guide.name}</h4>
//                 <p className="text-red-400 font-semibold mb-2">{guide.title}</p>
//                 <p className="text-red-100">{guide.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </section>

//         {/* Team Members */}
//         <section className="mb-20">
//           <h3 className="text-3xl font-bold text-center text-white mb-10">Meet Our Team</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {teamMembers.map((member, index) => (
//               <motion.div
//                 key={index}
//                 whileHover={{ scale: 1.05 }}
//                 className="bg-[#3b0a0a] rounded-lg shadow-lg p-4 text-center transition-all duration-300"
//               >
//                 <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full border-4 border-red-700">
//                   <img
//                     src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThWke775M1_jjgJ_xFVlmmo3Spu3DlHk4LrQ&s'}
//                     alt={member.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <h4 className="text-lg font-bold text-red-300">{member.name}</h4>
//                 <p className="text-sm text-red-100">{member.role}</p>
//               </motion.div>
//             ))}
//           </div>
//         </section>

//         {/* Core Values */}
//         <section className="bg-[#400202] rounded-lg p-8 text-white shadow-xl">
//           <h3 className="text-3xl font-bold mb-10 text-center text-red-300">Our Core Values</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {coreValues.map((value, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4, delay: index * 0.2 }}
//                 className="text-center"
//               >
//                 <div className="bg-red-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
//                   {value.icon}
//                 </div>
//                 <h4 className="text-xl font-semibold text-red-200 mb-2">{value.title}</h4>
//                 <p className="text-sm text-red-100">{value.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </section>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default About;
