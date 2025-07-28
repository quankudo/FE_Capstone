import React, { useState } from 'react'
import { Star, Heart, HeartOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const ListFood = ({dishes}) => {
    const [likedDishes, setLikedDishes] = useState([]);

  const toggleLike = (id) => {
    setLikedDishes(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-40 object-cover"
            />

            <div className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">{dish.name}</h3>
                <button onClick={() => toggleLike(dish.id)}>
                  {likedDishes.includes(dish.id) ? (
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
                    fill={i < Math.round(dish.rating) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                  />
                ))}
                <span className="ml-1 text-gray-600 text-sm">{dish.rating}</span>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2">{dish.description}</p>

              <p className="text-sm text-gray-500 italic">
                Nhà hàng: <Link to={`/restaurant/${dish.restaurantId}`} className="text-blue-600 hover:underline">{dish.restaurantName}</Link>
              </p>

              <div className="pt-2">
                <Link
                  to={`/dish/${dish.id}`}
                  className="text-sm px-3 py-1.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Xem chi tiết món
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
  )
}

export default ListFood
