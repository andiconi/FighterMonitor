import React, {useState, useEffect} from 'react'
import './Show.css';
import {FullMap} from '../Components/Map/FullMap'
import {
    useParams,
    Link
  } from 'react-router-dom'

export const Show = () => {
    const{id} = useParams()
    const [fighter, setfighter] = useState([])

    // useEffect(()=> {
    //     fetch(`/api/${id}`).then(response => response.json()).then(data => setfighter(data))
    // }, [id])

    useEffect(()=>{
      const getLatestFighters = () => {
        fetch(`/api/${id}`).then(response => {
            if(response.ok){
                return response.json()
            }
        }).then(data => setfighter(data))
    }

      getLatestFighters();
      const interval = setInterval(() => {
                getLatestFighters();
              }, 1000);
              return () => clearInterval(interval);
    },[id])


    return(
        <div>
          {fighter.length > 0 && fighter.map(data => 
            <div className="fullCard" key = {data.id + 1}>
              <div className="fullCardMap" id="fullMap" key = {data.id + 3}>
              <FullMap Fighter={data}/>
              </div>
              <div className="fullCard__content" id="fullcard1_content" key = {data.id}>
              <p>
                {data.name}<br />
                Hydration: {data.hydration}%<br />
                Heartrate: {data.heartrate} BPM <br />
                Oxygen: {data.oxygen}% <br />
                Floor: {data.floor} <br />
                Latitude: {data.latitude} <br />
                Longitude: {data.longitude} <br />

              </p>
            </div>
                <Link to = {`/`} id="Back" key = {data.id + 2}>
                  Back
                </Link>
           
          </div>
          )}
        </div>
    )

}

