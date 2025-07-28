import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Globe, Clock, Calendar } from 'lucide-react'
import InfoTitle from '../../components/InfoTitle';
import { useParams } from 'react-router-dom';
import restaurantApi from '../../api/restaurantApi';
import { toast } from 'react-toastify';
import dishApi from '../../api/dishApi';
import evaluateRestaurantApi from '../../api/evaluateRestaurantApi';

import ListReview from '../../components/ListReview';
import Evaluate from '../../components/Evaluate';
import Swal from 'sweetalert2';

const RestaurantDetail = () => {

  const [restaurant, setRestaurant] = useState({})
  const [dishes, setDishes] = useState([])
  const [reviews, setReviews] = useState([])
  const [comment, setComment] = useState('');
  const { id } = useParams();

  const handleSendReview = () => {
    if (comment.trim() === '') return;
    try {
      const response = true; // test true / false
  
      if (response) {
        Swal.fire({
          icon: 'success',
          title: '🎉 Cảm ơn bạn rất nhiều!',
          text: 'Chúng tôi rất vui khi nhận được đánh giá tích cực từ bạn. Phản hồi của bạn là nguồn động lực lớn để chúng tôi không ngừng nâng cao chất lượng dịch vụ!',
          confirmButtonText: 'Đóng',
          confirmButtonColor: '#3085d6',
        });
      } else {
        Swal.fire({
          icon: 'info',
          title: '🙏 Cảm ơn bạn đã góp ý!',
          text: 'Chúng tôi xin ghi nhận những phản hồi chân thành từ bạn. Đội ngũ của chúng tôi sẽ xem xét và cải thiện dịch vụ trong thời gian tới!',
          confirmButtonText: 'Đóng',
          confirmButtonColor: '#3085d6',
        });
      }
  
    } catch (error) {
      toast.error('Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại sau.');
      console.error('Chi tiết lỗi:', error);
    }
    setComment('');
  };

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await restaurantApi.getRestaurantById(id)
        const responseDish = await dishApi.getAllDishesByRestId(id)
        const responseReview = await evaluateRestaurantApi.getEvaluateByRestId(id)
        setRestaurant(response)
        setReviews(responseReview)
        setDishes(responseDish)
      } catch (error) {
        toast.error(error.message)
      }
    }
    fetchData()
  },[id])
  return (
    <div className="px-32 pb-10 pt-5">
      {/* 1. Banner */}
      <div className="relative">
        <img src={restaurant.ImageUrl} alt={restaurant.Name} className="rounded-xl w-full h-64 object-cover" />
        <div className="absolute bottom-4 left-4 bg-red-600 text-white px-4 py-2 rounded">
          <h1 className="text-2xl font-bold">{restaurant.Name}</h1>
          <p>{restaurant.TypeName} • ⭐ {4.5}</p>
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
      {restaurant.OpenTime}
    </p>
    <p>
      <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-lg font-medium mr-2">🚫 Ngày nghỉ:</span>
      {restaurant.CloseTime || 'Không có'}
    </p>
  </div>
</div>


      {/* 3. Món ăn */}
      <div className="mt-10">
        <InfoTitle text={"Món ăn nổi bật"} />
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {dishes.map(dish => (
            <div key={dish.Id} className="flex items-center gap-4 bg-red-50 p-4 rounded-xl shadow">
              <img src={dish.ImageUrl} alt={dish.Name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <p className="font-medium">{dish.Name}</p>
                <p className="text-sm text-gray-600">⭐ {4.7}</p>
              </div>
            </div>
          ))}
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
