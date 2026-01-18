import React, { useState, useEffect } from "react";

function AdminReviews() {
  var [employees, setEmployees] = useState([]);
  var [selectedEmployee, setSelectedEmployee] = useState("");
  var [selectedReviewers, setSelectedReviewers] = useState([]);
  var [reviews, setReviews] = useState([]);

  function loadEmployees() {
    fetch("http://localhost:5000/employees")
      .then(function(res) { return res.json(); })
      .then(function(data) { setEmployees(data || []); })
      .catch(function(err) { console.log("Error loading employees:", err); });
  }
  function loadReviews() {
    fetch("http://localhost:5000/admin/reviews")
      .then(function(res) { return res.json(); })
      .then(function(data) { setReviews(data || []); })
      .catch(function(err) { console.log("Error loading reviews:", err); });
  }
  useEffect(function() {
    loadEmployees();
    loadReviews();
  }, []);

  function handleEmployeeSelect(e) {
    setSelectedEmployee(e.target.value);
    setSelectedReviewers([]);
  }
  function toggleReviewer(reviewerId) {
    var found = false;
    for (var j = 0; j < selectedReviewers.length; j++) {
      if (selectedReviewers[j] === reviewerId) {
        found = true;
        break;
      }
    }
    var updatedReviewers = [];
    if (found) {
      for (var k = 0; k < selectedReviewers.length; k++) {
        if (selectedReviewers[k] !== reviewerId) {
          updatedReviewers.push(selectedReviewers[k]);
        }
      }
    } else {
      updatedReviewers = selectedReviewers.slice();
      updatedReviewers.push(reviewerId);
    }
    setSelectedReviewers(updatedReviewers);
  }
  function createReview() {
    if (selectedEmployee === "") {
      alert("Please select an employee");
      return;
    }
    if (selectedReviewers.length === 0) {
      alert("Please select at least one reviewer");
      return;
    }

    fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        employeeId: parseInt(selectedEmployee),
        reviewers: selectedReviewers
      })
    })
      .then(function() {
        alert("Review created successfully!");
        setSelectedEmployee("");
        setSelectedReviewers([]);
        loadReviews();
      })
      .catch(function(err) {
        console.log("Error creating review:", err);
      });
  }
  var reviewerElements = [];
  for (var m = 0; m < employees.length; m++) {
    var empItem = employees[m];
    if (empItem.id !== parseInt(selectedEmployee)) {
      // Save a copy of empItem for closure
      (function(empCopy) {
        reviewerElements.push(
          <div key={empCopy.id} className="checkbox-group">
            <input
              type="checkbox"
              checked={selectedReviewers.indexOf(empCopy.id) !== -1}
              onChange={function() { toggleReviewer(empCopy.id); }}
            />
            {empCopy.name}
          </div>
        );
      })(empItem);
    }
  }
  var reviewElements = [];
  for (var n = 0; n < reviews.length; n++) {
    var r = reviews[n];
    var feedbackElements = [];
    if (r.feedbacks && r.feedbacks.length > 0) {
      for (var p = 0; p < r.feedbacks.length; p++) {
        var f = r.feedbacks[p];
        feedbackElements.push(
          <p key={f.reviewId + "-" + f.fromEmployee}>
            From {f.fromName || "Unknown"}: {f.comment || "-"}
          </p>
        );
      }
    } else {
      feedbackElements.push(
        <p key={"nofeedback" + r.id}>
          No feedback yet - Reviewers need to login and submit feedback
        </p>
      );
    }
    reviewElements.push(
      <div
        key={r.id}
        className="card"
      >
        <p><strong>Employee Reviewed:</strong> {r.employeeName || "N/A"}</p>
        <p><strong>Reviewers:</strong> {(r.reviewerNames || []).join(", ") || "None"}</p>
        <p><strong>Feedback:</strong></p>
        {feedbackElements}
      </div>
    );
  }
  return (
    <div className="container">
      <h2>Assign Performance Review</h2>
      <div className="form-group">
        <label htmlFor="employee-select">Select Employee</label>
        <select id="employee-select" value={selectedEmployee} onChange={handleEmployeeSelect}>
          <option value="">Select Employee</option>
          {employees.map(function(emp) {
            return <option key={emp.id} value={emp.id}>{emp.name}</option>;
          })}
        </select>
      </div>
      <h4>Assign Reviewers</h4>
      {reviewerElements}
      <br />
      <button className="btn" onClick={createReview}>Assign Review</button>
      <h3>All Reviews</h3>
      <button className="btn" onClick={loadReviews}>Refresh Reviews</button>
      {reviews.length === 0 && <p>No reviews yet</p>}
      {reviewElements}
    </div>
  );
}
export default AdminReviews;