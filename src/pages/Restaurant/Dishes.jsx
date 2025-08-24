import React, { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import { useNavigate } from 'react-router-dom';

import dishApi from '../../api/dishApi';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { IoFastFoodSharp } from 'react-icons/io5';
import { FiPlus } from 'react-icons/fi';
import TitleDashboard from '../../components/TitleDashboard';

const DISHES_PER_PAGE = 4;

const Dishes = () => {
  const {user, isAuthenticated, restaurantInfo} = useSelector(state => state.auth)
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dishes, setDishes] = useState([])
  const [types, setTypes] = useState([])

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const res = await dishApi.getDishTypes()
        setTypes(res)
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }
    fetchData()
  },[restaurantInfo.Id])

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const params = {
          page: currentPage,
          limit: DISHES_PER_PAGE,
          search: search,
          restaurantId: restaurantInfo.Id, // Giả sử city là idDistrict
          type: typeFilter==0 ? undefined : typeFilter, // Có thể thêm lọc theo loại nhà hàng nếu muốn
          // minRating : minRating,
          // sortOrder : sortOrder
        };
        console.log(params);
        
        const response = await dishApi.getAllDishes(params)
        console.log(response);
        
        setDishes(response.data)
        setTotalPages(response.pagination.totalPages)
      } catch (error) {
        toast.error(error.message)
        console.log(error);
      }
    }

    fetchData()
  },[restaurantInfo.Id, typeFilter, currentPage, search])

  const navigate = useNavigate();

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-3">
        <TitleDashboard Icon={IoFastFoodSharp} title={'Quản lý món ăn'} />
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
          <option value={0}>Tất cả</option>
          {types.map((type) => (
            <option key={type.Id} value={type.Id}>
              {type.Name}
            </option>
          ))}
        </select>
        <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          <FiPlus size={20} /> Thêm món ăn
        </button>
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
            {dishes.map((dish) => (
              <tr key={dish.Id} className="border-t text-sm hover:bg-red-50 cursor-pointer" onClick={()=>navigate(`/rest/dishes/${dish.Id}`)}>
                <td className="p-3">
                  <img
                    src={dish.ImageUrl || 'https://via.placeholder.com/60x50'}
                    alt={dish.Name}
                    className="w-[60px] h-[50px] rounded object-cover"
                  />
                </td>
                <td className="p-3">{dish.Name}</td>
                <td className="p-3">{dish.TypeDishName}</td>
                <td className="p-3">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dish.Price)}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      dish.Status === 1 ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  >
                    {dish.Status === 1 ? "Đang bán" : "Ngừng bán"}
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
            {dishes.length === 0 && (
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
