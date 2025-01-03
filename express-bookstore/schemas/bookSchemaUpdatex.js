const bookUpdateSchema = {
  type: "object",
  properties: {
    isbn: {
      type: "string",
      pattern: "^[0-9]{10}|[0-9]{13}$",
      description: "ISBN should be a 10 or 13 digit number"
    },
    amazon_url: {
      type: "strin{
  "definitions": {},
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://example.com/root.json",
  "type": "object",
  "title": "The Root Schema",
  "required": [
    "author",
    "language",
    "pages",
    "title",
    "year"
  ],
  "properties": {
    "amazon-url": {
      "$id": "#/properties/amazon-url",
      "type": "string",
      "title": "The Amazon-url Schema",
      "default": "",
      "examples": [
        "http://a.co/eobPtX2"
      ],
      "pattern": "^(.*)$"
    },
    "author": {
      "$id": "#/properties/author",
      "type": "string",
      "title": "The Author Schema",
      "default": "",
      "examples": [
        "Matthew Lane"
      ],
      "pattern": "^(.*)$"
    },
    "language": {
      "$id": "#/properties/language",
      "type": "string",
      "title": "The Language Schema",
      "default": "",
      "examples": [
        "english"
      ],
      "pattern": "^(.*)$"
    },
    "pages": {
      "$id": "#/properties/pages",
      "type": "number",
      "title": "The Pages Schema",
      "default": 0,
      "examples": [
        264
      ]
    },
    "publisher": {
      "$id": "#/properties/publisher",
      "type": "string",
      "title": "The Publisher Schema",
      "default": "",
      "examples": [
        "Princeton University Press"
      ],
      "pattern": "^(.*)$"
    },
    "title": {
      "$id": "#/properties/title",
      "type": "string",
      "title": "The Title Schema",
      "default": "",
      "examples": [
        "Power-Up: Unlocking the Hidden Mathematics in Video Games"
      ],
      "pattern": "^(.*)$"
    },
    "year": {
      "$id": "#/properties/year",
      "type": "number",
      "title": "The Year Schema",
      "default": 0,
      "examples": [
        2017
      ]
    }
  }
}g",
      format: "uri",
      description: "Must be a valid URL"
    },
    author: {
      type: "string",
      minLength: 1,
      description: "Author name cannot be empty"
    },
    language: {
      type: "string",
      minLength: 1,
      description: "Language cannot be empty"
    },
    pages: {
      type: "integer",
      minimum: 1,
      description: "Pages must be a positive integer"
    },
    publisher: {
      type: "string",
      minLength: 1,
      description: "Publisher name cannot be empty"
    },
    title: {
      type: "string",
      minLength: 1,
      description: "Title cannot be empty"
    },
    year: {
      type: "integer",
      minimum: 1000,
      maximum: new Date().getFullYear(),
      description: "Year must be a valid 4-digit year"
    },
  },
  additionalProperties: false, // Disallow unexpected fields
};
module.exports = bookUpdateSchema;