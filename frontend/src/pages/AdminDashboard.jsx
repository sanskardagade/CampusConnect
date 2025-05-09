import { useState, useEffect } from "react";
import AdminSideBar from "../components/sidebar/AdminSideBar";
import { StudentForm } from "../components/dashboard/StudentForm";
import { FacultyForm } from "../components/dashboard/FacultyForm";
import { StudentsList } from "../components/dashboard/StudentList";
import { FacultyList } from "../components/dashboard/FacultyList";
import { AttendanceView } from "../components/dashboard/AttendanceView";
import { ReportGenerator } from "../components/dashboard/ReportGenerator";
import { DashboardOverview } from "../components/dashboard/DashboardOverview";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [students, setStudents] = useState([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      studentId: "ST12345",
      department: "computer_science",
      year: "2",
      attendance: 85,
    },
    {
      id: "2",
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      studentId: "ST12346",
      department: "electrical",
      year: "3",
      attendance: 92,
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      studentId: "ST12347",
      department: "mechanical",
      year: "1",
      attendance: 78,
    },
    {
      id: "4",
      name: "Sophia Williams",
      email: "sophia.williams@example.com",
      studentId: "ST12348",
      department: "civil",
      year: "4",
      attendance: 65,
    },
    {
      id: "5",
      name: "David Miller",
      email: "david.miller@example.com",
      studentId: "ST12349",
      department: "business",
      year: "2",
      attendance: 55,
    },
  ]);
  const [faculty, setFaculty] = useState([
    // ... same initialFaculty data
    {
    id: "1",
    name: "Dr. Robert Anderson",
    email: "robert.anderson@example.com",
    facultyId: "FC9876",
    department: "computer_science",
    position: "professor",
  },
  {
    id: "2",
    name: "Prof. Sarah Martinez",
    email: "sarah.martinez@example.com",
    facultyId: "FC9877",
    department: "electrical",
    position: "associate_professor",
  },
  {
    id: "3",
    name: "Dr. James Wilson",
    email: "james.wilson@example.com",
    facultyId: "FC9878",
    department: "mechanical",
    position: "assistant_professor",
  },
  ]);
  const [studentSubTab, setStudentSubTab] = useState("view");
  const [facultySubTab, setFacultySubTab] = useState("view");

  const [dashboardStats, setDashboardStats] = useState({
    totalStudents: 0,
    totalFaculty: 0,
    averageAttendance: 0,
    lowAttendanceCount: 0,
  });

  useEffect(() => {
    const avgAttendance = students.length
      ? Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length)
      : 0;

    const lowAttendance = students.filter((s) => s.attendance < 60).length;

    setDashboardStats({
      totalStudents: students.length,
      totalFaculty: faculty.length,
      averageAttendance: avgAttendance,
      lowAttendanceCount: lowAttendance,
    });
  }, [students, faculty]);

  const handleAddStudent = (student) => {
    setStudents([...students, student]);
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const handleAddFaculty = (facultyMember) => {
    setFaculty([...faculty, facultyMember]);
  };

  const handleDeleteFaculty = (id) => {
    setFaculty(faculty.filter((member) => member.id !== id));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <DashboardOverview {...dashboardStats} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Student Tabs */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Students</h3>
                <div className="flex mb-4">
                  <button
                    className={`flex-1 p-2 ${studentSubTab === "view" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
                    onClick={() => setStudentSubTab("view")}
                  >
                    View Students
                  </button>
                  <button
                    className={`flex-1 p-2 ${studentSubTab === "add" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
                    onClick={() => setStudentSubTab("add")}
                  >
                    Add Student
                  </button>
                </div>
                {studentSubTab === "view" ? (
                  <StudentsList students={students} onDeleteStudent={handleDeleteStudent} />
                ) : (
                  <StudentForm onAddStudent={handleAddStudent} />
                )}
              </div>

              {/* Faculty Tabs */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Faculty</h3>
                <div className="flex mb-4">
                  <button
                    className={`flex-1 p-2 ${facultySubTab === "view" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
                    onClick={() => setFacultySubTab("view")}
                  >
                    View Faculty
                  </button>
                  <button
                    className={`flex-1 p-2 ${facultySubTab === "add" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
                    onClick={() => setFacultySubTab("add")}
                  >
                    Add Faculty
                  </button>
                </div>
                {facultySubTab === "view" ? (
                  <FacultyList faculty={faculty} onDeleteFaculty={handleDeleteFaculty} />
                ) : (
                  <FacultyForm onAddFaculty={handleAddFaculty} />
                )}
              </div>
            </div>
          </div>
        );

      case "students":
        return (
          <>
            <div className="flex mb-4">
              <button
                className={`flex-1 p-2 ${studentSubTab === "view" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
                onClick={() => setStudentSubTab("view")}
              >
                View Students
              </button>
              <button
                className={`flex-1 p-2 ${studentSubTab === "add" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
                onClick={() => setStudentSubTab("add")}
              >
                Add Student
              </button>
            </div>
            {studentSubTab === "view" ? (
              <StudentsList students={students} onDeleteStudent={handleDeleteStudent} />
            ) : (
              <StudentForm onAddStudent={handleAddStudent} />
            )}
          </>
        );

      case "faculty":
        return (
          <>
            <div className="flex mb-4">
              <button
                className={`flex-1 p-2 ${facultySubTab === "view" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
                onClick={() => setFacultySubTab("view")}
              >
                View Faculty
              </button>
              <button
                className={`flex-1 p-2 ${facultySubTab === "add" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
                onClick={() => setFacultySubTab("add")}
              >
                Add Faculty
              </button>
            </div>
            {facultySubTab === "view" ? (
              <FacultyList faculty={faculty} onDeleteFaculty={handleDeleteFaculty} />
            ) : (
              <FacultyForm onAddFaculty={handleAddFaculty} />
            )}
          </>
        );

      case "attendance":
        return <AttendanceView students={students} />;
      case "reports":
        return <ReportGenerator students={students} />;
      case "settings":
        return (
          <div className="text-center p-12 text-gray-500">
            <h3 className="text-2xl font-bold mb-2">Settings Panel</h3>
            <p>Admin settings would appear here.</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-100 text-gray-900">
      <AdminSideBar setActiveTab={setActiveTab} />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <header className="mb-6">
            <h1 className="text-2xl font-bold capitalize">{activeTab.replace("_", " ")}</h1>
            <p className="text-gray-600">
              {activeTab === "dashboard"
                ? "Monitor overall statistics and quick access to all features"
                : activeTab === "students"
                ? "Add, view and manage all student records"
                : activeTab === "faculty"
                ? "Add, view and manage all faculty members"
                : activeTab === "attendance"
                ? "View and analyze attendance records of all students"
                : activeTab === "reports"
                ? "Generate custom reports based on various parameters"
                : "Configure system settings and preferences"}
            </p>
          </header>
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
