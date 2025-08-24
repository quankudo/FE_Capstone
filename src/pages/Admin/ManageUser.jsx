import React, { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import { useNavigate } from 'react-router-dom';

import userApi from '../../api/userApi';
import cityApi from '../../api/cityApi';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FaUsers } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import TitleDashboard from '../../components/TitleDashboard';

const USERS_PER_PAGE = 5;

const roleOptions = [
  { value: '', label: 'Tất cả vai trò' },
  { value: 'Customer', label: 'Khách hàng' },
  { value: 'Restaurant', label: 'Nhà hàng' },
  { value: 'Admin', label: 'Quản trị viên' },
];

const ManageUser = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [users, setUsers] = useState([]);
  const [cities, setCities] = useState([])

  useEffect(()=> {
    const fetchCities = async () => {  
      try {
        const res = await cityApi.getAllCities();
        setCities(res)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCities()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          page: currentPage,
          limit: USERS_PER_PAGE,
          search,
          role: roleFilter || undefined,
          cityId: cityFilter || undefined,
        };
        const res = await userApi.getAllUsers(params);
        setUsers(res.data);
        setTotalPages(res.pagination.totalPages);
      } catch (err) {
        toast.error('Lỗi tải danh sách người dùng');
        console.error(err);
      }
    };
    fetchData();
  }, [search, roleFilter, cityFilter, currentPage]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-3">
        <TitleDashboard Icon={FaUsers} title={'Quản lý người dùng'} />
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          className="border px-4 py-2 rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          className="border px-4 py-2 rounded w-full md:w-1/4 mt-2 md:mt-0"
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          {roleOptions.map(role => (
            <option key={role.value} value={role.value}>
              {role.label}
            </option>
          ))}
        </select>
        <select
          className="border px-4 py-2 rounded w-full md:w-1/4 mt-2 md:mt-0"
          value={cityFilter}
          onChange={(e) => {
            setCityFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option>Tất cả thành phố</option>
          {cities.map(city => (
            <option key={city.Id} value={city.Id}>
              {city.Name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border bg-white rounded shadow-sm">
          <thead>
            <tr className="bg-red-500 text-left text-sm font-semibold text-white">
              <th className="p-3">Họ tên</th>
              <th className="p-3">Email</th>
              <th className="p-3">Vai trò</th>
              <th className="p-3">Thành phố</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.Id} className="border-t text-sm hover:bg-red-50">
                <td className="p-3">{u.Name}</td>
                <td className="p-3">{u.Email}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${u.Role === 'Admin' ? 'bg-purple-100 text-purple-700' : ''}
                      ${u.Role === 'Restaurant' ? 'bg-green-100 text-green-700' : ''}
                      ${u.Role === 'Customer' ? 'bg-blue-100 text-blue-700' : ''}
                    `}
                  >
                    {u.Role}
                  </span>
                </td>
                <td className="p-3">{u.CityName} - {u.DistrictName}</td>
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
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  Không tìm thấy người dùng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default ManageUser;
