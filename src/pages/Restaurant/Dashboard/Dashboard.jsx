import React, { useEffect, useState } from 'react';
import RenderChart from '../../../components/RenderChart';
import { Star } from 'lucide-react';
import RecentReviews from './RecentReviews';
import evaluateRestaurantApi from '../../../api/evaluateRestaurantApi'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import dishApi from '../../../api/dishApi';
import dashboadRestaurantApi from '../../../api/dashboadRestaurantApi';
import { MdDashboard } from 'react-icons/md';
import { bibimbap, love, negative_comment, positive_comment } from '../../../assets/images';
import TitleDashboard from '../../../components/TitleDashboard';

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

const Dashboard = () => {
  const {user, isAuthenticated, restaurantInfo} = useSelector(state => state.auth)
  
  const [reviews, setReviews] = useState([])
  const [dishes, setDishes] = useState([])
  const [stats, setStats] = useState({
    goodReviews: 0,
    badReviews: 0,
    favorites: 0,
    dishes: 0
  });
    const [scope, setScope] = useState('today'); // today | week | month | year
  
  useEffect(()=>{
    if (!restaurantInfo?.Id) return;
    const fetchData = async () => {
      try {
        const responseReviews = await evaluateRestaurantApi.getEvaluateByRestId(restaurantInfo.Id)
        const responseDishes = await dishApi.getTopDishesByRestId(restaurantInfo.Id)
        const responseRestInfo = await dashboadRestaurantApi.getAllInfo(restaurantInfo.Id, scope)
        const { reviews, favorites, dishes } = responseRestInfo;

        setStats(prev => ({
          ...prev,
          goodReviews: reviews?.good || 0,
          badReviews: reviews?.bad || 0,
          favorites: favorites || 0,
          dishes: dishes || 0
        }));
        setDishes(responseDishes)
        setReviews(responseReviews)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  },[restaurantInfo.Id, scope])

  const scopes = [
    { value: 'today', label: 'Hôm nay' },
    { value: 'week', label: 'Tuần này' },
    { value: 'month', label: 'Tháng này' },
    { value: 'year', label: 'Năm nay' }
  ];

  const handleChangeScope = (value) => setScope(value);

  const fetchStats = async () => {
    try {
      const responseRestInfo = await dashboadRestaurantApi.getAllInfo(restaurantInfo.Id, scope)
      const { reviews, favorites, dishes } = responseRestInfo;
      setStats(prev => ({
        ...prev,
        goodReviews: reviews?.good || 0,
        badReviews: reviews?.bad || 0,
        favorites: favorites || 0,
        dishes: dishes || 0
      }));
    } catch (err) {
      console.error('Lỗi khi tải dữ liệu thống kê:', err);
    }
  };

  useEffect(() => {
    if (restaurantInfo.Id) fetchStats();
  }, [restaurantInfo.Id, scope]);

  return (
    <div className="p-6">
      <TitleDashboard Icon={MdDashboard} title={'Thống kê nhà hàng'} />
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
        <div className="flex justify-between items-center bg-blue-100 p-4 rounded shadow">
          <div>
            <h3 className="text-lg font-semibold">Đánh giá tốt</h3>
            <p className="text-2xl">{stats.goodReviews}</p>
          </div>
          <img src={positive_comment} alt="positive_comment" className='w-[50px]'/>
        </div>
        <div className="flex justify-between items-center bg-blue-200 p-4 rounded shadow">
          <div>
            <h3 className="text-lg font-semibold">Đánh giá xấu</h3>
            <p className="text-2xl">{stats.badReviews}</p>
          </div>
          <img src={negative_comment} alt="negative_comment" className='w-[50px]'/>
        </div>
        <div className="flex justify-between items-center bg-green-100 p-4 rounded shadow">
          <div>
            <h3 className="text-lg font-semibold">Yêu thích</h3>
            <p className="text-2xl">{stats.favorites}</p>
          </div>
          <img src={love} alt="positive_comment" className='w-[50px]'/>
        </div>
        <div className="flex justify-between items-center bg-yellow-100 p-4 rounded shadow">
          <div>
            <h3 className="text-lg font-semibold">Món ăn</h3>
            <p className="text-2xl">{stats.dishes}</p>
          </div>
          <img src={bibimbap} alt="negative_comment" className='w-[50px]'/>
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
          <h3 className='text-lg font-semibold mb-4'>Các món ăn được đánh giá cao</h3>
          <div className='flex flex-col gap-4'>
            {dishes.length === 0 && <p>Chưa có đánh giá nào.</p>}
            {
              dishes && dishes.map((item)=> (
                <div key={item.Id} className='flex justify-between'>
                  <img src={item.ImageUrl} alt={item.Name} className='w-[150px] h-[70px] rounded'/>
                  <div className='flex flex-col gap-2 flex-1 ml-20'>
                    <h4>{item.Name}</h4>
                    <div className="flex items-center gap-1 text-yellow-500">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          size={18}
                          fill={i < Math.round(parseFloat(item.Score).toFixed(1)) ? 'currentColor' : 'none'}
                          stroke="currentColor"
                        />
                      ))}
                      <span className="ml-1 text-gray-600 text-sm">{parseFloat(item.Score).toFixed(1)}</span>
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <span className='rounded-2xl w-[100px] text-center px-4 py-[4px] bg-green-500 text-white'>{item.GoodReviews} good</span> 
                  <span className='rounded-2xl w-[100px] text-center px-4 py-[4px] bg-red-500 text-white'>{item.BadReviews} bad</span>
                </div>
                </div>
              ))
            }
          </div>
        </div>
        <RecentReviews reviews={reviews}/>
      </div>
    </div>
  );
};

export default Dashboard;
