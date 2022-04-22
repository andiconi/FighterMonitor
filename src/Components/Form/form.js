import React from "react";
import Popup from "./Popup";
import {useState} from 'react'
import '../../App.css'

/*
This component handles the user input to store firefighters. uses backend requests to create new fighters.

Form is contained within the popup component
*/


export const Form = ({userInput, userAge, userWeight, userHeight, userSex, onFormAge, onFormHeight, onFormWeight, onFormSex,  onFormChange, onFormSubmit})=> {

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
    const handleSex =(event) => {
        onFormSex(event.target.value)
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
            <button id="button" onClick = {()=> setButtonPopup(true) }>Add Fireman</button>
        </div>
        <Popup id = "popupWindow" trigger = {buttonPopup} setTrigger = {setButtonPopup}>
        <form id = "addPopup" onSubmit ={handleSubmit} >
            <label htmlFor = "name">Name</label>
            <input id = "addinput" type="text" required value = {userInput} onChange={handleChange}name ="name"></input> <br/><br/>

            <label htmlFor = "age">Age</label>
            <input id = "addinput"  type="text"required value = {userAge} onChange={handleAge}name ="age"></input> <br/><br/>

            <label htmlFor = "height">Height (in)</label>
            <input id = "addinput" type="text"required value = {userHeight} onChange={handleHeight}name ="height"></input> <br/><br/>

            <label htmlFor = "weight">Weight (lbs)</label>
            <input id = "addinput"  type="text"required value = {userWeight} onChange={handleWeight}name ="weight"></input> <br/><br/>

            <label htmlFor = "sex">Sex</label>
            <input id = "addinput" type="text"required value = {userSex} onChange={handleSex} name ="sex"></input> <br/><br/>

            <input id="submit" type="submit"></input>
        </form>
        </Popup>



    </>)
}