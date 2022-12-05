// import React, {useState} from "react"

// import Length from "./components/Length"
// import "./style.css"

// function App() {
//   const [displayTime, setDisplayTime] = useState(25 * 60)
//   const [sessionTime, setSessionTime] = useState(25 * 60)
//   const [breakTime, setBreakTime] = useState(5 * 60)
//   const [timerOn, setTimerOn] = useState(false)
//   const [onBreak, setOnBreak] = useState(false)

//   const formatTime = (time) => {
//     let min = Math.floor(time / 60)
//     let sec = time % 60
//     return ((min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec));
//   }

//   const changeTime = (amount, type) => {
//     if (type === "break"){
//       if(breakTime <= 60 && amount < 0) return
//       setBreakTime((prevTime) => prevTime+amount)
//     }
//     else if (type === "session"){
//       if(sessionTime <= 60 && amount < 0) return
//       setSessionTime((prevTime) => prevTime+amount)
//       if(!timerOn) {
//         setDisplayTime(sessionTime + amount)
//       }
//     }
//   }

//   const handleTime = () => {
//     let sec = 1000; // 1000 ms = 1 sec
//     let date = new Date().getTime()
//     let nextDate = new Date().getTime() + sec
//     let onBreakVar = onBreak
//     if(!timerOn) {
//       let interval = setInterval(() => {
//         date = new Date().getTime()
//         if(date > nextDate) {
//           setDisplayTime(prevTime => {
//             return prevTime - 1
//           })
//           nextDate += sec
//         }
//       }, 30) // update every 30 ms
//       localStorage.clear()
//       localStorage.setItem('interval-id', interval)
//     }

//     if (timerOn) {
//       clearInterval(localStorage.getItem("interval-id"))
//     }
//     setTimerOn(!timerOn)
//   }

//   const resetTime = () => {
//     setDisplayTime(25 * 60)
//     breakTime(5 * 60)
//     setSessionTime(25 * 60)
//   }

//   const handleReset = () => {
//     setBreakTime(5)
//     setSessionTime(25)
//     setDisplayTime(25 * 60)
//   }

//   return (
//     <div className="App">
//       <h1>Pomodoro Clock</h1>
//       <div className="dual-container">
//         <Length title={"Break Length"} type="break" time={breakTime} formatTime={formatTime} changeTime={changeTime}/>
//         <Length title={"Session Length"} type="session" time={sessionTime} formatTime={formatTime} changeTime={changeTime}/>
//       </div>
//       <div id={"timer-label"} >Session</div>
//       <div id={"time-left"} >{formatTime(displayTime)}</div>

//       <button onClick={() => handleTime()} id={"start_stop"}>Start/Stop</button>
//       <button onClick={() => handleReset()} id={"reset"}>Reset</button>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import "./style.css"

const SESSION = {
    sessionLength: 25,
    breakLength: 5,
    activity: 'Session',
    current: 1500,
    timerOn: false
}

let counter;

const mmssFormat = (seconds) => {
    return (seconds < 600 ? '0' : '') + Math.floor(seconds / 60) + ':' 
    + (seconds % 60 < 10 ? '0' : '') + seconds % 60;
}

const TimeController = (props) => {
    const id = props.label.toLowerCase();
    return (
        <div className='time-control'>
            <div id={id + '-label'}>{props.label}</div>
            <button id={id + '-increment'} onClick={props.handleClick}><i className="fa fa-angle-up" aria-hidden="true"></i></button>
            <div id={id + '-length'}>{props.length}</div>
            <button id={id + '-decrement'} onClick={props.handleClick}><i className="fa fa-angle-down" aria-hidden="true"></i></button>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionLength: 25,
            breakLength: 5,
            activity: 'Session',
            current: 1500,
            timerOn: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.toggleTimer = this.toggleTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
    }

    handleClick(e) {
        let newBreak, newSession;
        switch(e.target.id || e.target.parentElement.id){
            case 'break-increment':
                newBreak = this.state.breakLength >= 60 ? 60 : this.state.breakLength + 1;
                this.setState(state => ({
                    breakLength: newBreak,
                    current: state.activity === 'Break' ? newBreak * 60 : state.current,
                }));
                break;
            case 'break-decrement':
                newBreak = this.state.breakLength <= 1 ? 1 : this.state.breakLength - 1;
                this.setState(state => ({
                    breakLength: newBreak,
                    current: state.activity === 'Break' ? newBreak * 60 : state.current,
                }));
                break;
            case 'session-increment':
                newSession = this.state.sessionLength >= 60 ? 60 : this.state.sessionLength + 1;
                this.setState(state => ({
                    sessionLength: newSession,
                    current: state.activity === 'Session' ? newSession * 60 : state.current,
                }));
                break;
            case 'session-decrement':
                newSession = this.state.sessionLength <= 1 ? 1 : this.state.sessionLength - 1;
                this.setState(state => ({
                    sessionLength: newSession,
                    current: state.activity === 'Session' ? newSession * 60 : state.current,
                }));
                break;
              default:
                return this.state
        }
    }

    toggleTimer() {
        if(this.state.timerOn){
            document.getElementById('start_stop').innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
            clearInterval(counter);
            this.setState({
                timerOn: false
            });
        }
        else{
            document.getElementById('start_stop').innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
            this.setState({
                timerOn: true
            });

            counter = setInterval(() => {
                if(this.state.current <= 0){
                    this.setState(state => ({
                        activity: state.activity === 'Session' ? 'Break' : 'Session',
                        current: (state.activity === 'Session' ? state.breakLength : state.sessionLength) * 60
                    }));
                    this.beeper.play();
                }
                else{
                    this.setState(state => ({
                        current: state.current - 1
                    }));
                }
            }, 1000);
        }
    }

    resetTimer() {
        this.beeper.pause();
        this.beeper.currentTime = 0;
        document.getElementById('start_stop').innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
        clearInterval(counter);
        this.setState(SESSION);
    }

    render() {
        return (
            <div id="wrapper">
                <div id="title">25 + 5 Clock</div>
                <TimeController label={'Break'} length={this.state.breakLength} handleClick={this.handleClick} />
                <TimeController label={'Session'} length={this.state.sessionLength} handleClick={this.handleClick} />
                <div id="timer-wrapper">
                    <div id="timer-label">{this.state.activity}</div>
                    <div id="time-left">{mmssFormat(this.state.current)}</div>
                </div>
                <button id="start_stop" onClick={this.toggleTimer}><i className="fa fa-play" aria-hidden="true"></i></button>
                <button id="reset" onClick={this.resetTimer}><i className="fa fa-refresh" aria-hidden="true"></i></button>
                <audio id="beep" preload="auto" ref={(audio) => {this.beeper = audio}} src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
            </div>
        )
    }
}

export default App;