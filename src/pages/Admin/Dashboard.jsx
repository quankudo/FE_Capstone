import React, { useEffect, useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { FaUsers, FaUtensils, FaStore, FaStar } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import TitleDashboard from "../../components/TitleDashboard";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    restaurants: 0,
    dishes: 0,
    reviews: 0,
  });
  const [reviewData, setReviewData] = useState([]);
  const [growthData, setGrowthData] = useState([]);
  const [topRestaurants, setTopRestaurants] = useState([]);
  const [topDishes, setTopDishes] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [scope, setScope] = useState("month");

  useEffect(() => {
    // Replace with real API
    setStats({ users: 1023, restaurants: 48, dishes: 320, reviews: 2800 });
    setReviewData([
      { time: "T2", count: 50 },
      { time: "T3", count: 80 },
      { time: "T4", count: 30 },
      { time: "T5", count: 60 },
      { time: "T6", count: 90 },
    ]);
    setGrowthData([
      { month: "01/25", users: 200 },
      { month: "02/25", users: 350 },
      { month: "03/25", users: 500 },
      { month: "04/25", users: 620 },
      { month: "05/25", users: 780 },
    ]);
    setTopRestaurants([
      { name: "Nhà hàng A", score: 4.9 },
      { name: "Nhà hàng B", score: 4.8 },
    ]);
    setTopDishes([
      { name: "Bún bò", score: 4.9 },
      { name: "Phở", score: 4.7 },
    ]);
    setTopUsers([
      { name: "Nguyễn Văn A", count: 12 },
      { name: "Trần Thị B", count: 10 },
    ]);
  }, [scope]);

  const cardList = [
    { label: "Người dùng", icon: <FaUsers />, count: stats.users, color: "bg-pink-500" },
    { label: "Nhà hàng", icon: <FaStore />, count: stats.restaurants, color: "bg-blue-500" },
    { label: "Món ăn", icon: <FaUtensils />, count: stats.dishes, color: "bg-green-500" },
    { label: "Đánh giá", icon: <FaStar />, count: stats.reviews, color: "bg-yellow-500" },
  ];

  const handleChangeScope= ()=> {

    setScope(e.target.value)
  }

  return (
    <div className="p-6 space-y-8">
      <TitleDashboard Icon={MdDashboard} title={'Tổng quan hệ thống'} />

      {/* Tổng quan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardList.map((item, idx) => (
          <div key={idx} className={`flex justify-between items-center p-5 rounded-xl text-white ${item.color} shadow`}>
            <div>
              <p className="text-lg font-semibold">{item.label}</p>
              <p className="text-2xl font-bold">{item.count}</p>
            </div>
            <div className="text-3xl">{item.icon}</div>
          </div>
        ))}
      </div>

      {/* Số lượt đánh giá */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Số lượt đánh giá ({scope})</h2>
          <select value={scope} onChange={(e) => handleChangeScope(e)} className="border rounded px-3 py-1 text-sm">
            <option value="day">Ngày</option>
            <option value="week">Tuần</option>
            <option value="month">Tháng</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={reviewData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#EF4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ tăng trưởng người dùng */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold text-lg mb-4">Tăng trưởng người dùng</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={growthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#3B82F6" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top nổi bật */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">🏆 Top Nhà hàng</h3>
          {topRestaurants.map((r, i) => (
            <p key={i}>{i + 1}. {r.name} ({r.score} ⭐)</p>
          ))}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">🍜 Top Món ăn</h3>
          {topDishes.map((d, i) => (
            <p key={i}>{i + 1}. {d.name} ({d.score} ⭐)</p>
          ))}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">🔥 Người dùng tích cực</h3>
          {topUsers.map((u, i) => (
            <p key={i}>{i + 1}. {u.name} ({u.count} đánh giá)</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
