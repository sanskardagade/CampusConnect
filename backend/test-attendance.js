const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Sample attendance data
const sampleData = [
    {
        'Column2': 'SCO123',
        'Column3': 'John Doe',
        'Column4': 'Mathematics',
        'Column5': '15',
        'Column6': '75',
        'Column7': 'Physics',
        'Column8': '12',
        'Column9': '80',
        'Column22': '77.5',
        'Column23': '0',
        'Column24': '77.5'
    },
    {
        'Column2': 'SCO124',
        'Column3': 'Jane Smith',
        'Column4': 'Mathematics',
        'Column5': '14',
        'Column6': '70',
        'Column7': 'Physics',
        'Column8': '11',
        'Column9': '73.3',
        'Column22': '71.65',
        'Column23': '0',
        'Column24': '71.65'
    }
];

const testAttendance = async (token) => {
    try {
        console.log('Testing attendance upload...');
        
        const response = await axios.post(
            `${BASE_URL}/attendance/upload`,
            {
                data: sampleData,
                academicYear: '2023-24',
                semester: '1',
                class: 'SE Computer A',
                month: 'March',
                year: 2024
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        console.log('Upload successful:', response.data);
        
        // Test retrieving the uploaded data
        console.log('\nTesting attendance retrieval...');
        const getResponse = await axios.get(
            `${BASE_URL}/attendance/SE Computer A?month=March&year=2024`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        
        console.log('Retrieval successful:', getResponse.data);
        
    } catch (error) {
        console.error('Test failed:', error.response ? error.response.data : error.message);
    }
};

// First get a token by logging in
const login = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, {
            email: 'test@example.com',
            password: 'password123'
        });
        
        return response.data.token;
    } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        return null;
    }
};

// Run the tests
const runTests = async () => {
    const token = await login();
    if (token) {
        await testAttendance(token);
    }
};

runTests(); 