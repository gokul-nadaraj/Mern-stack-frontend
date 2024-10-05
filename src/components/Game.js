import React, { useState } from 'react';
import ScoreBoard from './ScoreBoard';
import axios from 'axios';
import '../Game.css'

const choices = ['stone', 'paper', 'scissors'];

function Game({ players }) {
  const [round, setRound] = useState(1);
  const [player1Choice, setPlayer1Choice] = useState('');
  const [player2Choice, setPlayer2Choice] = useState('');
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [results, setResults] = useState([]);
const[error,setError]=useState("")
  const determineWinner = () => {
    if (player1Choice === player2Choice) return 'tie';
    if (
      (player1Choice === 'stone' && player2Choice === 'scissors') ||
      (player1Choice === 'scissors' && player2Choice === 'paper') ||
      (player1Choice === 'paper' && player2Choice === 'stone')
    ) {
      return 'player1';
    } else {
      return 'player2';
    }
  };
  const handleNextRound = async () => {
    if (round > 6) {
      console.log('Game over, no more rounds can be played.');
      return; // Stop the game from progressing beyond round 6
    }
  
    const winner = determineWinner();
    const newResults = [...results, { round, player1Choice, player2Choice, winner }];
  
    // Update scores based on the winner
    if (winner === 'player1') {
      setScores((prevScores) => ({ ...prevScores, player1: prevScores.player1 + 1 }));
    } else if (winner === 'player2') {
      setScores((prevScores) => ({ ...prevScores, player2: prevScores.player2 + 1 }));
    }
  
    setResults(newResults);
  
    // If round reaches 6, save game data and stop
    if (round === 6) {
      try {
        const gameData = {
          players: [
            { name: players.player1, score: scores.player1 + (winner === 'player1' ? 1 : 0) },
            { name: players.player2, score: scores.player2 + (winner === 'player2' ? 1 : 0) }
          ],
          rounds: newResults,
          finalScores: {
            player1: scores.player1 + (winner === 'player1' ? 1 : 0),
            player2: scores.player2 + (winner === 'player2' ? 1 : 0),
          },
        };
  
        console.log('Sending game data:', gameData);
        const response = await axios.post('https://mern-stack-7.onrender.com/api/games', gameData);
        console.log('Game saved successfully:', response.data);
      } catch (error) {
        console.error('Error saving game data:', error.response ? error.response.data : error.message);
        setError('Failed to save game data.');
      }
    }
  
    // Proceed to the next round only if it's less than 6
    setPlayer1Choice('');
    setPlayer2Choice('');
    setRound(round + 1);
  };
  
  

  return (
    <div className='game-container'>
      {round > 6 ? (
        <div className='box2'>
          <h2>Game Over</h2>
          <p>Final Scores: {players.player1}: {scores.player1}, {players.player2}: {scores.player2}</p>
        </div>
      ) : (
        <>
          <h2>Round {round}</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if exists */}
          
          <h3 className='names'>{players.player1}'s Turn</h3>
          {choices.map(choice => (
            <button key={choice} onClick={() => setPlayer1Choice(choice)} className='basicnames'>
              {choice}
            </button>
          ))}
          
          <h3 className='names'>{players.player2}'s Turn</h3>
          {choices.map(choice => (
            <button key={choice} onClick={() => setPlayer2Choice(choice)} className='basicnames'>
              {choice}
            </button>
          ))}
          
          {player1Choice && player2Choice && (
            <button onClick={handleNextRound}>Next Round</button>
          )}
          
          {/* Displaying the results */}
          <div className='result'>
            <h3>Results</h3>
            {results.map((result, index) => (
              <div key={index}>
                <p>Round {result.round}: {players.player1} chose {result.player1Choice}, {players.player2} chose {result.player2Choice} - Winner: {result.winner}</p>
              </div>
            ))}
          </div>
        </>
      )}
    
      <ScoreBoard round={round} scores={scores} />
    </div>
  );
  }
  

export default Game;
