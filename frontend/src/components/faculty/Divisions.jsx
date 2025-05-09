import React, { useEffect, useState } from "react";

const Divisions = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/faculty/divisions") // Updated backend route
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Faculty Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name}</li> // Adjust based on your data structure
        ))}
      </ul>
    </div>
  )
}

export default Divisions;
