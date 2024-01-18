import { Hono } from "hono";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { prettyJSON } from "hono/pretty-json";
import { logger } from "hono/logger";

import auth from "./routes/auth";
import book from "./routes/book";

const app = new Hono();

app.use("*", secureHeaders());
app.use("*", prettyJSON());
app.use("*", logger());
app.use("*", cors());

app.get("/", (c) => {
  return c.json({ hello: "world" });
});

app.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ success: false, message: "Server error", err }, 500);
});

app.notFound((c) => {
  return c.json({ success: false, message: "Not found" }, 404);
});

app.route("/auth", auth);
app.route("/book", book);

export default app;
