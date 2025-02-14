import { useState } from "react";

const cohortName = "2410-FTB-ET-WEB-AM";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

const AddPlayerForm = ({ onPlayerAdded }) => {
  const [playerName, setPlayerName] = useState("");
  const [playerAge, setPlayerAge] = useState("");
  const [playerBreed, setPlayerBreed] = useState("");
  const [playerImage, setPlayerImage] = useState("");
  const [playerStatus, setPlayerStatus] = useState("field");
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

      if (!response.ok) throw new Error(data.error || "Failed to add player.");

      return data.data.player;
    } catch (err) {
      console.error("Oops, something went wrong with adding that player!", err);
      setError("Failed to add player.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPlayer = {
      name: playerName,
      age: playerAge,
      breed: playerBreed,
      status: playerStatus,
      imageUrl: playerImage,
      teamId: 3250, // Static team ID
      cohortId: 2780, // Static cohort ID
    };

    const addedPlayer = await addNewPlayer(newPlayer);
    if (addedPlayer) {
      onPlayerAdded(addedPlayer);
      setPlayerName("");
      setPlayerAge("");
      setPlayerBreed("");
      setPlayerImage("");
      setPlayerStatus("field"); // Reset status to default
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add New Player</h1>
      {error && <p>{error}</p>}
      <input
        type="text"
        placeholder="Player Name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Player Age"
        value={playerAge}
        onChange={(e) => setPlayerAge(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Player Breed"
        value={playerBreed}
        onChange={(e) => setPlayerBreed(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={playerImage}
        onChange={(e) => setPlayerImage(e.target.value)}
        required
      />
      <label htmlFor="playerStatus">Status:</label>
      <select
        id="playerStatus"
        value={playerStatus}
        onChange={(e) => setPlayerStatus(e.target.value)}
      >
        <option value="field">Field</option>
        <option value="bench">Bench</option>
      </select>
      <button type="submit" className="details-btn">Add Player</button>
    </form>
  );
};

export default AddPlayerForm;
