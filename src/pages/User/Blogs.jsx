import { Plus } from "lucide-react";
import BlogPostCard from "../../components/blogsComponent/blogsPostCard";
import ModalPostCard from "../../components/blogsComponent/ModalPostCard";
import SideBarFilter from "../../components/blogsComponent/SideBarFillter";
import { useEffect, useState } from "react";
import blogsApi from "../../api/blogsApi";

const Blogs = () => {
  const [showModal, setShowModal] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogsApi.getAllBlogs();
          setBlogs(response)
          console.log("Blogs fetched successfully:", response);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="flex justify-center px-4 py-8">
      <div className="flex flex-wrap gap-8 max-w-screen-xl w-full">
        {/* Main content */}
        <div className="w-full lg:w-[65%] p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Blogs</h1>
            <button
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => setShowModal(true)}
            >
              <Plus className="w-5 h-5 mr-2" />
              Đăng bài
            </button>
          </div>

          <div className="space-y-6">
            {blogs.length > 0 ? (
              blogs.map((post) => (
                <BlogPostCard
                  key={post.Id}
                  id={post.Id}
                  title={post.Title}
                  author={post.UserName}
                  date={new Date(post.Created).toLocaleDateString("vi-VN")}
                  description={post.Desc}
                  imageUrl={post.ImageUrls}
                  tags={post.Tags?.split(",") || []}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center">Không có blog nào để hiển thị.</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-[30%]">
          <SideBarFilter />
        </div>
      </div>

      {/* Modal */}
      {showModal && <ModalPostCard onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Blogs;
