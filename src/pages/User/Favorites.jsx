import React, { useEffect, useState } from 'react'
import { FaUtensils, FaStore } from 'react-icons/fa'
import ListRestaurant from '@/components/ListRestaurant';
import ListFood from '@/components/ListFood';
import SectionHeader from '@/components/SectionHeader';
import { useSelector } from 'react-redux';
import favoriteApi from '@/api/favoriteApi';


const Favorites = () => {
  const {user, isAuthenticated} = useSelector(state => state.auth)
  const [activeTab, setActiveTab] = useState('restaurants')
  const [restaurants, setRestaurants] = useState([])
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
  const fetchFavorites = async () => {
    setLoading(true)
    try {
      const dish = await favoriteApi.getFavoriteDishes(user.id);
      const rest = await favoriteApi.getFavoriteRestaurants(user.id);
      
      setRestaurants(rest); // tuỳ theo cấu trúc API
      setDishes(dish)
    } catch (err) {
      console.error("Lỗi khi lấy nhà hàng yêu thích:", err);
    }
    finally {
      setLoading(false)
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
        <ListRestaurant restaurants={restaurants} loading={loading}/>
      )}

      {activeTab === 'foods' && (
        <ListFood dishes={dishes} loading={loading}/>
      )}
    </div>
  )
}

export default Favorites
