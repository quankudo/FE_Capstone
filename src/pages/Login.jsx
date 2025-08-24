import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/constant/routes";
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "@/redux/slices/authSlice";
import userApi from "@/api/userApi";
import restaurantApi from "@/api/restaurantApi";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await userApi.login(formData);
      let restaurantInfo = null;
      console.log(res);
      if (res.user.role === "Restaurant") {
        const response = await restaurantApi.getRestaurantByUserId(res.user.id);
        restaurantInfo = response;
      }
      const userData = {
        user: {
          id: res.user.id,
          name: res.user.name,
          email: res.user.email,
          role: res.user.role,
        },
        restaurantInfo,
      };
      localStorage.setItem('accessToken', res.token);
      dispatch(loginSuccess(userData));
      if(userData.user.role === 'Restaurant')
        navigate('/rest')
      else if(userData.user.role === 'Customer')
        navigate(ROUTES.HOME)
      else
        navigate('/admin/dashboard')
      toast.success("Đăng nhập thành công")
    } catch (err) {
      dispatch(loginFailure('Đăng nhập thất bại'));
      console.log(err);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-medium text-center text-gray-800 mb-6">Đăng nhập</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
              value={formData.email}
              onChange={handleChange}
              placeholder="user@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Mật khẩu</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
          >
            Đăng nhập
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Chưa có tài khoản?{" "}
          <Link to={`/${ROUTES.REGISTER}`} className="text-red-500 hover:underline">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
