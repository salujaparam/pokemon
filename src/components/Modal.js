import React from 'react'
import '../styles/modal.css'

export default function Modal(props) {
    if(props.show === false){
        return null;
    }
    return (
        <div className="modal">
            <header>
                <h2>{props.name}</h2>
                <p className="close" onClick={props.onClose}>x</p>
            </header>
            <div>
                <img className="modal-image" src={props.data.sprites.back_default} alt={props.name}/>
                <h4 className="height">Height: {props.data.height}</h4>
                <h4 className="weight">Weight: {props.data.weight}</h4>
                <h4 className="abilities">Abilities</h4>
                <ul>
                    {props.data.abilities.map((ability, idx) => {
                        return <li className="ability" key={idx}>{ability.ability.name}</li>
                    })}
                </ul>
                <h4 className="stats">Stats</h4>
                <ul>
                    {props.data.stats.map((stat, idx) => {
                        return <li className="stat" key={idx}>{stat.stat.name}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}
