import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Time({ selectedDate, onDateChange, placeholder }) {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(time) => onDateChange(time)}
      disabledKeyboardNavigation
      withPortal
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="h:mm aa"
      className="date-time"
      placeholderText={placeholder}
    />
  );
}
export default Time;
