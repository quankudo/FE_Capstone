import { Search } from 'lucide-react';

const SideBarFilter = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
      <h2 className="text-xl font-semibold mb-4">Lọc bài viết</h2>

      {/* Tìm kiếm */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            disabled
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Tags */}
      <div>
        <h3 className="font-medium mb-3">Chủ đề</h3>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" className="mr-2" disabled />
            <span className="text-sm">Tag 1</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" className="mr-2" disabled />
            <span className="text-sm">Tag 2</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" className="mr-2" disabled />
            <span className="text-sm">Tag 3</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SideBarFilter;
