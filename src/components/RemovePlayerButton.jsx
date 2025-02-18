import React from "react";
const cohortName = "2410-FTB-ET-WEB-AM";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

const RemovePlayerButton = ({ playerId, onRemove }) => {
  const removePlayer = async () => {
    if (!window.confirm("Are you sure?")){
        return;
    }
    try {
      await fetch(`${API_URL}/players/${playerId}`, {
        method: "DELETE",
      });
      if (onRemove) onRemove(playerId);
    } catch (err) {
      console.error(
        `Whoops, trouble removing player #${playerId} from the roster!`,
        err
      );
    }
  };

  return <button onClick={removePlayer} className="remove-btn">Remove</button>;
};

export { RemovePlayerButton };
