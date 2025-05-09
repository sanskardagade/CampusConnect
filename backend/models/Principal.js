// Temporary in-memory model for principal login
const principals = [
  {
    erpid: 12321,
    password: 'Principal@123',
    name: 'Principal',
    department: 'Administration'
  }
];

/**
 * Find principal record by ERP ID
 * @param {string|number} erpid
 */
const findByErp = async (erpid) => {
  const id = Number(erpid);
  const principal = principals.find(p => p.erpid === id);
  if (!principal) return null;
  return {
    erpid: principal.erpid,
    password: principal.password,
    name: principal.name,
    department: principal.department
  };
};

/**
 * Compare provided password with stored password
 * @param {string} password
 * @param {string} storedPassword
 */
const comparePassword = (password, storedPassword) => {
  return password === storedPassword;
};

module.exports = {
  findByErp,
  comparePassword
}; 