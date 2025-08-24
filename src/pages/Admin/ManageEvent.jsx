import React, { useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import Pagination from '../../components/Pagination';
import TitleDashboard from '../../components/TitleDashboard';
import eventApi from '../../api/eventApi';
import { toast } from 'react-toastify';
import restaurantApi from '../../api/restaurantApi';

const EVENTS_PER_PAGE = 5;

const TypeEvents = [
  { value: 'promotion',
    title: "Khuyến mãi"
  },
  { value: 'special',
    title: "Sự kiện đặc biệt"
  },
  { value: 'event',
    title: "Tiệc / buổi tiệc"
  },
  { value: 'tasting',
    title: "Sự kiện thử món ăn"
  },
  { value: 'live_music',
    title: "Biểu diễn âm nhạc trực tiếp"
  },
]

const EventsMap = {
  promotion : 'Khuyến mãi',
  special : 'Sự kiện đặc biệt',
  event : 'Tiệc / buổi tiệc',
  tasting : 'Sự kiện thử món ăn',
  live_music : 'Biểu diễn âm nhạc trực tiếp'
}

const ManageEvent = () => {
  const [search, setSearch] = useState('');
  const [restaurantFilter, setRestaurantFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [events, setEvents] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const resRestaurants = await restaurantApi.getAllRestaurants();
        setRestaurants(resRestaurants);
      } catch (error) {
        toast.error('Lỗi tải dữ liệu bộ lọc');
        console.error(error);
      }
    };
    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const params = {
          page: currentPage,
          limit: EVENTS_PER_PAGE,
          search: search || undefined,
          restaurantId: restaurantFilter || undefined,
          type: typeFilter,
        };
        const res = await eventApi.getAllEventsByRest(params);
        setEvents(res.data)
        setTotalPages(res.pagination.totalPages);
      } catch (error) {
        toast.error('Lỗi tải danh sách sự kiện');
        console.error(error);
      }
    };
    fetchEvents();
  }, [search, restaurantFilter, typeFilter, currentPage]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-3">
        <TitleDashboard Icon={FaCalendarAlt} title="Quản lý sự kiện" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm tên sự kiện..."
          className="border px-4 py-2 rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          className="border px-4 py-2 rounded w-full md:w-1/4 mt-2 md:mt-0"
          value={restaurantFilter}
          onChange={(e) => {
            setRestaurantFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Tất cả nhà hàng</option>
          {restaurants.map((r) => (
            <option key={r.Id} value={r.Id}>
              {r.Name}
            </option>
          ))}
        </select>
        <select
          className="border px-4 py-2 rounded w-full md:w-1/4 mt-2 md:mt-0"
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Tất cả loại sự kiện</option>
          {TypeEvents.map((t) => (
            <option key={t.value} value={t.value}>
              {t.title}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border bg-white rounded shadow-sm">
          <thead>
            <tr className="bg-red-500 text-left text-sm font-semibold text-white">
              <th className="p-3">Tên sự kiện</th>
              <th className="p-3">Nhà hàng</th>
              <th className="p-3">Loại</th>
              <th className="p-3">Thời gian</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.Id} className="border-t text-sm hover:bg-red-50">
                <td className="p-3">{e.Title}</td>
                <td className="p-3">{e.RestaurantName}</td>
                <td className="p-3">{EventsMap[e.Type]}</td>
                <td className="p-3">{new Date(e.StartDate).toLocaleDateString()} - {new Date(e.EndDate).toLocaleDateString()}</td>
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
            {events.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  Không tìm thấy sự kiện nào.
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

export default ManageEvent;
