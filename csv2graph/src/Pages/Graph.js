import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToast } from "../Redux/slices/toastSlice";
import { toast } from "react-toastify";
import Footer from "../Components/Footer";
import { toPng } from "html-to-image";
import CsvStatsCard from "../Components/CsvStatsCard";

const Graph = () => {
  const { state } = useLocation();
  const { csvData } = state || {};
  const [chartType, setChartType] = useState("LineChart");
  const [chartData, setChartData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [retry, setRetry] = useState(false);
  const [columnsCount, setColumnsCount] = useState(0);
  const [rowsCount, setRowsCount] = useState(0);
  const [entriesCount, setEntriesCount] = useState(0);
  const [missingValues, setMissingValues] = useState(0);
  const [columnDataTypes, setColumnDataTypes] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (csvData) {
      console.log("CSV Data loaded:", csvData);

      const cols = Object.keys(csvData[0]);
      setColumns(cols);
      setChartData(csvData);

      // Set all columns as default selection
      setSelectedColumns(cols);

      // Basic Counts
      const columnsCount = cols.length;
      const rowsCount = csvData.length;
      const entriesCount = csvData.reduce(
        (count, row) => count + Object.values(row).filter((val) => val).length,
        0
      );

      // Missing Values
      const missingValues = csvData.reduce(
        (total, row) =>
          total +
          Object.values(row).filter((val) => val === "" || val == null).length,
        0
      );

      // Column Data Type Analysis
      const columnDataTypes = cols.reduce((acc, col) => {
        const sampleValues = csvData.map((row) => row[col]);
        const isNumeric = sampleValues.every(
          (val) => !isNaN(val) && val !== ""
        );
        const isDate = sampleValues.some(
          (val) => !isNaN(Date.parse(val)) && typeof val === "string"
        );
        acc[col] = isNumeric ? "Numeric" : isDate ? "Date" : "Categorical";
        return acc;
      }, {});

      console.log("Columns:", cols);
      console.log("Column Data Types:", columnDataTypes);

      setColumnsCount(columnsCount);
      setRowsCount(rowsCount);
      setEntriesCount(entriesCount);
      setMissingValues(missingValues);
      setColumnDataTypes(columnDataTypes);
    }
  }, [csvData, retry]);

  const handleChartTypeChange = (event) => {
    console.log("Chart type changed:", event.target.value);
    setChartType(event.target.value);
  };

  const handleColumnChange = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );

    console.log("Selected columns:", value);

    if (value.includes("All")) {
      setSelectedColumns(columns); // Select all columns
    } else {
      setSelectedColumns(value); // Select only the chosen columns
    }
  };

  const prepareChartData = () => {
    if (!selectedColumns || selectedColumns.length === 0) {
      console.log("No columns selected for chart.");
      return [];
    }

    const header = ["x", ...selectedColumns];

    // Handle Pie Chart separately
    if (chartType === "PieChart") {
      // Ensure the first column is string and second column is numeric
      if (selectedColumns.length < 2) {
        console.log(
          "Pie chart requires at least one string column and one numeric column."
        );
        return [];
      }

      const firstColumnIsString =
        columnDataTypes[selectedColumns[0]] === "Categorical" ||
        columnDataTypes[selectedColumns[0]] === "Date";
      const secondColumnIsNumeric =
        columnDataTypes[selectedColumns[1]] === "Numeric";

      if (!firstColumnIsString || !secondColumnIsNumeric) {
        console.log(
          "Pie chart requires the first column to be of type string and the second column to be numeric."
        );
        return [];
      }

      // Pie chart: First column is string (category), second is numeric (values)
      const pieData = chartData.map((row) => {
        const category = row[selectedColumns[0]];
        const value = row[selectedColumns[1]];
        return [category, value];
      });

      return [["Category", "Value"], ...pieData];
    }

    // Handle other chart types (e.g., LineChart, BarChart)
    const data = chartData.map((row, rowIndex) => {
      const xValue = rowIndex + 1; // Generate index for the x-axis
      const rowData = selectedColumns.map((col) => {
        const value = row[col];
        // Check the column type to determine how to handle the value
        if (columnDataTypes[col] === "Numeric") {
          return isNaN(value) || value === "" ? null : Number(value);
        } else if (
          columnDataTypes[col] === "Categorical" ||
          columnDataTypes[col] === "Date"
        ) {
          return value === "" ? null : value; // Pass through the value as is
        }
        return null;
      });

      return [xValue, ...rowData];
    });

    // Filter out rows where all values (except the x-value) are null
    const filteredData = data.filter((row) =>
      row.some((cell, index) => index === 0 || cell !== null)
    );

    console.log("Prepared chart data:", [header, ...filteredData]);
    return [header, ...filteredData];
  };

  const renderChart = () => {
    try {
      console.log("Rendering chart with type:", chartType);

      if (chartType === "PieChart") {
        if (selectedColumns.length < 2) {
          throw new Error(
            "Pie chart requires at least one string column and one numeric column."
          );
        }
        const firstColumnIsString =
          typeof chartData[0][selectedColumns[0]] === "string";
        const secondColumnIsNumeric = !isNaN(chartData[0][selectedColumns[1]]);

        if (!firstColumnIsString || !secondColumnIsNumeric) {
          throw new Error(
            "Pie chart requires the first column to be of type string and the second column to be numeric."
          );
        }
      }

      return (
        <div id="chart-container">
          <Chart
            chartType={chartType}
            data={prepareChartData()}
            width="100%"
            height="400px"
            legend_toggle
          />
        </div>
      );
    } catch (error) {
      console.error("Error rendering chart:", error);
      dispatch(
        setToast({
          message: error.message,
          type: "error",
        })
      );
      toast.error(error.message);
      return (
        <div className="w-full max-w-4xl text-center bg-red-500 text-white p-4 rounded-lg shadow-md mt-4">
          <h3 className="text-xl font-semibold">Error</h3>
          <p className="mb-4">{error.message}</p>
          <button
            onClick={() => setRetry((prev) => !prev)}
            className="bg-white text-red-500 px-4 py-2 rounded-lg hover:bg-red-100"
          >
            Retry
          </button>
        </div>
      );
    }
  };

  const downloadChartAsImage = () => {
    const node = document.getElementById("chart-container");
    if (node) {
      console.log("Attempting to download chart as image...");
      toPng(node)
        .then((dataUrl) => {
          console.log("Image successfully downloaded!");
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "chart-image.png";
          link.click();
        })
        .catch((error) => {
          console.error("Error generating image:", error);
          dispatch(
            setToast({
              message: error.message,
              type: "error",
            })
          );
          toast.error(error.message);
        });
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
      >
        Upload Again
      </button>
      <header className="text-center">
        <h2 className="text-3xl font-bold mb-6">CSV Data Chart</h2>
      </header>
      <main className="flex-grow flex flex-col items-center p-6 space-y-6">
        {/* Full-Width CsvStatsCard */}
        <CsvStatsCard
          columnsCount={columns.length}
          rowsCount={csvData.length}
          entriesCount={columns.length * csvData.length}
          missingValues={missingValues}
          columnDataTypes={columnDataTypes}
        />

        {/* Chart Controls in a Row */}
        <div className="flex flex-wrap justify-between items-center w-full max-w-4xl space-y-4 sm:space-y-0 sm:flex-row">
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <label className="text-lg mr-4">Select Chart Type:</label>
            <select
              className="p-2 bg-gray-700 text-white rounded"
              value={chartType}
              onChange={handleChartTypeChange}
            >
              <option value="LineChart">Line Chart</option>
              <option value="BarChart">Bar Chart</option>
              <option value="PieChart">Pie Chart</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <label className="text-lg mr-4">Select Columns:</label>
            <select
              className="p-2 bg-gray-700 text-white rounded"
              multiple
              value={selectedColumns}
              onChange={handleColumnChange}
            >
              <option value="All">Show All Columns</option>
              {columns.map((col, index) => (
                <option key={index} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Chart */}
        <div className="w-full max-w-4xl">
          {selectedColumns.length > 0 ? (
            renderChart()
          ) : (
            <p>Please select columns to display the chart.</p>
          )}
        </div>
        {/* Download Button */}
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={downloadChartAsImage}
          >
            Download Chart as Image
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Graph;
