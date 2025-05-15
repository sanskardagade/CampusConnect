const mysql = require('mysql2/promise');
require('dotenv').config();

// Update pool configuration to support Railway MySQL environment variables
let poolConfig;
if (process.env.DATABASE_URL) {
  poolConfig = process.env.DATABASE_URL;
} else if (process.env.MYSQL_URL || process.env.MYSQL_PUBLIC_URL) {
  poolConfig = process.env.MYSQL_URL || process.env.MYSQL_PUBLIC_URL;
} else {
  // Build config from individual environment variables only (no hardcoded defaults)
  poolConfig = {
    host: process.env.MYSQLHOST || process.env.MYSQL_HOST || process.env.DB_HOST,
    port: Number(process.env.MYSQLPORT || process.env.MYSQL_PORT || process.env.DB_PORT),
    user: process.env.MYSQLUSER || process.env.MYSQL_USER || process.env.DB_USER,
    password: process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD,
    database: process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };
}
console.log("Database configuration:", typeof poolConfig === 'string' ? poolConfig : `host=${poolConfig.host}, database=${poolConfig.database}`);
const pool = mysql.createPool(poolConfig);

module.exports = pool;


