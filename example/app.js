const Glarce = require("Glarce")
const app = new Glarce()

app.get(5, (res, req) => {
  res.send("videos/spook.webm")
})
app.get(6, (res, req) => {
  res.send("videos/spook.webm")
})

app.start()