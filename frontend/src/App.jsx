import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import LandingPage from "./pages/LandingPage";
import Student from "./routes/Student";
import Faculty from "./routes/Faculty";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import HOD from "./routes/HOD";
import Principal from "./routes/Principal";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Features from "./pages/Features";
import FacultyDashboard from './pages/FacultyDashboard';
import { AuthProvider } from './context/AuthContext';
import AdminDashboard from "./admin/AdminDashboard";

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={ <LandingPage/>} /> 
            <Route path ="/signup" element={<SignUpPage/>}/>
            <Route path="/signin" element={<SignInPage/>} />
            <Route path="/about" element={<About />} />
            <Route path="/admin/*" element={<AdminDashboard/>}/>
            <Route path="/contact" element={<Contact />} />
            <Route path="/features" element={<Features/>} />
            <Route path="/student/*" element={<Student />} />
            <Route path="/faculty/*" element={<Faculty />} />
            <Route path="/hod/*" element={<HOD/>}/>
            <Route path ="/principal/*" element={<Principal /> }/>
            <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
          </Routes>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;