import React, { useState } from 'react';
import { BrowserRouter as Router,Routes, Route, } from 'react-router-dom';
import PlayerForm from './components/PlayerForm';
import Game from './components/Game';
import History from './components/History';
import './Playform.css'
import './Game.css'

function App() {
  const [players, setPlayers] = useState({ player1: '', player2: '' });

  const handleSetPlayers = (player1, player2) => {
    setPlayers({ player1, player2 });
  };

  return (
    // <Router>
    //   <Routes>
  
       
    //       <Route path="/" exact>
    //         <PlayerForm setPlayers={handleSetPlayers} />
        
    //       <Route path="/game">
    //         <Game players={players} />
    //       </Route>
    //       <Route path="/history">
    //         <History />
    //       </Route>
   
 
    //   </Routes>
    // </Router>

    <Router>
  <Routes>
    <React.Fragment>
    <Route path="/" element={<PlayerForm setPlayers={handleSetPlayers} />} />
        <Route path="/game" element={<Game players={players} />} />
        <Route path="/history" element={<History />} />
    </React.Fragment>
  </Routes>
</Router>


  );
}

export default App;


// //     "axios": "^1.7.7",
// "cors": "^2.8.5",
// "dotenv": "^16.4.5",
// "express": "^4.21.0",
// "express-validator": "^7.2.0",
// "mongoose": "^8.7.0",
// "nodemon": "^3.1.7",
// "react-scripts": "^5.0.1"
// }
// }
