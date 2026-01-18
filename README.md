Employee Performance Feedback Application
This project is a simple web application where employees can give feedback on other employees as part of a performance review.
The goal of this assignment is to show basic full-stack understanding, API usage, and simple UI flow.

This is a partial implementation and focuses on clarity and working code rather than completeness.

Features Implemented

**Admin View **
  View all employees
  Create performance reviews
  Assign reviewers to an employee
  View all reviews
  View feedback submitted by employees

**Employee View**

  Simple employee login (dropdown based)
  View assigned performance reviews
  Submit feedback for assigned reviews

**What Is Not Implemented (By Design)**

  Authentication with username/password
  Database (data is stored in memory)
  Role-based access control
  Styling and UI polishing

These were intentionally skipped to keep the project simple and easy to understand.

**Technologies Used**
**Frontend**

  React.js
  React Router
  Fetch API
  Plain CSS

**Backend**

  Node.js
  Express.js
  In-memory JavaScript objects

**How the Application Works (Flow)**
**Admin Flow**

  Admin opens the Admin Reviews page
  Selects an employee to be reviewed
  Assigns reviewers from the employee list
  Creates a performance review
  Can see all reviews and feedback in one place

**Employee Flow**

  Employee opens the Login page
  Selects their name from the dropdown
  Sees reviews assigned to them
  Submits feedback for each review

**API Endpoints Implemented**

Get Employees
  GET /employees

Create Review
  POST /reviews

Get Reviews Assigned to Employee
  GET /reviews/assigned/:employeeId

Submit Feedback
  POST /feedback

Admin – View All Reviews
  GET /admin/reviews

**How to Run the Project Locally**
Prerequisites
  Replicating the Repository
  Node.js (v16 or above)
  npm install

Step 1: Run Backend
  npm install
  node server.js

Server will run on:http://localhost:5000

Step 2: Run Frontend
  npm install
  npm start

Frontend will run on: http://localhost:3000

**Assumptions Made**

  Only one admin exists
  Login is simplified using employee selection
  Data does not persist after server restart
  Focus is on logic and flow, not UI design`
