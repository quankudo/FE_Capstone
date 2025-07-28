import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RenderChart from '../../components/RenderChart';
import ListComment from '../../components/ListComment';

const fakeDishes = [
  { id: 1, name: 'Phở Bò', type: 'Món chính', price: 45000, status: 'Đang bán', image: '', desc: 'Phở bò truyền thống thơm ngon.' },
  { id: 2, name: 'Cà phê sữa đá', type: 'Đồ uống', price: 25000, status: 'Tạm ngưng', image: '', desc: 'Cà phê sữa đá đậm đà.' },
  { id: 3, name: 'Bánh mì chảo', type: 'Món phụ', price: 35000, status: 'Đang bán', image: '', desc: 'Bánh mì chảo đầy đủ topping.' },
  { id: 4, name: 'Bún Chả', type: 'Món chính', price: 50000, status: 'Đang bán', image: '', desc: 'Bún chả thơm ngon Hà Nội.' },
  { id: 5, name: 'Trà đá', type: 'Đồ uống', price: 10000, status: 'Đang bán', image: '', desc: 'Trà đá mát lạnh giải khát.' },
  { id: 6, name: 'Bánh flan', type: 'Món phụ', price: 20000, status: 'Tạm ngưng', image: '', desc: 'Bánh flan béo mềm.' },
  { id: 7, name: 'Cơm gà', type: 'Món chính', price: 55000, status: 'Đang bán', image: '', desc: 'Cơm gà chiên giòn.' },
  { id: 8, name: 'Sinh tố bơ', type: 'Đồ uống', price: 30000, status: 'Đang bán', image: '', desc: 'Sinh tố bơ béo ngậy.' },
];

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

const DishDetails = () => {
  const { id } = useParams();
  const [stats, setStats] = useState({
    goodReviews: 0,
    badReviews: 0,
    favorites: 0,
  });
  const [scope, setScope] = useState('today'); // today | week | month | year
  const navigate = useNavigate();
  const dishId = parseInt(id, 10);
  const dish = fakeDishes.find((d) => d.id === dishId);

  if (!dish) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>Không tìm thấy món ăn.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className='p-4'>
    <div className='flex gap-8'>
        <div className="w-[55%] bg-white rounded ">
            <h1 className="text-2xl font-medium mb-4">Chi tiết món ăn</h1>

            <div className='flex gap-3'>
                <img
                    src={dish.image || 'https://via.placeholder.com/300x200'}
                    alt="Dish"
                    className="w-[300px] h-[200px] object-cover rounded mb-4"
                />

                <div className="space-y-2 text-gray-700">
                    <p><span className="font-semibold">Tên món:</span> {dish.name}</p>
                    <p><span className="font-semibold">Loại:</span> {dish.type}</p>
                    <p><span className="font-semibold">Giá:</span> {dish.price.toLocaleString()} VNĐ</p>
                    <p>
                    <span className="font-semibold">Trạng thái:</span>{' '}
                    <span
                        className={`px-2 py-1 rounded text-white text-xs ${
                        dish.status === 'Đang bán' ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                    >
                        {dish.status}
                    </span>
                    </p>
                    <p><span className="font-semibold">Mô tả:</span> {dish.desc || 'Không có mô tả.'}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-100 p-4 rounded shadow">
                    <h3 className="text-lg font-medium">Đánh giá tốt</h3>
                <p className="text-2xl">{stats.goodReviews}</p>
                </div>
                <div className="bg-green-100 p-4 rounded shadow">
                    <h3 className="text-lg font-semibold">Đánh giá xấu</h3>
                <p className="text-2xl">{stats.badReviews}</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded shadow">
                    <h3 className="text-lg font-semibold">Yêu thích</h3>
                <p className="text-2xl">{stats.favorites}</p>
                </div>
            </div>
        </div>
        <ListComment />
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
    </div>
  );
};

export default DishDetails;
