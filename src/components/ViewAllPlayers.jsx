import { useState } from "react";
import { useEffect } from "react";
import { RemovePlayerButton } from "./RemovePlayerButton"; //for the button
import ViewSinglePlayer from "./ViewSinglePlayer";


export default function ViewAllPlayers() {
  const [players, setPlayers] = useState();

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


  //Build and return player cards by player ID. 
  return (
    <>
      <div className="content-card">
        <div className="feature-grid">
          {players?.map((player) => {
            return (
              <div className="feature-card" key={player.id}>
                <img src={player.imageUrl} alt={player.name} />
                <h3>{player.name}</h3>
                <p>Breed: {player.breed}</p>
                <p>Age: {player.age}</p>
                <p>Team: {player.teamId}</p>
                <p>Status: {player.status}</p>
                <RemovePlayerButton playerId={player.id} onRemove={() => setPlayers(players.filter(p => p.id !== player.id))} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}