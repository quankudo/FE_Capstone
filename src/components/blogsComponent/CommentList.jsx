const CommentsList = ({ comments }) => {
  return (
    <div className="px-6 pb-4 space-y-4">
      {comments.map((comment) => (
        <div key={comment.CommentId} className="border-b pb-2">
          <div className="text-sm text-gray-800 font-semibold mb-1">
            {comment.UserName}
          </div>
          <div className="text-sm text-gray-600 mb-1">{comment.Comment}</div>
          <div className="text-xs text-gray-400">
            {new Date(comment.CreatedAt).toLocaleString("vi-VN")}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
