import React, { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaStore } from 'react-icons/fa';

import TitleDashboard from '../../components/TitleDashboard';
import restaurantApi from '../../api/restaurantApi';
import cityApi from '../../api/cityApi';
import { Star, StarIcon, StarsIcon } from 'lucide-react';

const RESTAURANTS_PER_PAGE = 5;

const ratingOptions = [
  { value: '', label: 'Tất cả số sao' },
  { value: 5, label: '5 sao' },
  { value: 4, label: '4 sao trở lên' },
  { value: 3, label: '3 sao trở lên' },
];

const ManageRestaurant = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [types, setTypes] = useState([]);
  const [cities, setCities] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [resTypes, resCities] = await Promise.all([
          restaurantApi.getTypeRestaurants(),
          cityApi.getAllCities(),
        ]);
        setTypes(resTypes);
        setCities(resCities);
      } catch (err) {
        toast.error('Lỗi tải bộ lọc');
        console.error(err);
      }
    };
    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const params = {
          page: currentPage,
          limit: RESTAURANTS_PER_PAGE,
          search,
          idType: typeFilter || undefined,
          idDistrict: cityFilter || undefined,
          minRating: ratingFilter || undefined,
        };
        const res = await restaurantApi.getRestaurants(params);
        
        setRestaurants(res.data);
        setTotalPages(res.totalPages);
      } catch (err) {
        toast.error('Lỗi tải danh sách nhà hàng');
        console.error(err);
      }
    };
    fetchRestaurants();
  }, [search, typeFilter, cityFilter, ratingFilter, currentPage]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-3">
        <TitleDashboard Icon={FaStore} title="Quản lý nhà hàng" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          className="border px-4 py-2 rounded w-full md:w-1/4"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          className="border px-4 py-2 rounded w-full md:w-1/4"
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Tất cả loại</option>
          {types.map((t) => (
            <option key={t.Id} value={t.Id}>
              {t.Name}
            </option>
          ))}
        </select>
        <select
          className="border px-4 py-2 rounded w-full md:w-1/4"
          value={cityFilter}
          onChange={(e) => {
            setCityFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Tất cả thành phố</option>
          {cities.map((c, idx) => (
            <option key={c.Id} value={c.Id}>
              {c.Name}
            </option>
          ))}
        </select>
        <select
          className="border px-4 py-2 rounded w-full md:w-1/4"
          value={ratingFilter}
          onChange={(e) => {
            setRatingFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          {ratingOptions.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border bg-white rounded shadow-sm">
          <thead>
            <tr className="bg-red-500 text-left text-sm font-semibold text-white">
              <th className="p-3">Hinh anh</th>
              <th className="p-3">Tên</th>
              <th className="p-3">Loại</th>
              <th className="p-3">Thành phố</th>
              <th className="p-3">Đánh giá</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((res) => (
              <tr key={res.Id} className="border-t text-sm hover:bg-red-50">
                <td className="p-3">
                  <img
                    src={res.ImageUrl || "https://via.placeholder.com/60x50?text=No+Image"}
                    alt={res.Name}
                    className="w-[80px] h-[50px] rounded object-cover"
                  />
                </td>
                <td className="p-3">{res.Name}</td>
                <td className="p-3">{res.TypeName}</td>
                <td className="p-3">{res.CityName} - {res.DistrictName}</td>
                <td className="p-3">{res.Score?.toFixed(1)} ⭐</td>
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
            {restaurants.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  Không tìm thấy nhà hàng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ManageRestaurant;
