import { Search } from 'lucide-react';

const SideBarFilter = ({tags = [], search, setSearch}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 sticky top-6">
      <h2 className="text-xl font-semibold mb-4">Lọc bài viết</h2>

      {/* Tìm kiếm */}
      <div className="mb-6">
        <div className="relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Tags */}
      <div>
        <h3 className="font-medium mb-3">Chủ đề</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {tags.length > 0 && tags.map((item) => (
            <label key={item.Name} className="flex items-center cursor-pointer">
              <input type="checkbox" className="mr-2" value={item.Id} />
              <span className="text-sm">{item.Name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBarFilter;
