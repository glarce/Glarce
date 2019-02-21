const Glarce = require("Glarce")
const app = new Glarce()

app.get(5, (res, req) => {
  res.send("notify/alert/Hello World")
})

app.start()