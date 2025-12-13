import React from "react";
import "./Login.css";

export default function LoginPage({ onLogin }) {
  const handleEmployeeLogin = (e) => {
    e.preventDefault();
    onLogin("employee");
  };

  const handleStudentLogin = (e) => {
    e.preventDefault();
    onLogin("student");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Employee Login</h2>
        <form onSubmit={handleEmployeeLogin}>
          <input type="text" placeholder="Employee ID" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>

      <div className="login-card">
        <h2>Student Login</h2>
        <form onSubmit={handleStudentLogin}>
          <input type="text" placeholder="Roll Number" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
