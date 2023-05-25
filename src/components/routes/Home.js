import React from 'react'
import  {Navbar}  from '../Navbar/Navbar'
import {Hero} from '../Hero/Hero'
import Img from "../../assets/3.jpg"


const Home = () => {
  return (
    <div>
      
      <Navbar />
      <Hero
            cName="hero"
            heroImg={Img}
            title="Changer l'avenir"
            text="Gérez votre association en toute simplicité et efficacité."
            btnText="Start"
            url="/login"
            btnClass='show'
          />


    </div>
  )
}

export default Home