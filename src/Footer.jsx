
import React from "react";
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
        
        {/* College Info */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/aditya-logo.png"
              alt="Aditya Logo"
              className="w-14 h-14"
            />
            <div>
              <h2 className="text-2xl font-bold tracking-wide">ADITYA</h2>
              <p className="text-sm opacity-80">
                College of Engineering & Technology
              </p>
              <p className="text-xs opacity-70">Autonomous</p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3 mt-6">
            <SocialIcon icon={<FaFacebookF />} />
            <SocialIcon icon={<FaTwitter />} />
            <SocialIcon icon={<FaYoutube />} />
            <SocialIcon icon={<FaWhatsapp />} />
            <SocialIcon icon={<FaInstagram />} />
          </div>
        </div>

        {/* Offices */}
        <div>
          <h3 className="text-xl font-bold mb-4">OFFICES</h3>
          <ul className="space-y-2 text-sm opacity-90">
            {[
              "Corporate office",
              "International Admissions",
              "Bihar",
              "Jharkhand",
              "Kerala",
              "Bangladesh",
              "West Bengal",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-orange-400">»</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-xl font-bold mb-4">
            <FaMapMarkerAlt className="inline mr-2 text-orange-400" />
            ADITYA COLLEGE OF ENGINEERING & TECHNOLOGY
          </h3>

          <p className="text-sm leading-6 opacity-90">
            Aditya Nagar, ADB Road, <br />
            Surampalem – 533437 <br />
            East-Godavari District, <br />
            Andhra Pradesh, INDIA.
          </p>

          <div className="mt-4 space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-orange-400" />
              0884-2326212, 9959176665
            </p>
            <p className="flex items-center gap-2">
              <FaWhatsapp className="text-orange-400" />
              +91 7036076661
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-orange-400" />
              office@acet.ac.in
            </p>
          </div>
        </div>

        {/* Map */}
        <div>
          <h3 className="text-xl font-bold mb-4">REACH US HERE:</h3>
          <iframe
            title="Aditya College Location"
            src="https://www.google.com/maps?q=Aditya%20College%20of%20Engineering%20and%20Technology&output=embed"
            className="w-full h-56 rounded-lg border-2 border-white/20"
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#041f38] text-center py-4 text-sm opacity-80">
        © {new Date().getFullYear()} Aditya College of Engineering & Technology.
        All Rights Reserved.
      </div>
    </footer>
  );
}

const SocialIcon = ({ icon }) => (
  <div className="w-9 h-9 flex items-center justify-center border border-white/40 hover:bg-orange-500 hover:border-orange-500 transition cursor-pointer rounded">
    {icon}
  </div>
);

export default Footer;
