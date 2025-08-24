import React, { useEffect, useState } from 'react';
import { FaBlog } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Pagination from '../../components/Pagination';
import TitleDashboard from '../../components/TitleDashboard';
import blogsApi from '../../api/blogsApi';

const BLOGS_PER_PAGE = 4;

const ManageBlog = () => {
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [tags, setTags] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await blogsApi.getAllTags();
        setTags(res);
      } catch (err) {
        toast.error('Lỗi tải danh sách tag');
        console.error(err);
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const params = {
          page: currentPage,
          limit: BLOGS_PER_PAGE,
          search: search || undefined,
          tagId: tagFilter || undefined,
        };
        const res = await blogsApi.getAllBlogsForAdmin(params);
        setBlogs(res.data);
        setTotalPages(res.pagination.totalPages);
      } catch (err) {
        toast.error('Lỗi tải danh sách blog');
        console.error(err);
      }
    };
    fetchBlogs();
  }, [search, tagFilter, currentPage, BLOGS_PER_PAGE]);

  return (
    <div className="p-6">
      <TitleDashboard Icon={FaBlog} title="Quản lý blog" />

      <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-4 mt-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên blog..."
          className="border px-4 py-2 rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          className="border px-4 py-2 rounded w-full md:w-1/4 mt-2 md:mt-0"
          value={tagFilter}
          onChange={(e) => {
            setTagFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Tất cả tag</option>
          {tags.map((t) => (
            <option key={t.Id} value={t.Name}>
              {t.Name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border bg-white rounded shadow-sm">
          <thead>
            <tr className="bg-red-500 text-left text-sm font-semibold text-white">
              <th className="p-3 w-[20%]">Tên blog</th>
              <th className="p-3 w-[30%]">Mô tả</th>
              <th className="p-3 w-[15%]">Ngày đăng</th>
              <th className="p-3 w-[15%]">Người đăng</th>
              <th className="p-3 w-[30%] text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.Id} className="border-t text-sm hover:bg-red-50">
                <td className="p-3">{blog.Title}</td>
                <td className="p-3">{blog.Desc}</td>
                <td className="p-3">
                  {new Date(blog.Created).toLocaleDateString()}
                </td>
                <td className="p-3 space-x-1">
                  {blog.UserName}
                </td>
                <td className="p-3 text-center space-x-2">
                  <button className="bg-yellow-400 px-3 py-1 rounded text-white text-xs hover:bg-yellow-500">
                    Sửa
                  </button>
                  <button className="bg-red-500 px-3 py-1 rounded text-white text-xs hover:bg-red-600">
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  Không tìm thấy blog nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ManageBlog;
