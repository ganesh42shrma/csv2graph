import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const textVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <footer className="bg-gray-800 text-gray-400">
      <div className="container mx-auto px-6 py-10">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={textVariant}>
            <h3 className="text-lg font-semibold text-white">
              About CSV Charts
            </h3>
            <p className="mt-4">
              Our platform simplifies data visualization, making it accessible
              and interactive for everyone.
            </p>
          </motion.div>
          <motion.div variants={textVariant}>
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
          </motion.div>
          <motion.div variants={textVariant}>
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <ul className="mt-4 flex space-x-4">
              <motion.li variants={textVariant}>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>
              </motion.li>
              <motion.li variants={textVariant}>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                </a>
              </motion.li>
              <motion.li variants={textVariant}>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  <FontAwesomeIcon icon={faFacebook} size="lg" />
                </a>
              </motion.li>
            </ul>
          </motion.div>
          <motion.div variants={textVariant}>
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <p className="mt-4">
              CSV Visuals Inc. <br />
              Tech City, Innovation Zone
            </p>
            <p className="mt-2">Email: support@csvcharts.com</p>
          </motion.div>
        </motion.div>
        <motion.div
          className="mt-8 text-center border-t border-gray-700 pt-4"
          variants={textVariant}
          initial="hidden"
          animate="visible"
        >
          <p>© 2024 CSV Visuals Inc. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
