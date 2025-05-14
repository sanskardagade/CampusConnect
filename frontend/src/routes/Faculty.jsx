import React from "react";
import { Routes, Route } from "react-router-dom";
import FacultySideBar from "../components/sidebar/FacultySideBar";
import FacultyDashboard from "../pages/FacultyDashboard";
import TakeAttendance from "../components/faculty/TakeAttendance";
import AddNotes from "../components/faculty/AddNotes";
import Divisions from "../components/faculty/Divisions";
import StudentStressLevel from "../components/faculty/StudentStressLevel";
import StudentLocation from "../components/faculty/StudentLocation";
import FacultyProfile from "../components/faculty/FacultyProfile";
import FacultySettings from "../components/faculty/FacultySettings";
import FacultyProfileEdit from "../components/faculty/FacultyProfileEdit";
import FacultyChangePassword from "../components/faculty/FacultyChangePassword";
import LeaveApplication from "../components/faculty/LeaveApplication";

const Faculty = () => {
  return (
    <FacultySideBar>
      <Routes>
        <Route path="" element={<FacultyDashboard />} />
        <Route path="take-attendance" element={<TakeAttendance />} />   
        <Route path="add-notes" element={<AddNotes />} />
        <Route path="divisions" element={<Divisions />} />
        <Route path="student-stress-level" element={<StudentStressLevel />} />
        <Route path="location" element={<StudentLocation />} />
        <Route path="faculty-profile" element={<FacultyProfile />} />
        <Route path="faculty-settings" element={<FacultySettings />} />
        <Route path="faculty-settings/edit-profile" element={<FacultyProfileEdit />} />
        <Route path="faculty-settings/change-password" element={<FacultyChangePassword />} />
        <Route path="leave-apply" element={<LeaveApplication/>}/>
      </Routes>
    </FacultySideBar>
  );
};

export default Faculty;
