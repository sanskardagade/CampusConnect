const mysql = require('mysql2/promise');
require('dotenv').config();

// Update pool configuration to support Railway MySQL environment variables
let poolConfig;
if (process.env.MYSQL_URL || process.env.MYSQL_PUBLIC_URL) {
  poolConfig = process.env.MYSQL_URL || process.env.MYSQL_PUBLIC_URL;
} else {
  poolConfig = {
    host: process.env.MYSQLHOST || process.env.MYSQL_HOST || process.env.DB_HOST || 'localhost',
    port: Number(process.env.MYSQLPORT || process.env.MYSQL_PORT || process.env.DB_PORT || 3306),
    user: process.env.MYSQLUSER || process.env.MYSQL_USER || process.env.DB_USER || 'root',
    password: process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || process.env.MYSQL_ROOT_PASSWORD || 'Sd@7498181120',
    database: process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || process.env.DB_NAME || 'collegeattendance',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };
}
const pool = mysql.createPool(poolConfig);

module.exports = pool;


