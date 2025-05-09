const axios = require('axios');

// Base URL for API
const API_URL = 'http://localhost:5000/api';

// Test data for registration
const testUser = {
  username: 'testuser',
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123', // At least 6 characters
  role: 'class-teacher',
  contactNo: '1234567890',
  department: 'computer_science', // Required field
  facultyId: 'FAC001',
  subjects: ['DSA', 'SE', 'MP'],
  assignedClasses: ['SE Computer A']
};

// Function to test registration
async function testRegistration() {
  try {
    console.log('Testing registration...');
    const response = await axios.post(`${API_URL}/auth/register`, testUser);
    console.log('Registration successful:', response.data);
    return response.data.token;
  } catch (error) {
    console.error('Registration failed:', error.response ? error.response.data : error.message);
    return null;
  }
}

// Function to test login
async function testLogin() {
  try {
    console.log('Testing login...');
    const response = await axios.post(`${API_URL}/auth/login`, {
      username: testUser.username,
      password: testUser.password
    });
    console.log('Login successful:', response.data);
    return response.data.token;
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    return null;
  }
}

// Function to test attendance data upload
async function testAttendanceUpload(token) {
  try {
    console.log('Testing attendance upload...');
    
    // Sample attendance data in the format you provided
    const attendanceData = {
      data: [
        {
          "Dr. D. Y. Patil Institute of Technology, Pimpri, Pune - 411 018": "Department of Computer Engineering"
        },
        {
          "Dr. D. Y. Patil Institute of Technology, Pimpri, Pune - 411 018": "Monthly Attendance Report"
        },
        {
          "Dr. D. Y. Patil Institute of Technology, Pimpri, Pune - 411 018": "From 1/01/2025  to  26/4/2025"
        },
        {
          "Dr. D. Y. Patil Institute of Technology, Pimpri, Pune - 411 018": "Academic Year: 2024-25 SEM- II",
          "Column17": "         Class : SE Computer A div"
        },
        null,
        null,
        {
          "Dr. D. Y. Patil Institute of Technology, Pimpri, Pune - 411 018": "Sr. No",
          "Column2": "Roll Number",
          "Column3": "Name of Subject",
          "Column4": "M-III",
          "Column6": "DSA",
          "Column8": "SE",
          "Column10": "MP",
          "Column12": "PPL",
          "Column14": "CoC",
          "Column16": "DSAL",
          "Column18": "ML",
          "Column20": "PBL",
          "Column22": "Total TH %",
          "Column23": "Total PR %",
          "Column24": "Average Attendance"
        },
        {
          "Column3": "Faculty Initial",
          "Column4": "AN",
          "Column6": "RM",
          "Column8": "PP",
          "Column10": "BS",
          "Column12": "AS",
          "Column14": "PC",
          "Column16": "RM, AS",
          "Column18": "BS",
          "Column20": "BS,TD, RM"
        },
        {
          "Column3": "No of Lectures/Practical Turns Conducted",
          "Column5": "%",
          "Column6": 36,
          "Column7": "%",
          "Column9": "%",
          "Column10": 42,
          "Column11": "%",
          "Column12": 39,
          "Column13": "%",
          "Column15": "%",
          "Column16": "S1=23,S2=18, S3:=18",
          "Column17": "%",
          "Column18": "S1=6,S2=7,S3=6",
          "Column19": "%",
          "Column20": "S1: RD=6,S2:BS=13,S3: RM= 6 , TD - 8 & SS=7",
          "Column21": "%",
          "Column24": "%"
        },
        {
          "Dr. D. Y. Patil Institute of Technology, Pimpri, Pune - 411 018": 1,
          "Column2": "SCOA01",
          "Column3": "ALISHA SHEIKH",
          "Column4": 40,
          "Column5": 85.10638298,
          "Column6": 31,
          "Column7": 86.11111111,
          "Column10": 35,
          "Column11": 83.33333333,
          "Column12": 36,
          "Column13": 92.30769231,
          "Column16": 20,
          "Column17": 86.95652174,
          "Column22": 57.80975329,
          "Column23": 86.95652174,
          "Column24": 72.38313751
        }
      ],
      academicYear: "2024-25",
      semester: "SEM-II",
      class: "SE Computer A",
      month: "April",
      year: 2025
    };

    const response = await axios.post(
      `${API_URL}/attendance/upload`, 
      attendanceData,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    console.log('Attendance upload successful:', response.data);
    return true;
  } catch (error) {
    console.error('Attendance upload failed:', error.response ? error.response.data : error.message);
    return false;
  }
}

// Function to test attendance data retrieval
async function testAttendanceRetrieval(token) {
  try {
    console.log('Testing attendance retrieval...');
    const response = await axios.get(
      `${API_URL}/attendance/SE Computer A?month=April&year=2025`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    console.log('Attendance retrieval successful:', response.data);
    return true;
  } catch (error) {
    console.error('Attendance retrieval failed:', error.response ? error.response.data : error.message);
    return false;
  }
}

// Main function to run all tests
async function runTests() {
  console.log('Starting API tests...');
  
  // Test registration
  const token = await testRegistration();
  
  if (token) {
    // Test attendance upload
    await testAttendanceUpload(token);
    
    // Test attendance retrieval
    await testAttendanceRetrieval(token);
  } else {
    // If registration failed, try login
    const loginToken = await testLogin();
    
    if (loginToken) {
      // Test attendance upload
      await testAttendanceUpload(loginToken);
      
      // Test attendance retrieval
      await testAttendanceRetrieval(loginToken);
    }
  }
  
  console.log('API tests completed.');
}

// Run the tests
runTests(); 