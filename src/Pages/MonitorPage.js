import React, {useState, useEffect} from 'react'
import {Card} from '../Components/Card/card';
import { Form } from '../Components/Form/form';

/*
This Page is the main page with ll the cards. this is alos where firefighters are updated
*/
export const MonitorPage = ()=> {
    const [fireFighter, setFighter] = useState([])
    const [addFighter, setaddFighter] = useState('')
    const [addAge, setaddAge] = useState('')
    const [addHeight, setaddHeight] = useState('')
    const [addWeight, setaddWeight] = useState('')
    const [addSex, setaddSex] = useState('')
    
    useEffect(()=>{
        getLatestFighters();
        const interval = setInterval(() => {
                  getLatestFighters();
                }, 1000);
                return () => clearInterval(interval);
    },[])


    const handleFormChange =(inputValue) => {
        setaddFighter(inputValue)
    }

    const handleFormChangeAge =(inputValue) => {
        setaddAge(inputValue)
    }

    const handleFormChangeHeight =(inputValue) => {
        setaddHeight(inputValue)
    }
    const handleFormChangeWeight =(inputValue) => {
        setaddWeight(inputValue)
    }
    const handleFormChangeSex =(inputValue) => {
        setaddSex(inputValue)
    }


    const getLatestFighters = () => {
        fetch('/api/').then(response => {
            if(response.ok){
                return response.json()
            }
        }).then(data => {
            setFighter(data);
        })
    }

    const handleFormSubmit = () => {
        fetch('/api/create/', {
            method: 'POST',
            body: JSON.stringify({
                name:addFighter,
                age: addAge,
                height: addHeight,
                weight: addWeight,
                sex: addSex
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
        .then(message => {
            console.log(message)
            setaddFighter('') 
            setaddAge('')
            setaddHeight('')
            setaddWeight('')
            setaddSex('')
            getLatestFighters()
            })
    }


    return(
        <>
     
        <Form userInput={addFighter} onFormChange = {handleFormChange}
        userAge={addAge} onFormAge = {handleFormChangeAge}
        userHeight={addHeight} onFormHeight = {handleFormChangeHeight}
        userWeight={addWeight} onFormWeight = {handleFormChangeWeight}
        userSex={addSex} onFormSex = {handleFormChangeSex}
        
        
        onFormSubmit ={handleFormSubmit}/>

        {fireFighter.length > 0 &&
            <Card listOfFighters={fireFighter}/>
        }
        
        </>
    )
}

