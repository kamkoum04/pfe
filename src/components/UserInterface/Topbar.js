import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { Typography } from "@material-tailwind/react";
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for the modal

export default function Topbar() {
  const history = useNavigate();
  const [modalOpen, setModalOpen] = useState(false); // State for managing the modal

  const handleLogout = () => {
    const username = "sayf"; // Replace with the actual username or retrieve it dynamically
    axios.post(`http://localhost:8282/auth/logout/${username}`)
      .then(response => {
        // Handle successful logout
        console.log(response.data);
        history('/'); // Redirect to the homepage
      })
      .catch(error => {
        // Handle logout error
        console.error(error);
      });
  };

  const openModal = () => {
    setModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setModalOpen(false); // Close the modal
  };

  return (
    <div>
      <nav className="bg-white shadow">
        <div className="px-8 mx-auto max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to={"/user"}><Typography>EasyAsso</Typography></Link>
              
            </div>
            <div className="block">
              <div className="flex items-center ml-4 md:ml-6">
                <div className="relative ml-3">
                  <div className="relative inline-block text-left">
                    <div>
                    <Link to={"/user/profile"}>
                      <button
                        type="button"
                        className="flex items-center justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                        id="user-button"
                        onClick={openModal} // Open the modal on button click
                      >
                        <IoPersonSharp className="text-gray-800" size={20} />
                      </button>
                      </Link>
                      
                    </div>
                    
                  </div>
                </div>
                <div className="relative ml-3">
                  <div className="relative inline-block text-left">
                    <div>
                      
                      <button
                        type="button"
                        className="flex items-center justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                        id="logout-button"
                        onClick={handleLogout} 
                      >
                        <RiLogoutBoxLine className="text-gray-800" size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
