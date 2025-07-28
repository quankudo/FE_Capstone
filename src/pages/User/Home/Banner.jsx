import React from 'react'
import TextTitle from '../../../components/TextTitle'
import {banner_1, banner_2} from '../../../assets/images/index'

const Banner = () => {
  return (
    <div className='py-5 px-32'>
      <TextTitle text={"🌟 Gợi ý món ngon - Đánh giá chân thực"}/>
      <div className='flex gap-10'>
        <img src={banner_1} className='flex-1 h-[16rem] object-cover rounded-lg' alt="image banner" />
        <img src={banner_2} className='flex-1 h-[16rem] object-cover rounded-lg' alt="image banner" />
      </div>
    </div>
  )
}

export default Banner
