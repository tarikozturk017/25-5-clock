import React from "react"

const Length = ({title, type, time, formatTime, changeTime}) => {
    return (    
        <div>
            <h3 id={type + "-label"}>{title}</h3>
            <button onClick={() => changeTime(-60)} id={type + "-decrement"}></button>
            <h3 className="time-sets" id={type + "-length"}>{(time)}</h3>
            <button onClick={() => changeTime(60)} id={type + "-increment"}></button>
        </div>
    )
} 

export default Length