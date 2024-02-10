const express = require("express"),
  cors = require("cors"),
  webpack = require("webpack"), 
  webpackDevMiddleware = require('webpack-dev-middleware'),
  webpackHotMiddleware = require('webpack-hot-middleware'),
  app = express(),
  router = express.Router(),
  config = require("../webpack.config"),
  compiler = webpack(config),
  port = 9000;

app.use(router);
app.use(cors());
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler))
app.use(express.static('dist'));

app.post("/api/registration", (req, res) => {
  if (Math.random() > 0.5) {
    res.statusCode = 400;

    setTimeout(() => {
      res.send({
        status: "error",
        message: "Bad request",
      });
    }, Math.random() * 1000);

    return;
  }

  setTimeout(() => {
    res.statusCode = 200;
    res.send({
      status: "success",
      message: "You are registered",
    });
  }, Math.random() * 1000);
});

app.get("/api/ping", (req, res) => {
  res.statusCode = 200;
  res.send({
    status: "success",
    message: "Server is ready",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});