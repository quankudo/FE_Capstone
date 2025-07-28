import React from 'react'
import { FaUser } from 'react-icons/fa'
import { MdNotifications } from 'react-icons/md'
import { FiLogOut } from "react-icons/fi";
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { ROUTES } from '../constant/routes'
import { useDispatch, useSelector } from 'react-redux'
import { logo } from '../assets/images/index'
import { logout } from '../redux/slices/authSlice';

const RestaurantLayout = () => {
  const {user, isAuthenticated} = useSelector(state => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // xóa user, isAuthenticated
    localStorage.removeItem("user"); // nếu bạn lưu token/user
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
              isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-500'
            }
          >
            🏠 Trang chủ
          </NavLink>
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-500'
            }
          >
            ❤️ Dashboard
          </NavLink>
          <NavLink
            to="history"
            className={({ isActive }) =>
              isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-500'
            }
          >
            📝 Lịch sử đánh giá
          </NavLink>
          <NavLink
            to="dishes"
            className={({ isActive }) =>
              isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-500'
            }
          >
            📝 Quản lý món ăn
          </NavLink>
        </nav>
        <button className='absolute bottom-7 left-7 flex items-center gap-2 px-5 py-2 rounded text-white bg-red-500 hover:bg-red-600' onClick={handleLogout}><FiLogOut /> Đăng xuất</button>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow py-4 px-6 flex justify-between items-center fixed top-0 left-64 right-0 z-10">
          <h1 className="text-xl font-bold text-gray-800">Bảng điều khiển người dùng</h1>
          <div className="text-gray-600 flex gap-5 items-center">
            <NavLink
              to={ROUTES.NOTIFICATION}
              className={({ isActive }) => `
                flex items-center gap-1 px-4 py-6
                ${isActive ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-500'}
              `}
            >
              <MdNotifications size={20} />
              <span>Thông báo</span>
            </NavLink>
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
