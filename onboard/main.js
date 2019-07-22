window.addEventListener('DOMContentLoaded', () => {
  init();
  chrome.runtime.sendMessage({ action: GET_CONFIG }, res => {
    state.config = res.config;
  });
});

/* ======= STORAGE AND CONFIGURATION ===== */
const elements = {
  form: null,
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
}

/* ===== EVENT HANDLERS ===== */
function submitHandler(evt) {
  evt.preventDefault();
  console.log(evt.target);
  // something in here happens to send it off
}

/* ===== INITIALIZATION ===== */
function init() {
  elements.form = document.querySelector('form');
  elements.form.addEventListener('submit', submitHandler);
}
