import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center bg-gray-50 text-gray-700 p-6">
      <Lock size={80} className="text-red-500 mb-4 animate-pulse" />
      <h1 className="text-4xl font-bold mb-2">403 - Không có quyền truy cập</h1>
      <p className="mb-6 text-center text-gray-500">
        Bạn không có quyền truy cập vào trang này. Vui lòng đăng nhập bằng tài khoản phù hợp hoặc quay lại trang chủ.
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

export default Unauthorized;