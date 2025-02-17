import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import ViewAllPlayers  from './components/ViewAllPlayers'
import AddPlayerForm from './components/AddPlayerForm'
import SearchBar from './components/SearchBar'

function App() {

  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await fetch(
          `https://fsa-puppy-bowl.herokuapp.com/api/2410-ftb-et-web-am/players`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch players ${response.status}!`);
        }

        const result = await response.json();
        console.log("result is", result.data.players);
        setPlayers(result.data.players);
      } catch (err) {
        console.log(`Uh oh, trouble fetching players!`, err);
        return [];
      }
    }
    fetchPlayers();
  }, []);

  const filteredPlayers = players.filter((player) => 
    player.name.toLowerCase().includes(search.toLowerCase()));
    console.log("players = ", players)

  return (
    <>
      <AddPlayerForm />
      <SearchBar setSearch={setSearch}/>
      <ViewAllPlayers  players={filteredPlayers}/>
    </>
  )
}

export default App