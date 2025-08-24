import React, { useEffect, useState } from 'react';
import TextTitle from '@/components/TextTitle';
import ListFood from '@/components/ListFood';
import dishApi from '@/api/dishApi';
import { toast } from 'react-toastify';

const TopRatedDishes = () => {
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=> {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await dishApi.getTopDishes()
        setDishes(response)
      } catch (error) {
        console.log(error.message);
        toast.error(error.message)
      }
      finally {
        setLoading(false)
      }
    }

    fetchData()
  },[])
  return (
    <div className="py-8 px-32">
      <TextTitle text={"🌟 Top món ăn được đánh giá cao"}/>
      <ListFood dishes={dishes} loading={loading}/>
      
    </div>
  );
};

export default TopRatedDishes;
