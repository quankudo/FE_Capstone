import React from 'react';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6 px-4 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Thông tin chung */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Về chúng tôi</h4>
          <p className="text-sm text-gray-300">
            Chúng tôi cung cấp đánh giá và xếp hạng nhà hàng dựa trên đánh giá thực tế của khách hàng.
          </p>
        </div>

        {/* Liên hệ */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
          <ul className="text-sm space-y-2 text-gray-300">
            <li className="flex items-center gap-2">
              <MapPin size={16} /> 123 Đường ABC, Quận 1, TP.HCM
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> 0123 456 789
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> contact@nhahangtot.vn
            </li>
          </ul>
        </div>

        {/* Liên kết nhanh */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Liên kết</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/" className="hover:underline">Trang chủ</a></li>
            <li><a href="/restaurants" className="hover:underline">Nhà hàng</a></li>
            <li><a href="/about" className="hover:underline">Giới thiệu</a></li>
            <li><a href="/contact" className="hover:underline">Liên hệ</a></li>
          </ul>
        </div>

        {/* Mạng xã hội */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Theo dõi chúng tôi</h4>
          <div className="flex gap-4 text-gray-300">
            <a href="#"><Facebook size={20} className="hover:text-white" /></a>
            <a href="#"><Instagram size={20} className="hover:text-white" /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Nhà hàng tốt. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
