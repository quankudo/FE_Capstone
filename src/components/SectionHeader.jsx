import React from 'react'
import { Link } from 'react-router-dom'

const SectionHeader = ({title, subTitle}) => {
  return (
    <div className="bg-gray-100 py-10 px-4 rounded-lg shadow-sm text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          {title}
        </h2>
        <p className="mt-2 text-gray-600 text-base md:text-lg">
          {subTitle}
        </p>
        <Link to={"/"} className='px-4 py-2 rounded bg-red-500 hover:bg-red-600 inline-block mt-5 text-white'>Quay về trang chủ</Link>
      </div>
  )
}

export default SectionHeader
