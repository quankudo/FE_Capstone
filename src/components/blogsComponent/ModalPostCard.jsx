import { X } from "lucide-react";

const ModalPostCard = ({onClose}) => {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Đăng bài mới</h2>
          <button>
            <X className="w-5 h-5" onClick={onClose} />
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Tiêu đề bài viết"
            className="w-full px-3 py-2 border rounded-lg"
          />

          <textarea
            placeholder="Nội dung bài viết"
            rows={4}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                tag
                <button className="ml-1">
                  <X size={12} />
                </button>
              </span>
            </div>

            <input
              type="text"
              placeholder="Thêm tag (nhấn Enter)"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button className="px-4 py-2 border rounded-lg">Hủy</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Đăng bài
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPostCard;
