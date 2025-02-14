import { useState } from "react";

//API URL, set cohort as a variable since that could tehnically change and maybe get a different set of data
const cohortName = "2410-FTB-ET-WEB-AM";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

const AddPlayerForm = ({ onPlayerAdded }) => {
  const [playerName, setPlayerName] = useState("");
  const [playerAge, setPlayerAge] = useState("");
  const [playerBreed, setPlayerBreed] = useState("");
  const [playerImage, setPlayerImage] = useState("");
  const [playerTeam, setPlayerTeam] = useState("");
  const [playerStatus, setPlayerStatus] = useState("field");
  const [error, setError] = useState(null);

  //Never trust end users, clean and sanitize input to make sure valid strings are being entered
  const sanitizeInput = () => {
    if (!playerName.trim()){
      setError("Name field required");
      return false;
    }
    if (!playerBreed.trim()){
      setError("Breed field required");
      return false;
    }
    if (!/^\d+$/.test(playerAge) || playerAge <= 0) {
      setError("Player ID must be a numebr");
      return false;
    }
    if (!/^\d+$/.test(playerTeam) || playerTeam <= 0) {
      setError("Player team ID must be a positive number.");
      return false;
    }
    //Scary regular expression to ensure a valid URL is entered. Its looking for HTTP://, WILDCARD, and .com
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
    if (!urlPattern.test(playerImage)) {
      setError("Please enter a valid image URL.");
      return false;
    }
    setError(null);
    return true;
  };

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
      console.error("Oops, something went wrong with adding that player!", err); //vestigial, was encountering errors adding so Im keeping it in
      setError("Failed to add player.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sanitizeInput()) return;
    const newPlayer = {
      name: playerName,
      age: playerAge,
      breed: playerBreed,
      status: playerStatus,
      imageUrl: playerImage,
      teamId: playerTeam, // Static team ID
      cohortId: 2780, // Static cohort ID
    };

    const addedPlayer = await addNewPlayer(newPlayer);
    if (addedPlayer) {
      onPlayerAdded(addedPlayer);
      setPlayerName("");
      setPlayerAge("");
      setPlayerBreed("");
      setPlayerImage("");
      setPlayerTeam("");
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
        required min ="1"
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
      <input
        type="number"
        placeholder="Player Team"
        value={playerTeam}
        onChange={(e) => setPlayerTeam(e.target.value)}
        required min ="1"
      />
      <button type="submit" className="primary-btn" onClick={onclose}>Add Player</button>
    </form>
  );
};

export default AddPlayerForm;
