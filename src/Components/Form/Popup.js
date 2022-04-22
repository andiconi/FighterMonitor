import React from 'react'
import './Popup.css'

/*
This component creates a popup on screen to add firefighters
*/
function Popup(props) {
    return (props.trigger) ? (
        <div className= "popup">
            <div className= "popup-inner">
            <button className="close-btn" onClick = {()=> props.setTrigger(false)}>Cancel</button>
            {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup