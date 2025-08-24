import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const formattedDate = (dateUTC) => dayjs.utc(dateUTC).local().format("DD/MM/YYYY HH:mm");
export default formattedDate;

