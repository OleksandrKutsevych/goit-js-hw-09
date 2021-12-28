refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

refs.start.addEventListener('click', start);
refs.stop.addEventListener('click', stop);
refs.stop.setAttribute('disabled', 'disabled');

let colorId = null;
let isActive = false;

function getRandomHexColor() {
  let color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  // console.log(color);
  return color;
}

function start() {
  if (isActive) {
    // console.log('is active - return');
    return;
  }

  isActive = true;
  refs.start.setAttribute('disabled', 'disabled');
  refs.stop.removeAttribute('disabled');

  colorId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stop() {
  clearInterval(colorId);
  isActive = false;
  refs.start.removeAttribute('disabled');
  refs.stop.setAttribute('disabled', 'disabled');
}

//=========================== class=========================

// class ColorSwitcher {
//   constructor() {
//     this.colorId = null;
//     this.isActive = false;
//     this.color = '#884898';
//   }

//   getRandomHexColor() {
//     return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
//   }
//   // refs.stop.setAttribute('disabled', 'disabled');

//   switchColor() {
//     refs.body.style.backgroundColor = this.getRandomHexColor();
//   }

//   start() {
//     if (this.isActive) {
//       // console.log('is active - return');
//       return;
//     }

//     this.isActive = true;
//     refs.start.setAttribute('disabled', 'disabled');
//     refs.stop.removeAttribute('disabled');

//     this.colorId = setInterval(this.switchColor, 1000);
//   }

//   stop() {
//     clearInterval(this.colorId);
//     this.isActive = false;
//     refs.start.removeAttribute('disabled');
//     refs.stop.setAttribute('disabled', 'disabled');
//   }
// }

// const colorSwitcher = new ColorSwitcher();

// refs.start.addEventListener('click', colorSwitcher.start.bind(this));
// refs.stop.addEventListener('click', colorSwitcher.stop.bind(this));
