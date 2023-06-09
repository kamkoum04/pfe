import React ,{ useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  
} from "@material-tailwind/react";

import InscrireAssociation from "./InscrireAssociation";
import { Modal } from "antd";
import Association from './Association'


const WelcomePage = () => {
  const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
      setOpenModal(true);
    };
  
    const handleCloseModal = () => {
      setOpenModal(false);
    };
  return (
    <>
 
      <div className="relative flex  content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')] bg-cover bg-center " />

        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12 mt-24">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                
                Your story starts with us.
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
              Welcome to our platform for managing associations and licenses! With our intuitive user interface, you will have a seamless experience managing your associations and licenses.
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <section className="-mt-32 bg-gray-50 px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
           
          </div>
          <div className="mt-32 flex flex-wrap items-center">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
                
              </div>
              <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
              >
               Join our community!              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500">
              Discover the benefits of working with us and become part of a committed community. Our kit is designed to help you get started faster. Take advantage of showcasing your association.
                <br />
               
              </Typography>
              <Button
                type="primary" className='text-black bg-blue-300'
                variant="outlined"
                onClick={handleOpenModal}
              >
                Register Your Association
              </Button>
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12">
              <Card className="shadow-lg shadow-gray-500/10 ">
                <CardHeader className="relative h-56">
                  <img
                    alt="Card Image"
                    src="https://images.pexels.com/photos/6646975/pexels-photo-6646975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 font-bold"
                  >
                    
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                  Manage, simplify, associations, licenses, productivity, user-friendly, optimize.
                  </Typography>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 pt-20 pb-48">
        <div className="container mx-auto bg-gray-200 rounded-3xl ">
       <br/>
        <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
              >
                Manage Your Associations
              </Typography> 
              <Association/>
         
        </div>
      </section>
     
      
      <Modal 
      size="lg" 
      visible={openModal} 
      onCancel={() => handleCloseModal()}
      
      footer={[
        <Button key="finish" type="primary" className='text-black' onClick={() => {
          handleCloseModal();
         
        }}>
          Finish
        </Button>,
      ]}
      >
        <InscrireAssociation />
      </Modal>
    </>
  );
};

export default WelcomePage;