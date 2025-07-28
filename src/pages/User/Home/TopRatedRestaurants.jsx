import React, { useState } from 'react';
import TextTitle from '../../../components/TextTitle';
import { Link } from 'react-router-dom';
import ListRestaurant from '../../../components/ListRestaurant';


const restaurants = [
  {
    id: 1,
    name: 'Nhà hàng Sài Gòn Xưa',
    image: 'https://source.unsplash.com/400x300/?restaurant,vietnamese',
    rating: 4.5,
    review: 'Không gian ấm cúng, món ăn ngon và phục vụ chuyên nghiệp.',
    address: '123 Lý Thường Kiệt, Q.10, TP.HCM',
  },
  {
    id: 2,
    name: 'Ẩm thực Hà Nội',
    image: 'https://source.unsplash.com/400x300/?food,vietnamese',
    rating: 4.8,
    review: 'Hương vị Bắc chuẩn vị, giá hợp lý, rất đáng thử.',
    address: '45 Trần Duy Hưng, Cầu Giấy, Hà Nội',
  },
  {
    id: 3,
    name: 'Nhà hàng Hải Sản Biển Xanh',
    image: 'https://source.unsplash.com/400x300/?seafood,restaurant',
    rating: 3.2,
    review: 'Hải sản tươi sống, giá hợp lý, không gian mát mẻ.',
    address: '99 Phạm Văn Đồng, Nha Trang',
  },
  {
    id: 4,
    name: 'BBQ King',
    image: 'https://source.unsplash.com/400x300/?bbq,grill',
    rating: 4.2,
    review: 'Thịt nướng đậm đà, có nhiều loại sốt ăn kèm.',
    address: '22 Nguyễn Trãi, Q.5, TP.HCM',
  },
];

const TopRatedRestaurants = () => {
    const [favorites, setFavorites] = useState([])

    const handleToggleFavorite = (id) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
        )
    }
  return (
    <section className="py-10 px-32">
      <TextTitle text={"🌟 Nhà hàng được đánh giá cao nhất"} />
      <ListRestaurant restaurants={restaurants} />
    </section>
  );
};

export default TopRatedRestaurants;
