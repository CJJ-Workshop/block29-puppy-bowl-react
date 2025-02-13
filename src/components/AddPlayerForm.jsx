import { useState } from "react";

const cohortName = "2410-FTB-ET-WEB-AM";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

const AddPlayerForm = ({ onPlayerAdded }) => {
  const [playerName, setPlayerName] = useState("");
  const [playerAge, setPlayerAge] = useState("");
  const [playerImage, setPlayerImage] = useState("");
  const [error, setError] = useState(null);

  const addNewPlayer = async (playerObj) => {
    try {
      const response = await fetch(`${API_URL}/players`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(playerObj),
      });

      console.log("Response Status: ", response.status);
      const data = await response.json();
      console.log("Response Data: ", data);
      return data.data.player;
    } catch (err) {
      console.error("Oops, something went wrong with adding that player!", err);
      setError("Failed to add player.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPlayer = { name: playerName, age: playerAge, image: playerImage };
    const addedPlayer = await addNewPlayer(newPlayer);
    if (addedPlayer) {
      onPlayerAdded(addedPlayer);
      setPlayerName("");
      setPlayerAge("");
      setPlayerImage("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Player</h2>
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="Player Name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        className="PlayerName"
        required
      />
      <input
        type="number"
        placeholder="Player Age"
        value={playerAge}
        onChange={(e) => setPlayerAge(e.target.value)}
        className="playerAge"
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={playerImage}
        onChange={(e) => setPlayerImage(e.target.value)}
        className="playerImage"
        required
      />
      <button type="submit">Add Player</button>
    </form>
  );
};

export default AddPlayerForm;
