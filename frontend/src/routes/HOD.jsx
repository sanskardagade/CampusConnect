import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentStressLevel from "../components/faculty/StudentStressLevel";
import StudentLocation from "../components/faculty/StudentLocation";
import DepartmentStudentAttendance from "../components/hod/DepartmentStudentAttendance";
import DepartmentFacultyAttendance from "../components/hod/DepartmentFacultyAttendance";
import HODProfile from "../components/hod/HODProfile";
import HODSettings from "../components/hod/HODSettings";
import HODProfileEdit from "../components/hod/HODProfileEdit";
import HODChangePassword from "../components/hod/HODChangePassword";
import HODSideBar from "../components/sidebar/HODSideBar";
import HODDashboard from "../pages/HODDashboard";
import FacultyLog from "../components/hod/FacultyLog";
import StaticFacultyLog from "../components/hod/StaticFacultyLog";

const HOD = () => {
  return (
    <HODSideBar>
      <Routes>
        <Route path="" element={<HODDashboard/>}/>
        <Route path="view-student" element={<DepartmentStudentAttendance/>} />
        <Route path="view-faculty" element={<DepartmentFacultyAttendance />} />
        <Route path="view-stress-level" element={<StudentStressLevel />} />
        <Route path="view-student-location" element={<StudentLocation />} />
        <Route path="faculty-log" element={<FacultyLog />} />
        <Route path="hod-profile" element={<HODProfile />} />
        <Route path="hod-settings" element={<HODSettings />} />
        <Route path="hod-settings/edit-profile" element={<HODProfileEdit />} /> 
        <Route path="hod-settings/change-password" element={<HODChangePassword />} />
        <Route path="static-faculty-log" element={<StaticFacultyLog />} />
      </Routes>
    </HODSideBar>
  );
};

export default HOD;
