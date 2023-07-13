import validator from './modules/validation';
import './scss/style.scss';

const btn = document.getElementById('btn');
const form = document.getElementById('form');
const inputs = document.querySelectorAll('.form__input');
const errorMsg = document.getElementById('error-msg');
const year = document.getElementById('year');
const month = document.getElementById('month');
const day = document.getElementById('day');

const clearErrorMessages = () => {
  inputs.forEach((elem) => {
    const copyElem = elem;
    copyElem.classList.remove('error');
    copyElem.nextElementSibling.classList.remove('error');
    copyElem.nextElementSibling.innerText = '';
    copyElem.previousElementSibling.classList.remove('error');
  });
  errorMsg.classList.remove('error');
  errorMsg.innerText = '';
};

const handleValidationResult = (result) => {
  if (!result.isDate.isValid) {
    errorMsg.classList.add('error');
    errorMsg.innerText = result.isDate.message;
  }

  inputs.forEach((elem) => {
    if (!result[elem.name].isValid) {
      const copyElem = elem;
      copyElem.classList.add('error');
      copyElem.nextElementSibling.classList.add('error');
      copyElem.nextElementSibling.innerText = result[elem.name].message;
      copyElem.previousElementSibling.classList.add('error');
    }
  });
};

const calcAge = (date) => {
  const diff = new Date() - date;
  const years = diff / (1000 * 60 * 60 * 24 * 30 * 12);
  const months = (+years.toString().split('.')[1] / (1000 * 60 * 60 * 24 * 30)) % 12;
  const days = (+months.toString().split('.')[1] / (1000 * 60 * 60 * 24)) % 30;

  year.innerText = Math.floor(years);
  month.innerText = Math.floor(months);
  day.innerText = Math.floor(days);
};

btn.addEventListener('click', () => {
  clearErrorMessages();
  const result = validator.validate(form.elements);
  if (!result.result) {
    handleValidationResult(result);
  } else {
    calcAge(result.date);
  }
});
