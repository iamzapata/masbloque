import React from "react"
import { ContextProvider } from "Components/ContextProvider"
import Canvas from "Components/Canvas"
import Controls from "Components/Controls"
import "Styles/index.scss"

const App = () => (
  <div className="App">
    <ContextProvider>
      <Canvas width={1000} height={300} />
      <Controls />
    </ContextProvider>
  </div>
)

export default App
