// SkeletonEventCard.jsx
import React from "react";

const SkeletonEventCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row gap-6 animate-pulse">
      {/* Ảnh */}
      <div className="w-full md:w-1/3 h-40 bg-gray-300 rounded-lg"></div>

      {/* Nội dung */}
      <div className="flex-1 space-y-3">
        {/* Tiêu đề */}
        <div className="h-6 bg-gray-300 rounded w-2/3"></div>

        {/* Tên nhà hàng */}
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>

        {/* Ngày tháng */}
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>

        {/* Mô tả */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-300 rounded w-full"></div>
          <div className="h-3 bg-gray-300 rounded w-5/6"></div>
          <div className="h-3 bg-gray-300 rounded w-4/6"></div>
        </div>

        {/* Button */}
        <div className="flex justify-end">
          <div className="h-9 w-28 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonEventCard;