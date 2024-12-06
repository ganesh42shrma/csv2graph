import React from "react";
import { motion } from "framer-motion";
import CustomButton from "./customButton";
import ChartImage from "../Assets/herocharts.jpg";
import {
  salesProfitData,
  revenueExpenseData,
  growthPercentageData,
  salesByCategory,
  profitByRegion,
  expensesByType,
} from "../Helpers/sampleCSV";
import JSZip from "jszip";

// Convert data to CSV format
const convertToCSV = (data) => {
  return data.map((row) => row.join(",")).join("\n");
};

const Hero = ({ onScrollToContent }) => {
  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const spanVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.5, duration: 1 },
    },
  };

  const paragraphVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 1, duration: 1 } },
  };

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, delay: 1.2 },
    },
  };

  const downloadSampleCsv = () => {
    const csvData = [
      { data: salesProfitData, fileName: "sales_profit_data.csv" },
      { data: revenueExpenseData, fileName: "revenue_expense_data.csv" },
      { data: growthPercentageData, fileName: "growth_percentage_data.csv" },
      { data: salesByCategory, fileName: "sales_by_category.csv" },
      { data: profitByRegion, fileName: "profit_by_region.csv" },
      { data: expensesByType, fileName: "expenses_by_type.csv" },
    ];

    const zip = new JSZip(); // Create a new instance of JSZip

    // Add each CSV file to the zip
    csvData.forEach(({ data, fileName }) => {
      const csvContent = convertToCSV(data);
      zip.file(fileName, csvContent); // Add the CSV data to the zip file
    });

    // Generate the zip file and trigger the download
    zip.generateAsync({ type: "blob" }).then((content) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = "sample_csv_files.zip"; // Zip file name
      link.click();
    });
  };

  return (
    <div className="flex-grow container mx-auto px-6 py-16 lg:flex lg:items-center lg:justify-between">
      <div className="lg:w-1/2">
        <motion.h1
          className="text-4xl font-bold sm:text-5xl"
          variants={textVariant}
          initial="hidden"
          animate="visible"
        >
          Process Your{" "}
          <motion.span
            className="text-blue-500"
            variants={spanVariant}
            initial="hidden"
            animate="visible"
          >
            CSV Files
          </motion.span>{" "}
          with Ease
        </motion.h1>
        <motion.p
          className="mt-6 text-lg text-gray-400"
          variants={paragraphVariant}
          initial="hidden"
          animate="visible"
        >
          Upload your data and explore insights with interactive charts powered
          by Google Charts.
        </motion.p>
        <div className="mt-8 flex gap-4">
          <CustomButton
            onClick={onScrollToContent}
            text="Try it Now →"
            color="bg-blue-500"
            textColor="white"
          />
          {/* New Button to download all sample CSV files */}
          <CustomButton
            onClick={downloadSampleCsv}
            text="Download Sample CSVs"
            color="bg-gray-500"
            textColor="white"
          />
        </div>
      </div>
      <div className="mt-10 lg:mt-0 lg:w-1/2">
        <motion.img
          src={ChartImage}
          alt="CSV File Processing Illustration"
          className="rounded-lg shadow-lg"
          variants={imageVariant}
          initial="hidden"
          animate="visible"
        />
      </div>
    </div>
  );
};

export default Hero;
