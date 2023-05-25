import React from 'react'

import { HomeOutlined, UserOutlined, AppstoreOutlined, ProfileOutlined, LogoutOutlined ,BarChartOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div class="relative hidden h-screen my-4 ml-4 shadow-lg lg:block w-80">
      <div class="h-full bg-white rounded-2xl dark:bg-gray-800">
        <div class="flex items-center justify-center pt-6">
        </div>
        <nav class="mt-6">
          <div>
          
          <Link class="flex items-center justify-start w-full p-4 my-2 font-thin text-green-500 uppercase transition-colors duration-200 border-r-4 border-green-500 bg-gradient-to-r from-white to-blue-100 dark:from-gray-700 dark:to-gray-800" to="/"> 
              <HomeOutlined/>
              <span class="mx-4 text-sm font-normal text-slate-300"> Acceuil </span>
            </Link>
          <Link class="flex items-center justify-start w-full p-4 my-2 font-thin text-green-500 uppercase transition-colors duration-200 border-r-4 border-green-500 bg-gradient-to-r from-white to-blue-100 dark:from-gray-700 dark:to-gray-800" to="/admin"> 
          <BarChartOutlined />
              <span class="mx-4 text-sm font-normal text-slate-300"> Dashbord </span>
            </Link>
            
            <Link class="flex items-center justify-start w-full p-4 my-2 font-thin text-green-500 uppercase transition-colors duration-200 border-r-4 border-green-500 bg-gradient-to-r from-white to-blue-100 dark:from-gray-700 dark:to-gray-800" to="/admin/association"> 
              <AppstoreOutlined/>
              <span class="mx-4 text-sm font-normal text-slate-300"> Associations </span>
            </Link>
            <Link class="flex items-center justify-start w-full p-4 my-2 font-thin text-green-500 uppercase transition-colors duration-200 border-r-4 border-green-500 bg-gradient-to-r from-white to-blue-100 dark:from-gray-700 dark:to-gray-800" to="/admin/license"> 
              <ProfileOutlined/>
              <span class="mx-4 text-sm font-normal text-slate-300"> License </span>
            </Link>
            <Link class="flex items-center justify-start w-full p-4 my-2 font-thin text-green-500 uppercase transition-colors duration-200 border-r-4 border-green-500 bg-gradient-to-r from-white to-blue-100 dark:from-gray-700 dark:to-gray-800" to="/admin/profile"> 
              <UserOutlined/>
              <span class="mx-4 text-sm font-normal text-slate-300"> Utilisateurs </span>
            </Link>
            <Link class="flex items-center justify-start w-full p-4 my-2 font-thin text-green-500 uppercase transition-colors duration-200 border-r-4 border-green-500 bg-gradient-to-r from-white to-blue-100 dark:from-gray-700 dark:to-gray-800" to="#">
              <LogoutOutlined/>
              <span class="mx-4 text-sm font-normal text-slate-300"> Déconnection </span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar