import React, { useEffect, useState } from 'react'
import { FaUtensils, FaStore } from 'react-icons/fa'
import ListRestaurant from '../../components/ListRestaurant';
import ListFood from '../../components/ListFood';
import SectionHeader from '../../components/SectionHeader';
import { useSelector } from 'react-redux';
import favoriteApi from '../../api/favoriteApi';

const favoriteRestaurants = [
  {
    id: 1,
    name: 'Nhà hàng Sài Gòn Xưa',
    image: 'https://source.unsplash.com/400x300/?restaurant,vietnamese',
    rating: 4.5,
    review: 'Không gian ấm cúng, món ăn ngon và phục vụ chuyên nghiệp.',
    address: '123 Lý Thường Kiệt, Q.10, TP.HCM',
  },
  {
    id: 2,
    name: 'Ẩm thực Hà Nội',
    image: 'https://source.unsplash.com/400x300/?food,vietnamese',
    rating: 4.8,
    review: 'Hương vị Bắc chuẩn vị, giá hợp lý, rất đáng thử.',
    address: '45 Trần Duy Hưng, Cầu Giấy, Hà Nội',
  },
];

const favoriteFoods = [
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

const Favorites = () => {
  const {user, isAuthenticated} = useSelector(state => state.auth)
  const [activeTab, setActiveTab] = useState('restaurants')
  const [restaurants, setRestaurants] = useState([])
  const [dishes, setDishes] = useState([])

  useEffect(() => {
  const fetchFavorites = async () => {
    try {
      const dish = await favoriteApi.getFavoriteDishes(user.id);
      const rest = await favoriteApi.getFavoriteRestaurants(user.id);
      console.log(rest);
      console.log(dish);
      
      setRestaurants(rest); // tuỳ theo cấu trúc API
      setDishes(dish)
    } catch (err) {
      console.error("Lỗi khi lấy nhà hàng yêu thích:", err);
    }
  };

  if (isAuthenticated) fetchFavorites();
}, [user?.id]);
  return (
    <div className="px-32 pt-5 py-10">
      <SectionHeader 
        title={"Danh sách Yêu thích của bạn"} 
        subTitle={"Lưu lại những món ăn và nhà hàng bạn yêu thích để tiện xem lại và đặt món nhanh chóng."}
      />
      <div className="flex gap-4 my-6">
        <button
          onClick={() => setActiveTab('restaurants')}
          className={`flex items-center gap-2 px-4 py-2 rounded ${activeTab === 'restaurants' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          <FaStore /> Nhà hàng
        </button>
        <button
          onClick={() => setActiveTab('foods')}
          className={`flex items-center gap-2 px-4 py-2 rounded ${activeTab === 'foods' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          <FaUtensils /> Món ăn
        </button>
      </div>

      {activeTab === 'restaurants' && (
        <ListRestaurant restaurants={favoriteRestaurants}/>
      )}

      {activeTab === 'foods' && (
        <ListFood dishes={favoriteFoods}/>
      )}
    </div>
  )
}

export default Favorites
