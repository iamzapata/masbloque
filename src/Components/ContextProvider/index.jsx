import React, { Component, createContext } from "react"
import { node } from "prop-types"

const { Provider, Consumer } = createContext()

class ContextProvider extends Component {
  state = {
    amplitude: 0,
    omega: 1,
    isPlaying: false
  }

  updateInputValue = (input, value) => {
    this.setState({
      [input]: value
    })
  }

  dispatchCanvasControl = actionName => {
    return {
      stop: () => this.setState({ amplitude: 0, omega: 1, isPlaying: false }),
      pause: () => this.setState({ isPlaying: false }),
      play: () => this.setState({ isPlaying: true })
    }[actionName]()
  }

  render() {
    const { amplitude, omega, isPlaying } = this.state
    const { children } = this.props
    return (
      <Provider
        value={{
          inputs: { amplitude, omega, isPlaying },
          updateInputValue: this.updateInputValue,
          dispatchCanvasControl: this.dispatchCanvasControl
        }}
      >
        {children}
      </Provider>
    )
  }
}

const withContext = Component => {
  Component.displayName = `${Component.name}WithContext`
  const WithContext = props => {
    return (
      <Consumer>{context => <Component {...props} {...context} />}</Consumer>
    )
  }
  return WithContext
}

ContextProvider.propTypes = {
  children: node.isRequired
}

export { ContextProvider }

export default withContext
