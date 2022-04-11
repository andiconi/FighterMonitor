import React from "react";
import {MapComp} from "../Map/MapComp"
import '../../App.css'
import {Link} from "react-router-dom"

export const Card = ({listOfFighters})=> {
    return(
    <div className="cards">
        {listOfFighters.map((fireFighter) => (
          <div className="card" key = {fireFighter.id}>
            <MapComp Fighter={fireFighter}/>
            <div className="card__content" id="card1_content">
              <p>
                Hydration: {fireFighter.hydration}%<br />
                Heartrate: {fireFighter.heartrate} BPM<br />
                Oxygen: {fireFighter.oxygen}%<br />
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
