import React from 'react'

// SkeletonLoader.jsx
export default function SkeletonLoader() {
    return (
      <div className="p-8 w-full flex flex-col space-y-8">
        {/* Skeleton for Page Title */}
        <div className="h-8 w-32 bg-gray-300 rounded-md animate-pulse"></div>
  
        {/* Skeleton for Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Skeleton for Add Money Section */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            {/* Skeleton for Add Money Title */}
            <div className="h-6 w-24 bg-gray-300 rounded-md animate-pulse"></div>
            
            {/* Skeleton for Input Fields */}
            <div className="space-y-2">
              <div className="h-4 w-20 bg-gray-300 rounded-md animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse"></div>
            </div>
            
            <div className="space-y-2">
              <div className="h-4 w-16 bg-gray-300 rounded-md animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse"></div>
            </div>
  
            {/* Skeleton for Button */}
            <div className="h-10 w-32 bg-gray-300 rounded-md animate-pulse"></div>
          </div>
  
          {/* Skeleton for Balance and Transactions */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-md space-y-2">
              <div className="h-6 w-28 bg-gray-300 rounded-md animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse"></div>
            </div>
  
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-6 w-40 bg-gray-300 rounded-md animate-pulse"></div>
              <div className="mt-2 h-16 w-full bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
