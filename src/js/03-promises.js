import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  submit: document.querySelector('button[type="submit"]'),
};

refs.form.addEventListener('input', onFormInput);
refs.form.addEventListener('submit', e => {
  e.preventDefault();
  let delay = inputFormValue.delay;
  let step = inputFormValue.step;

  for (let position = 1; position <= inputFormValue.amount; position += 1) {
    createPromise(position, delay)
      .then(value => {
        console.log(value);
      })
      .catch(error => {
        console.log(error);
      });
    delay += step;
  }
});

let inputFormValue = {};

function onFormInput(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'INPUT') {
    return;
  }
  inputFormValue[e.target.name] = Number(e.target.value);
}

function createPromise(position, delay) {
  // console.log('position', position, 'delay', delay);
  const shouldResolve = Math.random() > 0.3;

  const settingsObject = createObj(position, delay);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${settingsObject.position} in ${settingsObject.delay}ms`,
        );
      } else {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${settingsObject.position} in ${settingsObject.delay}ms`,
        );
      }
    }, delay);
  });
}
function createObj(position, delay) {
  // console.log({ position, delay });
  return { position, delay };
}

//======================
// const refs = {
//   form: document.querySelector('.form'),
// };

// refs.form.addEventListener('submit', onBtnSubmit);

// function onBtnSubmit(e) {
//   e.preventDefault();
//   let position = 1;

//   let delay = Number(e.currentTarget.elements.delay.value);
//   console.log('delay', delay);
//   let step = Number(e.currentTarget.elements.step.value);
//   console.log('step', step);
//   let amount = Number(e.currentTarget.elements.amount.value);
//   console.log('amount', amount);

//   let intId = setInterval(() => {
//     if (position > amount) {
//       position = 0;
//       clearInterval(intId);
//       console.log('amount', amount);
//       console.log('position', position);
//       return;
//     }
//     console.log(delay);
//     // setTimeout(() => {

//     // });

//     createPromise(position, delay)
//       .then(({ position, delay }) => {
//         console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//       });
//     delay = step + delay;
//   }, delay);
// }

// function createPromise(position, delay) {
//   const promise = new Promise((resolve, reject) => {
//     setInterval(() => {
//       const shouldResolve = Math.random() > 0.3;

//       if (shouldResolve) {
//         resolve({ position, delay });
//       }
//       reject({ position, delay });
//     }, delay);
//   });
//   return promise;
// }
