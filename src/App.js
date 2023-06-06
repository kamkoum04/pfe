import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './components/routes/Home.js';
import Service from './components/routes/Service.js';
import Contact from './components/routes/Contact.js';
import About from './components/routes/About.js';

import Login from './components/routes/Login.js';
import Registre from './components/routes/Registre.js';

import UserInterface from './components/UserInterface/UserInterface.js';
import  Content1  from './components/UserInterface/Content.js';
import  Association  from './components/UserInterface/Association.js';
import Licence  from './components/UserInterface/Licence.js';
import Profile from './components/UserInterface/Profile.js';
import WelcomePage from './components/UserInterface/Welcomepage.js';
import Admininterface from './components/AdminInterface/AdminInterface.js'
import Association1 from './components/AdminInterface/Association.js'
import Dashbord from './components/AdminInterface/Dashbord.js'
import Licence1 from './components/AdminInterface/License.js'
import User from './components/AdminInterface/User.js'






function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/service' element={<Service/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path ='/login' element={<Login/>}/>
          <Route path ='/registre' element={<Registre/>}/>
         
            {/* we want to protect this route   */ }
       
          <Route path='/user' element={<UserInterface/>} >
          <Route path='/user' element={<WelcomePage/>} />
          <Route path='/user/content' element={<Content1/>} />
          <Route path='/user/association' element={<Association/>} />
          <Route path='/user/profile' element={<Profile/>} />
          <Route path='/user/license' element={<Licence/>} />
         </Route>


          <Route path='/admin' element={<Admininterface/>} >
          <Route path='/admin' element={<Dashbord/>} />     
          <Route path='/admin/association' element={<Association1/>} />
          <Route path='/admin/profile' element={<User/>} />
          <Route path='/admin/license' element={<Licence1/>} />
          </Route>

 </Routes>
      
      </div>
    </BrowserRouter>
  );
}

export default App;