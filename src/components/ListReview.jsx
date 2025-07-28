import React from 'react'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';

dayjs.extend(relativeTime);
dayjs.locale('vi');

const ListReview = ({reviews}) => {
  return (
    <div className="max-h-[300px] overflow-y-auto pr-2 mb-4">
        <div className="grid md:grid-cols-2 gap-5">
        {reviews.map((comment) => (
            <div
            key={comment.Id}
            className="bg-white border rounded-lg p-4 shadow-sm relative"
            >
            <p className="font-semibold">{comment.UserName}</p>
            <p className="text-sm text-gray-600 italic">⭐ {comment.Score || 4.9}</p>
            <p>{comment.Comment}</p>
            <span className='absolute right-3 top-3 italic text-sm'>{dayjs(comment.CreatedAt).fromNow()}</span>
            </div>
        ))}
        </div>
    </div>
  )
}

export default ListReview
