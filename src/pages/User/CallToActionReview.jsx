import React, { useEffect, useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import Swal from 'sweetalert2'
import {toast} from 'react-toastify'
import restaurantApi from '@/api/restaurantApi';
import dishApi from '@/api/dishApi';
import Loading from '@/components/Loading';
import axios from 'axios';
import evaluateDishApi from '@/api/evaluateDishApi';
import evaluateRestaurantApi from '@/api/evaluateRestaurantApi';
import { useSelector } from 'react-redux';
import { FlaskAPI } from '@/constant';

const CallToActionReview = () => {
  const {user, isAuthenticated} = useSelector(state => state.auth)
  const [reviewType, setReviewType] = useState('restaurant');
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [selectedDish, setSelectedDish] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false)
  const [restaurants, setRestaurants] = useState([]);
  const [dishes, setDishes] = useState([]);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await restaurantApi.getAllRestaurants();
        setRestaurants(response)
        const responseDishes = await dishApi.getAllDishesByRestId(response[0].Id)
        setDishes(responseDishes)
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }

    fetchData();
  },[])

  const handleChangeSelectRestaurant = async (e) => {
    const id = e.target.value;
    setSelectedRestaurant(id);
    setSelectedDish('');
    try {
      const responseDishes = await dishApi.getAllDishesByRestId(id)
      setDishes(responseDishes)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleSubmit = async () => {
    if (!reviewText.trim()) {
      toast.warning("Vui lòng nhập nội dung đánh giá!");
      return;
    }

    setLoading(true);
    try {
      // 1. Gọi AI model
      const aiRes = await axios.post(FlaskAPI, {
        review: reviewText
      });

      const isPositive = aiRes.data.label === 'Positive';
      // const isPositive = true;

      // 2. Chuẩn bị comment object
      const comment = {
        IdUser: user.id,
        Comment: reviewText,
        TypeReview: isPositive,
      };

      if (reviewType === 'restaurant') {
        comment.Id = selectedRestaurant;
        await evaluateRestaurantApi.AddEvaluate(comment);
      } else {
        comment.Id = selectedDish;
        await evaluateDishApi.AddEvaluate(comment);
      }

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
    } finally {
      setReviewText('')
      setSelectedDish('')
      setSelectedRestaurant('')
      setLoading(false);
    }
  };

  if(loading)
    return <Loading />

  return (
    <div className='px-32 pt-5'>
      <SectionHeader title={"Gửi đánh giá của bạn"} subTitle={"Chia sẻ cảm nhận về món ăn hoặc nhà hàng bạn đã trải nghiệm"}/>
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl mx-auto my-10 border border-red-100">
      
      <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
        ❤️ Bạn vừa ăn một bữa tuyệt vời? Hãy chia sẻ cảm nhận!
      </h2>

      {/* Tab chọn loại đánh giá */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-5 py-2 rounded-full font-medium transition ${
            reviewType === 'restaurant'
              ? 'bg-red-500 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setReviewType('restaurant')}
        >
          Đánh giá nhà hàng
        </button>
        <button
          className={`px-5 py-2 rounded-full font-medium transition ${
            reviewType === 'dish'
              ? 'bg-red-500 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setReviewType('dish')}
        >
          Đánh giá món ăn
        </button>
      </div>

      {/* Chọn nhà hàng */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-gray-700">Nhà hàng</label>
        <select
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          value={selectedRestaurant}
          onChange={(e) => handleChangeSelectRestaurant(e)}
        >
          <option value="">-- Chọn nhà hàng --</option>
          {restaurants.map((r) => (
            <option key={r.Id} value={r.Id}>
              {r.Name}
            </option>
          ))}
        </select>
      </div>

      {/* Chọn món ăn nếu cần */}
      {reviewType === 'dish' && selectedRestaurant && (
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">Món ăn</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            value={selectedDish}
            onChange={(e) => setSelectedDish(e.target.value)}
          >
            <option value="">-- Chọn món ăn --</option>
            {dishes.map((dish, i) => (
              <option key={i} value={dish.Id}>
                {dish.Name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Nội dung đánh giá */}
      <div className="mb-6">
        <label className="block mb-1 font-semibold text-gray-700">Nội dung đánh giá</label>
        <textarea
          className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="Hãy chia sẻ trải nghiệm của bạn..."
          rows={4}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
      </div>

      {/* Nút gửi */}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium shadow-md transition"
        >
          Gửi đánh giá
        </button>
      </div>
    </div>
    </div>
  );
};

export default CallToActionReview;
