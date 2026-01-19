import { useEffect, useState } from "react";

function AdminEmployees() {
  const [name, setName] = useState("");
  const [employees, setEmployees] = useState([]);
  const [editId, setEditId] = useState(null);

  function load() {
    fetch("http://localhost:5000/employees")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        setEmployees(data);
      });
  }
  useEffect(function () {
    load();
  }, []);
  function addEmployee() {
    if (!name) return;
    fetch("http://localhost:5000/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name })
    }).then(function () {
      setName("");
      load();
    });
  }
  function removeEmployee(id) {
    fetch("http://localhost:5000/employees/" + id, {
      method: "DELETE"
    }).then(function () {
      load();
    });
  }
  function startEdit(emp) {
    setName(emp.name);
    setEditId(emp.id);
  }
  function updateEmployee() {
    if (!name || !editId) return;

    fetch("http://localhost:5000/employees/" + editId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name })
    }).then(function () {
      setName("");
      setEditId(null);
      load();
    });
  }
  return (
    <div className="container">
      <h2>Admin - Employees</h2>

      <div className="form-group">
        <label>Employee Name</label>
        <input
          value={name}
          onChange={function (e) {
            setName(e.target.value);
          }}
        />
      </div>
      {editId ? (
        <button className="btn" onClick={updateEmployee}>
          Update
        </button>
      ) : (
        <button className="btn" onClick={addEmployee}>
          Add
        </button>
      )}
      <ul>
        {employees.map(function (e) {
          return (
            <li key={e.id}>
              {e.name}
              <button
                className="btn"
                onClick={function () {
                  startEdit(e);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={function () {
                  removeEmployee(e.id);
                }}
              >
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default AdminEmployees;