/* eslint-disable no-underscore-dangle, no-console, class-methods-use-this */
const Validator = require('fastest-validator');

const FV = new Validator();
const exceptions = require('../exceptions/index');

class ParamsValidator {
  constructor() {
    this.supportedValidators = {
      asLocation: true,
      asSignUp: true
    };
  }

  customValidation(target, schema) {
    const validated = FV.validate(target, schema);
    if (Array.isArray(validated)) {
      throw new exceptions.InvalidUserInput(validated);
    }
  }

  nestedValidation(fields, targets) {
    const params = {};
    fields.forEach((item) => {
      const flag = `as${item[0].toUpperCase()}${item.substring(1)}`;

      if (this.supportedValidators[flag]) {
        this[flag](targets[item]);
      }
      params[item] = targets[item];
    });
    return params;
  }
}

module.exports = ParamsValidator;
