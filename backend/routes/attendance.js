const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const User = require('../models/User');
const auth = require('../middleware/auth');
const ExcelJS = require('exceljs');

// Helper function to process attendance data
const processAttendanceData = (data) => {
    console.log('Processing attendance data...');
    
    // Extract subjects and their details
    const subjectRow = data.find(row => row['Column3'] === 'Name of Subject');
    const facultyRow = data.find(row => row['Column3'] === 'Faculty Initial');
    const lectureRow = data.find(row => row['Column3'] === 'No of Lectures/Practical Turns Conducted');
    
    const subjects = [];
    
    if (subjectRow) {
        console.log('Found subject row:', subjectRow);
        Object.keys(subjectRow).forEach(key => {
            if (key.startsWith('Column') && subjectRow[key]) {
                const subjectName = subjectRow[key];
                const facultyInitial = facultyRow ? facultyRow[key] : '';
                const lectures = lectureRow ? lectureRow[key] : '';
                
                if (subjectName && subjectName !== 'Name of Subject') {
                    subjects.push({
                        name: subjectName,
                        facultyInitial: facultyInitial,
                        totalLectures: lectures
                    });
                }
            }
        });
    }
    
    console.log('Extracted subjects:', subjects);
    
    // Extract student data
    const students = [];
    
    data.forEach(row => {
        if (row['Column2'] && row['Column2'].startsWith('SCO')) {
            console.log('Processing student:', row['Column2'], row['Column3']);
            
            const student = {
                rollNumber: row['Column2'],
                name: row['Column3'],
                attendance: [],
                totalTheoryPercentage: row['Column22'] || 0,
                totalPracticalPercentage: row['Column23'] || 0,
                averageAttendance: row['Column24'] || 0
            };
            
            // Map subject attendance
            subjects.forEach(subject => {
                // Find the column for this subject
                const subjectColumn = Object.keys(row).find(key => 
                    row[key] === subject.name
                );
                
                if (subjectColumn) {
                    // Get the attendance value (next column)
                    const attendanceColumn = Object.keys(row).find(key => {
                        const colNum = parseInt(key.replace('Column', ''));
                        const subjectColNum = parseInt(subjectColumn.replace('Column', ''));
                        return colNum === subjectColNum + 1;
                    });
                    
                    // Get the percentage value (next column after attendance)
                    const percentageColumn = Object.keys(row).find(key => {
                        const colNum = parseInt(key.replace('Column', ''));
                        const attendanceColNum = parseInt(attendanceColumn.replace('Column', ''));
                        return colNum === attendanceColNum + 1;
                    });
                    
                    if (attendanceColumn && percentageColumn) {
                        student.attendance.push({
                            subject: subject.name,
                            theoryAttendance: row[attendanceColumn] || 0,
                            theoryPercentage: row[percentageColumn] || 0,
                            practicalAttendance: 0, // Default value
                            practicalPercentage: 0  // Default value
                        });
                    }
                }
            });
            
            students.push(student);
        }
    });
    
    console.log('Extracted students:', students.length);
    
    return { subjects, students };
};

// Upload attendance data
router.post('/upload', auth, async (req, res) => {
    try {
        console.log('Received attendance upload request');
        const { data, academicYear, semester, class: className, month, year } = req.body;
        
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ message: 'Invalid data format' });
        }
        
        console.log('Processing data for class:', className);
        
        // Process the raw data
        const { subjects, students } = processAttendanceData(data);
        
        if (subjects.length === 0 || students.length === 0) {
            return res.status(400).json({ message: 'No valid subjects or students found in data' });
        }
        
        // Create new attendance record
        const attendance = new Attendance({
            academicYear,
            semester,
            class: className,
            month,
            year,
            subjects,
            students
        });
        
        console.log('Saving attendance record...');
        await attendance.save();
        console.log('Attendance record saved successfully');
        
        res.status(201).json({ message: 'Attendance data uploaded successfully', attendance });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get attendance data with role-based access
router.get('/:class', auth, async (req, res) => {
    try {
        const { class: className } = req.params;
        const { month, year } = req.query;
        const user = await User.findById(req.user.id);

        let query = { class: className };
        if (month && year) {
            query.month = month;
            query.year = parseInt(year);
        }

        // Role-based access control
        if (user.role === 'class-teacher') {
            if (!user.assignedClasses.includes(className)) {
                return res.status(403).json({ message: 'Access denied' });
            }
        } else if (user.role === 'hod') {
            const classDepartment = className.split(' ')[1]; // Assuming format: "SE Computer A"
            if (user.departmentManaged.toLowerCase() !== classDepartment.toLowerCase()) {
                return res.status(403).json({ message: 'Access denied' });
            }
        }

        const attendance = await Attendance.find(query).sort({ year: -1, month: -1 });
        res.json(attendance);
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Download monthly report
router.get('/download/:class', auth, async (req, res) => {
    try {
        const { class: className } = req.params;
        const { month, year } = req.query;
        const user = await User.findById(req.user.id);

        // Role-based access control
        if (user.role === 'class-teacher') {
            if (!user.assignedClasses.includes(className)) {
                return res.status(403).json({ message: 'Access denied' });
            }
        } else if (user.role === 'hod') {
            const classDepartment = className.split(' ')[1];
            if (user.departmentManaged.toLowerCase() !== classDepartment.toLowerCase()) {
                return res.status(403).json({ message: 'Access denied' });
            }
        }

        const attendance = await Attendance.findOne({
            class: className,
            month,
            year: parseInt(year)
        });

        if (!attendance) {
            return res.status(404).json({ message: 'Attendance data not found' });
        }

        // Create Excel workbook
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Attendance Report');

        // Add headers
        worksheet.addRow(['Roll Number', 'Name', ...attendance.subjects.map(s => s.name), 'Total Theory %', 'Total Practical %', 'Average Attendance']);

        // Add student data
        attendance.students.forEach(student => {
            worksheet.addRow([
                student.rollNumber,
                student.name,
                ...attendance.subjects.map(s => {
                    const subjectAttendance = student.attendance.find(a => a.subject === s.name);
                    return subjectAttendance ? subjectAttendance.theoryPercentage : '';
                }),
                student.totalTheoryPercentage,
                student.totalPracticalPercentage,
                student.averageAttendance
            ]);
        });

        // Set response headers
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=attendance_${className}_${month}_${year}.xlsx`);

        // Write to response
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Download error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 