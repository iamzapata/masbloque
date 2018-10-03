import React, { Component } from "react"
import { func } from "prop-types"
import withContext from "Components/ContextProvider"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"

const controlButtons = [
  { name: "stop", icon: "fa fa-stop-circle" },
  { name: "pause", icon: "fa fa-pause-circle-o" },
  { name: "play", icon: "fa fa-play-circle-o" }
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
    const { name } = ev.currentTarget
    const { dispatchCanvasControl } = this.props
    dispatchCanvasControl(name)
  }

  render() {
    const { omega, amplitude, isPlaying } = this.state
    return (
      <form className="container">
        <div className="field">
          <div className="control">
            <label className="label" htmlFor="amplitude">
              Amplitud
            </label>
            <input
              className="input"
              id="amplitude"
              onChange={ev => this.updateInputValue(ev)}
              type="number"
              name="amplitude"
              value={amplitude}
              placeholder="Amplitud"
            />
            <Slider
              name="amplitude"
              min={0}
              max={450}
              onChange={value =>
                this.updateInputValue({ target: { value, name: "amplitude" } })
              }
              value={amplitude}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label" htmlFor="omega">
              Omega
            </label>
            <input
              id="omega"
              className="input"
              onChange={ev => this.updateInputValue(ev)}
              type="number"
              name="omega"
              value={omega}
              placeholder="Omega"
            />
            <Slider
              name="amplitude"
              min={0}
              max={10}
              onChange={value =>
                this.updateInputValue({ target: { value, name: "omega" } })
              }
              value={omega}
            />
          </div>
        </div>
        {controlButtons.map(({ name, icon }) => (
          <div className="control" key={name}>
            <button
              name={name}
              type="button"
              className="button"
              onClick={ev => this.onClickCanvasControl(ev)}
              disabled={shouldBeDisabled(name, isPlaying)}
            >
              <span className="icon is-small">
                <i className={icon} />
              </span>
            </button>
          </div>
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
