import React, { useEffect, useState } from 'react';
import Listdish from '../../components/ListFood';
import { useParams } from 'react-router-dom';
import dishApi from '../../api/dishApi';
import evaluateDishApi from '../../api/evaluateDishApi';
import { toast } from 'react-toastify';

import ListReview from '../../components/ListReview';
import Evaluate from '../../components/Evaluate';
import Swal from 'sweetalert2';


const topDishes = [
  {
    id: 1,
    name: 'Bún chả Hà Nội',
    rating: 4.7,
    image: '/images/buncha.jpg',
    restaurantName: 'Nhà hàng Hà Nội Quán',
    restaurantId: 101,
    description: 'Thịt nướng đậm vị, nước chấm chua ngọt hài hoà.',
  },
  {
    id: 2,
    name: 'Phở bò truyền thống',
    rating: 4.6,
    image: '/images/pho.jpg',
    restaurantName: 'Phở Sướng',
    restaurantId: 102,
    description: 'Nước dùng ngọt xương, thơm vị quế hồi đặc trưng.',
  },
  // Thêm các món khác nếu cần
];

const DishDetails = () => {
  const {id} = useParams();
  const [dish, setDish] = useState({})
  const [dishes, setDishes] = useState([])
  const [reviews, setReviews] = useState([])
  const [comment, setComment] = useState('')

  const handleSendReview = () => {
    if (comment.trim() === '') return;

    try {
        const response = true; // test true / false
    
        if (response === true) {
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
        const response = await dishApi.getDishById(id);
        const responseReviews = await evaluateDishApi.getEvaluateByDishId(id)
        setDish(response)
        setReviews(responseReviews)
      } catch (error) {
        toast.error(error.message)
      }
    }

    fetchData();
  },[id])

  return (
    <div className="px-32 pt-5 pb-10">
      <div className='flex justify-between gap-5'>
        <img src={dish.ImageUrl} alt={dish.Name} className="w-[40%] h-60 object-cover rounded" />
        <div className='w-[45%]'>
            <div className='flex gap-3 items-center mb-5'>
                <h1 className="text-2xl font-medium">{dish.Name}</h1>
                <p className="text-yellow-500">⭐ {4.5} ({dish.GoodReviews + dish.BadReviews} đánh giá)</p>
            </div>
            <p className="text-gray-700 mb-2">{dish.Desc}</p>
            <p><strong>Danh mục:</strong> {dish.TypeDishName}</p>
            <p><strong>Giá:</strong> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dish.Price)}</p>
        </div>
      </div>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">💬 Bình luận</h2>
      <ListReview reviews={reviews} />
      <Evaluate comment={comment} setComment={setComment} handleSendReview={handleSendReview} />
      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">🍽 Gợi ý món khác</h2>
      <Listdish dishes={topDishes}/>
    </div>
  );
};

export default DishDetails;
