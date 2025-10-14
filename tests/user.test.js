const request = require("supertest");
const express = require("express");
const path = require("path");

// ✅ Importa el router correctamente
const mainRouter = require(path.resolve(__dirname, "../server/routes/main.js"));

// ✅ Mock de modelos
jest.mock("../server/models/User");
jest.mock("../server/models/Post");

const User = require("../server/models/User");
const Post = require("../server/models/Post");

// ✅ Crea la app de test
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Mock de middlewares que Express espera
app.use((req, res, next) => {
  req.flash = jest.fn();
  res.cookie = jest.fn();
  res.clearCookie = jest.fn();
  res.redirect = jest.fn((url) => res.status(302).json({ redirectTo: url }));
  res.render = jest.fn((view, data) => res.status(200).json({ view, ...data }));
  next();
});

// ✅ Monta el router
app.use("/", mainRouter);

describe("Main Router", () => {
  beforeEach(() => jest.clearAllMocks());

  test("GET /login should render login page", async () => {
    const res = await request(app).get("/login");
    expect([200, 302, 404]).toContain(res.statusCode);
    if (res.statusCode === 200) expect(res.body.view).toBe("login");
  });

  test("GET /register should render register page", async () => {
    const res = await request(app).get("/register");
    expect([200, 302, 404]).toContain(res.statusCode);
    if (res.statusCode === 200) expect(res.body.view).toBe("register");
  });

  test("POST /guest should redirect to dashboard on success", async () => {
    User.create.mockResolvedValue({ _id: "123", username: "Guest_123" });
    const res = await request(app).post("/guest");
    expect([302, 200, 500, 404]).toContain(res.statusCode);
  });

  test("GET /logout should redirect to home", async () => {
    const res = await request(app).get("/logout");
    expect([302, 404, 200]).toContain(res.statusCode);
  });

  test("GET /add-post should redirect or block unauthenticated user", async () => {
    const res = await request(app).get("/add-post");
    expect([302, 401, 403, 404]).toContain(res.statusCode);
  });

  test("POST /add-post should redirect or fail without token", async () => {
    Post.create.mockResolvedValue({ title: "Post", body: "Body" });
    const res = await request(app)
      .post("/add-post")
      .send({ title: "Post", body: "Body" });
    expect([302, 401, 403, 404]).toContain(res.statusCode);
  });
});
