const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
// const fb = require('./config/firebaseAdmin.js'); // Uncomment only if needed

// Load environment variables
dotenv.config();

const app = express();

// ✅ Allowed origins for CORS
const allowedOrigins = [
  'https://campus-link-hieg.vercel.app',
  'https://campusconnect07.netlify.app'
];

// ✅ Updated CORS options
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy does not allow access from origin ${origin}`));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
};

// ✅ Use CORS middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests

// Middleware to parse JSON
app.use(express.json());

// ✅ Import routes
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const facultyRoutes = require('./routes/faculty');

// ✅ Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/faculty', facultyRoutes);

// Optional: Sample route to verify server is running
app.get('/', (req, res) => {
  res.send('Campus Connect backend is live! ✅');
});

// ❌ Firebase route commented unless needed
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

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// ✅ Connect to MySQL and start the server
(async () => {
  try {
    await db.getConnection();
    console.log('✅ Connected to MySQL');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ MySQL connection error:', err);
    process.exit(1);
  }
})();



// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const db = require('./config/db');
// // Commenting out Firebase Admin import as it's not needed
// // const fb = require('./config/firebaseAdmin.js');

// // Load environment variables
// dotenv.config();

// const app = express();

// // Middleware
// const allowedOrigins = [
//   'https://campus-link-hieg.vercel.app',
//   'https://campusconnect07.netlify.app'
// ];
// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error(`CORS policy does not allow access from origin ${origin}`));
//     }
//   },
//   credentials: true
// }));
// app.use(express.json());

// // Import routes
// const authRoutes = require('./routes/auth');
// const studentRoutes = require('./routes/student');
// const facultyRoutes = require('./routes/faculty');

// // Use routes
// app.use('/api/auth', authRoutes);
// app.use('/api/student', studentRoutes);
// app.use('/api/faculty', facultyRoutes);

// // Comment out Firebase admin route since it's not needed
// // app.get('/api/hod/divisions', async (req, res) => {
// //   try {
// //     const snapshot = await fb.ref("faculty_log").once("value");
// //     const data = snapshot.val();
// //     console.log("Successfully fetched faculty logs:", JSON.stringify(data, null, 2));
// //     res.json(data || []);
// //   } catch (error) {
// //     console.error("Detailed error in /divisions route:", error);
// //     res.status(500).json({ message: "Error fetching all faculty logs" });
// //   }
// // });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!' });
// });

// // Connect to MySQL and start server
// (async () => {
//   try {
//     await db.getConnection();
//     console.log('✅ Connected to MySQL');
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error('MySQL connection error:', err);
//     process.exit(1);
//   }
// })();


