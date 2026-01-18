# Employee Performance Feedback Application

## Overview
This project is a simple full-stack web application that allows employees to provide performance feedback on other employees as part of a review process.  

The main goal is to demonstrate a basic understanding of **frontend and backend integration**, **API usage**, and a clear application flow.  

This is a partial implementation focusing on clarity, logic, and working functionality rather than advanced UI or complete real-world features.

---

## Features Implemented

### Admin View
- View the list of all employees    
- Assign reviewers to an employee  
- View all Assign reviews  
- View feedback submitted by employees  

### Employee View
- Simple login using an employee selection dropdown  
- View performance reviews assigned to the logged-in employee  
- Submit feedback for assigned reviews  

---

## Technologies Used

### Frontend
- React.js  
- React Router  
- Fetch API  
- Plain CSS  

### Backend
- Node.js  
- Express.js  

---

## Application Flow

### Admin Flow
1. Open the **Admin Reviews** page  
2. Select an employee to be reviewed  
3. Assign reviewers from the employee list  
4. Create a performance review  
5. View all reviews and feedback submitted  

### Employee Flow
1. Open the **Login** page  
2. Select name from dropdown list  
3. View assigned reviews  
4. Submit feedback for each review  

---

## API Endpoints Implemented

- **Get Employees** <br>
GET /employees

- **Assign Review**<br>
POST /reviews

- **Get Reviews Assigned to an Employee**<br>
GET /reviews/assigned/:employeeId

- **Submit Feedback**<br>
POST /feedback

- Admin – View All Reviews<br>
GET /admin/reviews

How to Run This Application Locally
-----------------------------------

### Prerequisites

*   Node.js (version 16 or higher)
    
*   npm
    
*   Any modern web browser
    

### Step 1: Clone the Repository

git clone  https://github.com/narendrensvm/Employee-Performance-Feedback-Web-Application.git <br> 
cd otp-auth-app

### Step 2: Run the Backend Server

npm install<br>
node server.js

If the backend starts successfully, you will see:

Backend running on [http://localhost:5000](http://localhost:5000)

### Step 3: Run the Frontend Application

Open a new terminal window and run:

npm install<br>
npm start

Frontend will start at [http://localhost:3000](http://localhost:3000)

---

## Assumptions Made

- Only one admin exists in the system  
- Login is simplified using employee selection (no authentication)    


