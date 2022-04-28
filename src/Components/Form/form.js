import React from "react";
import Popup from "./Popup";
import {useState} from 'react'
import '../../App.css' 
import 'react-dropdown/style.css';
import DropdownComp from "./Dropdown";
/*
This component handles the user input to store firefighters. uses backend requests to create new fighters.

Form is contained within the popup component
*/


export const Form = ({userInput, userAge, userWeight, userHeight, userSex, userDeviceLink, onFormAge, onFormHeight, onFormWeight, onFormSex, onDeviceLink,  onFormChange, onFormSubmit})=> {
    
    const handleChange =(event) => {
        onFormChange(event.target.value)
    }

    const handleAge =(event) => {
        onFormAge(event.target.value)
    }

    const handleHeight =(event) => {
        onFormHeight(event.target.value)
    }
    const handleWeight =(event) => {
        onFormWeight(event.target.value)
    }
    const handleDeviceLink =(event) => {
        onDeviceLink(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        onFormSubmit()
        setButtonPopup(false)
    }

    const [buttonPopup, setButtonPopup] = useState(false);
    return(
    <>
        <div id="buttonContainer">
            <button id="button" onClick = {()=> setButtonPopup(true) }>Add Device</button>
        </div>
        <Popup id = "popupWindow" trigger = {buttonPopup} setTrigger = {setButtonPopup}>
        <div id = "popupLabel">Add Device</div>
        <form id = "addPopup" onSubmit ={handleSubmit} >
            <input id = "addinput" type="text" required value = {userInput} onChange={handleChange}name ="name" placeholder="Please enter your name"></input> <br/><br/>
            <input id = "addinput"  type="text"required value = {userAge} onChange={handleAge}name ="age" placeholder="Please enter your age"></input> <br/><br/>
            <input id = "addinput" type="text"required value = {userHeight} onChange={handleHeight}name ="height" placeholder="Please enter your height (inches)"></input> <br/><br/>
            <input id = "addinput"  type="text"required value = {userWeight} onChange={handleWeight}name ="weight" placeholder="Please enter your weight (lbs)"></input> <br/><br/>
            <input id = "addinput"  type="text"required value = {userDeviceLink} onChange={handleDeviceLink}name ="deviceLink" placeholder="Please enter the Device ID"></input> <br/><br/>
            <DropdownComp sex={userSex} onFormSexDrop = {onFormSex}/>
            <input id="submit" type="submit"></input>
        </form>
        </Popup>



    </>)
}