import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function EmployeeReviews() {
  var navigate = useNavigate();
  var employeeId = localStorage.getItem("employeeId");
  var [reviewList, setReviewList] = useState([]);
  useEffect(function () {
    if (!employeeId) {
      navigate("/login");
      return;
    }
    fetch("http://localhost:5000/reviews/assigned/" + employeeId)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data) {
          setReviewList(data);
        } else {
          setReviewList([]);
        }
      })
      .catch(function (err) {
        console.log("Error loading reviews", err);
      });
  }, [employeeId, navigate]);
  var reviewCards = [];
  for (var i = 0; i < reviewList.length; i++) {
    var review = reviewList[i];
    reviewCards.push(
      <div key={review.id} className="card">
        <p>
          <b>Review for:</b>{" "}
          {review.employeeName ? review.employeeName : "Unknown"}
        </p>
        <Link to={"/feedback/" + review.id} className="link">
          Give Feedback
        </Link>
      </div>
    );
  }
  return (
    <div className="container">
      <h2>My Assigned Reviews</h2>

      {reviewList.length === 0 && (
        <p>No reviews assigned to you</p>
      )}

      {reviewCards}
    </div>
  );
}
export default EmployeeReviews;