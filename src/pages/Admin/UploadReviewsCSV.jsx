import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiUpload } from "react-icons/fi";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { toast } from "react-toastify";
import restaurantApi from "../../api/restaurantApi";
import { outOfStock } from "../../assets/images";

const UploadReviewsCSV = () => {
  const [file, setFile] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await restaurantApi.getAllRestaurants();
        setRestaurants(res);
      } catch (error) {
        toast.error("Lỗi khi tải danh sách nhà hàng");
      }
    };
    fetchRestaurants();
  }, []);

  const handleUpload = async () => {
    if (!file) return toast.warning("Vui lòng chọn file CSV!");
    if (!selectedRestaurant) return toast.warning("Vui lòng chọn nhà hàng!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("restaurantId", selectedRestaurant);
    console.log(file);
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/admin/upload-reviews",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setResult(res.data);
      toast.success("Upload & phân tích thành công!");
    } catch (error) {
      toast.error("Lỗi khi upload file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">

      {/* Tiêu đề */}
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <FiUpload className="text-red-500" /> Upload & Phân tích đánh giá
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <label className="block font-medium mb-2">Chọn nhà hàng</label>
            <select
              value={selectedRestaurant}
              onChange={(e) => setSelectedRestaurant(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:border-red-500"
            >
              <option value="">-- Chọn nhà hàng --</option>
              {restaurants.map((res) => (
                <option key={res.Id} value={res.Id}>
                  {res.Name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">Chọn file CSV</label>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:border-red-500"
            />
          </div>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FiUpload />
            {loading ? "Đang xử lý..." : "Upload & Phân tích"}
          </button>
        </div>

        {/* Kết quả */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center">
          {!result ? (
            <div className="flex flex-col items-center justify-center text-center">
                <img
                    src={outOfStock}
                    alt="No data"
                    className="opacity-70 w-32 h-auto mb-3"
                />
                <p className="text-red-500 text-lg italic">
                    Chưa có dữ liệu để hiển thị. Vui lòng chọn nhà hàng và upload file CSV.
                </p>
            </div>
          ) : (
            <div className="w-full">
              <h3 className="text-lg font-semibold mb-4 text-center">Kết quả phân tích</h3>
              <div className="flex justify-around">
                <div className="flex flex-col items-center">
                  <FaThumbsUp className="text-green-500 text-3xl" />
                  <p className="mt-2 font-bold text-xl">{result.good}</p>
                  <span className="text-gray-500 text-sm">Đánh giá tốt</span>
                </div>
                <div className="flex flex-col items-center">
                  <FaThumbsDown className="text-red-500 text-3xl" />
                  <p className="mt-2 font-bold text-xl">{result.bad}</p>
                  <span className="text-gray-500 text-sm">Đánh giá xấu</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadReviewsCSV;
