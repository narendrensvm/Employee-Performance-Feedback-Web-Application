const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

var employees = [];
var reviews = [];
var feedbacks = [];

app.post("/employees", function (req, res) {
  var name = req.body.name;

  if (!name) {
    return res.status(400).json({ message: "Employee name required" });
  }

  var employee = {
    id: Date.now(),
    name: name
  };

  employees.push(employee);
  res.json(employee);
});
app.get("/employees", function (req, res) {
  res.json(employees);
});
app.delete("/employees/:id", function (req, res) {
  var id = parseInt(req.params.id);
  var updated = [];

  for (var i = 0; i < employees.length; i++) {
    if (employees[i].id !== id) {
      updated.push(employees[i]);
    }
  }
  employees = updated;
  res.json({ message: "Employee deleted" });
});
app.post("/reviews", function (req, res) {
  var employeeId = req.body.employeeId;
  var reviewers = req.body.reviewers;
  if (!employeeId || !reviewers || reviewers.length === 0) {
    return res.status(400).json({ message: "Employee and reviewers required" });
  }
  var review = {
    id: Date.now(),
    employeeId: employeeId,
    reviewers: reviewers
  };
  reviews.push(review);
  res.json(review);
});
app.get("/reviews/assigned/:empId", function (req, res) {
  var empId = parseInt(req.params.empId);
  var result = [];
  for (var i = 0; i < reviews.length; i++) {
    var r = reviews[i];
    for (var j = 0; j < r.reviewers.length; j++) {
      if (r.reviewers[j] === empId) {
        var empName = "Unknown";
        for (var k = 0; k < employees.length; k++) {
          if (employees[k].id === r.employeeId) {
            empName = employees[k].name;
            break;
          }
        }
        result.push({
          id: r.id,
          employeeId: r.employeeId,
          employeeName: empName
        });
      }
    }
  }
  res.json(result);
});
app.post("/feedback", function (req, res) {
  var reviewId = req.body.reviewId;
  var fromEmployee = req.body.fromEmployee;
  var comment = req.body.comment;
  if (!reviewId || !fromEmployee || !comment) {
    return res.status(400).json({ message: "All fields required" });
  }
  feedbacks.push({
    reviewId: reviewId,
    fromEmployee: fromEmployee,
    comment: comment
  });

  res.json({ message: "Feedback added" });
});
app.get("/admin/reviews", function (req, res) {
  var result = [];
  for (var i = 0; i < reviews.length; i++) {
    var r = reviews[i];
    var empName = "Unknown";
    for (var j = 0; j < employees.length; j++) {
      if (employees[j].id === r.employeeId) {
        empName = employees[j].name;
        break;
      }
    }
    var reviewerNames = [];
    for (var k = 0; k < r.reviewers.length; k++) {
      for (var m = 0; m < employees.length; m++) {
        if (employees[m].id === r.reviewers[k]) {
          reviewerNames.push(employees[m].name);
          break;
        }
      }
    }
    var reviewFeedbacks = [];
    for (var n = 0; n < feedbacks.length; n++) {
      if (feedbacks[n].reviewId === r.id) {

        var fromName = "Unknown";
        for (var p = 0; p < employees.length; p++) {
          if (employees[p].id === feedbacks[n].fromEmployee) {
            fromName = employees[p].name;
            break;
          }
        }
        reviewFeedbacks.push({
          fromEmployee: feedbacks[n].fromEmployee,
          fromName: fromName,
          comment: feedbacks[n].comment
        });
      }
    }
    result.push({
      id: r.id,
      employeeId: r.employeeId,
      employeeName: empName,
      reviewers: r.reviewers,
      reviewerNames: reviewerNames,
      feedbacks: reviewFeedbacks
    });
  }

  res.json(result);
});
var PORT = 5000;
app.listen(PORT, function () {
  console.log("Server running on http://localhost:" + PORT);
});
