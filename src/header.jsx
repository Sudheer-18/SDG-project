import React from "react";
import "./header.css";
import logo from "../public/WhatsApp Image 2025-12-11 at 05.27.04_50cf84fd.jpg";
import logo2 from "../public/E_SDG_logo_UN_emblem_horizontal_WEB.jpg";

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Aditya College Logo" className="logo" />
      <img src={logo2} alt="SDG Logo" className="logo2" />
    </header>
  );
}
