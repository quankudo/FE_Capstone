import React, { useState } from 'react'
import { Star, Heart, HeartOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import EmptyState from './EmptyState';
import SkeletonFoodCard from './Skeletons/SkeletonFoodCard';

const ListFood = ({dishes, loading}) => {
    const [likedDishes, setLikedDishes] = useState([]);

  const toggleLike = (id) => {
    setLikedDishes(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
        // render skeleton trong lúc load
        Array.from({ length: 4 }).map((_, i) => <SkeletonFoodCard key={i} />)
        ) : dishes.length > 0 ? dishes.map((dish) => (
          <div
            key={dish.Id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={dish.ImageUrl}
              alt={dish.Name}
              className="w-full h-40 object-cover"
            />

            <div className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">{dish.Name}</h3>
                <button onClick={() => toggleLike(dish.Id)}>
                  {likedDishes.includes(dish.Id) ? (
                    <Heart className="text-red-500 fill-red-500" size={20} />
                  ) : (
                    <HeartOff className="text-gray-400" size={20} />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-1 text-yellow-500">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={i < Math.round(parseFloat(dish.Score).toFixed(1)) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                  />
                ))}
                <span className="ml-1 text-gray-600 text-sm">{parseFloat(dish.Score).toFixed(1)}</span>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2">{dish.Desc}</p>

              <p className="text-sm text-gray-500 italic">
                Nhà hàng: <Link to={`/restaurant/${dish.restaurantId}`} className="text-blue-600 hover:underline">{dish.RestaurantName}</Link>
              </p>

              <div className="pt-2">
                <Link
                  to={`/dish/${dish.Id}`}
                  className="text-sm px-3 py-1.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Xem chi tiết món
                </Link>
              </div>
            </div>
          </div>
        ))
        : (
            <div className='col-span-full flex justify-center'>
              <EmptyState text={'Danh sách món ăn yêu thích của bạn đang trống!'}/>
            </div>
          )}
      </div>
  )
}

export default ListFood
