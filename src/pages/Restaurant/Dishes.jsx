import React, { useState } from 'react';
import Pagination from '../../components/Pagination';
import { useNavigate } from 'react-router-dom';

import { FaRegFolderOpen } from "react-icons/fa6";

const fakeDishes = [
  { id: 1, name: 'Phở Bò', type: 'Món chính', price: 45000, status: 'Đang bán', image: '' },
  { id: 2, name: 'Cà phê sữa đá', type: 'Đồ uống', price: 25000, status: 'Tạm ngưng', image: '' },
  { id: 3, name: 'Bánh mì chảo', type: 'Món phụ', price: 35000, status: 'Đang bán', image: '' },
  { id: 4, name: 'Bún Chả', type: 'Món chính', price: 50000, status: 'Đang bán', image: '' },
  { id: 5, name: 'Trà đá', type: 'Đồ uống', price: 10000, status: 'Đang bán', image: '' },
  { id: 6, name: 'Bánh flan', type: 'Món phụ', price: 20000, status: 'Tạm ngưng', image: '' },
  { id: 7, name: 'Cơm gà', type: 'Món chính', price: 55000, status: 'Đang bán', image: '' },
  { id: 8, name: 'Sinh tố bơ', type: 'Đồ uống', price: 30000, status: 'Đang bán', image: '' },
];

const DISHES_PER_PAGE = 4;

const Dishes = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('Tất cả');
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const dishTypes = ['Tất cả', 'Món chính', 'Món phụ', 'Đồ uống'];

  const filteredDishes = fakeDishes.filter((dish) => {
    const matchesSearch = dish.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'Tất cả' || dish.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredDishes.length / DISHES_PER_PAGE);
  const paginatedDishes = filteredDishes.slice(
    (currentPage - 1) * DISHES_PER_PAGE,
    currentPage * DISHES_PER_PAGE
  );

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium flex items-center gap-2"><FaRegFolderOpen /> Quản lý món ăn</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Thêm món ăn
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm món ăn..."
          className="border px-4 py-2 rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          className="border px-4 py-2 rounded w-full md:w-1/4 mt-2 md:mt-0"
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          {dishTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border bg-white rounded shadow-sm">
          <thead>
            <tr className="bg-red-500 text-left text-sm font-semibold text-white">
              <th className="p-3">Hình ảnh</th>
              <th className="p-3">Tên món</th>
              <th className="p-3">Loại</th>
              <th className="p-3">Giá (VNĐ)</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDishes.map((dish) => (
              <tr key={dish.id} className="border-t text-sm hover:bg-red-50 cursor-pointer" onClick={()=>navigate(`/rest/dishes/${dish.id}`)}>
                <td className="p-3">
                  <img
                    src={dish.image || 'https://via.placeholder.com/60x50'}
                    alt="Dish"
                    className="w-[60px] h-[50px] rounded object-cover"
                  />
                </td>
                <td className="p-3">{dish.name}</td>
                <td className="p-3">{dish.type}</td>
                <td className="p-3">{dish.price.toLocaleString()}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      dish.status === 'Đang bán' ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  >
                    {dish.status}
                  </span>
                </td>
                <td className="p-3 text-center space-x-2">
                  <button className="bg-yellow-400 px-3 py-1 rounded text-white text-xs hover:bg-yellow-500">
                    Sửa
                  </button>
                  <button className="bg-red-500 px-3 py-1 rounded text-white text-xs hover:bg-red-600">
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
            {paginatedDishes.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  Không tìm thấy món ăn nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Dishes;
