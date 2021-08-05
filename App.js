import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import PlayersList from './PlayersList';
import Search from './Search';
import Nav from './Nav';
import Home from './Home';
import Documentation from './Documentation';
import Sources from './Sources';
import Store from './Store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const players_data = [
    {
        id: 1,
        name: "Pizza",   
        nationality: "Italy",
        jersey: "Napoli",
        height: "A.D. 997",
        url: "https://en.wikipedia.org/wiki/Pizza"
    },
    {
        id: 2,
        name: "Peking duck",
        nationality: "China",
        jersey: "Peking",
        height: "A.D. 1416",
        url: "https://en.wikipedia.org/wiki/Peking_duck"
    },
    {
        id: 3,
        name: "Baguette",
        nationality: "France",
        jersey: "Paris",
        height: "A.D. 1839",
        url: "https://en.wikipedia.org/wiki/Baguette"
    },
    {
        id: 4,
        name: "Churro",
        nationality: "Spain and Portugal",
        jersey: "Madrid",
        height: "A.D. 1894",
        url: "https://en.wikipedia.org/wiki/Churro"
    },
    {
        id: 5,
        name: "Sushi",
        nationality: "Japan",
        jersey: "Edo",
        height: "A.D. 700",
        url: "https://en.wikipedia.org/wiki/Sushi"
    },
    {
        id: 6,
        name: "Masala chai",
        nationality: "India",
        jersey: "India",
        height: "A.D. 1920",   
        url: "https://en.wikipedia.org/wiki/Masala_chai"
    },
    {
        id: 7,
        name: "Souvlaki",
        nationality: "Greek",
        jersey: "Santorini",
        height: "2000 B.C.", 
        url: "https://en.wikipedia.org/wiki/Souvlaki"
    },
    {
        id: 8,
        name: "Tom yum",
        nationality: "Thailand",
        jersey: "Bangkok",
        height: "Unknown",
        url: "https://en.wikipedia.org/wiki/Tom_yum"
    },
    {
        id: 9,
        name: "Chilaquiles",
        nationality: "Mexico",
        jersey: "Mexico",
        height: "A.D. 1898",      
        url: "https://en.wikipedia.org/wiki/Chilaquiles"
    },
    {
        id: 10,
        name: "Cheeseburger",
        nationality: "United States",
        jersey: "New Haven",
        height: "A.D. 1920",        
        url: "https://en.wikipedia.org/wiki/Cheeseburger"
    }
];


const playersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PLAYERS':
            return action.payload;
        case 'REMOVE_PLAYER':
            return state.filter(
                player => action.payload.id !== player.id
            )
        default:
            throw new Error();
    }
};


const App = () => {

    const [players, dispatchPlayers] = useReducer(
        playersReducer,
        []
    );
    const [isLoading, setIsLoading] = useState(false);

    const [searchText, setSearchText] = useState(
        localStorage.getItem('searchText') || ''
    );       

    const handleSearch = event => {
        setSearchText(event.target.value);
    }

    const handleRemovePlayer = player => {
        dispatchPlayers({
            type: 'REMOVE_PLAYER',
            payload: player
        }); 
    }

    const getPlayersAsync = () =>
        new Promise(resolve =>
            setTimeout(
                () => resolve({ players: players_data }),
                1300
            )
        );

    useEffect(() => {
        setIsLoading(true);
        getPlayersAsync().then(result => {
            dispatchPlayers({
                type: 'SET_PLAYERS',
                payload: result.players
            });
            setIsLoading(false);
        })
    }, []);   

    useEffect(() => {
        localStorage.setItem('searchText', searchText)
    }, [searchText]);

    const filteredPlayers = players.filter(player => {
        return player.name.includes(searchText) || player.nationality.includes(searchText);
    });


  return (
      <div className="main">
          <Router>
              <Nav />
              <Route path="/store" component={Store} />
              <Route path="/documentation" component={Documentation} />
              <Route path="/sources" component={Sources} />
          </Router> 
            
          <h1 className="Documentation">World cuisine: 10 best food cultures</h1>
          <hr />    

          <Search value={searchText} onSearch={handleSearch} />

          {isLoading ? (
              <p>Loading World Top 10 best food cultures...</p>
          ) : (
             <PlayersList players={filteredPlayers} handleRemovePlayer={handleRemovePlayer} />              
          )}   
          
    </div>
  );
}


export default App;
