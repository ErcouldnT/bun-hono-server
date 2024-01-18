import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const book = new Hono();

const bookSchema = z.object({
  name: z.string(),
  year: z.number(),
});

// POST /book
book.post("/", zValidator("json", bookSchema), (c, next) => {
  const book = c.req.valid("json");
  return c.json(
    {
      success: true,
      message: `${book.name} written in ${book.year}`,
    },
    201
  );
});

// GET /book
book.get("/", (c) => {
  //   const { limit, offset } = c.req.query();
  return c.json("List Books");
});

// GET /book/:id
book.get("/:id", (c) => {
  const id = c.req.param("id");
  return c.json("Get Book: " + id);
});

export default book;
