const formatTime = (timeStr) => {
  if (!timeStr) return '';
  return timeStr.slice(0, 5); // Lấy HH:mm từ HH:mm:ss
};

export default formatTime