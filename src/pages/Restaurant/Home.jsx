import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import restaurantApi from '../../api/restaurantApi';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import formatTime from '../../utils/formatTime';
import { IoRestaurant } from 'react-icons/io5';
import TitleDashboard from '../../components/TitleDashboard';

const HomeRestaurant = () => {
  const {user, isAuthenticated} = useSelector(state => state.auth)
  const [loading, setLoading] = useState(false)
  const [restaurant, setRestaurant] = useState({})

  useEffect(()=> {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await restaurantApi.getRestaurantByUserId(user.id)
        setRestaurant(response)
      } catch (error) {
        toast.error(error.message)
        console.log(error);
      }
      finally {
        setLoading(false)
      }
    }

    fetchData()
  },[])

  if(loading)
    return <Loading />

  return (
    <div className="p-4">
      <TitleDashboard Icon={IoRestaurant} title={'Thông tin nhà hàng'} />

      <div className="bg-white shadow rounded-2xl p-6 flex flex-col gap-6">
        {/* Ảnh nhà hàng */}
        <div className="col-span-1 flex justify-center items-start">
          <img
            src={restaurant.ImageUrl || 'https://via.placeholder.com/250x180?text=Restaurant'}
            alt="Restaurant"
            className="rounded w-full md:w-full h-[300px] object-cover"
          />
        </div>

        {/* Thông tin chính */}
        <div className="col-span-2 space-y-3 text-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><span className="font-semibold">Tên:</span> {restaurant.Name}</p>
            <p><span className="font-semibold">Email:</span> {restaurant.Email}</p>
            <p><span className="font-semibold">Số điện thoại:</span> {restaurant.PhoneNumber}</p>
            <p><span className="font-semibold">Website:</span> 
              <a href={restaurant.Website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1">
                {restaurant.Website}
              </a>
            </p>
            <p><span className="font-semibold">Khu vực:</span> {restaurant.DistrictName}, {restaurant.CityName}</p>
            <p><span className="font-semibold">Giờ hoạt động:</span> {formatTime(restaurant.OpenTime)} - {formatTime(restaurant.CloseTime)}</p>
          </div>

          {/* Trạng thái + Đánh giá */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-4 border-t">
            <div>
              <p>
                <span className="font-semibold">Trạng thái:</span>{' '}
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white 
                  ${restaurant.Status ? 'bg-green-600' : 'bg-gray-500'}`}>
                  {restaurant.Status ? 'Đang hoạt động' : 'Tạm ngưng'}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-yellow-500 font-semibold">⭐ {parseFloat(restaurant.Score).toFixed(1)} / 5</p>
              <p>
                <span className="text-green-600 font-medium">{restaurant.GoodReviews} tích cực</span>,{' '}
                <span className="text-red-500 font-medium">{restaurant.BadReviews} tiêu cực</span>
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className="mt-6 bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Giới thiệu</h2>
        <p className="text-gray-700">{restaurant.Desc}</p>
      </div>

      <div className="mt-6 bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Vị trí trên bản đồ</h2>
        <iframe
          width="100%"
          height="300"
          className="rounded"
          loading="lazy"
          src={`https://www.google.com/maps?q=${restaurant.Latitude},${restaurant.Longitude}&hl=vi&z=16&output=embed`}
        ></iframe>
      </div>
    </div>
  );
};

export default HomeRestaurant;
