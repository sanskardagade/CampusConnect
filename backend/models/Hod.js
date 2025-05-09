const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Lookup HOD record by ERP Staff ID
const findByErpStaffId = async (erpStaffId) => {
  const [rows] = await db.query(
    'SELECT * FROM hod WHERE ErpStaffID = ? LIMIT 1',
    [erpStaffId]
  );
  if (!rows[0]) return null;
  const row = rows[0];
  return {
    erpStaffId: row.ErpStaffID,
    staffName: row.StaffName,
    branch: row.branch,
    passwordHash: row.password
  };
};

// Compare provided password with stored plain-text password
const comparePassword = async (password, passwordHash) => {
  return password === passwordHash;
};

module.exports = {
  findByErpStaffId,
  comparePassword,
}; 