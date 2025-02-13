import { useState } from 'react'
import './App.css'
import ViewAllPlayers  from './components/ViewAllPlayers'
import AddPlayerForm from './components/AddPlayerForm'

function App() {

  return (
    <>
    <AddPlayerForm />
      <ViewAllPlayers />
    </>
  )
}

export default App