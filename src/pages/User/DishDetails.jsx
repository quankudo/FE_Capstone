import React, { useEffect, useState } from 'react';
import Listdish from '@/components/ListFood';
import { useParams } from 'react-router-dom';
import dishApi from '@/api/dishApi';
import evaluateDishApi from '@/api/evaluateDishApi';
import { toast } from 'react-toastify';

import ListReview from '@/components/ListReview';
import Evaluate from '@/components/Evaluate';
import Swal from 'sweetalert2';
import Loading from '@/components/Loading';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FlaskAPI } from '@/constant';


const DishDetails = () => {
  const {id} = useParams();
  const {user, isAuthenticated} = useSelector(state => state.auth)
  const [dish, setDish] = useState({})
  const [dishes, setDishes] = useState([])
  const [reviews, setReviews] = useState([])
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState('')

  const handleSendReview = async() => {
    if (comment.trim() === '') return;

    setLoading(true)
    try {

      const aiRes = await axios.post(FlaskAPI, {
        review: comment
      });

      const isPositive = aiRes.data.label === 'Positive';

      const comments = {
        Id: id,
        IdUser: user.id,
        Comment: comment,
        TypeReview: isPositive,
      };
      
      await evaluateDishApi.AddEvaluate(comments);
      const response = await dishApi.getDishById(id)
      const responseReview = await evaluateDishApi.getEvaluateByDishId(id)
      setReviews(responseReview)
      setDish(response)
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
        const response = await dishApi.getDishById(id);
        const responseReviews = await evaluateDishApi.getEvaluateByDishId(id)
        const responseDishes = await dishApi.getSuggestDishes();
        setDishes(responseDishes)
        setDish(response)
        setReviews(responseReviews)
      } catch (error) {
        toast.error(error.message)
      }
      finally {
        setLoading(false)
      }
    }

    fetchData();
  },[id])

  if(loading)
    return <Loading/>

  return (
    <div className="px-32 pt-5 pb-10">
      <div className='flex justify-between gap-2'>
        <img src={dish.ImageUrl} alt={dish.Name} className="w-[50%] h-72 object-cover rounded" />
        <div className='w-[47%]'>
            <div className='flex gap-3 items-center mb-5'>
                <h1 className="text-2xl font-medium">{dish.Name}</h1>
                <p className="text-yellow-500">⭐ {parseFloat(dish.Score).toFixed(1)} ({dish.GoodReviews + dish.BadReviews} đánh giá)</p>
            </div>
            <p className="text-gray-700 mb-2">{dish.Desc}</p>
            <p><strong>Nhà hàng:</strong> {dish.RestaurantName}</p>
            <p><strong>Danh mục:</strong> {dish.TypeDishName}</p>
            <p><strong>Giá:</strong> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dish.Price)}</p>
        </div>
      </div>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-4">💬 Bình luận</h2>
      <ListReview reviews={reviews} />
      <Evaluate comment={comment} setComment={setComment} handleSendReview={handleSendReview} />
      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-4">🍽 Gợi ý món khác</h2>
      <Listdish dishes={dishes}/>
    </div>
  );
};

export default DishDetails;
