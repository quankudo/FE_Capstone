import React from 'react'
import Hero from './Hero'
import FeaturedCategories from './FeaturedCategories'
import TopRatedRestaurants from './TopRatedRestaurants'
import TopRatedDishes from './TopRatedDishes'
import Banner from './Banner'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../../constant/routes'

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedCategories />
      <TopRatedRestaurants />
      <TopRatedDishes />
      <Banner />
      <div className="bg-red-50 rounded-2xl mx-32 py-16 text-center shadow-xl my-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Bạn vừa ăn một bữa tuyệt vời?
        </h2>
        <p className="text-gray-600 mb-4">
          Hãy chia sẻ cảm nhận của bạn với mọi người!
        </p>
        <Link to={ROUTES.REVIEW} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-2xl text-sm font-medium transition">
          Viết đánh giá
        </Link>
      </div>
    </div>
  )
}

export default Home
