import React, { useState, useEffect } from 'react';
import { message, Modal, Input } from 'antd';

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');



  useEffect(() => {
    fetch('http://localhost:8282/user/filter')
      .then(response => response.json())
      .then(data => {
        const user = data.users.find(user => user.username === 'hamza');
        if (user) {
          setUserData(user);
        }
      });
  }, []);

  const setUserData = (user) => {
    setUsername(user.username || '');
    setFirstName(user.firstname || '');
    setLastName(user.lastname || '');
    setEmail(user.email || '');
    setPhoneNumber(user.phoneNumber || '');
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    const data = {
      firstname: firstName,
      lastname: lastName,
      mail: email,
      phoneNumber: phoneNumber,
      pwd: '',
      townId: 0,
      userId: 2,
      userRoleDtos: [
        {
          roleId: 2,
        },
      ],
      username: username,
    };
  
    console.log('Request Payload:', data);
  
    fetch('http://localhost:8282/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          message.success('Modifications saved successfully');
        } else {
          message.error('Failed to save modifications');
        }
        return response.json();
      })
      .then((responseData) => {
        console.log('Response Data:', responseData);
      })
      .catch((error) => {
        console.error(error);
        message.error('An error occurred');
      });
  };
  const handlePasswordModalOpen = () => {
    setShowPasswordModal(true);
  };
  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
  };
  const handlePasswordUpdate = () => {
    const data = {
      id: 2,
      newPassword: newPassword,
      oldPassword: oldPassword,
    };
  
    console.log('Request Payload:', data);
  
    fetch('http://localhost:8282/user/updatePassword/2', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Failed to update password');
        }
      })
      .then((responseData) => {
        console.log('Response Data:', responseData);
        message.success(responseData.message); // Display the success message from the response data
        // Clear password form fields
        setOldPassword('');
        setNewPassword('');
      })
      .catch((error) => {
        console.error(error);
        message.error(
          'An error occurred',
          () => {}, // Empty callback to remove the default close button
          { style: { background: 'red' } } // Set the background color of the error message to red
        );
      });
  };

  
  
  
  
  
  
  
  
  
  
  

  return (
    <section className="py-3">
      <div className="container px-4 mx-auto">
        <div className="p-8 bg-gray-500 rounded-xl">
          <div className="flex flex-wrap items-center justify-between -mx-4 mb-8 pb-6 border-b border-gray-400 border-opacity-20">
            <div className="w-full sm:w-auto px-4 mb-6 sm:mb-0">
              <h4 className="text-2xl font-bold tracking-wide text-white mb-1">Personal info</h4>
            </div>
            <div className="w-full sm:w-auto px-4">
              <div>
                <button
                  className="inline-block py-2 px-4 text-xs text-center font-semibold leading-normal text-blue-50 bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200"
                  onClick={handleSubmit}
                >
                  Save
                </button>
                <button
                  className="inline-block py-2 px-4 ml-2 text-xs text-center font-semibold leading-normal text-blue-50 bg-green-500 hover:bg-green-600 rounded-lg transition duration-200"
                  onClick={handlePasswordModalOpen}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
          <form>
          <div className="flex flex-wrap items-center -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20">
          <div className="w-full sm:w-1/3 px-4 mb-4 sm:mb-0">
            <span className="text-sm font-medium text-gray-100">Username</span>
          </div>
          <div className="w-full sm:w-2/3 px-4">
            <div className="max-w-xl">
              <input
                className="block py-4 px-3 w-full text-sm text-gray-50 placeholder-gray-50 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-green-500 rounded-lg"
                id="formInput1"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20">
          <div className="w-full sm:w-1/3 px-4 mb-4 sm:mb-0">
            <span className="text-sm font-medium text-gray-100">Name</span>
          </div>
          <div className="w-full sm:w-2/3 px-4">
            <div className="max-w-xl">
              <div className="flex flex-wrap items-center -mx-3">
                <div className="w-full sm:w-1/2 px-3 mb-3 sm:mb-0">
                  <input
                    className="block py-4 px-3 w-full text-sm text-gray-50 placeholder-gray-50 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-green-500 rounded-lg"
                    id="formInput2"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="w-full sm:w-1/2 px-3">
                  <input
                    className="block py-4 px-3 w-full text-sm text-gray-50 placeholder-gray-50 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-green-500 rounded-lg"
                    id="formInput3"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20">
          <div className="w-full sm:w-1/3 px-4 mb-4 sm:mb-0">
            <span className="text-sm font-medium text-gray-100">Email address</span>
          </div>
          <div className="w-full sm:w-2/3 px-4">
            <div className="max-w-xl">
              <input
                className="block py-4 px-3 w-full text-sm text-gray-50 placeholder-gray-50 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-green-500 rounded-lg"
                id="formInput4"
                type="text"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center -mx-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20">
          <div className="w-full sm:w-1/3 px-4 mb-4 sm:mb-0">
            <span className="text-sm font-medium text-gray-100">Phone Number</span>
          </div>
          <div className="w-full sm:w-2/3 px-4">
            <div className="max-w-xl">
              <input
                className="block py-4 px-3 w-full text-sm text-gray-50 placeholder-gray-50 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-green-500 rounded-lg"
                id="formInput5"
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
        </div>
          </form>
        </div>
      </div>
      <Modal
        title="Change Password"
        visible={showPasswordModal}
        onOk={handlePasswordUpdate}
        onCancel={handlePasswordModalClose}
      >
        <Input.Password
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          style={{ marginBottom: '10px' }}
          required
        />
        <Input.Password
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </Modal>
    </section>
  );
};

export default ProfilePage;
