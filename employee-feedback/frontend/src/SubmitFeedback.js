import React from "react";
import { useParams } from "react-router-dom";

function SubmitFeedback() {
  var routeParams = useParams();
  var revId = routeParams.id; 
  var [txtComment, setTxtComment] = React.useState("");
  function textChanged(e) {
    setTxtComment(e.target.value);
  }
  function submitFeedback() {
    if (txtComment.trim() === "") {
      alert("You must enter some feedback!");
      return;
    }
    var empId = localStorage.getItem("employeeId");
    if (!empId) {
      alert("Employee not logged in!");
      return;
    }
    fetch("http://localhost:5000/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        reviewId: parseInt(revId),
        fromEmployee: parseInt(empId),
        comment: txtComment
      })
    })
      .then(function(resp) {
        if (resp.ok) {
          alert("Thanks! Your feedback is submitted.");
          setTxtComment("");
        } else {
          alert("Failed to submit feedback, try again later.");
        }
      })
  }
  return (
    <div className="container">
      <h2>Feedback Form</h2>
      <p>Please write your comments below:</p>
      <div className="form-group">
        <label htmlFor="feedback-textarea">Your Feedback</label>
        <textarea
          id="feedback-textarea"
          value={txtComment}
          onChange={textChanged}
          rows="6"
          cols="50"
          placeholder="Type your feedback here..."
        ></textarea>
      </div>
      <button className="btn" onClick={submitFeedback}>Send Feedback</button>
    </div>
  );
}
export default SubmitFeedback;