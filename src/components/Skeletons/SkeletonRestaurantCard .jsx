import React from "react";

const SkeletonRestaurantCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      {/* Ảnh */}
      <div className="w-full h-48 bg-gray-300"></div>

      <div className="p-4 space-y-3">
        {/* Tên + nút tim */}
        <div className="flex justify-between items-start">
          <div className="h-5 w-32 bg-gray-300 rounded"></div>
          <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
        </div>

        {/* Rating */}
        <div className="flex gap-2 items-center">
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
          <div className="h-4 w-8 bg-gray-300 rounded"></div>
        </div>

        {/* Mô tả */}
        <div className="h-4 w-full bg-gray-300 rounded"></div>
        <div className="h-4 w-3/4 bg-gray-300 rounded"></div>

        {/* Address */}
        <div className="h-4 w-1/2 bg-gray-300 rounded"></div>

        {/* Button */}
        <div className="h-8 w-28 bg-gray-300 rounded-xl"></div>
      </div>
    </div>
  );
};

export default SkeletonRestaurantCard;
