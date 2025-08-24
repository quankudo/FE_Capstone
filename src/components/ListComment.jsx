import React from 'react';
import formatDateTime from '../utils/formatDateTime';
import { getFirstLetterOfLastName } from '../utils/getFirstName';

const ListComment = ({ reviews = [] }) => {
  return (
    <div className="w-[40%]">
      <h3 className="text-lg font-semibold mb-4">Các đánh giá gần đây</h3>
      <div className="flex flex-col gap-4">
        {reviews.length === 0 && <p>Chưa có đánh giá nào.</p>}
        {reviews.map((review, index) => (
          <div
            key={index}
            className="cursor-pointer flex justify-between items-center gap-4 relative group bg-white p-2 rounded hover:shadow-md transition"
          >
            <div
              className="w-[50px] h-[50px] flex justify-center items-center rounded-full text-white bg-gray-700"
            >
              {getFirstLetterOfLastName(review.UserName)}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">{review.UserName || 'Khách hàng'}</h4>
              <p className="text-sm text-gray-600">
                {formatDateTime(review.CreatedAt)}
              </p>
            </div>
            <span
              className={`px-4 py-[4px] rounded-3xl text-white ${
                review.TypeReview ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {review.TypeReview ? 'Good review' : 'Bad review'}
            </span>
              <hr className='w-full h-1 absolute top-[103%] left-0'/>
            {/* Tooltip hiển thị comment khi hover */}
            <div className="absolute left-0 top-0 mt-2 w-max max-w-[300px] bg-gray-800 text-white text-sm p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
              {review.Comment || 'Không có nội dung'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListComment;