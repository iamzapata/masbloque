import React, { Component } from "react"
import { func } from "prop-types"
import withContext from "Components/ContextProvider"
import Slider from "rc-slider"
import fromCharCode from "./helpers"
import "rc-slider/assets/index.css"

const controlButtons = [
  { name: "stop", content: "9724" },
  { name: "pause", content: "10073#2" },
  { name: "play", content: "9658" }
]

const shouldBeDisabled = (name, isPlaying) =>
  (name === "play" && isPlaying) || (name === "pause" && !isPlaying)

class Controls extends Component {
  state = {
    amplitude: "",
    omega: "",
    isPlaying: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return { ...prevState, ...nextProps.inputs }
  }

  updateInputValue = ev => {
    const { updateInputValue } = this.props
    const { name, value } = ev.target
    const numberValue = parseFloat(value)
    if (!Number.isFinite(numberValue) && value.length) return
    updateInputValue(name, Math.abs(numberValue))
  }

  onClickCanvasControl = ev => {
    ev.preventDefault()
    const { name } = ev.target
    const { dispatchCanvasControl } = this.props
    dispatchCanvasControl(name)
  }

  render() {
    const { omega, amplitude, isPlaying } = this.state
    return (
      <form>
        <label htmlFor="amplitude">
          Amplitud
          <input
            id="amplitude"
            onChange={ev => this.updateInputValue(ev)}
            type="number"
            name="amplitude"
            value={amplitude}
            placeholder="Amplitud"
          />
          <Slider
            name="amplitude"
            onChange={value =>
              this.updateInputValue({ target: { value, name: "amplitude" } })
            }
            value={amplitude}
          />
        </label>
        <label htmlFor="omega">
          Omega
          <input
            id="omega"
            onChange={ev => this.updateInputValue(ev)}
            type="number"
            name="omega"
            value={omega}
            placeholder="Omega"
          />
          <Slider
            name="amplitude"
            onChange={value =>
              this.updateInputValue({ target: { value, name: "omega" } })
            }
            value={amplitude}
          />
        </label>
        {controlButtons.map(({ name, content }) => (
          <button
            key={name}
            name={name}
            type="button"
            disabled={shouldBeDisabled(name, isPlaying)}
            onClick={this.onClickCanvasControl}
          >
            {fromCharCode(content)}
          </button>
        ))}
      </form>
    )
  }
}

Controls.propTypes = {
  updateInputValue: func.isRequired,
  dispatchCanvasControl: func.isRequired
}
export default withContext(Controls)
