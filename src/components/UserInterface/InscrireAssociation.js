import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

export default function InscrireAssociation() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      mail: email,
      adress: address,
      phoneNumber: phoneNumber,
      userId: 14,
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
        alert("Inscription réussie !");
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
        Inscrire une association
      </Typography>
      
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col gap-6">
          <h1>Nom</h1>
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
          <h1>Adresse</h1>
          <Input
            size="lg"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <h1>Numéro de téléphone</h1>
          <Input
            size="lg"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <Button type="submit" className="mt-6 bg-gray-300" fullWidth>
          S'inscrire
        </Button>
      </form>
    </Card>
  );
}
