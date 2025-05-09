const express = require('express');
const router = express.Router();
const  authenticateToken  = require('../middleware/auth');
const Faculty = require('../models/Faculty');
// Removed Course, Student, stressdata imports; not needed for login/logout stats
const fb = require("../config/firebaseAdmin.js");


// Get faculty dashboard data
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    // Load faculty record by ERP Staff ID
    const erpStaffId = req.user.id;
    const facultyRec = await Faculty.findByErpStaffId(erpStaffId);
    if (!facultyRec) {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    const { staffName: name, branch } = facultyRec;

    // Fetch login/logout stats from Firebase Realtime Database
    const snapshot = await fb.ref('faculty_log').once('value');
    const allLogs = snapshot.val() || {};
    // Normalize staffName to find matching Firebase key
    const normalizedName = name.toLowerCase().replace(/[^\w\s]/g, '');
    const firebaseKey = Object.keys(allLogs).find(key => {
      const normalizedKey = key.replace(/_/g, ' ').toLowerCase().replace(/[^\w\s]/g, '');
      return normalizedKey === normalizedName;
    });
    const userLogs = firebaseKey && allLogs[firebaseKey] ? allLogs[firebaseKey] : {};

    // Return faculty info and logs only
    res.json({ name, branch, logs: userLogs });
  } catch (error) {
    console.error('Error fetching faculty dashboard data:', error);
    res.status(500).json({ message: 'Error fetching faculty dashboard data' });
  }
});

// router.get('/divisions', async (req, res) => {
//   console.log("=== DIVISIONS ROUTE HIT ===");
//   console.log("Request received at:", new Date().toISOString());
//   console.log("Request headers:", req.headers);
//   try {
//       console.log("Attempting to fetch faculty_log from Realtime Database...");
//       const snapshot = await fb.ref("faculty_log").once("value");
//       const data = snapshot.val();
//       console.log("Successfully fetched faculty logs:", data);
//       res.json(data || []); // Return empty array if data is null
//   } catch (error) {
//       console.error("Detailed error in /divisions route:", error);
//       res.status(500).json({ message: "Error fetching all faculty logs" });
//   }
// });


module.exports = router; 