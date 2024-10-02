import React from 'react'

const TransactionsLoader = () => {
    return (
      <div className="p-6 w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="h-6 bg-gray-300 rounded-md w-48 mb-6"></div>
  
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
              <div className="w-3/4 space-y-2">
                <div className="h-4 bg-gray-300 rounded-md w-full"></div>
                <div className="h-4 bg-gray-300 rounded-md w-2/4"></div>
              </div>
              <div className="h-10 w-24 bg-gray-300 rounded-md"></div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default TransactionsLoader;
  
