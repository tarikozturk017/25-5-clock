import React from "react"


function App() {
  function handleClick() {
    console.log('clicked')
  }

  return (
    <div className="App">
      <div id={"break-label"}>Break Length</div>
      <div id={"session-label"}>Session Length</div>
      <button onClick={() => handleClick()} id={"break-decrement"}></button>
      <button onClick={() => handleClick()} id={"session-decrement"}></button>

      <button onClick={() => handleClick()} id={"break-increment"}></button>
      <button onClick={() => handleClick()} id={"session-increment"}></button>

      <div id={"break-length"} >5</div>
      <div id={"session-length"} >25</div>
      
      <div id={"timer-label"} >Session</div>
      <div id={"time-left"} >25:00</div>

      <button onClick={() => handleClick()} id={"start_stop"}></button>
      <button onClick={() => handleClick()} id={"reset"}></button>
    </div>
  );
}

export default App;
