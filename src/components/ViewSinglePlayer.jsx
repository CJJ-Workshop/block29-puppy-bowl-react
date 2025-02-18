// Imports - like useState, useEffect, css
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./viewSinglePlayer.css";

const cohort = "2410-FTB-ET-WEB-AM";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohort}/players`;

// The Component
const ViewSinglePlayer = () => {
  //State varibles
  const [player, setPlayer] = useState();
  const { playerId } = useParams();

  // Fetching APIS
  const fetchSinglePlayer = async (playerId) => {
    try {
      // TODO
      const response = await fetch(`${API_URL}/${playerId}`);
      const data = await response.json();
      console.log(data.data.player);
      if (data.data.player) {
        setPlayer(data.data.player);
      } else {
        console.error(`No player found with ID: ${playerId}`);
      }
    } catch (err) {
      console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
  };
  useEffect(() => {
    fetchSinglePlayer(playerId);
  }, [playerId]);
  //Return the html
  const deletePlayer = async (playerId) => {
    try {
      const response = await fetch(`${API_URL}/${playerId}`, {
        method: "DELETE",
      });
      console.log(response);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {player && (
        <div className="singlecontainer">
          <h1>{player.name}</h1>
          <h3>{player.breed}</h3>
          <img src={player.imageUrl} alt="" />
          <button onClick={() => deletePlayer(player.id)}>Delete Player</button>
        </div>
      )}
    </>
  );
};

// Exports the component to use in a different place
export default ViewSinglePlayer;
