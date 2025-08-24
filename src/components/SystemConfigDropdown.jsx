import { useState } from "react";
import { FaCog, FaBuilding, FaMapMarkedAlt, FaTags, FaUtensils, FaImage, FaEnvelopeOpenText, FaChevronDown } from "react-icons/fa";

const SystemConfigDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div
        className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-red-600"
        onClick={() => setOpen(!open)}
      >
        <FaCog className="text-lg" />
        <span>Cấu hình hệ thống</span>
        <FaChevronDown className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </div>

      {open && (
        <div className="absolute z-50 mt-2 w-64 bg-white rounded-md shadow-lg border p-2 space-y-1">
          <p className="px-2 py-1 text-xs text-gray-400 font-semibold">Danh mục hệ thống</p>
          <DropdownItem icon={<FaBuilding />} label="Loại nhà hàng" link="/admin/types/restaurant" />
          <DropdownItem icon={<FaMapMarkedAlt />} label="Khu vực" link="/admin/locations" />
          <DropdownItem icon={<FaTags />} label="Tags" link="/admin/tags" />
          <DropdownItem icon={<FaUtensils />} label="Loại món ăn" link="/admin/types/dish" />

          <p className="px-2 py-1 text-xs text-gray-400 font-semibold mt-2">Giao diện & Email</p>
          <DropdownItem icon={<FaImage />} label="Banner / Slide" link="/admin/banner" />
          <DropdownItem icon={<FaEnvelopeOpenText />} label="Email hệ thống" link="/admin/emails" />
        </div>
      )}
    </div>
  );
};

const DropdownItem = ({ icon, label, link }) => (
  <a
    href={link}
    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded text-sm text-gray-700"
  >
    <span className="text-red-500">{icon}</span>
    {label}
  </a>
);

export default SystemConfigDropdown;