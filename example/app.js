const Glarce = require("Glarce")
const app = new Glarce()

app.set("publicPath", "/Glarce")
app.set("devPublicPath", "/")

app.get(5, (res, req) =>
{
  res.interactivity(
  {
    2:
    {
      type: 'alert',
      title: 'Pause',
      text: 'Continue watching...'
    },
    3:
    {
      type: 'question',
      title: 'Jump',
      text: 'Do you want to jump to 5 seconds',
      buttons: [
      {
        text: 'ok',
        jumpTo: 5
      },
      {
        text: 'no'
      }]
    },
    4:
    {
      type: 'end'
    }
  })
  res.send(["videos/spook.webm", "videos/spook.mp4"])
})

app.start()