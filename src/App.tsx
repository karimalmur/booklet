import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { FabricJSCanvas } from './components/canvas/Canvas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <FabricJSCanvas />
    </div>
  )
}

export default App
