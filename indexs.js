const getDate = (msg) => {
  let msgDate = msg.split("T")[0];
  let elseDate =
    msg.split("T")[0].split("-")[1] + "-" + msg.split("T")[0].split("-")[2];
  let currentDate = new Date();
  let yesterdayDate = new Date();
  yesterdayDate.setDate(currentDate.getDate() - 1);

  let currentFormattedDate = setDateFormat(currentDate);
  let yesterdayFormattedDate = setDateFormat(yesterdayDate);


  if (msgDate === currentFormattedDate) {
    return "Today";
  } else if (msgDate === yesterdayFormattedDate) {
    return "Yesterday";
  } else {
    return elseDate;
  }
};

const setDateFormat = (date) => {
  const day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
  const month = (date.getMonth()+1) > 9 ? (date.getMonth()+1) : "0" + (date.getMonth()+1);
  const year = date.getFullYear();

  const finalDate = year + "-" + month + "-" + day;

  return finalDate;
};