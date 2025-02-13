import { useState } from 'react'
import React from 'react'
import AddPlayerForm from './components/AddPlayerForm'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <AddPlayerForm />
      </div>
    </>
  )
}

export default App
