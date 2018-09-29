import React, { Component } from "react"
import { func } from "prop-types"
import withContext from "Components/ContextProvider"

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
        <button>&#9724;</button>
        <button>&#10073;&#10073;</button>
        <button>&#9658;</button>
      </form>
    )
  }
}

Controls.propTypes = {
  updateInputValue: func.isRequired
}
export default withContext(Controls)
