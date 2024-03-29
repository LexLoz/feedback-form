const database = [];
const express = require("express"),
  cors = require("cors"),
  webpack = require("webpack"),
  webpackDevMiddleware = require('webpack-dev-middleware'),
  webpackHotMiddleware = require('webpack-hot-middleware'),
  app = express(),
  router = express.Router(),
  config = require("../webpack.config.server"),
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
      console.error('[ERROR] Invalide request')
      const body = [];
      const incorrectFields = {};
      req
        .on('data', chunk => body.push(chunk.toString()))
        .on('end', () => {
          const data = JSON.parse(body.join());
          // console.log(data);
          const cash = {};
          for (let i = 0; i <= 3; i++) {
            if (Math.random() <= 1 - 0.2 * i) {
              let cond = true
              while (cond) {
                const index = Math.round(0 + Math.random() * (3 - 0));
                if (!cash[index]) {
                  cash[index] = true;
                  const obj = data[index];
                  incorrectFields[obj.id] = obj.value;
                  cond = false;
                }
              }
            }
          }
          res.send({
            status: "error",
            msg: "При заполнении формы были допущены ошибки. Исправьте их и попытайтесь снова.",
            debug: [
              ['Incorrect fields log:', incorrectFields],
              ['Database:', database]
            ],
            fields: incorrectFields
          });
        });
    }, Math.random() * 1000);

    return;
  }

  setTimeout(async () => {
    console.debug('[DEBUG] Valide request')
    res.statusCode = 200;
    const body = [];
    await req
      .on('data', chunk => body.push(chunk.toString()))
      .on('end', () => {
        const data = JSON.parse(body.join());
        console.log(data);
        database.push(data);
        // req.end(data);
      });
    res.send({
      status: "success",
      msg: "Ваша заявка принята на обработку.",
      debug: [
        ['Database:', database]
      ]
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