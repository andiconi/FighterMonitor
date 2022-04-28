import React, { useEffect } from "react";
import '../../App.css'
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const markers = {};
export const maps = {};

/*
This component loads the maps from the tile server
*/


export const MapComp = ({Fighter})=> {
    
    function drawMap() {
        var map = L.map(`map${Fighter.id}`).setView([Number(Fighter.latitude),Number(Fighter.longitude)], 18);
        L.tileLayer('http://localhost:8080/styles/osm-bright/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18,
          }).addTo(map);

          maps[Fighter.id] = map;
          var marker;
          markers[Fighter.id] = marker

          markers[Fighter.id] = L.marker([Number(Fighter.latitude), Number(Fighter.longitude)],{
            color: 'red'
          }).addTo(map);
    }

    function updateMap(){
        if(markers[Fighter.id] != undefined){
            markers[Fighter.id].setLatLng(L.latLng(Number(Fighter.latitude), Number(Fighter.longitude))).update();
            maps[Fighter.id].setView(L.latLng(Number(Fighter.latitude), Number(Fighter.longitude)));
        }

    }

//This useEffect creates the maps once on boot to avoid "Map container already initialized" errors
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

//This useEffect updates the markers position when a firefighter is updated
useEffect(() => {
    updateMap();
},[Fighter])

    return(
        <div className="map" id={Fighter.map} key = {Fighter.id}></div>
    )
}