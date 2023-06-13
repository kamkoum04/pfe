import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import {  message } from 'antd';

export default function InscrireAssociation() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId'); // Get the userId from localStorage

    const data = {
      name: name,
      mail: email,
      adress: address,
      phoneNumber: phoneNumber,
      userId: userId,
    };

    try {
      const response = await fetch("http://localhost:8282/association", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        message.success('Association added successfully');
        setName("");
        setEmail("");
        setAddress("");
        setPhoneNumber("");
      } else {
        console.error("Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
      Register Your Association
      </Typography>
      
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col gap-6">
          <h1>Name</h1>
          <Input
            size="lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <h1>Email</h1>
          <Input
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h1>Adress</h1>
          <Input
            size="lg"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <h1>Phone number</h1>
          <Input
            size="lg"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <Button type="submit" className="mt-6 bg-gray-300" fullWidth>
        Register
        </Button>
      </form>
    </Card>
  );
}
