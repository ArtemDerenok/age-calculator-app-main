class Validate {
  #checkData(value) {
    const data = value.trim();

    if (data === '') {
      return { isValid: false, message: 'This field is required' };
    }
    return { isValid: true };
  }

  validate(elements) {
    const result = {
      result: true,
    };

    for (let i = 0; i < elements.length; i += 1) {
      result[elements[i].name] = this.#checkData(elements[i].value);

      if (result[elements[i].name].isValid === false) {
        result.result = false;
      }
    }

    return result;
  }
}

const validator = new Validate();

export default validator;
