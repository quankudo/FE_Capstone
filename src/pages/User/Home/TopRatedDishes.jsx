import React from 'react';
import TextTitle from '../../../components/TextTitle';
import ListFood from '../../../components/ListFood';

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

const TopRatedDishes = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <TextTitle text={"🌟 Top món ăn được đánh giá cao"}/>
      <ListFood dishes={topDishes} />
      
    </div>
  );
};

export default TopRatedDishes;
