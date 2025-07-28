import React from 'react'

const ListComment = () => {
  return (
    <div className='w-[40%]'>
            <h3 className='text-lg font-semibold mb-4'>Các đánh giá gần đây</h3>
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between items-center'>
                    <img src="" alt="" className='w-[50px] h-[50px] rounded-full' />
                    <div>
                        <h4>Ten khach hang</h4>
                        <p className='text-sm text-gray-600'>{new Date().toLocaleDateString('vi-VN')}</p>
                    </div>
                    <span className='px-4 py-[4px] rounded-3xl bg-green-500 text-white'>Good review</span>
                </div>
                <div className='flex justify-between items-center'>
                    <img src="" alt="" className='w-[50px] h-[50px] rounded-full' />
                    <div>
                        <h4>Ten khach hang</h4>
                        <p className='text-sm text-gray-600'>{new Date().toLocaleDateString('vi-VN')}</p>
                    </div>
                    <span className='px-4 py-[4px] rounded-3xl bg-red-500 text-white'>Bad review</span>
                </div>
                <div className='flex justify-between items-center'>
                    <img src="" alt="" className='w-[50px] h-[50px] rounded-full' />
                    <div>
                        <h4>Ten khach hang</h4>
                        <p className='text-sm text-gray-600'>{new Date().toLocaleDateString('vi-VN')}</p>
                    </div>
                    <span className='px-4 py-[4px] rounded-3xl bg-green-500 text-white'>Good review</span>
                </div>
                <div className='flex justify-between items-center'>
                    <img src="" alt="" className='w-[50px] h-[50px] rounded-full' />
                    <div>
                        <h4>Ten khach hang</h4>
                        <p className='text-sm text-gray-600'>{new Date().toLocaleDateString('vi-VN')}</p>
                    </div>
                    <span className='px-4 py-[4px] rounded-3xl bg-red-500 text-white'>Bad review</span>
                </div>
                <div className='flex justify-between items-center'>
                    <img src="" alt="" className='w-[50px] h-[50px] rounded-full' />
                    <div>
                        <h4>Ten khach hang</h4>
                        <p className='text-sm text-gray-600'>{new Date().toLocaleDateString('vi-VN')}</p>
                    </div>
                    <span className='px-4 py-[4px] rounded-3xl bg-red-500 text-white'>Bad review</span>
                </div>
            </div>
        </div>
  )
}

export default ListComment
