import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTES } from "@/constant/routes";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu không khớp.");
      return;
    }

    // Gửi dữ liệu đến server ở đây

    navigate("/login");
    toast.success("Đăng ký thành công!")
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-background px-4">
    <div className="max-w-md mx-auto my-10 p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-medium mb-4 text-center">Đăng ký</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Họ và tên"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          value={form.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Xác nhận mật khẩu"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Đăng ký
        </button>
      </form>

      <p className="text-sm text-center text-gray-600 mt-4">
        Đã có tài khoản?{" "}
        <Link
          className="text-red-500 hover:underline"
          to={`/${ROUTES.LOGIN}`}
        >
          Đăng nhập
        </Link>
      </p>
    </div>
    </div>
  );
};

export default Register;
