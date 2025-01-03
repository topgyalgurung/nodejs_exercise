const bookSchemaCreate = {
  type: "object",
  properties: {
    isbn: {
      type: "string",
      pattern: "^[0-9]{10}|[0-9]{13}$",
      description: "ISBN should be a 10 or 13 digit number",
    },
    amazon_url: {
      type: "string",
      format: "uri",
      description: "Must be a valid URL",
    },
    author: {
      type: "string",
      minLength: 1,
      description: "Author name cannot be empty",
    },
    language: {
      type: "string",
      minLength: 1,
      description: "Language cannot be empty",
    },
    pages: {
      type: "integer",
      minimum: 1,
      description: "Pages must be a positive integer",
    },
    publisher: {
      type: "string",
      minLength: 1,
      description: "Publisher name cannot be empty",
    },
    title: {
      type: "string",
      minLength: 1,
      description: "Title cannot be empty",
    },
    year: {
      type: "integer",
      minimum: 1000,
      maximum: new Date().getFullYear(),
      description: "Year must be a valid 4-digit year",
    },
  },
  required: ["isbn", "author", "language", "pages", "title", "year"],
  additionalProperties: false,
};

module.exports = bookSchemaCreate;
