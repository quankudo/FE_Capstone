import React, { useEffect, useState } from 'react';
import InfoTitle from '@/components/InfoTitle';
import { useParams } from 'react-router-dom';
import restaurantApi from '@/api/restaurantApi';
import { toast } from 'react-toastify';
import dishApi from '@/api/dishApi';
import evaluateRestaurantApi from '@/api/evaluateRestaurantApi';
import formatTime from '@/utils/formatTime'

import ListReview from '@/components/ListReview';
import Evaluate from '@/components/Evaluate';
import Swal from 'sweetalert2';
import Loading from '@/components/Loading';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FlaskAPI } from '@/constant';

const RestaurantDetail = () => {

  const {user, isAuthenticated} = useSelector(state => state.auth)
  const [restaurant, setRestaurant] = useState({})
  const [dishes, setDishes] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [comment, setComment] = useState('');
  const { id } = useParams();
  console.log(id);
  

  const handleSendReview = async() => {
    if (comment.trim() === '') return;
    setLoading(true)
    try {
      const aiRes = await axios.post(FlaskAPI, {
        review: comment
      });
      console.log(aiRes);
      
      const isPositive = aiRes.data.label === 'Positive';

      const comments = {
        IdUser: user.id,
        Comment: comment,
        Id: id,
        TypeReview: isPositive,
      };
      
      await evaluateRestaurantApi.AddEvaluate(comments);
      const response = await restaurantApi.getRestaurantById(id)
      const responseReview = await evaluateRestaurantApi.getEvaluateByRestId(id)
      setReviews(responseReview)
      setRestaurant(response)
      // 3. Show thông báo
      Swal.fire({
        icon: isPositive ? 'success' : 'info',
        title: isPositive ? '🎉 Cảm ơn bạn rất nhiều!' : '🙏 Cảm ơn bạn đã góp ý!',
        text: isPositive
          ? 'Chúng tôi rất vui khi nhận được đánh giá tích cực từ bạn. Phản hồi của bạn là nguồn động lực lớn để chúng tôi không ngừng nâng cao chất lượng dịch vụ!'
          : 'Chúng tôi xin ghi nhận những phản hồi chân thành từ bạn. Đội ngũ của chúng tôi sẽ xem xét và cải thiện dịch vụ trong thời gian tới!',
        confirmButtonText: 'Đóng',
        confirmButtonColor: '#3085d6',
      });
  
    } catch (error) {
      toast.error('Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại sau.');
      console.error('Chi tiết lỗi:', error);
    }
    finally {
      setLoading(false)
      setComment('');
    }
  };

  useEffect(()=>{
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await restaurantApi.getRestaurantById(id)
        const responseDish = await dishApi.getAllDishesByRestId(id)
        const responseReview = await evaluateRestaurantApi.getEvaluateByRestId(id)
        setRestaurant(response)
        setReviews(responseReview)
        setDishes(responseDish)
        console.log(responseReview);
        
      } catch (error) {
        toast.error(error.message)
        console.log(error);
      }
      finally {
        setComment('')
        setLoading(false)
      }
    }
    fetchData()
  },[id])
  if(loading)
    return <Loading />
  return (
    <div className="px-32 pb-10 pt-5">
      {/* 1. Banner */}
      <div className="relative">
        <img src={restaurant.ImageUrl} alt={restaurant.Name} className="rounded-xl w-full h-80 object-cover mb-4" />
        <div className="absolute bottom-4 left-4 bg-red-600 text-white px-4 py-2 rounded">
          <h1 className="text-2xl font-bold">{restaurant.Name}</h1>
          <p>{restaurant.TypeName} • ⭐ {parseFloat(restaurant.Score).toFixed(1)}</p>
        </div>
      </div>

      {/* 2. Thông tin */}
      <div>
  {/* Thông tin liên hệ */}
    <InfoTitle text={"Thông tin liên hệ"} />
  <div className="grid md:grid-cols-3 gap-5 items-center">
    
    <p>
      <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-lg font-medium mr-2">📍 Địa chỉ:</span>
      {`${restaurant.CityName} - ${restaurant.DistrictName}`}
    </p>
    <p>
      <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-lg font-medium mr-2">🏙️ Thành phố:</span>
      {restaurant.CityName}
    </p>
    <p>
      <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-lg font-medium mr-2">📞 Điện thoại:</span>
      {restaurant.PhoneNumber}
    </p>
    <p>
      <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-lg font-medium mr-2">📧 Email:</span>
      {restaurant.Email}
    </p>
    <p>
      <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-lg font-medium mr-2">🌐 Website:</span>
      <a href={restaurant.Website} className="text-blue-600 underline hover:text-blue-800">
        {restaurant.Website}
      </a>
    </p>
    <p>
      <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-lg font-medium mr-2">🕒 Giờ mở cửa:</span>
      {formatTime(restaurant.OpenTime)}
    </p>
    <p>
      <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-lg font-medium mr-2">🚫 Giờ đóng cửa:</span>
      {formatTime(restaurant.CloseTime) || 'Không có'}
    </p>
  </div>
</div>


      {/* 3. Món ăn */}
      <div className="mt-10">
        <InfoTitle text={"Món ăn nổi bật"} />
       <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {dishes.length === 0 ? (
            <div className="col-span-full italic text-center text-gray-500">
              Không có món ăn nào.
            </div>
          ) : (
            dishes.map(dish => (
              <div key={dish.Id} className="flex items-center gap-4 bg-red-50 p-4 rounded-xl shadow">
                <img src={dish.ImageUrl} alt={dish.Name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <p className="font-medium">{dish.Name}</p>
                  <p className="text-sm text-gray-600">⭐ {parseFloat(dish.Score).toFixed(1)}</p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      {/* 4. Đánh giá */}
      <div className="mt-10">
        <InfoTitle text={"Đánh giá từ khách hàng"} />
        <ListReview reviews={reviews} />
        <Evaluate comment={comment} setComment={setComment} handleSendReview={handleSendReview} />
      </div>

      {/* 5. Bản đồ */}
      <div className="mt-10">
        <InfoTitle text={"Vị trí bản đồ"} />
        <iframe
          title="Google Map"
          className="w-full h-64 rounded-lg"
          src={`https://maps.google.com/maps?q=${restaurant.Latitude},${restaurant.Longitude}&z=15&output=embed`}
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default RestaurantDetail;
