import React, { useEffect, useState } from "react";
import { FaComments, FaSearch, FaStar } from "react-icons/fa";
import formatDateTime from "../../utils/formatDateTime";
import evaluateDishApi from '../../api/evaluateDishApi'
import evaluateRestaurantApi from '../../api/evaluateRestaurantApi'
import Loading from '../../components/Loading'
import { useSelector } from "react-redux";
import TitleDashboard from "../../components/TitleDashboard";

const Reviews = () => {
  const {user, isAuthenticated, restaurantInfo} = useSelector(state => state.auth)
  const [tab, setTab] = useState("dish");
  const [dishComments, setDishComments] = useState([])
  const [restComments, setRestComments] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
    const fetchData = async () => {
      try {
        const resDish = await evaluateDishApi.getEvaluateByRestId(restaurantInfo.Id)
        const resRest = await evaluateRestaurantApi.getEvaluateByRestId(restaurantInfo.Id)
        setDishComments(resDish)
        setRestComments(resRest)
      } catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false)
      }
    }
    fetchData()
  },[])

  const renderReviewItem = (review, type) => (
    <div
      key={review.Id}
      className="bg-white p-5 rounded-xl shadow border border-gray-100 hover:shadow-md transition"
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium text-md">{review.UserName}</h4>
        <span className="text-sm text-gray-500">{formatDateTime(review.CreatedAt)}</span>
      </div>
      {type === "dish" && (
        <p className="text-sm text-blue-600 mb-2">
          Món: <strong>{review.DishName}</strong>
        </p>
      )}
      <p className="mt-2 text-gray-700">{review.Comment}</p>
    </div>
  );

  if(loading)
    return <Loading />
  return (
    <div className="my-4 px-4">
      {/* Tab buttons */}
      <div className="flex mb-4 justify-between items-center">
        <TitleDashboard Icon={FaComments} title={'Lịch sử đánh giá'} />
        <div className="flex gap-4">
          <button className="flex items-center gap-1 px-5 py-2 rounded-full font-medium bg-blue-500 text-white"><FaSearch /> Trích xuất từ khóa</button>
          <button
            onClick={() => setTab("dish")}
            className={`px-5 py-2 rounded-full border transition font-medium ${
              tab === "dish"
                ? "bg-red-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Đánh giá món ăn
          </button>
          <button
            onClick={() => setTab("restaurant")}
            className={`px-5 py-2 rounded-full border transition font-medium ${
              tab === "restaurant"
                ? "bg-red-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Đánh giá nhà hàng
          </button>
        </div>
      </div>

      {/* Review list */}
        {tab === "dish" && (
          dishComments.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {dishComments.map((review) => renderReviewItem(review, "dish"))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Chưa có đánh giá nào.</p>
          )
        )}

        {tab === "restaurant" && (
          restComments.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {restComments.map((review) => renderReviewItem(review, "restaurant"))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Chưa có đánh giá nào.</p>
          )
        )}
    </div>
  );
};

export default Reviews;
