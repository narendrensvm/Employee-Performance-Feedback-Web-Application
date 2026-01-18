import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const navigate = useNavigate();

  useEffect(function() {
    fetch("http://localhost:5000/employees")
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        setEmployees(data);
      })
      .catch(function(err) {
        console.log("Error:", err);
      });
  }, []);
  function login() {
    if (selectedEmployee === "") {
      alert("Please select an employee");
      return;
    }
    localStorage.setItem("employeeId", selectedEmployee);
    navigate("/employee");
  }
  var options = [];
  for (var i = 0; i < employees.length; i++) {
    options.push(
      <option key={employees[i].id} value={employees[i].id}>
        {employees[i].name}
      </option>
    );
  }
  return (
    <div className="container">
      <h2>Employee Login</h2>
      <div className="form-group">
        <label htmlFor="employee-select">Select Employee</label>
        <select id="employee-select" onChange={function(e) { setSelectedEmployee(e.target.value); }}>
          <option value="">Select Employee</option>
          {options}
        </select>
      </div>
      <button className="btn" onClick={login}>Login</button>
    </div>
  );
}
export default Login;