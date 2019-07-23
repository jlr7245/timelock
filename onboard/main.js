window.addEventListener('DOMContentLoaded', () => {
  init();
  chrome.runtime.sendMessage({ action: GET_CONFIG }, res => {
    state.config = res.config;
  });
});

/* ======= STORAGE AND CONFIGURATION ===== */
const elements = {
  form: null,
  listholder: null,
};

const statebase = {};
const state = new Proxy(statebase, {
  set(obj, prop, val) {
    try {
      Reflect.set(...arguments);
      rerender();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
});

/* ===== DOM MANIPULATION ===== */
function rerender() {
  console.log('rerendering!');
  console.log(state);
  const fieldRows = state.config.map(({ url, time }) =>
    createFormRow(url, time * MULTIPLIER)
  );
  elements.listholder.append(...fieldRows);
}

function createFormRow(url, timeInSeconds) {
  const { hours, minutes, seconds } = secToHMS(timeInSeconds);
  const fieldset = c('fieldset', { name: url });
  const rowDiv = c(
    'div',
    { class: 'form-row' },
    `
  <input type="number" name="hours" value="${hours}" disabled /> hours,
  <input type="number" name="minutes" value="${minutes}" disabled /> minutes
`
  );
  fieldset.appendChild(c('legend', {}, url));
  fieldset.appendChild(rowDiv);
  return fieldset;
}

/* ===== EVENT HANDLERS ===== */
function submitHandler(evt) {
  evt.preventDefault();
  const updates = state.config.map(({ url }) => {
    const newTime = Array.from(
      evt.target[url].querySelectorAll('input')
    ).reduce((acc, { name, value = 0 }) => {
      const val = parseInt(value);
      return converterLookup[name](acc, val);
    }, 0);
    return { url, time: newTime / MULTIPLIER };
  });
  console.log(updates);
}

/* ===== INITIALIZATION ===== */
function init() {
  elements.form = document.querySelector('form');
  elements.form.addEventListener('submit', submitHandler);
  elements.listholder = document.querySelector('.listholder');
  elements.formsubmit = document.querySelector('.formsubmit');
}
