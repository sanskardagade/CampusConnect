const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Faculty = require('../models/Faculty');
const Hod = require('../models/Hod');

// Register a new user (class teacher, HOD, or principal)
router.post('/register', async (req, res) => {
  try {
    const { 
      username, 
      name, 
      email, 
      password, 
      role, 
      contactNo, 
      department,
      facultyId,
      subjects,
      assignedClasses,
      hodId,
      departmentManaged,
      principalId,
      departmentsUnderManagement
    } = req.body;

    // Check if user already exists by username or email
    let existingUser = await User.findByUsername(username);
    if (!existingUser) {
      existingUser = await User.findByEmail(email);
    }
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = await User.create({
      username,
      name,
      email,
      password,
      role,
      contactNo,
      department,
      facultyId,
      subjects,
      assignedClasses,
      hodId,
      departmentManaged,
      principalId,
      departmentsUnderManagement
    });

    // Create JWT token
    const token = jwt.sign(
      { 
        id: newUser.id,
        role: newUser.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user data and token
    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        department: newUser.department,
        ...(role === 'faculty' && {
          facultyId: newUser.facultyId,
          subjects: newUser.subjects,
          assignedClasses: newUser.assignedClasses
        }),
        ...(role === 'hod' && {
          hodId: newUser.hodId,
          departmentManaged: newUser.departmentManaged
        }),
        ...(role === 'principal' && {
          principalId: newUser.principalId,
          departmentsUnderManagement: newUser.departmentsUnderManagement
        })
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Faculty login: authenticate against faculty table
    if (role === 'faculty') {
      const facultyRec = await Faculty.findByErpStaffId(username);
      if (!facultyRec) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const isMatchFaculty = await Faculty.comparePassword(password, facultyRec.passwordHash);
      if (!isMatchFaculty) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      // Create JWT token for faculty
      const token = jwt.sign(
        { id: facultyRec.erpStaffId, role: 'faculty' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      // Return faculty data and token
      return res.json({
        token,
        user: {
          id: facultyRec.erpStaffId,
          erpStaffId: facultyRec.erpStaffId,
          name: facultyRec.staffName,
          branch: facultyRec.branch,
          role: 'faculty'
        }
      });
    }

    // HOD login: authenticate against HOD table
    if (role === 'hod') {
      const hodRec = await Hod.findByErpStaffId(username);
      if (!hodRec) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const isMatchHod = await Hod.comparePassword(password, hodRec.passwordHash);
      if (!isMatchHod) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign(
        { id: hodRec.erpStaffId, role: 'hod' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      return res.json({
        token,
        user: {
          id: hodRec.erpStaffId,
          erpStaffId: hodRec.erpStaffId,
          name: hodRec.staffName,
          branch: hodRec.branch,
          role: 'hod'
        }
      });
    }

    // Find user based on their role and provided ID
    let user;
    if (role === 'principal') {
      user = await User.findByPrincipalId(username);
    } else {
      user = await User.findByUsername(username);
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await User.comparePassword(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        id: user.id,
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user data and token
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        ...(user.role === 'faculty' && {
          facultyId: user.facultyId,
          subjects: user.subjects,
          assignedClasses: user.assignedClasses
        }),
        ...(user.role === 'hod' && {
          hodId: user.hodId,
          departmentManaged: user.departmentManaged
        }),
        ...(user.role === 'principal' && {
          principalId: user.principalId,
          departmentsUnderManagement: user.departmentsUnderManagement
        })
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 