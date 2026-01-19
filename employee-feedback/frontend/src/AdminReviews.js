import React, { useEffect, useState } from "react";

function AdminReviews() {
  var [employeeList, setEmployeeList] = useState([]);
  var [selectedEmployee, setSelectedEmployee] = useState("");
  var [selectedReviewers, setSelectedReviewers] = useState([]);
  var [reviewList, setReviewList] = useState([]);

  function loadEmployees() {
    fetch("http://localhost:5000/employees")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        setEmployeeList(data);
      });
  }
  function loadReviews() {
    fetch("http://localhost:5000/admin/reviews")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        setReviewList(data);
      });
  }
  useEffect(function () {
    loadEmployees();
    loadReviews();
  }, []);
  function employeeChanged(e) {
    setSelectedEmployee(e.target.value);
    setSelectedReviewers([]);
  }
  function toggleReviewer(id) {
    var found = false;
    for (var i = 0; i < selectedReviewers.length; i++) {
      if (selectedReviewers[i] === id) {
        found = true;
        break;
      }
    }
    if (found) {
      var temp = [];
      for (var j = 0; j < selectedReviewers.length; j++) {
        if (selectedReviewers[j] !== id) {
          temp.push(selectedReviewers[j]);
        }
      }
      setSelectedReviewers(temp);
    } else {
      var copy = selectedReviewers.slice();
      copy.push(id);
      setSelectedReviewers(copy);
    }
  }
  function assignReview() {
    if (selectedEmployee === "") {
      alert("Select employee");
      return;
    }
    if (selectedReviewers.length === 0) {
      alert("Select reviewers");
      return;
    }
    fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        employeeId: parseInt(selectedEmployee),
        reviewers: selectedReviewers
      })
    }).then(function () {
      alert("Review assigned");
      setSelectedEmployee("");
      setSelectedReviewers([]);
      loadReviews();
    });
  }
  var reviewerUI = [];
  for (var a = 0; a < employeeList.length; a++) {
    var emp = employeeList[a];
    if (emp.id !== parseInt(selectedEmployee)) {
      reviewerUI.push(
        <div key={emp.id}>
          <input
            type="checkbox"
            checked={selectedReviewers.indexOf(emp.id) !== -1}
            onChange={function (id) {
              return function () {
                toggleReviewer(id);
              };
            }(emp.id)}
          />
          {emp.name}
        </div>
      );
    }
  }
  var reviewUI = [];
  for (var b = 0; b < reviewList.length; b++) {
    var review = reviewList[b];
    var empName = "Unknown";
    for (var x = 0; x < employeeList.length; x++) {
      if (employeeList[x].id === review.employeeId) {
        empName = employeeList[x].name;
        break;
      }
    }
    var reviewerNames = [];
    if (review.reviewers) {
      for (var y = 0; y < review.reviewers.length; y++) {
        for (var z = 0; z < employeeList.length; z++) {
          if (employeeList[z].id === review.reviewers[y]) {
            reviewerNames.push(employeeList[z].name);
          }
        }
      }
    }
    reviewUI.push(
      <div key={review.id} className="card">
        <p><b>Employee:</b> {empName}</p>
        <p><b>Reviewers:</b> {reviewerNames.length > 0 ? reviewerNames.join(", ") : "None"}</p>
        <b>Feedback:</b>
        {review.feedbacks && review.feedbacks.length > 0 ? (
          review.feedbacks.map(function (fb, i) {
            return <p key={i}>{fb.comment}</p>;
          })
        ) : (
          <p>No feedback yet</p>
        )}
      </div>
    );
  }
  return (
    <div className="container">
      <h2>Assign Review</h2>
      <select value={selectedEmployee} onChange={employeeChanged}>
        <option value="">Select Employee</option>
        {employeeList.map(function (e) {
          return (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          );
        })}
      </select>
      <h4>Select Reviewers</h4>
      {reviewerUI}
      <br />
      <button onClick={assignReview}>Assign</button>
      <h3>All Reviews</h3>
      {reviewUI}
    </div>
  );
}
export default AdminReviews;