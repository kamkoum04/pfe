import React from 'react'
import "./hero.css"

export const Hero = (props) => {
  return (
    <div className={props.cName}>
      <img src={props.heroImg} alt='background' >
        
      </img>
      <div className='hero-text'>
        <h1>{props.title}</h1>
        <p>{props.text} </p>
        <a href={props.url} className={props.btnClass}>
          {props.btnText}
          

        </a>

      </div>


    </div>
  )
}
