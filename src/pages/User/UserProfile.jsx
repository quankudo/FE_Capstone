import React, { useEffect, useState } from "react";
import { FaUserCircle, FaEnvelope, FaCalendarAlt, FaEdit, FaHome, FaUtensils, FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import { BiSolidUserRectangle } from "react-icons/bi";

import { useSelector } from "react-redux";

import formatDateTime from "@/utils/formatDateTime";

import evaluateDishApi from "@/api/evaluateDishApi";
import evaluateRestaurantApi from "@/api/evaluateRestaurantApi";
import userApi from "@/api/userApi";

const listTabs = [
    {
        icon : FaUserCircle,
        title : "Trang chủ",
        tab: "User"
    },
    {
        icon : FaUtensils,
        title : "Lịch sử đánh giá",
        tab: "Comment"
    },
    {
        icon : FaHeart,
        title : "Món yêu thích",
        tab: "Heart"
    },
]

const UserProfile = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [tab, setTap] = useState('User')
  const [dishComments, setDishComments] = useState([])
  const [restComments, setrestComments] = useState([])
  const [subTab, setSubTab] = useState("restaurant"); // "dish" hoặc "restaurant"
  const [info, setInfo] = useState({})

  useEffect(()=>{
    const fetchData = async () => {
        try {
            const resDish = await evaluateDishApi.getEvaluateByUserId(user.id)
            const resRest = await evaluateRestaurantApi.getEvaluateByUserId(user.id)
            const resUser = await userApi.getUsersById(user.id)
            
            setInfo(resUser)
            setDishComments(resDish)
            setrestComments(resRest)
        } catch (error) {
            console.log(error);
        }
    }
    fetchData()
  },[])

  const handleTabClick = (tabName) => setTap(tabName)

  return (
    <div className="flex px-32 py-5 gap-6">
        {/* ASIDE LEFT */}
        <aside className="w-1/4 bg-white rounded-2xl shadow p-6 text-center">
            <FaUserCircle className="text-[120px] text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold">{user?.name || "Tên người dùng"}</h2>
            <p className="text-gray-500 text-sm mb-6">@{user?.email}</p>

            <nav className="space-y-4 text-left">
            {
                listTabs.map((item)=>(
                    <div key={item.tab} className={`flex items-center gap-3 text-gray-600 hover:text-white hover:bg-red-100 cursor-pointer px-4 py-2 rounded ${tab===item.tab && 'text-white bg-red-500'}`} onClick={()=>handleTabClick(item.tab)}>
                        <item.icon />
                        <span>{item.title}</span>
                    </div>
                ))
            }
            </nav>
        </aside>

        {/* USER INFO RIGHT */}
        {tab === "User" && 
            <div className="w-3/4 p-6 bg-white rounded-2xl shadow">
                <div className="flex items-center gap-4 mb-6">
                <FaUserCircle className="text-6xl text-gray-500" />
                <div>
                    <h2 className="text-2xl font-bold">{user?.name || "Tên người dùng"}</h2>
                    <p className="text-gray-600">@{user?.email}</p>
                </div>
                </div>

                <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                    <FaEnvelope className="text-lg" />
                    <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                    <BiSolidUserRectangle className="text-lg" />
                    <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                    <FaCalendarAlt className="text-lg" />
                    <span>Tham gia: {(new Date()).toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                    <FaMapMarkerAlt className="text-lg" />
                    <span>{info.CityName} - {info.DistrictName}</span> {/* ← Địa chỉ động nếu có */}
                </div>
                </div>

                <div className="mt-6 text-right">
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2">
                    <FaEdit />
                    Sửa thông tin
                </button>
                </div>
            </div>
        }
        {tab === "Comment" &&  
            <div className="w-3/4 p-6 bg-white rounded-2xl shadow space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">Bình luận đã viết</h2>
                <div className="flex gap-4 mb-4">
                    <button
                        className={`px-4 py-2 rounded ${subTab === "restaurant" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"}`}
                        onClick={() => setSubTab("restaurant")}
                    >
                        Bình luận nhà hàng
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${subTab === "dish" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"}`}
                        onClick={() => setSubTab("dish")}
                    >
                        Bình luận món ăn
                    </button>
                </div>
                <div className="max-h-96 overflow-y-auto space-y-4">
                    {subTab === "restaurant" ? (
                        restComments.length === 0 ? (
                        <p className="text-gray-500 italic">Bạn chưa bình luận nhà hàng nào.</p>
                        ) : (
                        restComments.map((comment, index) => (
                            <div key={index} className="p-4 border rounded-lg bg-gray-50">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-medium text-gray-800">{comment.RestaurantName}</span>
                                <span className="text-sm text-gray-500">{formatDateTime(comment.CreatedAt)}</span>
                            </div>
                            <p className="text-gray-700">{comment.Comment}</p>
                            </div>
                        ))
                        )
                    ) : (
                        dishComments.length === 0 ? (
                        <p className="text-gray-500 italic">Bạn chưa bình luận món ăn nào.</p>
                        ) : (
                        dishComments.map((comment, index) => (
                            <div key={index} className="p-4 border rounded-lg bg-gray-50">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-medium text-gray-800">
                                {comment.DishName} ({comment.RestaurantName})
                                </span>
                                <span className="text-sm text-gray-500">{formatDateTime(comment.CreatedAt)}</span>
                            </div>
                            <p className="text-gray-700">{comment.Comment}</p>
                            </div>
                        ))
                        )
                    )}
                    </div>


            </div>
        }

    </div>
  );
};

export default UserProfile;
