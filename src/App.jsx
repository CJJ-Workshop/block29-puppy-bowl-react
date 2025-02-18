import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import Modal from "./components/Modal.jsx";
import ViewAllPlayers from "./components/ViewAllPlayers";
import AddPlayerForm from "./components/AddPlayerForm";
import SearchBar from "./components/SearchBar";

import { Routes, Route } from "react-router-dom";
import ViewSinglePlayer from "./components/ViewSinglePlayer.jsx";
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 🔹 Fix: Define state
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
    player.name.toLowerCase().includes(search.toLowerCase())
  );
  console.log("players = ", players);

  return (
    <div className="app-container">
      <h1>Puppy Bowl!</h1>
      <button onClick={() => setIsModalOpen(true)} className="details-btn">
        Add New Player
      </button>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AddPlayerForm onPlayerAdded={() => setIsModalOpen(false)} />
        </Modal>
      )}

      <SearchBar setSearch={setSearch} />
      <ViewAllPlayers players={filteredPlayers} />
      <>
        <Routes>
          {/* <Route path="/players" element={<h1>Blue</h1>} /> */}
          <Route path="/players/:playerId" element={<ViewSinglePlayer />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
