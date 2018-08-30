const canvas = document.getElementsByTagName("canvas")[0]
const ctx = canvas.getContext("2d")

function drawSpring({
  x1,
  y1,
  x2,
  y2,
  windings,
  width,
  offset,
  col1,
  col2,
  lineWidth
}) {
  var x = x2 - x1
  var y = y2 - y1
  var dist = Math.sqrt(x * x + y * y)

  var nx = x / dist
  var ny = y / dist
  ctx.strokeStyle = col1
  ctx.lineWidth = lineWidth
  ctx.lineJoin = "round"
  ctx.lineCap = "round"
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  x1 += nx * offset
  y1 += ny * offset
  x2 -= nx * offset
  y2 -= ny * offset
  var x = x2 - x1
  var y = y2 - y1
  var step = 1 / windings
  for (var i = 0; i <= 1 - step; i += step) {
    // for each winding
    for (var j = 0; j < 1; j += 0.05) {
      var xx = x1 + x * (i + j * step)
      var yy = y1 + y * (i + j * step)
      xx -= Math.sin(j * Math.PI * 2) * ny * width
      yy += Math.sin(j * Math.PI * 2) * nx * width
      ctx.lineTo(xx, yy)
    }
  }
  ctx.lineTo(x2, y2)
  ctx.lineTo(x2 + nx * offset, y2 + ny * offset)
  ctx.stroke()
  ctx.strokeStyle = col2
  ctx.lineWidth = lineWidth - 4
  var step = 1 / windings
  ctx.beginPath()
  ctx.moveTo(x1 - nx * offset, y1 - ny * offset)
  ctx.lineTo(x1, y1)
  ctx.moveTo(x2, y2)
  ctx.lineTo(x2 + nx * offset, y2 + ny * offset)
  for (var i = 0; i <= 1 - step; i += step) {
    // for each winding
    for (var j = 0.25; j <= 0.76; j += 0.05) {
      var xx = x1 + x * (i + j * step)
      var yy = y1 + y * (i + j * step)
      xx -= Math.sin(j * Math.PI * 2) * ny * width
      yy += Math.sin(j * Math.PI * 2) * nx * width
      if (j === 0.25) {
        ctx.moveTo(xx, yy)
      } else {
        ctx.lineTo(xx, yy)
      }
    }
  }
  ctx.stroke()
}

function displaySpring(x) {
  ctx.setTransform(1, 0, 0, 1, 0, 0) // reset transform
  ctx.globalAlpha = 1 // reset alpha
  ctx.lineWidth = 1
  const springYPosition = 205

  drawSpring({
    x1: 5,
    y1: springYPosition,
    x2: x,
    y2: springYPosition,
    windings: 11,
    width: 15,
    offset: 15,
    col1: "rgba(0, 0, 0, 0.8)",
    col2: "gray",
    lineWidth: 8
  })
}

function drawBox(x, yInitial) {
  const dimention = 80
  ctx.fillStyle = "rgba(255, 0, 0, 1)"
  const y = yInitial + canvas.height / 2 - dimention
  ctx.clearRect(
    5,
    canvas.height / 2 - dimention - 5,
    canvas.width,
    dimention + 2
  )
  //ctx.fillStyle = "rgba(0, 255, 0, 1)";
  //ctx.fillRect(5, canvas.height / 2 - dimention, canvas.width, dimention + 2);
  ctx.strokeStyle = "black"
  ctx.lineWidth = 1
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
  ctx.strokeRect(x, y - 2, dimention, dimention)
  ctx.fillRect(x, y - 2, dimention, dimention)

  ctx.setLineDash([4, 3])
  ctx.strokeStyle = "rgb(255,0,0)"
  ctx.beginPath()
  ctx.moveTo(canvas.width / 2, 100)
  ctx.lineTo(canvas.width / 2, canvas.height / 2 + 100)
  ctx.stroke()
  ctx.closePath()
}

function canvasInit() {
  const introHeight = document.body.scrollHeight
  const introWidth = document.body.scrollWidth

  const canvasWidth = introWidth

  canvas.height = 500
  canvas.width = canvasWidth
  const plotBottomBadding = 1

  ctx.strokeStyle = "rgba(0,0,0,.2)"
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(0, canvas.height / 2 + plotBottomBadding)
  ctx.stroke()
  ctx.closePath()

  ctx.strokeStyle = "rgba(0,0,0,.1)"
  ctx.beginPath()
  ctx.moveTo(0, canvas.height / 2 + plotBottomBadding)
  ctx.lineTo(canvas.width - 50, canvas.height / 2 + plotBottomBadding)
  ctx.stroke()
  ctx.closePath()

  window.requestAnimationFrame(draw)
}

let delta = 0.1
let t = 1
const limit = 360
const A = 200
const w = 0.5
//const sup = [...Array(360).keys()].map(n => n + 1).map(n => Math.cos(n * 5));

function draw() {
  if (t > limit) t = 1
  const x = A * Math.cos(w * t) + 300
  t += delta

  //ctx.save();
  drawBox(x, -2)
  displaySpring(x)

  ctx.setLineDash([4, 3])
  ctx.strokeStyle = "rgb(0,0,255)"
  ctx.beginPath()
  ctx.moveTo(A - 100 / 2, 100)
  ctx.lineTo(A - 100 / 2, canvas.height / 2 + 100)
  ctx.stroke()
  ctx.closePath()

  //ctx.restore();
  window.requestAnimationFrame(draw)
}

canvasInit()
