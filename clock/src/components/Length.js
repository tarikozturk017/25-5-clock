import React from "react"

const TimeController = (props) => {
    const id = props.label.toLowerCase();
    return (
        <div className='time-control'>
            <div id={id + '-label'}>{props.label}</div>
            <button id={id + '-increment'} onClick={props.onClick}><i className="fa fa-angle-up" aria-hidden="true"></i></button>
            <div id={id + '-length'}>{props.length}</div>
            <button id={id + '-decrement'} onClick={props.onClick}><i className="fa fa-angle-down" aria-hidden="true"></i></button>
        </div>
    )
}

export default TimeController;