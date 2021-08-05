import React from 'react';
    
const PlayersList = ({players, handleRemovePlayer}) => {
    return players.map(player => {
        return (
            <div key={player.id}>
                <span>
                    <a href={player.url}><h2>{player.name}</h2></a>
                </span>
                <span><strong>Country: {player.nationality}</strong></span>
                <span>| Invented Year: {player.height}</span>
                <span>| Invented City: {player.jersey}</span>
                <br/><br/>
                <span><button type="button" onClick={() => handleRemovePlayer(player)}>Remove</button></span>

            </div>
        );
    });
}


export default PlayersList;
