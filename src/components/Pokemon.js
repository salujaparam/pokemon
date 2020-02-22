import React from 'react'
import '../styles/pokemon.css'

export default function Pokemon(props) {
    return (
            <article className="service">
                <div className="serv">
                    <img src={props.img} alt={props.name} className="crop" />
                    <h4 className="head-four">{props.name}</h4>
                </div>
                 <button>Know more about {props.name}</button>
            </article>
    )
}
