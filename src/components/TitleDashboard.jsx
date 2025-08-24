import React from 'react'

const TitleDashboard = ({title, Icon}) => {
  return (
    <div className='flex items-center gap-2 mb-4'>
        <div className='w-[3px] h-[27px] rounded-lg bg-red-500'></div>
      <h1 className="text-2xl font-medium flex items-center gap-2 text-red-500 w-[max-content]" style={{borderRadius: '20px 0 20px 0'}}>
        <Icon /> {title}</h1>
    </div>
  )
}

export default TitleDashboard
