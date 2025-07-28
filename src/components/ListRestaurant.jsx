import React, { useState } from 'react'

import { Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constant/routes';
const ListRestaurant = ({restaurants}) => {
  console.log('res', restaurants);
  
    const [favorites, setFavorites] = useState([]);

    const handleToggleFavorite = (id) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
        );
    };
  return (
    <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((r) => (
            <div
              key={r.Id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={r.ImageUrl}
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
                      fill={i < Math.round(r.rating) ? 'currentColor' : 'none'}
                      stroke="currentColor"
                    />
                  ))}
                  <span className="ml-1 text-gray-600 text-sm">{r.rating}</span>
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
          ))}
          {restaurants.length === 0 && (
            <p className="col-span-full text-gray-500">Không tìm thấy kết quả.</p>
          )}
        </div>
  )
}

export default ListRestaurant
