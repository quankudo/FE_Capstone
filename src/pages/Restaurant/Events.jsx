import React, { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaCalendarAlt } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';

import TitleDashboard from '../../components/TitleDashboard';
import eventApi from '../../api/eventApi'; // API giống dishApi

const EVENTS_PER_PAGE = 4;

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

const Events = () => {
  const { restaurantInfo } = useSelector(state => state.auth);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [typeEvent, setTypeEvent] = useState('')
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const params = {
        page: currentPage,
        limit: EVENTS_PER_PAGE,
        search: search.trim(),
        type: typeEvent,
        restaurantId: restaurantInfo.Id,
      };
      const response = await eventApi.getAllEventsByRest(params);
      setEvents(response.data);
      setTotalPages(response.pagination.totalPages);
      console.log(response);
      
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (restaurantInfo?.Id) {
      fetchData();
    }
  }, [restaurantInfo.Id, search, currentPage, typeEvent]);

  const handlePageChange = (page) => setCurrentPage(page);

  const formatDate = (str) =>
    new Date(str).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-3">
        <TitleDashboard Icon={FaCalendarAlt} title={'Quản lý sự kiện'} />
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm sự kiện..."
          className="border px-4 py-2 rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          className="border px-4 py-2 rounded w-full md:w-1/4 mt-2 md:mt-0"
          value={typeEvent}
          onChange={(e) => {
            setTypeEvent(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value={''} selected={true}>Tất cả</option>
          {TypeEvents.map((type) => (
            <option key={type.value} value={type.value}>
              {type.title}
            </option>
          ))}
        </select>
        <button
          onClick={() => navigate('/rest/events/create')}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-2 md:mt-0"
        >
          <FiPlus size={20} /> Thêm sự kiện
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border bg-white rounded shadow-sm">
          <thead>
            <tr className="bg-red-500 text-left text-sm font-semibold text-white">
              <th className="p-3">Hình ảnh</th>
              <th className="p-3">Tiêu đề</th>
              <th className="p-3">Thời gian</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => {
              const now = new Date();
              const isExpired = new Date(event.EndDate) < now;
              const isActive = event.IsActive && !isExpired;

              return (
                <tr key={event.Id} className="border-t text-sm hover:bg-red-50 cursor-pointer" onClick={() => navigate(`/rest/events/${event.Id}`)}>
                  <td className="p-3">
                    <img
                      src={event.ImageUrl || 'https://via.placeholder.com/60x50'}
                      alt={event.Title}
                      className="w-[120px] h-[60px] rounded object-cover"
                    />
                  </td>
                  <td className="p-3">{event.Title}</td>
                  <td className="p-3">
                    {formatDate(event.StartDate)} → {formatDate(event.EndDate)}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        !event.IsActive
                          ? 'bg-gray-400'
                          : isExpired
                          ? 'bg-yellow-400'
                          : 'bg-green-500'
                      }`}
                    >
                      {!event.IsActive
                        ? 'Đã ẩn'
                        : isExpired
                        ? 'Đã kết thúc'
                        : 'Đang diễn ra'}
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
              );
            })}
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

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default Events;
