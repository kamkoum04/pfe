import React ,{ useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  
  Input,
  Textarea,
} from "@material-tailwind/react";
import { Navbar } from "../Navbar/Navbar";
import InscrireAssociation from "./InscrireAssociation";
import { Modal } from "antd";
import Association from './Association'
import Footer from "../Footer/Footer.js"
import Topbar from "./Topbar";
import Content1 from "./Content";



export function Home() {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
      setOpenModal(true);
    };
  
    const handleCloseModal = () => {
      setOpenModal(false);
    };
  
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
