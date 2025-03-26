import React, { useState } from 'react';
import { Wallet, Settings, Grid, Eye } from 'lucide-react';
import { DotsThreeVertical 
} from 'phosphor-react';
import { Link } from 'react-router-dom';
import Layout from "../Components/Layout";

const Settings2 = () => {

  return (
    <Layout>
    <div className="flex bg-gray-100 min-h-screen">
      

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl  text-font-bold mb-5">Settings</h1>


      <div className="flex flex-row items-center bg-white rounded-lg space-x-4 p-6">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-300 border to-purple-400 rounded-full flex items-center justify-center">
          <span className="text-white text-4xl">EG</span>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-gray-600">Organization Logo</p>
          <button className="px-4 py-2 bg-purple-700 text-white rounded-xl hover:bg-purple-700 transition">
            Change Picture
          </button>
        </div>
      </div>
      
    

        {/* Projects Table */}

        <div className="bg-white rounded-xl mt-10 shadow">
          <div className='flex flex-col'>
          <div className="grid grid-cols-3 gap-6 mb-6">
          <div className='mt-7 p-3'>
            <p className="text-gray-700 mb-2">Organization Name</p>
            <p className="w-full rounded-lg text-gray-800">EduTech Global Initiative</p>
          </div> 
          <div className='mt-7'>
            <p className="text-gray-700 mb-2">Organization Email Address</p>
            <p className="w-full rounded-lg text-gray-800">edutechglobal@gmail.com</p>
          </div>
          <div className='mt-7'>
            <p className="text-gray-700 mb-2">Organization Website</p>
            <p className="w-full rounded-lg text-gray-800">www.edutechglobal.com</p>
          </div>
        </div>
        </div>

        <div className="mb-6 p-3">
          <label className="block text-gray-600 mb-2">Organization Description</label>
          <textarea
            className="w-full rounded-lg  h-32"
            value="EduTech Global Initiative is a nonprofit organization focused on bridging the educational divide through technology. Our mission is to empower students in underserved regions by providing access to tech-driven learning resources and skills development programs."
            readOnly
          />
        </div>
          

           
        </div>

        <div className="fixed bottom-4 left-5 flex items-left bg-white p-2 rounded-lg shadow">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs mr-2">
            E
          </div>
          <div className="mr-2">
            <div className="text-sm font-medium">EduTech Global</div>
            <div className="text-xs text-gray-500">@edutechglobal</div>
          </div>
          <button className="ml-2 text-gray-500">
            <DotsThreeVertical size={16} />
          </button>
        </div>
        
      </div>
    </div>
    </Layout>
  );
};

export default Settings2;