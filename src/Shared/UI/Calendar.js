import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Calendar({ selectedDate, onDateChange }) {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => onDateChange(date)}
      minDate={new Date()}
      disabledKeyboardNavigation
      className="calendar"
      withPortal
    />
  );
}
export default Calendar;
