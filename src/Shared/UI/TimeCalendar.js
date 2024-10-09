import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TimeCalendar({
  selectedDate,
  onDateChange,
  placeholder,
  label,
  name,
}) {
  return (
    <div>
      <label htmlFor={name}>
        <div>
          <FontAwesomeIcon
            icon="labelIcon fa-calendar-days"
            style={{ color: "#0bb6c0" }}
          />
          <span className="label mx-2">{label}</span>
        </div>
      </label>
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
        name={name}
      />
    </div>
  );
}
export default TimeCalendar;
