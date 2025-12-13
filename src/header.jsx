import React from "react";
import "./header.css";
import logo from "../public/WhatsApp Image 2025-12-11 at 05.27.04_50cf84fd.jpg"

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Aditya College Logo" className="logo" />

      <div className="title">
      </div>
    </header>
  );
}
