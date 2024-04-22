export default class Methods {
  static formatDate = (unformattedDate) => {
    const date = new Date(unformattedDate);

    // Define the days of the week and months

    // Get the components of the date
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear().toString().slice(-2);

    const formattedDate = `${month}/${day}/${year}`;

    return formattedDate;
  };
}
