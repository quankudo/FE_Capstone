import React, { useEffect, useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import ListRestaurant from '@/components/ListRestaurant';
import cityApi from '@/api/cityApi';
import restaurantApi from '@/api/restaurantApi';
import Pagination from '@/components/Pagination'; 
import CuisineFilter from '../../components/filters/CuisineFilter';

const Restaurant = () => {
  const [minRating, setMinRating] = useState(0);
  const [city, setCity] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  const [cities, setCities] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false)
  const limit = 6;

  // Lấy danh sách thành phố
  useEffect(() => {
    setLoading(true)
    const fetchCities = async () => {
      try {
        const res = await cityApi.getAllCities();
        setCities(res); // res.data nếu API trả về object {data: [...]}
      } catch (error) {
        console.error('Lỗi khi lấy danh sách thành phố:', error);
      }
      finally {
        setLoading(false)
      }
    };

    fetchCities();
  }, []);

  // Lấy danh sách nhà hàng theo bộ lọc
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const params = {
          page: currentPage,
          limit,
          search: '',
          idDistrict: city || undefined, // Giả sử city là idDistrict
          idType: undefined, // Có thể thêm lọc theo loại nhà hàng nếu muốn
          minRating : minRating,
          sortOrder : sortOrder
        };

        const res = await restaurantApi.getRestaurants(params);
        
        setRestaurants(res.data); // hoặc res.data.restaurants tuỳ API
        setTotalPages(res.totalPages);
        console.log(totalPages);
        
      } catch (error) {
        console.error('Lỗi khi tải danh sách nhà hàng:', error);
      }
    };

    fetchRestaurants();
  }, [city, currentPage, sortOrder, minRating]);

  // Lọc thêm theo rating và sort client-side
  const filtered = restaurants
    .filter((r) => r.Score >= minRating)
    .sort((a, b) =>
      sortOrder === 'asc' ? a.Score - b.Score : b.Score - a.Score
  );

  return (
    <section className="pb-10 pt-5 md:px-10 xl:px-32">
      <SectionHeader
        title="Khám phá các nhà hàng nổi bật"
        subTitle="Tìm địa điểm lý tưởng cho bữa ăn tuyệt vời của bạn"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-6">
        {/* Bộ lọc */}
        <div className="bg-white rounded-xl shadow p-4 space-y-4 h-fit">
          <h3 className="font-semibold text-lg mb-2">Bộ lọc</h3>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium mb-1">Xếp hạng tối thiểu</label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(parseFloat(e.target.value))}
              className="w-full border rounded px-3 py-2"
            >
              <option value={0}>Tất cả</option>
              <option value={3}>Từ 3 sao</option>
              <option value={4}>Từ 4 sao</option>
              <option value={4.5}>Từ 4.5 sao</option>
            </select>
          </div>

          {/* Thành phố */}
          <div>
            <label className="block text-sm font-medium mb-1">Thành phố</label>
            <select
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Tất cả</option>
              {cities.map((c) => (
                <option key={c.Id} value={c.Id}>{c.Name}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium mb-1">Sắp xếp theo</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="desc">⭐ Cao đến thấp</option>
              <option value="asc">⭐ Thấp đến cao</option>
            </select>
          </div>
          <CuisineFilter />
        </div>

        {/* Danh sách nhà hàng */}
        <div className="col-span-1 md:col-span-3 space-y-4">
          <ListRestaurant restaurants={filtered} loading={loading} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </section>
  );
};

export default Restaurant;
