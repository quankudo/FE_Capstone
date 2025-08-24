import React from 'react'
import { FaHome, FaUser, FaUtensils } from 'react-icons/fa'
import { MdDashboard, MdNotifications } from 'react-icons/md'
import { BiCommentDetail } from "react-icons/bi";
import { GiKnifeFork } from "react-icons/gi";
import { RiCalendarEventLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { ROUTES } from '../constant/routes'
import { useDispatch, useSelector } from 'react-redux'
import { logo } from '../assets/images/index'
import { logout } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import Notifications from '../pages/Notifications';

const restaurantNotifications = [
  {
    id: 1,
    title: '📥 Đơn hàng mới',
    content: 'Nguyễn Văn A vừa đặt món "Cơm gà chiên mắm".',
    icon: '📥',
    createdAt: '2025-07-30T11:00:00Z',
    isRead: false,
    link: '/orders',
  },
  {
    id: 2,
    title: '💬 Đánh giá mới',
    content: 'Khách hàng Trần B vừa đánh giá 5⭐ cho món "Lẩu Thái".',
    icon: '💬',
    createdAt: '2025-07-29T09:15:00Z',
    isRead: false,
    link: '/reviews',
  },
  {
    id: 3,
    title: '📈 Báo cáo tuần',
    content: 'Báo cáo doanh thu và lượt đánh giá tuần đã sẵn sàng.',
    icon: '📈',
    createdAt: '2025-07-28T07:00:00Z',
    isRead: true,
    link: '/dashboard',
  },
];


const RestaurantLayout = () => {
  const {user, isAuthenticated, restaurantInfo} = useSelector(state => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // xóa user, isAuthenticated
    localStorage.removeItem("user"); // nếu bạn lưu token/user
    toast.success("Đăng xuất thành công!")
    navigate("/"); // quay về trang chủ hoặc login
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6 h-[100vh]"></div>
      <aside className="w-64 bg-white shadow-lg p-6 fixed top-0 left-0 h-[100vh]">
        <div className="flex items-center gap-2 mb-6">
          <img src={logo} alt="Logo" className="h-[70px] w-[200px] object-cover" />
        </div>
        <nav className="flex flex-col gap-5">
          <NavLink
            to=""
            end
            className={({ isActive }) =>
              'flex items-center gap-2 ' + 
              (isActive ? 'text-red-600 font-semibold' : 'text-gray-700 hover:text-red-500')
            }
          >
            <FaHome/> Trang chủ
          </NavLink>
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              'flex items-center gap-2 ' + 
              (isActive ? 'text-red-600 font-semibold' : 'text-gray-700 hover:text-red-500')
            }
          >
            <MdDashboard /> Dashboard
          </NavLink>
          <NavLink
            to="reviews"
            className={({ isActive }) =>
              'flex items-center gap-2 ' + 
              (isActive ? 'text-red-600 font-semibold' : 'text-gray-700 hover:text-red-500')
            }
          >
            <BiCommentDetail/> Lịch sử đánh giá
          </NavLink>
          <NavLink
            to="dishes"
            className={({ isActive }) =>
              'flex items-center gap-2 ' + 
              (isActive ? 'text-red-600 font-semibold' : 'text-gray-700 hover:text-red-500')
            }
          >
            <GiKnifeFork/> Quản lý món ăn
          </NavLink>
          <NavLink
            to="events"
            className={({ isActive }) =>
              'flex items-center gap-2 ' + 
              (isActive ? 'text-red-600 font-semibold' : 'text-gray-700 hover:text-red-500')
            }
          >
            <RiCalendarEventLine/> Quản lý sự kiện
          </NavLink>
        </nav>
        <button className='absolute bottom-7 left-7 flex items-center gap-2 px-5 py-2 rounded text-white bg-red-500 hover:bg-red-600' onClick={handleLogout}><FiLogOut /> Đăng xuất</button>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow py-4 px-6 flex justify-between items-center fixed top-0 left-64 right-0 z-10">
          <div className='flex items-center gap-3'>
            <FaUtensils size={23} className="text-red-500" />
            <h1 className="text-2xl font-medium text-gray-800">{restaurantInfo.Name}</h1>
          </div>
          <div className="text-gray-600 flex gap-5 items-center">
            <div className="flex items-center gap-1 px-4 py-6 text-gray-700 hover:text-red-500">
              <Notifications notifications={restaurantNotifications}/>
            </div>
            {isAuthenticated ? (
              <div className="relative group">
                <div className="flex items-center gap-1 text-gray-700 hover:text-blue-500 cursor-pointer">
                  <FaUser />
                  <span>{user.name}</span>
                </div>
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100 w-full"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <NavLink
                to={ROUTES.LOGIN}
                className={({ isActive }) => `
                  flex items-center gap-1 px-4 py-6
                  ${isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-500'}
                `}
              >
                <FaUser />
                <span>Đăng nhập</span>
              </NavLink>
            )}
          </div>
        </header>

        {/* Nội dung động */}
        <main className="flex-1 p-6 mt-[105px]">
          <div className='p-5 rounded shadow bg-white'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default RestaurantLayout
