const express = require("express");
const request = require("request");
// const { PORT_1, PORT_2 } = require("./multiple-servers");

const PORT_1 = 5011;
const PORT_2 = 5012;

const loadBalancerApp = express();
const LOAD_BALANCER_PORT = 5010;

const servers = [`http://localhost:${PORT_1}`, `http://localhost:${PORT_2}`];
let cur = 0;

const handler = (req, res) => {
  // Pipe the vanilla node HTTP request (a readable stream) into `request`
  // to the next server URL. Then, since `res` implements the writable stream
  // interface, you can just `pipe()` into `res`.
  //   req.pipe(request({ url: servers[cur] + req.url })).pipe(res);

  // Add an error handler for the proxied request
  const _req = request({ url: servers[cur] + req.url }).on("error", (error) => {
    res.status(500).send(error.message);
  });
  req.pipe(_req).pipe(res);

  cur = (cur + 1) % servers.length;
};

const profilerMiddleware = (req, res, next) => {
  const start = Date.now();
  // The 'finish' event comes from core Node.js, it means Node is done handing
  // off the response headers and body to the underlying OS.
  res.on("finish", () => {
    console.log(`Completed: ${req.method} ${req.url}`, Date.now() - start);
  });
  next();
};

loadBalancerApp.use(profilerMiddleware).get("*", handler).post("*", handler);

loadBalancerApp.listen(LOAD_BALANCER_PORT, () => {
  console.log(`Load balancer is running on ${LOAD_BALANCER_PORT}`);
});
