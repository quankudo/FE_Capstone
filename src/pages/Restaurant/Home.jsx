import React from 'react';

const restaurant = {
  id: 1,
  name: 'Nhà hàng Ngon Việt',
  website: 'https://ngonviet.vn',
  status: true,
  email: 'contact@ngonviet.vn',
  desc: 'Nhà hàng chuyên phục vụ các món ăn truyền thống Việt Nam.',
  goodReviews: 120,
  badReviews: 5,
  rateScore: 4.7,
  imageUrl: '',
  latitude: 10.7769,
  longitude: 106.7009,
  phoneNumber: '0909123456',
  openTime: '07:00',
  closeTime: '22:00',
  districtName: 'Quận 1',
  cityName: 'TP. Hồ Chí Minh',
};

const HomeRestaurant = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h3 className="text-2xl font-medium mb-6">Thông tin nhà hàng</h3>

      <div className="bg-white shadow rounded p-6 flex justify-between flex-col md:flex-row gap-6">
        <img
          src={restaurant.imageUrl || 'https://via.placeholder.com/250x180?text=Restaurant'}
          alt="Restaurant"
          className="w-full md:w-[500px] h-[200px] object-cover rounded"
        />
        <div className="flex-1 space-y-2 text-gray-800">
          <p><span className="font-semibold">Tên nhà hàng:</span> {restaurant.name}</p>
          <p><span className="font-semibold">Email:</span> {restaurant.email}</p>
          <p><span className="font-semibold">Số điện thoại:</span> {restaurant.phoneNumber}</p>
          <p><span className="font-semibold">Website:</span> <a href={restaurant.website} className="text-blue-600 underline">{restaurant.website}</a></p>
          <p><span className="font-semibold">Địa chỉ:</span> {restaurant.districtName}, {restaurant.cityName}</p>
          <p><span className="font-semibold">Giờ hoạt động:</span> {restaurant.openTime} - {restaurant.closeTime}</p>
          <p>
            <span className="font-semibold">Trạng thái:</span>{' '}
            <span className={`inline-block px-2 py-1 rounded text-xs text-white ${restaurant.status ? 'bg-green-500' : 'bg-gray-500'}`}>
              {restaurant.status ? 'Đang hoạt động' : 'Tạm ngưng'}
            </span>
          </p>
          <p><span className="font-semibold">Đánh giá trung bình:</span> ⭐ {restaurant.rateScore}</p>
          <p>
            <span className="font-semibold">Phản hồi:</span>{' '}
            <span className="text-green-600 font-semibold">{restaurant.goodReviews} tích cực</span>,{' '}
            <span className="text-red-500 font-semibold">{restaurant.badReviews} tiêu cực</span>
          </p>
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Giới thiệu</h2>
        <p className="text-gray-700">{restaurant.desc}</p>
      </div>

      <div className="mt-6 bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Vị trí trên bản đồ</h2>
        <iframe
          width="100%"
          height="300"
          className="rounded"
          loading="lazy"
          src={`https://www.google.com/maps?q=${restaurant.latitude},${restaurant.longitude}&hl=vi&z=16&output=embed`}
        ></iframe>
      </div>
    </div>
  );
};

export default HomeRestaurant;
