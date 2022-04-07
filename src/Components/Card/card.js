import React, { useEffect } from "react";
import '../../App.css'
import {Link} from "react-router-dom"
import * as L from 'leaflet';
import 'leaflet-tilelayer-mbtiles-ts';

//Number(firefighter.latitude)
//Number(firefighter.longitude)
// attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
// maxZoom: 18,
// id: 'mapbox/streets-v11',
// accessToken: 'pk.eyJ1IjoiYndlaW5lbCIsImEiOiJjbDA4bDcwb3UwNGlhM2ludWJzYW9uZXB3In0.GhmtfldqX0K-7K2ZmYbI3A'

export const Card = ({listOfFighters})=> {
    function drawMap(firefighter) {
      var map = L.map(`map${firefighter.id}`).setView([39.68014, -75.75125], 13);
      L.tileLayer.mbTiles('../../../maps/maptiler-osm-2017-07-03-v3.6.1-us_delaware.mbtiles', {

    }).addTo(map);
  
    }

  useEffect(() => {
    // const loadMaps = async () => {
    //   const data = await fetch('/api/');
    //   const json = await data.json();
    //   console.log(json);

      
    // }
    // loadMaps();
    listOfFighters.forEach((firefighter) => {
      drawMap(firefighter)
    })
  },[])

    return(
    <div className="cards">
        {listOfFighters.map((fireFighter) => (
          <div className="card" key = {fireFighter.id}>
            <div className="map"  id={fireFighter.map} key = {fireFighter.id}></div>
            <div className="card__content" id="card1_content">
              <p>
                Hydration: {fireFighter.hydration}%<br />
                Heartrate: {fireFighter.heartrate} BPM<br />
                Oxygen: {fireFighter.oxygen}%<br />
                Floor: {fireFighter.floor}
              </p>
            </div>
            <div className="card__info">
              <div>{fireFighter.name}</div>
              <div>
                <Link to = {`${fireFighter.id}`} className="card__link">
                  Expand
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
}
