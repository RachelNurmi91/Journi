import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TimeCalendar({ selectedDate, onDateChange, placeholder }) {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => onDateChange(date)}
      minDate={new Date()}
      disabledKeyboardNavigation
      className="date-time"
      showTimeSelect
      timeFormat="HH:mm:ss"
      withPortal
      placeholderText={placeholder}
    />
  );
}
export default TimeCalendar;
