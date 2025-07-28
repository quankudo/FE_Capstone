import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RenderChart from '../../components/RenderChart';
import { Star } from 'lucide-react';
import ListComment from '../../components/ListComment';

// Fake data

const fakeByHour = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}h`,
  good: Math.floor(Math.random() * 20),
  bad: Math.floor(Math.random() * 10)
}));

const fakeByWeekday = [
  { day: 'Thứ 2', good: 12, bad: 3 },
  { day: 'Thứ 3', good: 15, bad: 2 },
  { day: 'Thứ 4', good: 10, bad: 4 },
  { day: 'Thứ 5', good: 18, bad: 5 },
  { day: 'Thứ 6', good: 20, bad: 1 },
  { day: 'Thứ 7', good: 25, bad: 6 },
  { day: 'CN', good: 30, bad: 8 }
];

const fakeByWeek = Array.from({ length: 4 }, (_, i) => ({
  week: `Tuần ${i + 1}`,
  good: Math.floor(Math.random() * 50),
  bad: Math.floor(Math.random() * 20)
}));

const fakeByMonth = [
  'T1', 'T2', 'T3', 'T4', 'T5', 'T6',
  'T7', 'T8', 'T9', 'T10', 'T11', 'T12'
].map(m => ({
  month: m,
  good: Math.floor(Math.random() * 100),
  bad: Math.floor(Math.random() * 40)
}));

const Dashboard = ({ restId }) => {
  const [stats, setStats] = useState({
    goodReviews: 0,
    badReviews: 0,
    favorites: 0,
    dishes: 0
  });
  const [scope, setScope] = useState('today'); // today | week | month | year
  const scopes = [
    { value: 'today', label: 'Hôm nay' },
    { value: 'week', label: 'Tuần này' },
    { value: 'month', label: 'Tháng này' },
    { value: 'year', label: 'Năm nay' }
  ];

  const handleChangeScope = (value) => setScope(value);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`/api/statistics?restId=${restId}&scope=${scope}`);
      setStats(res.data.data);
    } catch (err) {
      console.error('Lỗi khi tải dữ liệu thống kê:', err);
    }
  };

  useEffect(() => {
    if (restId) fetchStats();
  }, [restId, scope]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-medium mb-4">Thống kê nhà hàng</h2>

      <div className="mb-6 flex gap-4 justify-end">
        {scopes.map((s) => (
          <button
            key={s.value}
            className={`px-4 py-2 rounded border border-red-500 ${s.value === scope ? 'bg-red-500 text-white' : 'text-red-500'}`}
            onClick={() => handleChangeScope(s.value)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Đánh giá tốt</h3>
          <p className="text-2xl">{stats.goodReviews}</p>
        </div>
        <div className="bg-blue-200 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Đánh giá xấu</h3>
          <p className="text-2xl">{stats.badReviews}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Yêu thích</h3>
          <p className="text-2xl">{stats.favorites}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Món ăn</h3>
          <p className="text-2xl">{stats.dishes}</p>
        </div>
      </div>

      {/* Charts */}
      {(() => {
        switch (scope) {
            case 'today':
            return RenderChart('Đánh giá theo giờ trong ngày', fakeByHour, 'today');
            case 'week':
            return RenderChart('Đánh giá theo ngày trong tuần', fakeByWeekday, 'week');
            case 'month':
            return RenderChart('Đánh giá theo tuần trong tháng', fakeByWeek, 'month');
            case 'year':
            return RenderChart('Đánh giá theo tháng trong năm', fakeByMonth, 'year');
            default:
            return null;
        }
        })()}
      <div className='flex justify-between'>
        <div className='w-[55%]'>
          <h3 className='text-lg font-semibold mb-4'>Cac mon an duoc danh gia cao</h3>
          <div className='flex flex-col gap-3'>
            <div className='flex justify-between'>
              <img src="" alt="" className='w-[60px] h-[60px] rounded-full'/>
              <div className='flex flex-col gap-2'>
                <h4>Ten mon an</h4>
                <div className="flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < Math.round(4.4) ? 'currentColor' : 'none'}
                      stroke="currentColor"
                    />
                  ))}
                  <span className="ml-1 text-gray-600 text-sm">{4.4}</span>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='rounded-2xl px-4 py-[4px] bg-green-500 text-white'>10 good</span> 
              <span className='rounded-2xl px-4 py-[4px] bg-red-500 text-white'>5 bad</span>
            </div>
            </div>
          </div>
        </div>

        <ListComment />
      </div>
    </div>
  );
};

export default Dashboard;
