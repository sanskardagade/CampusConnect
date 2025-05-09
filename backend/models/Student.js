const bcrypt = require('bcryptjs');
const db = require('../config/db');

const mapStudent = (row) => ({
  id: row.id,
  erpid: row.erpid,
  name: row.name,
  email: row.email,
  department: row.department,
  semester: row.semester,
  password_hash: row.password_hash,
});

const findByErp = async (erpid) => {
  const [rows] = await db.query(
    'SELECT * FROM students WHERE erpid = ? LIMIT 1',
    [erpid]
  );
  if (!rows[0]) return null;
  return mapStudent(rows[0]);
};

const findByEmail = async (email) => {
  const [rows] = await db.query(
    'SELECT * FROM students WHERE email = ? LIMIT 1',
    [email]
  );
  if (!rows[0]) return null;
  return mapStudent(rows[0]);
};

const create = async ({ erpid, name, email, password, department, semester }) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const [result] = await db.query(
    'INSERT INTO students (erpid, name, email, password_hash, department, semester) VALUES (?, ?, ?, ?, ?, ?)',
    [erpid, name, email, passwordHash, department, semester]
  );

  return {
    id: result.insertId,
    erpid,
    name,
    email,
    department,
    semester,
  };
};

const comparePassword = async (password, passwordHash) => {
  return bcrypt.compare(password, passwordHash);
};

module.exports = {
  findByErp,
  findByEmail,
  create,
  comparePassword,
}; 