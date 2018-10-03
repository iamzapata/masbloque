import React, { PureComponent } from "react"
import withContext from "Components/ContextProvider"
import { number, shape } from "prop-types"

class Canvas extends PureComponent {
  constructor(props) {
    super(props)
    this.t = 1
    this.limit = 360
    this.delta = 0.01
    this.boxDimension = 80
    this.canvas = React.createRef()
  }

  componentDidMount() {
    this.canvasContext = this.canvas.current.getContext("2d")
    this.draw()
  }

  drawSpring = ({
    initialX,
    initialY,
    currentXPosition,
    windings,
    windingHeight,
    offsetPadding,
    backSideColor,
    frontSideColor,
    lineWidth
  }) => {
    // step size has to be inversely proportionate to the windings
    const step = 1 / windings

    this.canvasContext.strokeStyle = backSideColor
    this.canvasContext.lineWidth = lineWidth
    this.canvasContext.lineJoin = "bevel"
    this.canvasContext.lineCap = "square"
    this.canvasContext.beginPath()
    this.canvasContext.moveTo(initialX, initialY)

    initialX += offsetPadding
    currentXPosition -= offsetPadding
    let x = currentXPosition - initialX
    let yPathEnd = 0 //initialY - initialY

    for (let i = 0; i <= 1 - step; i += step) {
      // for each winding
      for (let j = 0; j < 1; j += step) {
        let xx = initialX + x * (i + j * step)
        let yy = initialY
        xx -= Math.sin(j * Math.PI * 2)
        yy += Math.sin(j * Math.PI * 2) * windingHeight
        this.canvasContext.lineTo(xx, yy)
      }
    }

    // finishes off backside drawing, including black -line
    this.canvasContext.lineTo(currentXPosition, initialY)
    this.canvasContext.lineTo(currentXPosition + offsetPadding - 2, initialY)
    this.canvasContext.stroke()

    this.canvasContext.strokeStyle = frontSideColor
    this.canvasContext.lineWidth = lineWidth - 4
    this.canvasContext.lineJoin = "round"
    this.canvasContext.lineCap = "round"
    this.canvasContext.beginPath()

    // left horizontal bar
    this.canvasContext.moveTo(initialX - offsetPadding, initialY)
    this.canvasContext.lineTo(initialX, initialY)

    // right horizontal bar
    this.canvasContext.moveTo(currentXPosition, initialY)
    this.canvasContext.lineTo(currentXPosition + offsetPadding, initialY)

    for (let i = 0; i <= 1 - step; i += step) {
      // for each winding
      for (let j = 0.25; j <= 0.76; j += 0.01) {
        let xx = initialX + x * (i + j * step)
        let yy = initialY + yPathEnd * (i + j * step)
        xx -= Math.sin(j * Math.PI * 2)
        yy += Math.sin(j * Math.PI * 2) * windingHeight
        if (j === 0.25) {
          this.canvasContext.moveTo(xx, yy)
        } else {
          this.canvasContext.lineTo(xx, yy)
        }
      }
    }
    this.canvasContext.stroke()
  }

  displaySpring = x => {
    /*this.canvasContext.setTransform(1, 0, 0, 1, 0, 0) // reset transform
    this.canvasContext.globalAlpha = 1 // reset alpha
    this.canvasContext.lineWidth = 1*/

    const { height: canvasHeight } = this.props
    this.drawSpring({
      initialX: 1,
      initialY: canvasHeight / 2 - 40,
      currentXPosition: x,
      windings: 14,
      windingHeight: 15,
      offsetPadding: 10,
      backSideColor: "rgba(0, 0, 0, 0.9)",
      frontSideColor: "gray",
      lineWidth: 9
    })
  }

  drawBox = (x, yInitial) => {
    const { width: canvasWidth, height: canvasHeight } = this.props
    this.canvasContext.fillStyle = "rgba(255, 0, 0, 1)"
    const y = yInitial + canvasHeight / 2 - this.boxDimension
    this.canvasContext.clearRect(
      5,
      canvasHeight / 2 - this.boxDimension - 5,
      canvasWidth,
      this.boxDimension + 2
    )

    this.draGreenBackground(x, y, this.boxDimension)

    this.canvasContext.strokeStyle = "black"
    this.canvasContext.lineWidth = 1
    this.canvasContext.fillStyle = "rgba(0, 0, 0, 0.5)"
    this.canvasContext.strokeRect(x, y, this.boxDimension, this.boxDimension)
    this.canvasContext.fillRect(x, y, this.boxDimension, this.boxDimension)
  }

  draGreenBackground = () => {
    const { width: canvasWidth, height: canvasHeight } = this.props
    this.canvasContext.fillStyle = "rgba(0, 255, 0, 1)"
    this.canvasContext.fillRect(
      3,
      canvasHeight / 2 - this.boxDimension,
      canvasWidth,
      this.boxDimension + 2
    )
  }

  drawFloor = (context, canvasHeight, canvasWidth) => {
    context.beginPath()
    context.moveTo(0, canvasHeight / 2)
    context.lineTo(canvasWidth - 50, canvasHeight / 2)
    context.stroke()
    context.closePath()
  }

  drawWall = (context, canvasHeight) => {
    context.lineWidth = 5
    context.strokeStyle = "black"
    context.beginPath()
    context.moveTo(0, 1)
    context.lineTo(0, canvasHeight / 2)
    context.stroke()
    context.closePath()
  }

  draw = () => {
    const { width: canvasWidth, height: canvasHeight } = this.props
    const context = this.canvasContext

    this.drawWall(context, canvasHeight)
    this.drawFloor(context, canvasHeight, canvasWidth)

    const {
      inputs: { amplitude, omega, isPlaying }
    } = this.props

    if (this.t > this.limit) this.t = 1
    const x = amplitude * Math.cos(omega * this.t) + amplitude
    if (isPlaying) {
      this.t += this.delta
    } else {
      this.t = this.t
    }

    this.drawBox(x, -2)
    this.displaySpring(x)

    //this.canvasContext.restore();
    requestAnimationFrame(this.draw)
  }

  render() {
    const { width, height } = this.props
    return <canvas width={width} height={height} ref={this.canvas} />
  }
}

Canvas.propTypes = {
  width: number.isRequired,
  height: number.isRequired,
  inputs: shape({
    omega: number.isRequired,
    amplitude: number.isRequired
  }).isRequired
}

export default withContext(Canvas)
