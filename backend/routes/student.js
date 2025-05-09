const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

// Register a new student
router.post('/register', async (req, res) => {
  try {
    const { erpid, name, email, password, department, semester } = req.body;

    // Check if student already exists by erpid or email
    let existingStudent = await Student.findByErp(erpid);
    if (!existingStudent) {
      existingStudent = await Student.findByEmail(email);
    }
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    // Create new student
    const newStudent = await Student.create({ erpid, name, email, password, department, semester });

    // Create JWT token
    const token = jwt.sign(
      { id: newStudent.id, erpid: newStudent.erpid, role: 'student' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return student data and token
    res.status(201).json({
      token,
      user: {
        id: newStudent.id,
        erpid: newStudent.erpid,
        name: newStudent.name,
        email: newStudent.email,
        role: 'student',
        department: newStudent.department,
        semester: newStudent.semester
      }
    });
  } catch (error) {
    console.error('Student registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login student
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find student by erpid
    const student = await Student.findByErp(username);
    if (!student) {
      return res.status(401).json({ message: 'Student not found' });
    }

    // Check password
    const isMatch = await Student.comparePassword(password, student.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: student.id, erpid: student.erpid, role: 'student' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return student data and token
    res.json({
      token,
      user: {
        id: student.id,
        erpid: student.erpid,
        name: student.name,
        email: student.email,
        role: 'student',
        department: student.department,
        semester: student.semester
      }
    });
  } catch (error) {
    console.error('Student login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 