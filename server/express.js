const database = [];
const express = require("express");
const cors = require("cors");
const app = express();

const port = 9000;

app.use(cors());

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
          console.debug('[DEBUG] Incorrect fields log:', incorrectFields);
          res.send({
            status: "error",
            msg: "При заполнении формы были допущены ошибки. Исправьте их и попытайтесь снова.",
            fields: incorrectFields
          });
        });
    }, Math.random() * 1000);

    return;
  }

  setTimeout(() => {
    console.debug('[DEBUG] Valide request')
    res.statusCode = 200;
    const body = [];
    req
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