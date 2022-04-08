import React, { useEffect } from "react";
import '../../App.css'
import {Link} from "react-router-dom"
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
//import 'leaflet-tilelayer-mbtiles-ts';

//Number(firefighter.latitude)
//Number(firefighter.longitude)
// attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
// maxZoom: 18,
// id: 'mapbox/streets-v11',
// accessToken: 'pk.eyJ1IjoiYndlaW5lbCIsImEiOiJjbDA4bDcwb3UwNGlhM2ludWJzYW9uZXB3In0.GhmtfldqX0K-7K2ZmYbI3A'

    //   L.tileLayer.mbTiles('../../../maps/maptiler-osm-2017-07-03-v3.6.1-us_delaware.mbtiles', {

    // }).addTo(map);

    export function drawMap(firefighter) {
      var map = L.map(`map${firefighter.id}`).setView([Number(firefighter.latitude),Number(firefighter.longitude)], 18);
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        //attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYndlaW5lbCIsImEiOiJjbDA4bDcwb3UwNGlhM2ludWJzYW9uZXB3In0.GhmtfldqX0K-7K2ZmYbI3A'
        }).addTo(map);

        var marker = L.marker([Number(firefighter.latitude), Number(firefighter.longitude)],{
          color: 'red'
        }).addTo(map);
    }

export const Card = ({listOfFighters})=> {


  useEffect(() => {
    //to make marker appear some bug but this works fine
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });





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
