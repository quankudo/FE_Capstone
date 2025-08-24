import React, { useEffect, useState } from 'react';
import TextTitle from '@/components/TextTitle';
import ListRestaurant from '@/components/ListRestaurant';
import restaurantApi from '@/api/restaurantApi';
import { toast } from 'react-toastify';

const TopRatedRestaurants = () => {
    const [favorites, setFavorites] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=> {
      setLoading(true)
      const fetchData = async () => {
        try {
          const response = await restaurantApi.getTopRestaurants()
          setRestaurants(response)
        } catch (error) {
          toast.error(error.message)
          console.log(error);
        }
        finally {
          setLoading(false)
        }
      }

      fetchData()
    },[])

    const handleToggleFavorite = (id) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
        )
    }
  return (
    <section className="py-8 px-32">
      <TextTitle text={"🌟 Nhà hàng được đánh giá cao nhất"} />
      <ListRestaurant restaurants={restaurants} loading={loading} />
    </section>
  );
};

export default TopRatedRestaurants;
