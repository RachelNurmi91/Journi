export default class Methods {
  static formatShortDate = (unformattedDate) => {
    const date = new Date(unformattedDate);

    // Define the days of the week and months

    // Get the components of the date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);

    const formattedDate = `${month}/${day}/${year}`;
    console.log(formattedDate);
    return formattedDate;
  };

  static formatLongDate = (unformattedDate) => {
    const date = new Date(unformattedDate);

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Define the days of the week and months

    // Get the components of the date
    const day = date.getDate();
    const monthIndex = date.getMonth(); // Zero-based month index
    const month = months[monthIndex];
    const year = date.getFullYear().toString();

    const formattedDate = `${month} ${day}, ${year}`;

    return formattedDate;
  };

  static formatTime = (unformattedTime) => {
    const time = new Date(unformattedTime);
    let timeOfDay;
    let hour = time.getHours();

    let minute = time.getMinutes().toString().padStart(2, "0");

    if (hour >= 12) {
      timeOfDay = "PM";

      if (hour > 12) {
        hour -= 12;
      }
    } else {
      timeOfDay = "AM";
    }

    const formattedTime = `${hour}:${minute} ${timeOfDay}`;
    return formattedTime;
  };

  static calculateDaysBetweenDates = (startDate, endDate) => {
    // Parse the date strings into Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the difference in time (milliseconds)
    const differenceInTime = end - start;

    // Convert the difference from milliseconds to days
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const differenceInDays = differenceInTime / millisecondsInADay;
    console.log(differenceInDays);
    return differenceInDays;
  };
}
