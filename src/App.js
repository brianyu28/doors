import { useState } from 'react';

import './App.css';
import Door from './Door';

const NUM_DOORS = 15;
const NUM_TURNS = 10;

function App() {

  function newGameState() {
    const doors = [];
    for (let i = 0; i < NUM_DOORS; i++)
    {
      const value = Math.floor(Math.random() * 20 + 5);
      const open = false;
      doors.push({ value, open });
    }
    return {
      doors,
      turns: NUM_TURNS,
      score: 0
    };
  }

  const [state, setState] = useState(newGameState);

  function clickDoor(doorIndex) {
    if (state.turns <= 0) {
      return;
    }
    setState({
      ...state,
      turns: state.turns - 1,
      score: state.score += state.doors[doorIndex].value,
      doors: state.doors.map((door, i) =>
        i !== doorIndex ? door :
        { ...state.doors[doorIndex], open: true }
      )
    })
  }

  function resetGame() {
    setState(newGameState());
  }

  return (
    <div id="app">
      <h1>Doors</h1>
      <div id="instructions">
        <div>Click on a door to earn the number of points behind it.</div>
        <div>Doors with a <strong>?</strong> will have their point values revealed when clicked.</div>
        <hr style={{width: '200px'}} />
        {
          state.turns > 0 &&
          <div>Clicks Remaining: <strong>{state.turns}</strong></div>
        }
        <div>Points: <strong>{state.score}</strong></div>
        {
          state.turns === 0 &&
          <button id="reset" onClick={resetGame}>Try Again</button>
        }
      </div>
      <div id="doors">
        {state.doors.map((door, i) =>
          <Door
            key={i}
            value={door.value}
            open={door.open}
            onClick={() => clickDoor(i)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
