import { Plus } from "lucide-react";
import BlogPostCard from "@/components/blogsComponent/blogsPostCard";
import ModalPostCard from "@/components/blogsComponent/ModalPostCard";
import SideBarFilter from "@/components/blogsComponent/SideBarFillter";
import { useEffect, useState } from "react";
import blogsApi from "@/api/blogsApi";
import formatDateTime from "@/utils/formatDateTime";
import TitleDashboard from "@/components/TitleDashboard";

import { LiaBlogSolid } from "react-icons/lia";
import EmptyState from "@/components/EmptyState";

const Blogs = () => {
  const [showModal, setShowModal] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogsApi.getAllBlogs();
        const resTags = await blogsApi.getAllTags();
        setBlogs(response)
        setTags(resTags)
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
            <TitleDashboard Icon={LiaBlogSolid} title={'Blogs'} />
            <button
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
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
                  date={formatDateTime(post.Created)}
                  description={post.Desc}
                  imageUrl={post.ImageUrls}
                  score={parseFloat(post.Score).toFixed(1)}
                  tags={post.Tags?.split(",") || []}
                />
              ))
            ) : (
              <EmptyState text={'Không có blog nào để hiển thị.'}/>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-[30%]">
          <SideBarFilter tags={tags} search={search} setSearch={setSearch}/>
        </div>
      </div>

      {/* Modal */}
      {showModal && <ModalPostCard onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Blogs;
