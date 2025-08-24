import React from 'react';
import { outOfStock } from '../assets/images';

const EmptyState = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
      {/* Ảnh minh họa trạng thái trống */}
      <img
        src={outOfStock} // 👉 đặt ảnh vào public/images/empty.png
        alt="Empty"
        className="w-30 h-30 mb-4 opacity-80"
      />
      {/* Nội dung */}
      <p className="text-md text-center text-text font-medium">{text || "Không có dữ liệu để hiển thị"}</p>
    </div>
  );
};

export default EmptyState;
