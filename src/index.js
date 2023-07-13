import validator from './modules/validation';
import './scss/style.scss';

const btn = document.getElementById('btn');
const form = document.getElementById('form');
const inputs = document.querySelectorAll('.form__input');
const errorMsg = document.getElementById('error-msg');

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
  if (!result.date.isValid) {
    errorMsg.classList.add('error');
    errorMsg.innerText = result.date.message;
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

btn.addEventListener('click', () => {
  clearErrorMessages();
  const result = validator.validate(form.elements);
  if (!result.result) {
    handleValidationResult(result);
  }
});
