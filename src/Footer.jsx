import React from "react";
import './header'
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#062b4d] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* LOGO + SOCIAL */}
        <div>
          <img
            src="../src/assets/image.png"
            alt="../src/assets/image.png"
            className="w-60 mb-8"
          />

          <div className="flex gap-3">
            <SocialIcon><FaFacebookF /></SocialIcon>
            <SocialIcon><FaTwitter /></SocialIcon>
            <SocialIcon><FaYoutube /></SocialIcon>
            <SocialIcon><FaWhatsapp /></SocialIcon>
            <SocialIcon><FaInstagram /></SocialIcon>
          </div>
        </div>

        {/* ADDRESS */}
        <div className="space-y-4 text-sm">
          <p className="flex gap-3">
            <FaMapMarkerAlt className="text-orange-400 mt-1" />
            <span>
              <b>ADITYA UNIVERSITY</b><br />
              Aditya Nagar, ADB Road,<br />
              Surampalem – 533437<br />
              Kakinada District,<br />
              Andhra Pradesh, INDIA.
            </span>
          </p>

          <p className="flex gap-3">
            <FaPhoneAlt className="text-orange-400" />
            0884-2326202, <br />
            +91 99498 76662,<br />
            +91 99897 76661
          </p>

          <p className="flex gap-3">
            <FaWhatsapp className="text-orange-400" />
            +91 7036076661
          </p>

          <p className="flex gap-3">
            <FaEnvelope className="text-orange-400" />
            office@aec.edu.in
          </p>
        </div>

        {/* MAP */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold">REACH US :</h3>
            <button className="bg-sky-400 hover:bg-sky-500 text-sm px-3 py-1 rounded">
              360° View
            </button>
          </div>

          <iframe
            title="Aditya Engineering College"
            src="https://www.google.com/maps?q=Aditya%20Engineering%20College&output=embed"
            className="w-full h-56 rounded-lg border border-white/20"
            loading="lazy"
          />
        </div>

        {/* OFFICES */}
        <div>
          <h3 className="text-xl font-bold mb-4">OFFICES</h3>
          <ul className="space-y-2 text-sm">
            {[
              "Corporate office",
              "International Admissions",
              "Bihar",
              "Jharkhand",
              "Kerala",
              "Bangladesh",
              "West Bengal",
            ].map((item) => (
              <li key={item} className="flex gap-2 items-center">
                <span className="text-orange-400">»</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-[#041f38] text-center py-4 text-sm opacity-80">
        © {new Date().getFullYear()} Aditya University. All Rights Reserved.
      </div>
    </footer>
  );
}

/* SOCIAL ICON */
const SocialIcon = ({ children }) => (
  <div className="w-9 h-9 flex items-center justify-center border border-white/40 rounded hover:bg-orange-500 hover:border-orange-500 transition cursor-pointer">
    {children}
  </div>
);

export default Footer;
