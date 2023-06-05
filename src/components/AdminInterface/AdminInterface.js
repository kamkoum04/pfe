import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Content from './Content';
import Footer from '../Footer/Footer';

const AdminInterface = () => {
  return (
    <main className="relative h-screen overflow-hidden bg-gray-300 dark:my-new-gris">
      <div className="flex items-start justify-between">
        <Sidebar />
       
        <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
          <Header />
          
          <div className="h-screen pt-2 pb-24 pl-2 pr-2 overflow-auto md:pt-0 md:pr-0 md:pl-0">
            <Content />
            
          </div>
         
        </div>
        
      </div>
     
    </main>
  );
};

export default AdminInterface;
