import React, { useState, useEffect } from "react";
import CountUp from "react-countup";

const CsvStatsCard = ({
  columnsCount,
  rowsCount,
  entriesCount,
  missingValues,
  columnDataTypes,
}) => {
  const getRandomColor = () => {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F3D847", "#D833F5"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const [color, setColor] = useState(getRandomColor);

  useEffect(() => {
    setColor(getRandomColor());
  }, [columnsCount, rowsCount, entriesCount, missingValues]);

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-lg bg-gray-800 text-white p-6 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-semibold mb-4">CSV Data Overview</h2>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-lg">
            <strong>Columns</strong>
          </p>
          <span style={{ color, fontSize: "2rem", fontWeight: "bold" }}>
            <CountUp end={columnsCount} duration={2} />
          </span>
        </div>
        <div>
          <p className="text-lg">
            <strong>Rows</strong>
          </p>
          <span style={{ color, fontSize: "2rem", fontWeight: "bold" }}>
            <CountUp end={rowsCount} duration={2} />
          </span>
        </div>
        <div>
          <p className="text-lg">
            <strong>Entries</strong>
          </p>
          <span style={{ color, fontSize: "2rem", fontWeight: "bold" }}>
            <CountUp end={entriesCount} duration={2} />
          </span>
        </div>
        <div>
          <p className="text-lg">
            <strong>Missing Values</strong>
          </p>
          <span style={{ color, fontSize: "2rem", fontWeight: "bold" }}>
            <CountUp end={missingValues} duration={2} />
          </span>
        </div>
        <div className="col-span-3">
          <p className="text-lg mb-2">
            <strong>Column Data Types</strong>
          </p>
          <ul className="text-left pl-6 list-disc">
            {Object.entries(columnDataTypes).map(([col, type]) => (
              <li key={col}>
                <strong>{col}:</strong> {type}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CsvStatsCard;
