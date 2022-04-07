import React, {useState, useEffect} from 'react'
import './Show.css';
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
            
            
            <div className="fullCard">
                <Link to = {`/`} id="Back">
                  Back
                </Link>
            <div className="fullMap" ></div>
            <div className="fullCard__content" id="fullcard1_content">
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
          </div>
            
            
            
            
            
            )}
        </div>
    )

}

