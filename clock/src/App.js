import React, {useState} from "react"

import Length from "./components/Length"

function App() {
  const [displayTime, setDisplayTime] = useState(25 * 60)
  const [sessionTime, setSessionTime] = useState(25)
  const [breakTime, setBreakTime] = useState(5)

  const formatTime = (time) => {
    let min = Math.floor(time / 60)
    let sec = time % 60
    return ((min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec));
  }

  const changeTime = (time) => {
    console.log(time)
  }

  const handlePause = () => {
    console.log("handle pause clicked!")
  }

  const handleReset = () => {
    setBreakTime(5)
    setSessionTime(25)
    setDisplayTime(25 * 60)
  }

  return (
    <div className="App">
      <div id={"break-label"}>Break Length</div>
      <div id={"session-label"}>Session Length</div>
      
      <Length title={"Break Length"} type="break" time={breakTime} formatTime={formatTime} changeTime={changeTime}/>
      <Length title={"Session Length"} type="session" time={sessionTime} formatTime={formatTime} changeTime={changeTime}/>
      
      <div id={"timer-label"} >Session</div>
      <div id={"time-left"} >{formatTime(displayTime)}</div>

      <button onClick={() => handlePause()} id={"start_stop"}></button>
      <button onClick={() => handleReset()} id={"reset"}></button>
    </div>
  );
}

export default App;
