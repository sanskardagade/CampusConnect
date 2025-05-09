import { NavLink } from "react-router-dom";
import { FaBars, FaUserPlus, FaTrashAlt, FaUsers } from "react-icons/fa";
import { AiOutlineSetting, AiOutlinePlus, AiOutlineDatabase } from "react-icons/ai";
import { BiAnalyse, BiMap } from "react-icons/bi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SideBarMenu";

const adminRoutes = [
  {
    path: "", // Relative to /admin
    name: "Dashboard",
    icon: <AiOutlineDatabase />,
  },
  {
    path: "add-student",
    name: "Add Student",
    icon: <FaUserPlus />,
  },
  {
    path: "add-faculty",
    name: "Add Faculty",
    icon: <AiOutlinePlus />,
  },
  {
    path: "delete-user",
    name: "Delete User",
    icon: <FaTrashAlt />,
  },
  {
    path: "view-departments",
    name: "View Departments",
    icon: <BiAnalyse />,
  },
  {
    path: "view-locations",
    name: "View Student Locations",
    icon: <BiMap />,
  },
  {
    path: "admin-settings",
    name: "Settings",
    icon: <AiOutlineSetting />,
    subRoutes: [
      {
        path: "admin-settings/edit-profile",
        name: "Edit Profile",
        icon: <FaUsers />,
      },
      {
        path: "admin-settings/change-password",
        name: "Change Password",
        icon: <AiOutlineSetting />,
      },
    ],
  },
];

const AdminSideBar = ({ children }) => {
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
      {/* Sidebar */}
      <motion.div
        animate={{
          width: isOpen ? "200px" : "45px",
          transition: { duration: 0.5, type: "spring", damping: 10 },
        }}
        className="bg-red-950 text-white h-full overflow-y-auto shadow-lg"
      >
        {/* Header */}
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
                AdminPanel
              </motion.h1>
            )}
          </AnimatePresence>
          <FaBars onClick={toggle} className="cursor-pointer text-xl" />
        </div>

        {/* Search Box */}
        <div className="flex items-center px-2 py-2">
          <BiAnalyse />
          <AnimatePresence>
            {isOpen && (
              <motion.input
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={inputAnimation}
                type="text"
                placeholder="Search"
                className="ml-2 bg-red-800 text-white rounded px-2 py-1 outline-none w-full"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Routes */}
        <nav className="flex flex-col gap-1 px-2">
          {adminRoutes.map((route, index) => {
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
                  `flex items-center gap-3 p-2 rounded hover:bg-red-500 transition ${
                    isActive ? "bg-red-600" : ""
                  }`
                }
                end={route.path === ""}
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

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-4 overflow-auto">{children}</main>
    </div>
  );
};

export default AdminSideBar;
