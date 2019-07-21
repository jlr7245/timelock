const fourAMFromNow = () => {
  const dateTime = new Date();
  dateTime.setDate(dateTime.getDate() + 1);
  dateTime.setHours(04);
  dateTime.setMinutes(00);
  return dateTime.getTime();
}
