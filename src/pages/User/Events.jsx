import React, { useEffect, useState } from 'react'
import EventCard from '@/components/EventCard';
import SectionHeader from '@/components/SectionHeader';
import eventApi from '@/api/eventApi';
import SkeletonEventCard from '@/components/Skeletons/SkeletonEventCard';
import EmptyState from '@/components/EmptyState';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const res = await eventApi.getAllEvents(1)
        setEvents(res)
      } catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false)
      }
    }
    fetchData()
  }, []);

  return (
    <div className="px-32 space-y-4">
      <SectionHeader 
        title={"Sự kiện & Ưu đãi"} 
        subTitle={"Khám phá những chương trình khuyến mãi, tiệc đặc biệt và sự kiện mới nhất."}
      />
      {loading ? (
        // render skeleton trong lúc load
        Array.from({ length: 3 }).map((_, i) => <SkeletonEventCard key={i} />)
        ) : events.length === 0 ? (
          <EmptyState text={'Hiện không có sự kiện nào đang diễn ra.'}/>
        ) : (
          events.map((event) => <EventCard key={event.Id} event={event} />)
      )}
    </div>
  );
}

export default Events
