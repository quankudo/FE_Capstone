import React, { useState, useRef, useEffect } from 'react';
import { MdNotifications } from 'react-icons/md';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const Notifications = ({ notifications = [] }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Đóng khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div
        className="cursor-pointer relative flex items-center gap-2"
        onClick={() => setOpen(!open)}
      >
        <MdNotifications size={22} />
        Thông báo
        {notifications.some((n) => !n.isRead) && (
          <span className="absolute -top-1 left-4 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </div>

      {open && (
        <div className="absolute right-0 w-96 bg-white border shadow-xl rounded-lg z-50">
          <div className="p-4 font-semibold text-lg border-b">Thông báo</div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="p-4 text-gray-500">Không có thông báo nào.</p>
            ) : (
              notifications.map((n) => (
                <a
                  key={n.id}
                  href={n.link}
                  className={`flex items-start gap-3 p-4 border-b hover:bg-gray-100 transition ${
                    !n.isRead ? 'bg-red-50' : ''
                  }`}
                >
                  <div className="text-2xl">{n.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-gray-800">{n.title}</h4>
                    <p className="text-xs text-gray-600">{n.content}</p>
                    <span className="text-xs text-gray-400 italic">
                      {dayjs(n.createdAt).fromNow()}
                    </span>
                  </div>
                </a>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
