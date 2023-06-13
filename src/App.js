import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/routes/Home";
import Service from "./components/routes/Service";
import Contact from "./components/routes/Contact";
import About from "./components/routes/About";
import Login from "./components/routes/Login";
import Registre from "./components/routes/Registre";
import UserInterface from "./components/UserInterface/UserInterface";
import Content1 from "./components/UserInterface/Content";
import Association from "./components/UserInterface/Association";
import Licence from "./components/UserInterface/Licence";
import Profile from "./components/UserInterface/Profile";
import WelcomePage from "./components/UserInterface/Welcomepage";
import AdminInterface from "./components/AdminInterface/AdminInterface";
import Association1 from "./components/AdminInterface/Association";
import Dashbord from "./components/AdminInterface/Dashbord";
import Licence1 from "./components/AdminInterface/License";
import User from "./components/AdminInterface/User";
import RequireAuth from "./components/routes/RequireAuth";
import RequireAuthAdmin from "./components/routes/RequireAuthAdmin";
import RequireAuthlogin from "./components/routes/RequireAuthlogin";
import {P404} from "./components/routes/P404";

function App() {
  return (
    <Routes>
      <Route element={<RequireAuthlogin  />}>
       <Route path="/" element={<Login />} />
      </Route>
      
      <Route path="/about" element={<About />} />
      <Route path="/service" element={<Service />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/registre" element={<Registre />} />
      <Route path="/unauthorized" element={<P404/>} />

      {/* Protected user routes */}
      <Route element={<RequireAuth  />}>
        <Route path="/user" element={<UserInterface />}>
          <Route index element={<WelcomePage />} />
          <Route path="content" element={<Content1 />} />
          <Route path="association" element={<Association />} />
          <Route path="profile" element={<Profile />} />
          <Route path="license" element={<Licence />} />
        </Route>
      </Route>

      {/* Protected admin routes */}
      <Route element={<RequireAuthAdmin  />}>
        <Route path="/admin" element={<AdminInterface />}>
          <Route index element={<Dashbord />} />
          <Route path="association" element={<Association1 />} />
          <Route path="profile" element={<User />} />
          <Route path="license" element={<Licence1 />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
