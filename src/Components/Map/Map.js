import React, { useEffect } from "react";
import '../../App.css'
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';




//Number(firefighter.latitude)
//Number(firefighter.longitude)
// attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
// maxZoom: 18,
// id: 'mapbox/streets-v11',
// accessToken: 'pk.eyJ1IjoiYndlaW5lbCIsImEiOiJjbDA4bDcwb3UwNGlhM2ludWJzYW9uZXB3In0.GhmtfldqX0K-7K2ZmYbI3A'

    //   L.tileLayer.mbTiles('../../../maps/maptiler-osm-2017-07-03-v3.6.1-us_delaware.mbtiles', {

    // }).addTo(map);



export const Map = ({Fighter})=> {
    function drawMap() {
        var map = L.map(`map${Fighter.id}`).setView([Number(Fighter.latitude),Number(Fighter.longitude)], 18);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          //attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'pk.eyJ1IjoiYndlaW5lbCIsImEiOiJjbDA4bDcwb3UwNGlhM2ludWJzYW9uZXB3In0.GhmtfldqX0K-7K2ZmYbI3A'
          }).addTo(map);
    
          var marker = L.marker([Number(Fighter.latitude), Number(Fighter.longitude)],{
            color: 'red'
          }).addTo(map);
    }
useEffect(() => {
    //to make marker appear some bug but this works fine
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
    drawMap();
},[])



    return(
        <div className="map" id={Fighter.map} key = {Fighter.id}></div>
    )
}