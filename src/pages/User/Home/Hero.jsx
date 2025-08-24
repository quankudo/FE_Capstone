import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { hero_1, hero_2, hero_3, hero_4 } from '@/assets/images'

import Slider from 'react-slick'

const carouselImages = [hero_1, hero_2, hero_3, hero_4]
const Hero = () => {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (query) params.append('query', query)
    if (type) params.append('type', type)
    navigate(`/search?${params.toString()}`)
  }

  return (
    <section className="relative h-[500px] w-full mb-5">
      {/* ... carousel phía dưới ... */}
        <Slider
            autoplay
            infinite
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            arrows={true}
            className="h-full"
            dots={true}   
        >
        {carouselImages.map((img, index) => (
            <div key={index}>
            <img
                src={img}
                alt={`Slide ${index}`}
                className="w-full h-[500px] object-cover filter brightness-75"
            />
            </div>
        ))}
        </Slider>
      {/* Lớp phủ nội dung */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
            Tìm nhà hàng yêu thích của bạn ngay!
            </h1>

            {/* Thanh tìm kiếm */}
            <div className="flex flex-col md:flex-row bg-white/90 p-4 rounded-lg shadow-lg w-full max-w-2xl gap-4 items-center">
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Nhập tên nhà hàng / địa điểm"
                className="flex-1 px-4 py-2 rounded-md border outline-none text-gray-800 w-full"
            />

            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="px-4 py-2 rounded-md border outline-none text-gray-800 w-full md:w-[200px]"
            >
                <option value="">Tất cả loại hình</option>
                <option value="fastfood">Ăn nhanh</option>
                <option value="vegetarian">Chay</option>
                <option value="family">Gia đình</option>
                <option value="buffet">Buffet</option>
                <option value="street">Đường phố</option>
            </select>

            <button
                onClick={handleSearch}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md w-full md:w-auto"
            >
                Tìm kiếm
            </button>
            </div>
        </div>
    </section>
  )
}

export default Hero
