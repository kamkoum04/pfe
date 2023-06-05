import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import Img from "../../assets/6.jpg";
import { Link } from 'react-router-dom';
import { message } from 'antd';

const Registre = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    townId: 0,
  });

  const history = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      firstname: formData.firstName,
      lastname: formData.lastName,
      mail: formData.email,
      phoneNumber: formData.phoneNumber,
      pwd: formData.password,
      townId: Number(formData.townId), 
      userId: 0,
      userRoleDtos: [
        {
          roleId: 2, 
        }
      ],
      username: formData.username,
    };

    fetch('http://localhost:8282/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data as needed
        console.log(data);

        message.success('Registration successful');
        setTimeout(() => {
          history('/login');
        }, 1000); // Redirect to login page after 1 second
      })
      .catch(error => {
        // Handle the error
        console.error(error);
      });
  };

  
  return (
    <div className="flex flex-wrap w-full">
      <Navbar />
      <div className="flex flex-col w-full md:w-1/2">
        <div className="flex flex-col justify-center px-6 pt-28 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
          <p className="text-3xl text-center">Create a new account</p>
          
          
          {successMessage && (
            <div className="flex justify-center mt-8">
              <span className="text-green-600">{successMessage}</span>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-2">
              <div className="relative">
                <input
                  type="text"
                  id="create-account-pseudo"
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange} required
                />
              </div>
            </div>
            <div className="flex gap-4 mb-2">
              <div className="relative">
                <input
                  type="text"
                  id="create-account-first-name"
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange} required
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="create-account-last-name"
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}  required
                />
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <div className="relative">
                <input
                  type="text"
                  id="create-account-email"
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange} required
                />
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <div className="relative">
                <input
                  type="password"
                  id="create-account-password"
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange} required
                />
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <div className="relative">
                <input
                  type="text"
                  id="create-account-phone"
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="phoneNumber"
                  placeholder="Phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange} required
                />
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <div className="relative">
              <select
                  id="create-account-town"
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="townId"
                  value={formData.townId}
                  onChange={handleChange} required
                >
                  <option value="">Select Town</option>
                  <option value="1">Tunis</option>
                  <option value="2">Ben arous</option>
                  <option value="3">Ariana</option>
                  <option value="4">Manouba</option>
                  <option value="5">Nabeul</option>
                  <option value="6">Bizerte</option>
                  <option value="7">Zaghouen</option>
                  <option value="8">Beja</option>
                  <option value="9">Jandouba</option>
                  <option value="10">Kairouen</option>
                  <option value="11">Sousse</option>
                  <option value="12">Monastir</option>
                  <option value="13">Mahdia</option>
                  <option value="14">Sfax</option>
                  <option value="15">Gasrine</option>
                  <option value="16">Sidi bouzid</option>
                  <option value="17">Sidi bouzid</option>
                  <option value="18">Mednine</option>
                  <option value="19">Mednine</option>
                  <option value="20">Tozeur</option>
                  <option value="21">Gbeli</option>
                  <option value="22">Gafsa</option>
                  <option value="23">Seliana</option>
                  <option value="24">Kef</option>

                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
            <div className="flex w-full my-4">
              <button
                type="submit"
                className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-black shadow-md hover:text-black hover:bg-white focus:outline-none focus:ring-2"
              >
                <span className="w-full">Register</span>
              </button>
            </div>
          </form>
          <div className="pt-12 pb-12 text-center">
            <p>
              Already have an account?
              <Link to="/login" className="font-semibold underline">
                Sign in.
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/2 shadow-2xl">
        <img className="hidden object-cover w-full h-screen md:block" src={Img} alt="Background" />
      </div>
    </div>
  );
};

export default Registre;
