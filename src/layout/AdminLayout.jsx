import React from 'react'
import { FaBlog, FaFlag, FaStore, FaTools, FaUser, FaUsers } from 'react-icons/fa'
import { MdDashboard, MdNotifications } from 'react-icons/md'
import { FiLogOut, FiUpload } from "react-icons/fi";
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { ROUTES } from '../constant/routes'
import { useDispatch, useSelector } from 'react-redux'
import { logo } from '../assets/images/index'
import { logout } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { GiKnifeFork } from 'react-icons/gi';
import { RiCalendarEventLine } from 'react-icons/ri';
import Notifications from '../pages/Notifications';
import SystemConfigDropdown from '../components/SystemConfigDropdown';

const adminNotifications = [
  {
    id: 1,
    title: '🧾 Đơn đăng ký nhà hàng',
    content: 'Nhà hàng "Phở 123" vừa gửi yêu cầu tham gia hệ thống.',
    icon: '🧾',
    createdAt: '2025-07-30T13:00:00Z',
    isRead: false,
    link: '/admin/requests',
  },
  {
    id: 2,
    title: '🚨 Báo cáo vi phạm',
    content: 'Người dùng tố cáo món ăn sai thông tin tại "Nhà hàng ABC".',
    icon: '🚨',
    createdAt: '2025-07-29T10:20:00Z',
    isRead: false,
    link: '/admin/reports',
  },
  {
    id: 3,
    title: '👥 Tài khoản mới',
    content: 'Hệ thống ghi nhận 120 người dùng đăng ký mới hôm nay.',
    icon: '👥',
    createdAt: '2025-07-28T22:00:00Z',
    isRead: true,
    link: '/admin/users',
  },
];


const AdminLayout = () => {
  const {user, isAuthenticated} = useSelector(state => state.auth)
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
            to="dashboard"
            className={({ isActive }) =>
              'flex items-center gap-2 ' + 
              (isActive ? 'text-red-600 font-semibold' : 'text-gray-700 hover:text-red-500')
            }
          >
            <MdDashboard />  Thống kê tổng quan
          </NavLink>
          <NavLink
            to="users"
            className={({ isActive }) =>
              'flex items-center gap-2 ' + 
              (isActive ? 'text-red-600 font-semibold' : 'text-gray-700 hover:text-red-500')
            }
          >
            <FaUsers/>  Quản lý người dùng
          </NavLink>
          <NavLink
            to="restaurants"
            className={({ isActive }) =>
              'flex items-center gap-2 ' + 
              (isActive ? 'text-red-600 font-semibold' : 'text-gray-700 hover:text-red-500')
            }
          >
            <FaStore/>  Quản lý nhà hàng
          </NavLink>
          <NavLink
            to="events"
            className={({ isActive }) =>
              'flex items-center gap-2 ' + 
              (isActive ? 'text-red-600 font-semibold' : 'text-gray-700 hover:text-red-500')
            }
          >
            <RiCalendarEventLine/>  Quản lý sự kiện
          </NavLink>
          <NavLink
            to="dishes"
            className={({ isActive }) =>
              'flex items-center gap-2 ' + 
              (isActive ? 'text-red-600 font-semibold' : 'text-gray-700 hover:text-red-500')
            }
          >
            <GiKnifeFork/>  Quản lý món ăn
          </NavLink>
          <NavLink
            to="blogs"
            className={({ isActive }) =>
              'flex items-center gap-2 ' + 
              (isActive ? 'text-red-600 font-semibold' : 'text-gray-700 hover:text-red-500')
            }
          >
            <FaBlog/>  Quản lý bài viết / blog
          </NavLink>
          <NavLink
            to="complaints"
            className={({ isActive }) =>
              'flex items-center gap-2 ' + 
              (isActive ? 'text-red-600 font-semibold' : 'text-gray-700 hover:text-red-500')
            }
          >
            <FaFlag/> Quản lý khiếu nại
          </NavLink>
          <NavLink
            to="upload"
            className={({ isActive }) =>
              'flex items-center gap-2 ' + 
              (isActive ? 'text-red-600 font-semibold' : 'text-gray-700 hover:text-red-500')
            }
          >
            <FiUpload /> Phân tích đánh giá
          </NavLink>
        </nav>
        <button className='absolute bottom-7 left-7 flex items-center gap-2 px-5 py-2 rounded text-white bg-red-500 hover:bg-red-600' onClick={handleLogout}><FiLogOut /> Đăng xuất</button>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow py-4 px-6 flex justify-between items-center fixed top-0 left-64 right-0 z-10">
          <div className='flex items-center gap-3'>
            <FaTools size={22} className="text-red-500" />
            <h1 className="text-2xl font-medium text-gray-800">Quản lý hệ thống nhà hàng</h1>
          </div>
          <div className="text-gray-600 flex gap-5 items-center">
            <div className="flex items-center gap-1 px-4 py-6 text-gray-700 hover:text-red-500">
              <Notifications notifications={adminNotifications}/>
            </div>
            <SystemConfigDropdown />
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

export default AdminLayout
