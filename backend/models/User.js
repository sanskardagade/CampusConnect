const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Map DB row to JS object
const mapUser = (row) => ({
  id: row.id,
  username: row.username,
  name: row.name,
  email: row.email,
  role: row.role,
  department: row.department,
  contactNo: row.contact_no,
  facultyId: row.faculty_id,
  subjects: row.subjects ? JSON.parse(row.subjects) : [],
  assignedClasses: row.assigned_classes ? JSON.parse(row.assigned_classes) : [],
  hodId: row.hod_id,
  departmentManaged: row.department_managed,
  principalId: row.principal_id,
  departmentsUnderManagement: row.departments_under_management
    ? JSON.parse(row.departments_under_management)
    : [],
  password_hash: row.password_hash,
});

const findByEmail = async (email) => {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE email = ? LIMIT 1',
    [email]
  );
  if (!rows[0]) return null;
  return mapUser(rows[0]);
};

const findByUsername = async (username) => {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE username = ? LIMIT 1',
    [username]
  );
  if (!rows[0]) return null;
  return mapUser(rows[0]);
};

const findByFacultyId = async (facultyId) => {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE faculty_id = ? LIMIT 1',
    [facultyId]
  );
  if (!rows[0]) return null;
  return mapUser(rows[0]);
};

const findByHodId = async (hodId) => {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE hod_id = ? LIMIT 1',
    [hodId]
  );
  if (!rows[0]) return null;
  return mapUser(rows[0]);
};

const findByPrincipalId = async (principalId) => {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE principal_id = ? LIMIT 1',
    [principalId]
  );
  if (!rows[0]) return null;
  return mapUser(rows[0]);
};

const create = async ({
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
  departmentsUnderManagement,
}) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const [result] = await db.query(
    `INSERT INTO users
      (username, name, email, password_hash, role, contact_no, department,
       faculty_id, subjects, assigned_classes,
       hod_id, department_managed,
       principal_id, departments_under_management)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      username,
      name,
      email,
      passwordHash,
      role,
      contactNo,
      department,
      facultyId || null,
      JSON.stringify(subjects || []),
      JSON.stringify(assignedClasses || []),
      hodId || null,
      departmentManaged || null,
      principalId || null,
      JSON.stringify(departmentsUnderManagement || []),
    ]
  );

  return {
    id: result.insertId,
    username,
    name,
    email,
    role,
    contactNo,
    department,
    facultyId,
    subjects,
    assignedClasses,
    hodId,
    departmentManaged,
    principalId,
    departmentsUnderManagement,
  };
};

const comparePassword = async (password, passwordHash) => {
  return bcrypt.compare(password, passwordHash);
};

module.exports = {
  findByEmail,
  findByUsername,
  create,
  comparePassword,
  findByFacultyId,
  findByHodId,
  findByPrincipalId,
}; 