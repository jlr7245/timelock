const fourAMFromNow = () => {
  const dateTime = new Date();
  /* == real code == */
  // dateTime.setDate(dateTime.getDate() + 1);
  // dateTime.setHours(04);
  // dateTime.setMinutes(00);
  /* == dev code == */
  dateTime.setMinutes(dateTime.getMinutes() + 2);
  return dateTime.getTime();
};
