import React from 'react'
import  {Navbar}  from '../Navbar/Navbar'
import {Hero} from '../Hero/Hero'
import Img from "../../assets/2.jpg"


const Service = () => {
  return (
    <div>
      
      <Navbar />
      <Hero
            cName="hero-mid"
            heroImg={Img}
            title="Services"
            
            btnClass='hide'
          />


    </div>
  )
}

export default Service