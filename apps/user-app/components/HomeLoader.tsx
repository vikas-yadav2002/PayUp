import React from 'react';

const HomeLoader = () => {
  return (
    <div className="flex flex-col">
      {/* Greeting Username Loader */}
      <div className="py-4">
        <div className="h-8 w-40 bg-gray-300 rounded animate-pulse mb-4"></div>
      </div>

      <div className="w-96 h-1 bg-gray-200 animate-pulse"></div>

      {/* Dashboard Content Loader */}
      <div className="p-10">
        <div className="h-8 w-40 bg-gray-300 rounded animate-pulse mb-6"></div> {/* Dashboard Title Loader */}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transaction Trends Loader */}
          <div className="bg-white p-5 shadow-lg rounded-lg w-[30rem] animate-pulse">
            <div className="h-6 w-48 bg-gray-300 rounded mb-4"></div> {/* Section Title */}
            <div className="h-44 bg-gray-300 rounded"></div> {/* Chart Placeholder */}
          </div>

          {/* Transaction History Loader */}
          <div className="bg-white p-5 shadow-lg rounded-lg w-[30rem] animate-pulse">
            <div className="h-6 w-48 bg-gray-300 rounded mb-4"></div> {/* Section Title */}
            <div className="h-44 bg-gray-300 rounded"></div> {/* Chart Placeholder */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLoader;
