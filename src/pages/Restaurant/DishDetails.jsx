import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RenderChart from '../../components/RenderChart';
import ListComment from '../../components/ListComment';
import dishApi from '../../api/dishApi';
import evaluateDishApi from '../../api/evaluateDishApi';
import Loading from '../../components/Loading'
import { IoFastFoodSharp } from 'react-icons/io5';
import TitleDashboard from '../../components/TitleDashboard';

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
  const [dish, setDishes] = useState({})
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const scopes = [
    { value: 'today', label: 'Hôm nay' },
    { value: 'week', label: 'Tuần này' },
    { value: 'month', label: 'Tháng này' },
    { value: 'year', label: 'Năm nay' }
  ];

  const handleChangeScope = (value) => setScope(value);

  useEffect(()=>{
    setLoading(true)
    const fetchData = async () => {
      try {
        const resDish = await dishApi.getDishById(id)
        const resComment = await evaluateDishApi.getEvaluateByDishId(id)
        const resStats = await dishApi.getStatsDishes(id)

        setStats({goodReviews: resStats.GoodReviews, badReviews: resStats.BadReviews, favorites: resStats.TotalFavorites})
        setDishes(resDish)
        setComments(resComment)
      } catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false)
      }
    }
    fetchData()
  },[id])

  if(loading)
    return <Loading />

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
            <TitleDashboard Icon={IoFastFoodSharp} title={`Chi tiết món ăn - ${dish.Name}`} />
            <div className='flex flex-col gap-3 mb-3'>
                <img
                    src={dish.ImageUrl || 'https://via.placeholder.com/300x200'}
                    alt="Dish"
                    className="w-full h-[250px] object-cover rounded"
                />

                <div className="space-y-2 text-gray-700">
                    <p><span className="font-semibold">Tên món:</span> {dish.Name}</p>
                    <p><span className="font-semibold">Loại:</span> {dish.TypeDishName}</p>
                    <p><span className="font-semibold">Giá:</span> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dish.Price)} VNĐ</p>
                    <p>
                    <span className="font-semibold">Trạng thái:</span>{' '}
                    <span
                        className={`px-2 py-1 rounded text-white text-xs ${
                        dish.Status === 1 ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                    >
                        {dish.Status === 1 ? "Đang bán" : "Ngừng bán"}
                    </span>
                    </p>
                    <p><span className="font-semibold">Mô tả:</span> {dish.Desc || 'Không có mô tả.'}</p>
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
        <ListComment reviews={comments} />
    </div>
      <div className="mb-6 mt-6 flex gap-4 justify-end">
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
