const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let employees = [];
let reviews = [];
let feedbacks = [];

app.post("/employees", (req, res) => {
  const name = req.body.name;
  if (!name) return res.status(400).json({ message: "Please provide employee name" });
  const employee = { id: Date.now(), name: name };
  employees.push(employee);
  res.json(employee);
});
app.get("/employees", (req, res) => {
  res.json(employees);
});
app.delete("/employees/:id", (req, res) => {
  const id = parseInt(req.params.id);
  employees = employees.filter(emp => emp.id !== id);
  res.json({ message: "Employee deleted successfully" });
});
app.post("/reviews", (req, res) => {
  const { employeeId, reviewers } = req.body;
  if (!employeeId || !reviewers || reviewers.length === 0) {
    return res.status(400).json({ message: "Employee and reviewers are required" });
  }
  const review = { id: Date.now(), employeeId: employeeId, reviewers: reviewers };
  reviews.push(review);
  res.json(review);
});
app.get("/reviews/assigned/:empId", (req, res) => {
  const empId = parseInt(req.params.empId);
  const assigned = reviews
    .filter(r => r.reviewers.includes(empId))
    .map(r => {
      const emp = employees.find(e => e.id === r.employeeId);
      return { ...r, employeeName: emp ? emp.name : "Unknown" };
    });
  res.json(assigned);
});
app.post("/feedback", (req, res) => {
  const { reviewId, fromEmployee, comment } = req.body;
  if (!reviewId || !fromEmployee || !comment) {
    return res.status(400).json({ message: "Review ID, fromEmployee and comment are required" });
  }
  feedbacks.push({ reviewId, fromEmployee, comment });
  res.json({ message: "Feedback added successfully" });
});
app.get("/admin/reviews", (req, res) => {
  const allReviews = reviews.map(r => {
    const emp = employees.find(e => e.id === r.employeeId);
    const reviewerNames = r.reviewers.map(id => {
      const reviewer = employees.find(e => e.id === id);
      return reviewer ? reviewer.name : "Unknown";
    });
    const reviewFeedbacks = feedbacks
      .filter(f => f.reviewId === r.id)
      .map(f => {
        const fromEmp = employees.find(e => e.id === f.fromEmployee);
        return { ...f, fromName: fromEmp ? fromEmp.name : "Unknown" };
      });
    return {
      id: r.id,
      employeeId: r.employeeId,
      employeeName: emp ? emp.name : "Unknown",
      reviewers: r.reviewers,
      reviewerNames: reviewerNames,
      feedbacks: reviewFeedbacks
    };
  });
  res.json(allReviews);
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});