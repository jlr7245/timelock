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

// seconds to hours, minutes, seconds
const secToHMS = sec => {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor(sec / 60) % 60;
  const seconds = sec % 60;
  return { hours, minutes, seconds };
}

// creating elements
const c = (eltype, attr = {}, content) => {
  const el = document.createElement(eltype);
  for (const at in attr) {
    el.setAttribute(at, attr[at]);
  }
  if (content) {
    el.innerHTML = content;
  }
  return el;
}

// for reducers changing hms into s
const converterLookup = {
  '': acc => acc,
  hours: (acc, val) => acc + val * 3600,
  minutes: (acc, val) => acc + val * 60,
  seconds: (acc, val) => acc + val
};
