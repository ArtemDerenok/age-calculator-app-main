class Validate {
  #checkData(value, name) {
    const data = value.trim();
    if (data === '') {
      return { isValid: false, message: 'This field is required' };
    }
    if (!+data && +data !== 0) {
      return { isValid: false, message: 'This value must be a number' };
    }
    if (name === 'day' && (+data < 1 || +data > 31)) {
      return { isValid: false, message: 'The day number is not between 1-31' };
    }
    if (name === 'month' && (+data < 1 || +data > 12)) {
      return { isValid: false, message: 'The month number is not between 1-12' };
    }
    if (name === 'year' && +data > new Date().getFullYear()) {
      return { isValid: false, message: 'The year is in the future' };
    }

    return { isValid: true };
  }

  #checkDate(date, monthNum) {
    if (date.getMonth() + 1 !== monthNum) {
      return { isValid: false, message: 'The date is invalid' };
    }
    return { isValid: true };
  }

  validate(elements) {
    const result = {
      result: true,
      date: {},
    };

    for (let i = 0; i < elements.length; i += 1) {
      result[elements[i].name] = this.#checkData(elements[i].value, elements[i].name);

      if (result[elements[i].name].isValid === false) {
        result.result = false;
      }
    }

    if (result.result) {
      const dateResult = this.#checkDate(
        new Date(+elements.year.value, +elements.month.value - 1, +elements.day.value),
        +elements.month.value,
      );

      if (!dateResult.isValid) {
        result.result = false;
      }

      result.date = dateResult;
    }
    return result;
  }
}

const validator = new Validate();

export default validator;
