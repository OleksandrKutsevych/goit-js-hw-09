refs = {
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
        resolve(`✅ Fulfilled promise ${settingsObject.position} in ${settingsObject.delay}ms`);
      } else {
        reject(`❌ Rejected promise ${settingsObject.position} in ${settingsObject.delay}ms`);
      }
    }, delay);
  });
}
function createObj(position, delay) {
  // console.log({ position, delay });
  return { position, delay };
}
