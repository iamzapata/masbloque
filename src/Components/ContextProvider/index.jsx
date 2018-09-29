import React, { Component, createContext } from "react"
import { node } from "prop-types"

const { Provider, Consumer } = createContext()

class ContextProvider extends Component {
  state = {
    amplitude: 200,
    omega: 1
  }

  updateInputValue = (input, value) => {
    this.setState({
      [input]: value
    })
  }

  render() {
    const { amplitude, omega } = this.state
    const { children } = this.props
    return (
      <Provider
        value={{
          inputs: { amplitude, omega },
          updateInputValue: this.updateInputValue
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
