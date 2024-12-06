import React from "react";
import CustomButton from "./customButton";
const Hero = () => {
  return (
    <div className="flex-grow container mx-auto px-6 py-16 lg:flex lg:items-center lg:justify-between">
      <div className="lg:w-1/2">
        <h1 className="text-4xl font-bold sm:text-5xl">
          Process Your <span className="text-blue-500">CSV Files</span> with
          Ease
        </h1>
        <p className="mt-6 text-lg text-gray-400">
          Upload your data and explore insights with interactive charts powered
          by Google Charts.
        </p>
        <div className="mt-8 flex gap-4">
          <CustomButton
            link="#features"
            text="Try it Now"
            color="bg-blue-500"
            textColor="white"
          />
        </div>
      </div>
      <div className="mt-10 lg:mt-0 lg:w-1/2">
        <img
          src="https://via.placeholder.com/600x400"
          alt="CSV File Processing Illustration"
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Hero;
