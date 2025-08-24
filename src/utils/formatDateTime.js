import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc'; // ✅ đúng cách
import timezone from 'dayjs/plugin/timezone'; // ✅ đúng cách
import 'dayjs/locale/vi';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('vi');

const formatDateTime = (date) => {
  const timeInVN = dayjs(date).add(7, 'hour')
  return dayjs.utc(timeInVN).tz('Asia/Ho_Chi_Minh').fromNow();
};

export default formatDateTime;
