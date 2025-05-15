const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
// Commenting out Firebase Admin import as it's not needed
// const fb = require('./config/firebaseAdmin.js');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const facultyRoutes = require('./routes/faculty');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/faculty', facultyRoutes);

// Comment out Firebase admin route since it's not needed
// app.get('/api/hod/divisions', async (req, res) => {
//   try {
//     const snapshot = await fb.ref("faculty_log").once("value");
//     const data = snapshot.val();
//     console.log("Successfully fetched faculty logs:", JSON.stringify(data, null, 2));
//     res.json(data || []);
//   } catch (error) {
//     console.error("Detailed error in /divisions route:", error);
//     res.status(500).json({ message: "Error fetching all faculty logs" });
//   }
// });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Connect to MySQL and start server
(async () => {
  try {
    await db.getConnection();
    console.log('✅ Connected to MySQL');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('MySQL connection error:', err);
    process.exit(1);
  }
})();