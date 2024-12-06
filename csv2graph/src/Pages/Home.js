import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import { useDispatch } from "react-redux";
import { setToast } from "../Redux/slices/toastSlice";

export const Home = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      dispatch(setToast({ message: "CSV file selected!", type: "success" }));
    } else {
      dispatch(
        setToast({ message: "Please select a valid CSV file", type: "error" })
      );
    }
  };

  const handleUpload = () => {
    if (file) {
      dispatch(setToast({ message: "Uploading file...", type: "info" }));
    } else {
      dispatch(setToast({ message: "No file selected", type: "error" }));
    }
  };

  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col">
      <Hero />
      <div className="flex-grow flex justify-center items-center p-4 bg-gray-900">
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Upload CSV File</div>
            <p className="text-gray-700 text-base">
              Only CSV files are accepted.
            </p>
          </div>

          <div className="px-6 py-4">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {file && (
            <div className="px-6 py-4 text-center text-gray-700">
              <p>
                {" "}
                <FontAwesomeIcon icon={faFileCsv} /> {file.name}
              </p>
            </div>
          )}

          <div className="px-6 py-4 text-center">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
