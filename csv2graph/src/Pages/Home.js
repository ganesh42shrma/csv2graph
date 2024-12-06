import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setToast } from "../Redux/slices/toastSlice";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import { motion } from "framer-motion";

export const Home = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mainContentRef = useRef(null);
  const [csvData, setCsvData] = useState(null);
  const loaderTimeout = useRef(null); // Ref to manage loader timeout

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      dispatch(setToast({ message: "File selected!", type: "success" }));
      setLoading(true); // Show loader during file processing

      if (selectedFile.type === "text/csv") {
        Papa.parse(selectedFile, {
          complete: (result) => {
            // Add delay for loader visibility
            loaderTimeout.current = setTimeout(() => {
              setLoading(false);
              if (result.data && result.data.length > 0) {
                setCsvData(result.data);
                console.log("CSV data:", result.data);
              } else {
                setCsvData(null);
                dispatch(
                  setToast({ message: "CSV file is empty!", type: "error" })
                );
              }
            }, 2000); // 2-second delay
          },
          header: true,
          skipEmptyLines: true,
          error: (error) => {
            loaderTimeout.current = setTimeout(() => {
              setLoading(false);
              setCsvData(null);
              dispatch(
                setToast({ message: "Error parsing CSV file!", type: "error" })
              );
              console.error("CSV Parsing error:", error);
            }, 2000);
          },
        });
      } else if (
        selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        const reader = new FileReader();
        reader.onload = (e) => {
          loaderTimeout.current = setTimeout(() => {
            setLoading(false);
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            setCsvData(jsonData);
            console.log("XLSX data:", jsonData);
          }, 2000);
        };
        reader.readAsArrayBuffer(selectedFile);
      } else {
        loaderTimeout.current = setTimeout(() => {
          setLoading(false);
          setCsvData(null);
          dispatch(
            setToast({
              message: "Please select a valid CSV or XLSX file",
              type: "error",
            })
          );
        }, 2000);
      }
    } else {
      setCsvData(null);
      dispatch(setToast({ message: "No file selected", type: "error" }));
    }
  };

  const handleUpload = () => {
    if (file) {
      setLoading(true); // Show loader during upload
      dispatch(setToast({ message: "Uploading file...", type: "info" }));
      loaderTimeout.current = setTimeout(() => {
        navigate("/graph", { state: { csvData } });
        setLoading(false); // Hide loader after navigation
      }, 2000); // 2-second delay
    } else {
      dispatch(setToast({ message: "No file selected", type: "error" }));
    }
  };

  const handleScrollToContent = () => {
    mainContentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Clean up loader timeout on component unmount
    return () => {
      if (loaderTimeout.current) {
        clearTimeout(loaderTimeout.current);
      }
    };
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Hero onScrollToContent={handleScrollToContent} />
      <div
        ref={mainContentRef}
        className="flex-grow flex justify-center items-center p-4 bg-gray-900"
      >
        <motion.div
          className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Upload CSV/XLSX File</div>
            <p className="text-gray-700 text-base">
              Only CSV or XLSX files are accepted.
            </p>
          </div>

          <div className="px-6 py-4">
            <input
              type="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {file && (
            <div className="px-6 py-4 text-center text-gray-700">
              <p>
                {file.type === "text/csv" ? (
                  <FontAwesomeIcon icon={faFileCsv} />
                ) : (
                  <FontAwesomeIcon icon={faFileExcel} />
                )}{" "}
                {file.name}
              </p>
            </div>
          )}

          <div className="px-6 py-4 text-center">
            <button
              className={`py-2 px-4 rounded-lg ${
                file
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={handleUpload}
              disabled={!file || loading}
            >
              {loading ? "Loading..." : "Upload"}
            </button>
          </div>

          {loading && (
            <motion.div
              className="flex justify-center items-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full border-blue-500 border-t-transparent my-1"></div>
            </motion.div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};
