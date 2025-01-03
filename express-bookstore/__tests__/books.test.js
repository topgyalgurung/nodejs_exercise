process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const db = require("../db");

let book_isbn = "978014312";

// required: "isbn", "author", "language", "pages", "title", "year"

// before each insert book into db
beforeEach(async () => {
  // const isbn = generateISBN();
  let result = await db.query(`
        INSERT INTO books(
            isbn, amazon_url, author, language, pages, publisher, title, year
        ) VALUES(
         '123456789',
         'https://a.co/d/9xoItiM',
         'Morgan Housel',
         'English',
         256,
         'Harriman House',
         'finance book',
         2020)
         RETURNING isbn`);
  book_isbn = result.rows[0].book_isbn;
});
/**
 * TEST GET ROUTES
 */
describe("GET /books", () => {
  test("get one book", async () => {
    const response = await request(app).get(`/books`);
    const books = response.body.books;
    expect(books).toHaveLength(1);
  });
});

describe("GET /books/:isbn", () => {
  test("get book based on id", async () => {
    const response = await request(app).get(`/books/123456789`);
    console.log(response.body.book);
    if (response.body) {
      expect(response.status).toBe(200);
      expect(response.body.book.title).toBe("finance book");
    }
  });

  test("responds with 404 if can not find book", async () => {
    const response = await request(app).get(`/books/99999`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("There is no book with an isbn 99999");
  });
});

/**
 * TEST POST ROUTES
 */

describe("POST /books", () => {
  test("creates a new book", async () => {
    const newBook = {
      isbn: "97801421231245",
      amazon_url: "https://a.co/d/9xoItiM",
      author: "Yuval Noah Harari",
      language: "English",
      pages: 498,
      publisher: "Harper",
      title: "Sapiens: A Brief History of Humankind",
      year: 2015,
      // isbn: "32456313",
      // amazon_url: "https://a.co/d/9xoItiM",
      // author: "Morgan Housel",
      // language: "english",
      // pages: 1000,
      // publisher: "yeah right",
      // title: "amazing times",
      // year: 2000,
    };
    const response = await request(app).post(`/books`).send(newBook);
    expect(response.statusCode).toBe(201);
  });

  // dont create book if no title provided
  test("should prevent from creating book without title", async () => {
    const invalidBook = {};
    const response = await request(app).post(`/books`).send(invalidBook);
    expect(response.statusCode).toBe(400);
  });
});

/**
 * TEST PUT ROUTES
 */
const updatedBook = {
  amazon_url: "https://a.co/d/9xoItiM",
  author: "Morgan Housel",
  language: "english",
  pages: 300,
  publisher: "Hello publications",
  title: "Updated",
  year: 2020,
};

describe("PUT /books/:isbn", () => {
  test("should update the book based on isbn number", async () => {
    const response = await request(app)
      .put(`/books/123456789`)
      .send(updatedBook);
    expect(response.statusCode).toBe(200);
    expect(response.body.book.title).toBe("Updated");
  });

  test("should stop if bad request for creating book", () => {
    const response = request(app).put(`/books/invalidisbn`).send(updatedBook);
    expect(response.statusCode).toBe(400);
    // expect(response.body.message).toBe("There is no book with an isbn 99999");
  });
});

// describe("DELETE /books/:isbn", () => {});

describe("DELETE /books/:isbn", () => {
  it("should delete a book by ISBN", async () => {
    const response = await request(app).delete(`/books/${book_isbn}`);
    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal("Book deleted");
  });

  it("should return 404 if book is not found", async () => {
    const response = await request(app).delete("/books/99999");
    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal("Book not found");
  });
});

afterEach(async () => {
  await db.query("DELETE FROM Books");
});

afterAll(async () => {
  await db.end();
});
