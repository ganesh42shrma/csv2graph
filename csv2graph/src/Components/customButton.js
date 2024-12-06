import React from "react";

const CustomButton = ({
  link,
  text,
  color = "bg-blue-500",
  textColor = "text-white",
}) => {
  return (
    <a
      href={link}
      className={`px-6 py-3 text-lg font-medium ${color} ${textColor} hover:${color.replace(
        "500",
        "600"
      )} rounded-lg shadow-lg`}
    >
      {text}
    </a>
  );
};

export default CustomButton;
