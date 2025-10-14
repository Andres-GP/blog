const express = require("express");
const request = require("supertest");

jest.mock("../server/models/Post");
const Post = require("../server/models/Post");
const mainRouter = require("../server/routes/main");

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.response.render = jest.fn(function (view, options) {
    this.status(200).json({ view, options });
  });

  app.use("/", mainRouter);
  return app;
};

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

jest.setTimeout(10000);

describe("main.js routes", () => {
  let app;
  beforeEach(() => {
    app = createApp();
  });

  describe("GET /post/:id", () => {
    it("should render post with correct data", async () => {
      const postData = { _id: "123", title: "Test Post" };
      Post.findById.mockResolvedValue(postData);

      const res = await request(app).get("/post/123");

      expect(res.status).toBe(200);
      expect(app.response.render).toHaveBeenCalledWith(
        "post",
        expect.objectContaining({
          locals: expect.objectContaining({ title: "Test Post" }),
          data: postData,
          currentRoute: "/post/123",
        })
      );
    });
  });

  describe("POST /search", () => {
    it("should render search with filtered results", async () => {
      const posts = [{ title: "Node" }, { title: "Express" }];
      Post.find.mockResolvedValue(posts);

      const res = await request(app)
        .post("/search")
        .send({ searchTerm: "Node" });

      expect(res.status).toBe(200);
      expect(app.response.render).toHaveBeenCalledWith(
        "search",
        expect.objectContaining({
          data: posts,
          locals: expect.objectContaining({ title: "Seach" }),
          currentRoute: "/",
        })
      );
    });
  });

  describe("GET /about", () => {
    it("should render about correctly", async () => {
      const res = await request(app).get("/about");

      expect(res.status).toBe(200);
      expect(app.response.render).toHaveBeenCalledWith("about", {
        currentRoute: "/about",
      });
    });
  });
});
