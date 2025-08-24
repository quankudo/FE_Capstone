import React, { useState } from 'react';
import { contact } from '@/assets/images/index'
import { toast } from 'react-toastify';
import SectionHeader from '@/components/SectionHeader';
const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dữ liệu gửi:', form);
    toast.success('Cảm ơn bạn đã liên hệ!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className='pb-12 pt-5 px-32'>
      <SectionHeader
        title={"Liên hệ với chúng tôi"}
        subTitle={"Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn!"}
      />
    <div className="grid md:grid-cols-2 gap-10 items-center">
      {/* Image bên trái */}
      <div className="hidden md:block">
        <img
          src={contact}
          alt="Liên hệ"
          className="w-full rounded-lg shadow-lg"
        />
      </div>

      {/* Form bên phải */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-red-600">Liên hệ với chúng tôi</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-text">Tên của bạn</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-text">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-text">Nội dung</label>
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition"
          >
            Gửi liên hệ
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Contact;
