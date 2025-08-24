import React, { useEffect, useState } from 'react';
import { FaFlag } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Pagination from '../../components/Pagination';
import TitleDashboard from '../../components/TitleDashboard';
// import reportApi from '../../api/reportApi';

const REPORTS_PER_PAGE = 5;

const statusOptions = [
  { value: '', label: 'Tất cả trạng thái' },
  { value: 'pending', label: 'Chưa xử lý' },
  { value: 'in_progress', label: 'Đang xử lý' },
  { value: 'resolved', label: 'Đã xử lý' },
];

const ManageComplaint = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const params = {
          page: currentPage,
          limit: REPORTS_PER_PAGE,
          search: search || undefined,
          status: statusFilter || undefined,
        };
        const res = await reportApi.getAllReports(params);
        setReports(res.data);
        setTotalPages(res.pagination.totalPages);
      } catch (err) {
        toast.error('Lỗi tải danh sách khiếu nại');
        console.error(err);
      }
    };
    fetchReports();
  }, [search, statusFilter, currentPage]);

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Chưa xử lý';
      case 'in_progress':
        return 'Đang xử lý';
      case 'resolved':
        return 'Đã xử lý';
      default:
        return 'Không xác định';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-400';
      case 'in_progress':
        return 'bg-blue-400';
      case 'resolved':
        return 'bg-green-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="p-6">
      <TitleDashboard Icon={FaFlag} title="Quản lý báo cáo khiếu nại" />

      <div className="flex flex-col md:flex-row md:items-center md:gap-4 my-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc nội dung..."
          className="border px-4 py-2 rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          className="border px-4 py-2 rounded w-full md:w-1/4 mt-2 md:mt-0"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border bg-white rounded shadow-sm">
          <thead>
            <tr className="bg-red-500 text-left text-sm font-semibold text-white">
              <th className="p-3">Người gửi</th>
              <th className="p-3">Nội dung</th>
              <th className="p-3">Ngày gửi</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.Id} className="border-t text-sm hover:bg-red-50">
                <td className="p-3">{report.SenderName}</td>
                <td className="p-3 line-clamp-2">{report.Content}</td>
                <td className="p-3">
                  {new Date(report.CreatedAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <span
                    className={`text-xs text-white px-2 py-1 rounded ${getStatusColor(report.Status)}`}
                  >
                    {getStatusLabel(report.Status)}
                  </span>
                </td>
                <td className="p-3 text-center space-x-2">
                  <button className="bg-blue-500 px-3 py-1 rounded text-white text-xs hover:bg-blue-600">
                    Xem
                  </button>
                  <button className="bg-yellow-400 px-3 py-1 rounded text-white text-xs hover:bg-yellow-500">
                    Cập nhật
                  </button>
                  <button className="bg-red-500 px-3 py-1 rounded text-white text-xs hover:bg-red-600">
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
            {reports.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  Không có báo cáo nào.
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

export default ManageComplaint;
