import React from 'react'
import  {Navbar}  from '../Navbar/Navbar'
import {Hero} from '../Hero/Hero'
import Img from "../../assets/4.jpg"


const About = () => {
  return (
    <div>
      
      <Navbar />
      <Hero
            cName="hero-mid"
            heroImg={Img}
            title="About"
            
            btnClass='hide'
          />
          


    </div>
  )
}

export default About