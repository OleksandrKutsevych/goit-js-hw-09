// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
const refs = {
  start: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
refs.start.setAttribute('disabled', 'disabled');

refs.start.addEventListener('click', start);

let stopTimerDate = 0;
let timeToEnd = 0;
let intervalId = null;
let isActive = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    stopTimerDate = selectedDates[0].getTime();
    // console.log(stopTimerDate);

    if (selectedDates[0] <= options.defaultDate) {
      refs.start.setAttribute('disabled', 'disabled');
      alert('error');
      return;
    }
    refs.start.removeAttribute('disabled');
  },
};
flatpickr('#datetime-picker', options);

function start() {
  if (isActive) {
    return;
  }
  isActive = true;

  intervalId = setInterval(() => {
    let currentTime = Date.now();
    timeToEnd = stopTimerDate - currentTime;
    if (timeToEnd <= 0) {
      clearInterval(intervalId);
      alert('Taaaa-daaaa-m');
      return;
    }
    let timeArr = convertMs(timeToEnd);
    updateTimer(timeArr);
    // refs.days.textContent = timeArr.days || '0';
    // refs.hours.textContent = addLeadingZero(timeArr.hours) || '00';
    // refs.minutes.textContent = addLeadingZero(timeArr.minutes) || '00';
    // refs.seconds.textContent = addLeadingZero(timeArr.seconds) || '00';
    // console.log(timeToEnd);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer(timeArr) {
  refs.days.textContent = timeArr.days || '0';
  refs.hours.textContent = addLeadingZero(timeArr.hours) || '00';
  refs.minutes.textContent = addLeadingZero(timeArr.minutes) || '00';
  refs.seconds.textContent = addLeadingZero(timeArr.seconds) || '00';
}
