import React, { useState } from 'react';
import TextTitle from '@/components/TextTitle';

const categories = [
  { icon: '🍔', label: 'Ăn nhanh' },
  { icon: '🍱', label: 'Nhật Bản' },
  { icon: '🍲', label: 'Quán ăn vỉa hè' },
  { icon: '🥗', label: 'Ăn chay' },
  { icon: '☕', label: 'Quán cafe đẹp' },
  { icon: '🍜', label: 'Trung Hoa' },
  { icon: '🥩', label: 'BBQ / Nướng' },
  { icon: '🍖', label: 'Lẩu' },
  { icon: '🥘', label: 'Nhà hàng gia đình' },
  { icon: '🧁', label: 'Tiệm bánh - Tráng miệng' },
  { icon: '🥪', label: 'Âu - Mỹ' },
  { icon: '🥟', label: 'Hàn Quốc' },
  { icon: '🏖️', label: 'Hải sản' },
  { icon: '🍻', label: 'Quán nhậu' }
];

const FeaturedCategories = () => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [showAll, setShowAll] = useState(false);

    const displayedCategories = showAll ? categories : categories.slice(0, 8);
  return (
    <div className="py-8 px-32">
        <TextTitle text={"🌟 Danh mục nổi bật"}/>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {displayedCategories.map((cat, index) => (
            <div
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`flex flex-col items-center justify-center border rounded-xl p-4 text-text shadow transition cursor-pointer
                ${selectedIndex === index ? 'bg-red-100 border-red-500 text-red-600' : 'hover:bg-red-50 hover:text-primary'}`}
            >
                <span className="text-3xl">{cat.icon}</span>
                <p className="mt-2 text-center text-sm font-medium">{cat.label}</p>
            </div>
            ))}
        </div>
        {!showAll && categories.length > 8 && (
        <div className="text-center mt-6">
            <button
                onClick={() => setShowAll(true)}
                className="px-6 py-2 bg-gradient-to-r from-red-400 to-yellow-400 text-white rounded-full shadow hover:brightness-110 transition"
            >
                Xem thêm
            </button>
        </div>
        )}
    </div>
  );
};

export default FeaturedCategories;
