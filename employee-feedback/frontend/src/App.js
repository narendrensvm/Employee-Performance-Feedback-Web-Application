import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AdminEmployees from "./AdminEmployees";
import AdminReviews from "./AdminReviews";
import Login from "./Login";
import EmployeeReviews from "./EmployeeReviews";
import SubmitFeedback from "./SubmitFeedback";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Employees</Link> |{" "}
        <Link to="/reviews">Assign Review</Link> |{" "}
        <Link to="/login">Employee Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<AdminEmployees />} />
        <Route path="/reviews" element={<AdminReviews />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employee" element={<EmployeeReviews />} />
        <Route path="/feedback/:id" element={<SubmitFeedback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
