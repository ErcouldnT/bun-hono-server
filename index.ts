console.log("Hello via Bun!");

Bun.serve({
  fetch: (request) => {
    return new Response("Hello via Bun!");
  },
  port: process.env.PORT || 3000,
});
