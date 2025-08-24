import React from "react";
import formatDateTimeUTC from '../utils/formatDateTimeUTC';

const EventCard = ({ event}) => {
  return (
    <div className={`bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row gap-6`}>
      <img
        src={event.ImageUrl}
        alt={event.Title}
        className="w-full md:w-1/3 h-40 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h2 className="text-xl font-bold">{event.Title}</h2>
        <h4 className="text-red-500 font-medium mb-4">{event.RestaurantName}</h4>
        <p className="text-gray-600 text-sm mb-2">
          {formatDateTimeUTC(event.StartDate)} → {formatDateTimeUTC(event.EndDate)}
        </p>
        <p className="text-gray-700 line-clamp-3">{event.Desc}</p>
        <div className="text-end"><button className="px-4 py-2 rounded bg-red-500 text-white mt-4">Xem chi tiết</button></div>
      </div>

    </div>
  );
};

export default EventCard;
