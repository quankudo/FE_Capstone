import React, { useState } from 'react'

import { Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constant/routes';
import EmptyState from './EmptyState';
import SkeletonRestaurantCard from './Skeletons/SkeletonRestaurantCard ';
const ListRestaurant = ({restaurants, loading}) => {
    const [favorites, setFavorites] = useState([]);

    const handleToggleFavorite = (id) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
        );
    };
  return (
    <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading ? (
        // render skeleton trong lúc load
        Array.from({ length: 3 }).map((_, i) => <SkeletonRestaurantCard key={i} />)
        ) : restaurants.length > 0 ? (
        restaurants.map((r) => (
          <div
              key={r.Id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={`${r.ImageUrl}`}
                alt={r.Name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">{r.Name}</h3>
                  <button
                    onClick={() => handleToggleFavorite(r.Id)}
                    className={`text-red-500 hover:text-red-600 transition`}
                    title="Yêu thích"
                  >
                    <Heart
                      size={20}
                      fill={favorites.includes(r.Id) ? 'currentColor' : 'none'}
                      stroke="currentColor"
                    />
                  </button>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < Math.round(parseFloat(r.Score).toFixed(1)) ? 'currentColor' : 'none'}
                      stroke="currentColor"
                    />
                  ))}
                  <span className="ml-1 text-gray-600 text-sm">{parseFloat(r.Score).toFixed(1)}</span>
                </div>

                {/* Review */}
                <p className="text-sm text-gray-600 line-clamp-2">{r.Desc}</p>

                {/* Address */}
                <p className="text-sm text-gray-500 italic">{`${r.CityName} - ${r.DistrictName}`}</p>

                {/* Xem chi tiết */}
                <div className="pt-2">
                  <Link to={`/${ROUTES.RESTAURANT}/${r.Id}`} className="text-sm px-3 py-1.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition">
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
        ))
      ) : (
        <div className="col-span-full flex justify-center">
          <EmptyState text="Danh sách nhà hàng yêu thích của bạn đang trống!" />
        </div>
      )}
    </div>
  )
}

export default ListRestaurant
