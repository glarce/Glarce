const Glarce = require("Glarce")
const app = new Glarce()

app.get(5, (res, req) =>
{
  res.interactivity(
  {
    1:
    {
      type: 'alert',
      title: 'Pause',
      text: 'Continue watching...'
    },
    2:
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
    3:
    {
      type: 'end'
    }
  })
  res.send("videos/spook.webm")
})

app.start()