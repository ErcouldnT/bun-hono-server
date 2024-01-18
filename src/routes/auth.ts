import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";

const auth = new Hono();

auth.use(
  "*",
  basicAuth({
    username: process.env.USERNAME as string,
    password: process.env.PASSWORD as string,
  })
);

auth.get("/", (c) => {
  return c.json({ success: true, message: "You are authorized!" });
});

export default auth;
