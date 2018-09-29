import React, { Component } from "react"
import { func } from "prop-types"
import fromCharCode from "./helpers"
import withContext from "Components/ContextProvider"

const controlButtons = [
  { name: "stop", content: "9724" },
  { name: "pause", content: "10073#2" },
  { name: "play", content: "9658" }
]

class Controls extends Component {
  state = {
    amplitude: "",
    omega: ""
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
    const { omega, amplitude } = this.state
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
        </label>
        {controlButtons.map(({ name, content }) => (
          <button key={name} name={name} onClick={this.onClickCanvasControl}>
            {fromCharCode(content)}
          </button>
        ))}
      </form>
    )
  }
}

Controls.propTypes = {
  updateInputValue: func.isRequired
}
export default withContext(Controls)
