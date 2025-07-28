import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center bg-gray-50 text-gray-700 p-6">
      <AlertCircle size={80} className="text-red-500 mb-4 animate-pulse" />
      <h1 className="text-4xl font-bold mb-2">404 - Không tìm thấy trang</h1>
      <p className="mb-6 text-center text-gray-500">
        Trang bạn đang tìm không tồn tại hoặc đã bị xóa.
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition"
      >
        Quay về trang chủ
      </button>
    </div>
  );
};

export default NotFound;
