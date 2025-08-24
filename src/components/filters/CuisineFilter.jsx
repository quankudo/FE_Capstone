import { useState } from "react";

export default function CuisineFilter() {
  const [selectedCuisines, setSelectedCuisines] = useState([]);

  const cuisines = [
    { label: "Tất cả", value: "all" },
    { label: "Việt Nam", value: "vietnamese" },
    { label: "Hàn Quốc", value: "korean" },
    { label: "Nhật Bản", value: "japanese" },
    { label: "Âu Mỹ", value: "western" },
  ];

  const handleChange = (value) => {
    if (value === "all") {
      // Nếu chọn "Tất cả" thì bỏ chọn hết và set chỉ có "all"
      setSelectedCuisines(["all"]);
    } else {
      let updated = [...selectedCuisines];
      if (updated.includes("all")) {
        updated = []; // bỏ "all" nếu đang chọn loại khác
      }
      if (updated.includes(value)) {
        updated = updated.filter((item) => item !== value);
      } else {
        updated.push(value);
      }
      setSelectedCuisines(updated);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        Loại hình ẩm thực
      </label>
      <div className="space-y-2">
        {cuisines.map((cuisine) => (
          <label key={cuisine.value} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedCuisines.includes(cuisine.value)}
              onChange={() => handleChange(cuisine.value)}
              className="h-4 w-4 accent-red-500"
            />
            <span>{cuisine.label}</span>
          </label>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {selectedCuisines.length > 0 ? (
            selectedCuisines.map((cuisine, idx) => (
            <span
                key={idx}
                className="bg-red-100 text-red-500 px-3 py-1 rounded-full text-sm shadow-sm"
            >
                {cuisine}
            </span>
            ))
        ) : (
            <span className="text-gray-400 italic">Chưa chọn</span>
        )}
        </div>
    </div>
  );
}
