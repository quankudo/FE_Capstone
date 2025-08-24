import React from 'react'
import { Link } from 'react-router-dom'

const PrimaryButton = ({isLink, link, isWidthFull, text, handelEvent}) => {
    let clName = 'px-4 py-2 rounded bg-red-500 hover:bg-red-600 inline-block mt-5 text-white';
  return (
    isLink
    ? <Link to={link} className={`${clName} ${isWidthFull && 'w-full'}`}>{text}</Link>
    : <button className={`${clName} ${isWidthFull && 'w-full'}`} onClick={handelEvent}>{text}</button>
  )
}

export default PrimaryButton
