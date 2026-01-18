import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function EmployeeReviews() {
  const employeeId = localStorage.getItem("employeeId");
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!employeeId) {
      navigate("/login");
      return;
    }
    fetch(`http://localhost:5000/reviews/assigned/${employeeId}`)
      .then(res => res.json())
      .then(data => setReviews(data));
  }, [employeeId, navigate]);
  return (
    <div className="container">
      <h2>My Assigned Reviews</h2>
      {reviews.map(r => (
        <div key={r.id} className="card">
          Review for Employee {r.employeeName}
          <Link to={`/feedback/${r.id}`} className="link"> Give Feedback</Link>
        </div>
      ))}
    </div>
  );
}
export default EmployeeReviews;
