import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaUser } from "react-icons/fa";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import {
  AiOutlineSetting,
  AiFillDatabase,
  AiOutlinePlus,
  AiFillEye,
  AiTwotoneFileExclamation,
} from "react-icons/ai";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SideBarMenu";


  const routes = [
    {
      path: "/faculty",
      name: "Dashboard",
      icon: <FaHome />,
    },
    {
      path: "/faculty/take-attendance",
      name: "Take Attendance",
      icon: <FaUser />,
    },
    {
      path: "/faculty/divisions",
      name: "Divisions",
      icon: <AiOutlinePlus />,
    },
    {
      path: "/faculty/add-notes",
      name: "Add Notes",
      icon: <AiTwotoneFileExclamation />,
    },
    {
      path: "/faculty/student-stress-level",
      name: "Student Stress Level",
      icon: <BiAnalyse />,
    },
    {
      path: "/faculty/location",
      name: "View Student Location",
      icon: <BiAnalyse />,
    },
    {
      path: "/faculty/faculty-profile",
      name: "Profile",
      icon: <FaUser />,
    },
    {
      path: "/faculty/faculty-settings",
      name: "Settings",
      icon: <AiOutlineSetting />,
      subRoutes: [
        {
          path: "/faculty/faculty-settings/edit-profile",
          name: "Edit Profile",
          icon: <AiFillDatabase />,
        },
        {
          path: "/faculty/faculty-settings/change-password",
          name: "Change Password",
          icon: <AiFillEye />,
        },
      ],
    },
  ];
  

const FacultySideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const inputAnimation = {
    hidden: { width: 0, padding: 0, transition: { duration: 0.2 } },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: { duration: 0.2 },
    },
  };

  const showAnimation = {
    hidden: { width: 0, opacity: 0, transition: { duration: 0.3 } },
    show: {
      opacity: 1,
      width: "auto",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <motion.div
        animate={{
          width: isOpen ? "200px" : "45px",
          transition: { duration: 0.5, type: "spring", damping: 10 },
        }}
        className="bg-red-950 text-white h-full overflow-y-auto shadow-lg"
      >
        <div className="flex items-center justify-between p-3">
          <AnimatePresence>
            {isOpen && (
              <motion.h1
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="text-lg font-bold"
              >
                CampusConnect
              </motion.h1>
            )}
          </AnimatePresence>
          <FaBars onClick={toggle} className="cursor-pointer text-xl" />
        </div>

        {/* Search box */}
        <div className="flex items-center px-2 py-2">
          <BiSearch />
          <AnimatePresence>
            {isOpen && (
              <motion.input
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={inputAnimation}
                type="text"
                placeholder="Search"
                className="ml-2 bg-red-900 text-white rounded px-2 py-1 outline-none w-full"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Routes */}
        <nav className="flex flex-col gap-1 px-2">
          {routes.map((route, index) => {
            if (route.subRoutes) {
              return (
                <SidebarMenu
                  key={index}
                  route={route}
                  showAnimation={showAnimation}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              );
            }

            return (
              <NavLink
                to={route.path}
                key={index}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition ${
                    isActive ? "bg-gray-800" : ""
                  }`
                }
              >
                <div className="text-xl">{route.icon}</div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="text-sm"
                    >
                      {route.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })}
        </nav>
      </motion.div>

      {/* Right side content */}
      <main className="flex-1 bg-gray-100 p-4 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default FacultySideBar;
