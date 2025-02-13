import { useState } from "react";
import { useEffect } from "react";

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

  return (
    <>
      {players?.map((player) => {
        return (
          <div key={player.id}>
            <h1>{player.name}</h1>
            <p>{player.breed}</p>
          </div>
        );
      })}
    </>
  );
}
