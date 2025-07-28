import React from 'react'

const InfoTitle = ({text}) => {
  return (
    <h2 className="text-2xl font-medium text-gray-800 mb-4 relative pl-6 before:content-['|'] before:absolute before:left-0 before:text-red-600 before:text-2xl">
      {text}
    </h2>
  )
}

export default InfoTitle
