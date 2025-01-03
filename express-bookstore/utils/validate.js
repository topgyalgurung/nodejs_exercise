const { Validator } = require("jsonschema");
const ExpressError = require("../utils/ExpressError");
const validator = new Validator();

const validate = (schema, data) => {
  const result = validator.validate(data, schema);

  if (!result.valid) {
    const errorMessage = result.errors.map((err) => err.stack);
    throw new ExpressError(`Validation Error: ${errorMessage}`, 400);
  }
};

module.exports = validate;
