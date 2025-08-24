import { useState, useRef, useEffect } from "react";
import CommentsList from "./CommentList";
import { Send, MessageCircle, Share2, User } from "lucide-react";
import blogsApi from "../../api/blogsApi";
import { useSelector } from "react-redux";
import axios from "axios";
import { FlaskAPI } from "../../constant";

const defaultEmojis = ["👍", "❤️", "😂", "😮", "😢", "😡"];
const defaultEmojiNames = {
  "👍": "Link",
  "❤️": "Love",
  "😂": "Haha",
  "😮": "Wow",
  "😢": "Sad",
  "😡": "Ảngy",
};

const reverseEmojiMap = {
  "👍": 1,
  "❤️": 2,
  "😂": 3,
  "😮": 4,
  "😢": 5,
  "😡": 6,
};

const emojiMap = {
  like: "👍",
  love: "❤️",
  haha: "😂",
  wow: "😮",
  sad: "😢",
  angry: "😡",
};

const BlogPostCard = ({
  id,
  title = "...",
  author = "...",
  date = "...",
  description = "...",
  imageUrl = "",
  tags = [""],
  score = 0,
  initialReactions = {
    "👍": 0,
    "❤️": 0,
    "😂": 0,
    "😮": 0,
    "😢": 0,
    "😡": 0,
  },
  initialComments = [],
}) => {
  const {user, isAuthenticated} = useSelector(state => state.auth)
  const [reaction, setReaction] = useState(null);
  const [reactionsCount, setReactionsCount] = useState(initialReactions);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [emojis, setEmojis] = useState(defaultEmojis);
  const [emojiNames, setEmojiNames] = useState(defaultEmojiNames);
  const [emojiDetails, setEmojiDetails] = useState([]);
  const [comments, setComments] = useState(initialComments);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const reactionRef = useRef(null);

  // TÁCH RIÊNG API GỌI EMOJI
  const loadEmojiData = async () => {
    try {
      const response = await blogsApi.getEmojis(id);
      const currentBlogEmojis = response;
      
      setEmojiDetails(currentBlogEmojis);
      // console.log(response);
      

      const emojiCount = {};
      defaultEmojis.forEach((emojiKey) => {
        const emojiTextKey = defaultEmojiNames[emojiKey];
        emojiCount[emojiKey] = currentBlogEmojis.filter(
          (item) => item.Emoji === emojiTextKey
        ).length;
      });
      console.log(emojiCount);
      
      setReactionsCount(emojiCount);

      const currentUserId = 1;
      const userReaction = currentBlogEmojis.find(
        (item) => item.UserId === currentUserId
      );
      setReaction(userReaction ? emojiMap[userReaction.Emoji] : null);
    } catch (error) {
      console.error("Lỗi khi loadEmojiData:", error);
    }
  };

  useEffect(() => {
    loadEmojiData();
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (reactionRef.current && !reactionRef.current.contains(event.target)) {
        setShowReactionPicker(false);
      }
    };

    if (showReactionPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showReactionPicker]);

  const handleReactionButtonClick = async () => {
    if (reaction) {
      try {
        const emojiText = reverseEmojiMap[reaction];
        await blogsApi.removeEmoji(id, emojiText);
        await loadEmojiData(); // reload lại sau khi xoá
      } catch (error) {
        console.error("Lỗi khi xóa reaction:", error);
      }
    } else {
      setShowReactionPicker(!showReactionPicker);
    }
  };

  const handleReactionHover = () => {
    if (!reaction) {
      setShowReactionPicker(true);
    }
  };

  const handleReactionClick = async (emoji) => {
    try {
      const emojiCode = reverseEmojiMap[emoji];
      const emojiData = {
        BlogId: id,
        IconId: emojiCode,
        IdUser: user.id,
      };
      await blogsApi.addEmoji(emojiData);
      await loadEmojiData(); // reload sau khi thêm
      setShowReactionPicker(false);
    } catch (error) {
      console.error("Lỗi khi thêm reaction:", error);
    }
  };

  const toggleComments = async () => {
    const willShow = !showComments;
    setShowComments(willShow);

    if (willShow && comments.length === 0) {
      await fetchComments();
    }
  };

  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const response = await blogsApi.getAllComments(id);
      setComments(response || []);
    } catch (error) {
      console.error("Lỗi khi tải bình luận:", error);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    const aiRes = await axios.post(FlaskAPI, {
      review: reviewText
    });

    const isPositive = aiRes.data.label === 'Positive';
    try {
      const newCommentData = {
        IdBlog: id,
        comment: newComment,
        IdUser: user.id,
        type: isPositive
      };
      await blogsApi.addComment(newCommentData);
      setNewComment("");
      fetchComments();
      setShowComments(true);
    } catch (error) {
      console.error("Lỗi khi gửi bình luận:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmitComment();
    }
  };

  const totalReactions = Object.values(reactionsCount).reduce(
    (sum, count) => sum + count,
    0
  );

  const activeEmojis = emojis.filter((emoji) => reactionsCount[emoji] > 0);

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 pb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 leading-tight cursor-pointer">
            {title}
          </h2>
          {score !== 0 &&<div className="w-[40px] h-[40px] rounded-full bg-red-500 text-white flex justify-center items-center">{score}</div>}
        </div>
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
            <User className="w-5 h-5 text-gray-500" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{author}</p>
            <p className="text-gray-500 text-xs">{date}</p>
          </div>
        </div>
        <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full border border-gray-200"
            >
              #{tag}
            </span>
          ))}
        </div>
        <button className="text-blue-600 font-medium text-sm hover:text-blue-700">
          Đọc thêm →
        </button>
      </div>

      {imageUrl && (() => {
  const images = imageUrl.split(",").slice(0, 3).map(url => url.trim());

  if (images.length === 1) {
    // 1 ảnh
    return (
      <div className="px-6 pb-4">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-96 object-cover rounded-lg"
          onError={(e) => (e.target.src = "")}
        />
      </div>
    );
  }

  if (images.length === 2) {
    // 2 ảnh
    return (
      <div className="px-6 pb-4 grid grid-cols-2 gap-2">
        {images.map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`${title}-${i + 1}`}
            className="w-full h-80 object-cover rounded-lg"
            onError={(e) => (e.target.src = "")}
          />
        ))}
      </div>
    );
  }

  // 3 ảnh → 1 ảnh lớn + 2 ảnh nhỏ
  return (
    <div className="px-6 pb-4 grid grid-cols-3 gap-2">
      <div className="col-span-2">
        <img
          src={images[0]}
          alt={`${title}-1`}
          className="w-full h-96 object-cover rounded-lg"
          onError={(e) => (e.target.src = "")}
        />
      </div>
      <div className="flex flex-col gap-2">
        {images.slice(1).map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`${title}-${i + 2}`}
            className="w-full h-46 object-cover rounded-lg"
            onError={(e) => (e.target.src = "")}
          />
        ))}
      </div>
    </div>
  );
})()}


      <div className="px-6 py-4 border-t border-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative" ref={reactionRef}>
              <button
                onClick={handleReactionButtonClick}
                onMouseEnter={handleReactionHover}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${
                  reaction
                    ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {reaction ? (
                  <>
                    <span className="text-lg">{reaction}</span>
                    <span className="font-medium">{emojiNames[reaction]}</span>
                  </>
                ) : (
                  <span className="font-medium">Thích</span>
                )}
              </button>

              {showReactionPicker && (
                <div className="absolute bottom-full left-0 mb-2 bg-white rounded-full shadow-lg border border-gray-200 p-2 z-50 animate-in slide-in-from-bottom-2 duration-200">
                  <div className="flex gap-1">
                    {emojis.map((emoji, index) => (
                      <button
                        key={emoji}
                        onClick={() => handleReactionClick(emoji)}
                        className="relative group p-2 rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-125"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <span className="text-2xl block animate-in zoom-in duration-300">
                          {emoji}
                        </span>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                          {emojiNames[emoji]}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={toggleComments}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${
                showComments
                  ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span className="font-medium">
                {comments.length > 0
                  ? `Bình luận (${comments.length})`
                  : "Bình luận"}
              </span>
            </button>
          </div>

          <button className="flex items-center gap-2 px-3 py-1.5 text-gray-600 rounded-full text-sm hover:bg-gray-100 transition-all duration-200">
            <Share2 className="w-4 h-4" />
            <span className="font-medium">Chia sẻ</span>
          </button>
        </div>

        {totalReactions > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {activeEmojis.slice(0, 3).map((emoji) => {
                  const emojiText = reverseEmojiMap[emoji];
                  const usersWithThisEmoji = emojiDetails.filter(
                    (item) => item.Emoji === emojiText
                  );
                  const userNames = usersWithThisEmoji
                    .map((item) => item.UserName)
                    .slice(0, 3);
                  const remainingCount = usersWithThisEmoji.length - 3;

                  return (
                    <div
                      key={emoji}
                      className="flex items-center gap-1 group relative cursor-pointer"
                      title={`${userNames.join(", ")}${
                        remainingCount > 0
                          ? ` và ${remainingCount} người khác`
                          : ""
                      }`}
                    >
                      <span className="text-base">{emoji}</span>
                      <span className="text-sm text-gray-600 font-medium">
                        {reactionsCount[emoji]}
                      </span>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                        {userNames.join(", ")}
                        {remainingCount > 0 &&
                          ` và ${remainingCount} người khác`}
                      </div>
                    </div>
                  );
                })}
                {activeEmojis.length > 3 && (
                  <span className="text-sm text-gray-500">
                    và {activeEmojis.length - 3} loại khác
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-600">
                {totalReactions} lượt tương tác
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="px-6 pb-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-gray-500" />
          </div>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-500 text-sm"
            placeholder="Viết bình luận của bạn..."
          />
          <button
            onClick={handleSubmitComment}
            disabled={!newComment.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:bg-blue-700 disabled:hover:bg-gray-300"
          >
            <Send className="w-4 h-4" />
            Gửi
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ${
          showComments ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="border-t border-gray-100">
          {loadingComments ? (
            <div className="px-6 py-6 text-center">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Bình luận ({comments.length})
              </h4>
              <div className="inline-flex items-center gap-2 text-gray-500">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                <span className="text-sm">Đang tải bình luận...</span>
              </div>
            </div>
          ) : (
            <CommentsList comments={comments} />
          )}
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
