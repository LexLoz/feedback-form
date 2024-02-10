const express = require("express");
const cors = require("cors");
const app = express();

const port = 9000;

app.use(cors());

app.post("/api/registration", (req, res) => {
  if (Math.random() > 0.5) {
    res.statusCode = 400;

    setTimeout(() => {
      res.send({
        status: "error",
        msg: "Не удалось отправить форму, повторите попытку позже ;(",
        fields: {
          
        }
      });
    }, Math.random() * 1000);

    return;
  }

  setTimeout(() => {
    res.statusCode = 200;
    console.log('req', req)
    res.send({
      status: "success",
      msg: "Ваша заявка принята! :0",
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