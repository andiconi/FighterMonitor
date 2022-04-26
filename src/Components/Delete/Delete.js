import React from 'react'
import {maps} from '../Map/MapComp'
import "../../App.css"
export const Delete = ({ id }) => {
    const deleteFighter = () => {
        fetch(`/api/${id}`, {
            method: 'POST',
            body: JSON.stringify({
                id: id
            })
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            console.log(maps)
            maps[id].remove()
            delete maps[id]
            console.log(maps)
        })
    }

    return(
        <>
        <button className = "deleteButton" onClick={deleteFighter}>Delete</button>
        </>
    )
}