import { useState } from 'react'
import Discipline from './components/Discipline'
import './App.css'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Discipline />
    </>
  )
}

export default App
