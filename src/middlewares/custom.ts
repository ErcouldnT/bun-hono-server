import { Hono } from "hono";

const custom = new Hono();

// Custom logger
custom.use("*", async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.url}`);
  await next();
});

// Add a custom header
custom.use("/message/*", async (c, next) => {
  await next();
  c.header("x-message", "This is middleware!");
});

custom.get("/message/hello", (c) => c.text("Hello Middleware!"));

export default custom;
