import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Logout from './Logout';
import SideBar from './SideBar';
import AdminProfile from './AdminProfile';
import AdminHomePage from './AdminHomePage';

import AddStudent from './studentRelated/AddStudent';
import SeeComplains from './studentRelated/SeeComplains';
import ShowStudents from './studentRelated/ShowStudents';
import StudentAttendance from './studentRelated/StudentAttendance';
import StudentExamMarks from './studentRelated/StudentExamMarks';
import ViewStudent from './studentRelated/ViewStudent';

import AddNotice from './noticeRelated/AddNotice';
import ShowNotices from './noticeRelated/ShowNotices';

import ShowSubjects from './subjectRelated/ShowSubjects';
import SubjectForm from './subjectRelated/SubjectForm';
import ViewSubject from './subjectRelated/ViewSubject';

import AddTeacher from './teacherRelated/AddTeacher';
import ChooseClass from './teacherRelated/ChooseClass';
import ChooseSubject from './teacherRelated/ChooseSubject';
import ShowTeachers from './teacherRelated/ShowTeachers';
import TeacherDetails from './teacherRelated/TeacherDetails';

import AddClass from './classRelated/AddClass';
import ClassDetails from './classRelated/ClassDetails';
import ShowClasses from './classRelated/ShowClasses';
import AccountMenu from '../components/admin/AccountMenu';

const AdminDashboard = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-white">
            <div className={`fixed top-0 left-0 h-full transition-all duration-300 ${open ? 'w-64' : 'w-0'} bg-red-900 overflow-hidden z-50`}>
                <div className="flex items-center justify-end p-4">
                    <button onClick={toggleDrawer} className="text-white">✖</button>
                </div>
                <nav className="text-white">
                    <SideBar />
                </nav>
            </div>
            <div className="flex flex-col flex-grow">
                <header className="flex items-center justify-between px-6 py-4 bg-red-900 text-white shadow-md">
                    <button onClick={toggleDrawer} className={`text-white ${open ? 'hidden' : 'block'}`}>
                        ☰
                    </button>
                    <h1 className="text-xl font-semibold">Admin Dashboard</h1>
                    <AccountMenu />
                </header>
                <main className="flex-grow overflow-auto p-4 bg-gray-100 dark:bg-white">
                    <Routes>
                        <Route path="/" element={<AdminHomePage />} />
                        <Route path="/dashboard" element={<AdminHomePage />} />
                        <Route path="/profile" element={<AdminProfile />} />
                        <Route path="/complains" element={<SeeComplains />} />

                        {/* Notice */}
                        <Route path="/addnotice" element={<AddNotice />} />
                        <Route path="/notices" element={<ShowNotices />} />

                        {/* Subject */}
                        <Route path="/subjects" element={<ShowSubjects />} />
                        <Route path="/subjects/subject/:classID/:subjectID" element={<ViewSubject />} />
                        <Route path="/subjects/chooseclass" element={<ChooseClass situation="Subject" />} />
                        <Route path="/addsubject/:id" element={<SubjectForm />} />
                        <Route path="/class/subject/:classID/:subjectID" element={<ViewSubject />} />
                        <Route path="/subject/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                        <Route path="/subject/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />

                        {/* Class */}
                        <Route path="/addclass" element={<AddClass />} />
                        <Route path="/classes" element={<ShowClasses />} />
                        <Route path="/classes/class/:id" element={<ClassDetails />} />
                        <Route path="/class/addstudents/:id" element={<AddStudent situation="Class" />} />

                        {/* Student */}
                        <Route path="/addstudents" element={<AddStudent situation="Student" />} />
                        <Route path="/students" element={<ShowStudents />} />
                        <Route path="/students/student/:id" element={<ViewStudent />} />
                        <Route path="/students/student/attendance/:id" element={<StudentAttendance situation="Student" />} />
                        <Route path="/students/student/marks/:id" element={<StudentExamMarks situation="Student" />} />

                        {/* Teacher */}
                        <Route path="/teachers" element={<ShowTeachers />} />
                        <Route path="/teachers/teacher/:id" element={<TeacherDetails />} />
                        <Route path="/teachers/chooseclass" element={<ChooseClass situation="Teacher" />} />
                        <Route path="/teachers/choosesubject/:id" element={<ChooseSubject situation="Norm" />} />
                        <Route path="/teachers/choosesubject/:classID/:teacherID" element={<ChooseSubject situation="Teacher" />} />
                        <Route path="/teachers/addteacher/:id" element={<AddTeacher />} />

                        <Route path="/logout" element={<Logout />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
