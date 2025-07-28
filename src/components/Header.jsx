import React, { useEffect, useState } from 'react'
import { logo } from '../assets/images/index'
import { IoSearchOutline } from "react-icons/io5"
import { FaHeart, FaUser } from "react-icons/fa"
import { MdNotifications } from "react-icons/md";
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ROUTES } from '../constant/routes'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/slices/authSlice'
import restaurantApi from '../api/restaurantApi';

const menuItems = [
  { name: 'Home', path: '/' },
  { name: 'Restaurants', path: '/restaurants' },
  { name: 'Contact', path: '/contact' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Reviews', path: '/reviews' },
]

const Header = () => {
  const [search, setSearch] = useState('')
  const {user, isAuthenticated} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim() !== '') {
        fetchData(search);
      }
      else {
        setResults([])
      }
    }, 500); // debounce 500ms

    return () => clearTimeout(delayDebounce); // cleanup timeout
  }, [search]);

  const fetchData = async (keyword) => {
    try {
      const response = await restaurantApi.getRestaurants({search: keyword})
      console.log(response);
      
      setResults(response.data);
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    }
  };

  const handleLogout = () => {
    dispatch(logout()); // xóa user, isAuthenticated
    localStorage.removeItem("user"); // nếu bạn lưu token/user
    navigate("/"); // quay về trang chủ hoặc login
  };

  return (
    <div className='px-32 mb-4'>
      <header className="flex items-center justify-between py-4 bg-white">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-16 w-auto object-contain" />
        </div>

        {/* Search */}
        <div className="flex items-center border rounded-full px-4 py-2 w-1/3 bg-gray-100 relative">
          <input
            type="text"
            placeholder="Nhập từ khóa tìm kiếm..."
            className="flex-grow bg-transparent outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <IoSearchOutline size={20} className="text-gray-600" />
          <div className='flex flex-col gap-4 absolute top-[104%] left-0 rounded bg-white shadow w-full z-10'>
            {
              results && results.length > 0 && results.map((rest) => 
                <Link to={rest.Id} key={rest.Id} className='flex gap-5 px-3 items-center rounded hover:bg-red-50'>
                  <img src={rest.ImageUrl} alt={rest.Name} className='w-[50px] h-[50px] object-cover rounded-full' />
                  <h4>{rest.Name}</h4>
                </Link>
              )
            }
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <NavLink
            to={ROUTES.FAVORITE}
            className={({ isActive }) => `
              flex items-center gap-1 px-4 py-6
              ${isActive ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-500'}
            `}
          >
            <FaHeart />
            <span>Yêu thích</span>
          </NavLink>
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
      <hr />
      <nav className="flex gap-10 items-center">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? 'text-red-600 font-bold px-4 py-6' : 'text-gray-700 hover:text-red-500 px-4 py-6'
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
      <hr />
    </div>
  )
}

export default Header
