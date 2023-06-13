import React ,{ useState } from "react";
import Footer from "../Footer/Footer.js"
import Topbar from "./Topbar";
import Content1 from "./Content";



export function Home() {
    
  
    return (
    <>
    <Topbar/>
    <Content1></Content1>
      
      <div className="bg-blue-gray-50/50">
       <Footer/>
      </div>
      
    </>
  );
}

export default Home;
