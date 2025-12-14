import React from "react";
import "./login.css";

export default function LoginPage({ onLogin }) {
  const handleEmployeeLogin = (e) => {
    e.preventDefault();
    onLogin("employee");
  };

  const handleStudentLogin = (e) => {
    e.preventDefault();
    onLogin("student");
  };

  const handleStaffLogin = (e) => {
    e.preventDefault();
    onLogin("staff");
  };

  return (
    <div className="login-page">
      <h2 className="main-title colored-title">
        Keyword Analyzer for SDG–Scopus Mapping
      </h2>

      <div className="login-container">
        {/* Employee */}
        <div className="login-card employee">
          <div className="card-header employee-header">
            Admin Login
          </div>
          <form onSubmit={handleEmployeeLogin} className="card-body">
            <input type="text" placeholder="Employee ID" required />
            <input type="password" placeholder="Password" required />
            <button type="submit" className="employee-btn">Login</button>
          </form>
        </div>



          <div className="login-card staff">
          <div className="card-header staff-header">
            Staff Login
          </div>
          <form onSubmit={handleStaffLogin} className="card-body">
            <input type="text" placeholder="Employee ID" required />
            <input type="password" placeholder="Password" required />
            <button type="submit" className="staff-btn">Login</button>
          </form>
        </div>

        {/* Student */}
        <div className="login-card student">
          <div className="card-header student-header">
            Student Login
          </div>
          <form onSubmit={handleStudentLogin} className="card-body">
            <input type="text" placeholder="Roll Number" required />
            <input type="password" placeholder="Password" required />
            <button type="submit" className="student-btn">Login</button>
          </form>
        </div>

        {/* Staff */}
      
      </div>
    </div>
  );
}
