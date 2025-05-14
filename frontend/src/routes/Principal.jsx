import React from "react";
import { Routes, Route } from "react-router-dom";
import Divisions from "../components/faculty/Divisions";
import StudentStressLevel from "../components/faculty/StudentStressLevel";
import StudentLocation from "../components/faculty/StudentLocation";
import PrincipalSideBar from "../components/sidebar/PrincipalSideBar";
import PrincipalDashboard from "../pages/PrincipalDashboard";
import AllStudentAttendance from "../components/principal/AllStudentAttendance";
import FacultyAttendance from "../components/principal/FacultyAttendance";
import PrincipalProfile from "../components/principal/PrincipalProfile";
import PrincipalSettings from "../components/principal/PrincipalSettings";
import PrincipalProfileEdit from "../components/principal/PrincipalProfileEdit";
import PrincipalChangePassword from "../components/principal/PrincipalChangePassword";
import LeaveApplication from "../components/principal/LeaveApplication";
import StaticFacultyLog from "../components/hod/StaticFacultyLog";


const Principal = () => {
  return (
    <PrincipalSideBar>
      <Routes>
        <Route path="" element={<PrincipalDashboard/>}/>
        <Route path="view-student" element={<AllStudentAttendance/>} />
        <Route path="view-faculty" element={<FacultyAttendance />} />
        <Route path="view-stress-level" element={<StudentStressLevel />} />
        <Route path="view-student-location" element={<StudentLocation />} />
        <Route path="department-statistics" element={<Divisions/>} />
        <Route path="principal-profile" element={<PrincipalProfile />} />
        <Route path="principal-settings" element={<PrincipalSettings />} />
        <Route path="principal-settings/edit-profile" element={<PrincipalProfileEdit />} /> 
        <Route path="principal-settings/change-password" element={<PrincipalChangePassword />} />
        <Route path="faculty-leave-approval" element={<LeaveApplication />} />
        <Route path="static-faculty-log" element={<StaticFacultyLog />} />
      </Routes>
    </PrincipalSideBar>
  );
};

export default Principal;
