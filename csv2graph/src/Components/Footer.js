import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white">
              About CSV Charts
            </h3>
            <p className="mt-4">
              Our platform simplifies data visualization, making it accessible
              and interactive for everyone.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#upload" className="hover:text-white">
                  Upload CSV
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#support" className="hover:text-white">
                  Support
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <ul className="mt-4 flex space-x-4">
              <li>
                <a href="#" className="hover:text-white"></a>
              </li>
              <li>
                <a href="#" className="hover:text-white"></a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <p className="mt-4">
              CSV Visuals Inc. <br />
              Tech City, Innovation Zone
            </p>
            <p className="mt-2">Email: support@csvcharts.com</p>
          </div>
        </div>
        <div className="mt-8 text-center border-t border-gray-700 pt-4">
          <p>© 2024 CSV Visuals Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
