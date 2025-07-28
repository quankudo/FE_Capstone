import React from 'react'

const Evaluate = ({comment, setComment, handleSendReview}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow border">
        <textarea
        className="w-full border p-2 rounded resize-none mb-2 focus:outline-none focus:border-red-300"
        rows={3}
        placeholder="Nhập đánh giá của bạn..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        />
        <div className="text-right">
        <button
            className="bg-red-600 text-white px-4 py-2 font-medium rounded hover:bg-red-700 text-sm"
            onClick={handleSendReview}
        >
            Gửi đánh giá
        </button>
        </div>
    </div>
  )
}

export default Evaluate
