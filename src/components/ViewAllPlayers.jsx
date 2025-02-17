export default function ViewAllPlayers({ players }) {

  return (
    <>
      <h2>All Players</h2>
      {players?.map((player) => {
        return (
          <div key={player.id}>
            <h1>{player.name}</h1>
            <p>Breed: {player.breed}</p>
            <p>ID: {player.id}</p>
            <p>Status: {player.status}</p>
          </div>
        );
      })}
    </>
  );
}
