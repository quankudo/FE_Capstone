import React from 'react'

const SkeletonFoodCard = () => {
  return (
    <div className="border rounded-xl shadow p-4 w-64 animate-pulse">
      {/* Hình ảnh */}
      <div className="h-40 bg-gray-300 rounded-xl mb-4"></div>

      {/* Tên món */}
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>

      {/* Mô tả ngắn */}
      <div className="h-3 bg-gray-300 rounded w-1/2 mb-4"></div>

      {/* Giá */}
      <div className="h-5 bg-gray-300 rounded w-1/4"></div>
    </div>
  )
}

export default SkeletonFoodCard
