import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Input, Modal, message } from 'antd';
import axios from 'axios';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [form] = Form.useForm();
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8282/user/filter')
      .then(response => response.data)
      .then(data => {
        const user = data.users.find(user => user.username === 'mohsen');
        setUserData(user);
        form.setFieldsValue(user);
      });
  }, [form]);
  const handleSave = () => {
    form.validateFields()
      .then(values => {
        const payload = {
          firstname: values.firstname,
          lastname: values.lastname,
          mail: values.email,
          phoneNumber: values.phoneNumber,
          pwd: values.pwd,
          townId: 0, // Update with the appropriate value
          userId: userData.userId, // Assuming userId is available in userData
          userRoleDtos: [
            {
              roleId: 0 // Update with the appropriate value
            }
          ],
          username: values.username
        };
  
        axios.put('http://localhost:8282/user', payload)
          .then(response => {
            if (response.status === 200) {
              setUpdateSuccess(true);
              message.success('Profile updated successfully');
            } else {
              message.error('Failed to update profile');
            }
          })
          .catch(error => {
            message.error('An error occurred while updating profile');
            console.error(error);
          });
      });
  };
  const handlePasswordChange = values => {
    fetch(`http://localhost:8282/user/updatePassword/${userData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: userData.id,
        newPassword: values.newPassword,
        oldPassword: values.oldPassword,
      }),
    }).then(response => {
      if (response.status === 200) {
        setUpdateSuccess(true);
        message.success('Password changed successfully');
        console.log(oldPassword, newPassword, userId);
      } else {
        message.error('Failed to change password');
        console.log(oldPassword, newPassword, userId);
      }
    })
    .catch(error => {
      message.error('An error occurred while changing password');
      console.error(error);
      console.log(oldPassword, newPassword, userId);
    });
  };
  
  const handleChangePassword = () => {
    form.validateFields(['oldPassword', 'newPassword'])
      .then(values => {
        const oldPassword = values.oldPassword;
        const newPassword = values.newPassword;
        const userId = userData.userId;
  
        const payload = {
          id: userId,
          oldPassword,
          newPassword
        };
  
        axios
          .put(`http://localhost:8282/user/updatePassword/${userId}`, payload)
          .then(response => {
            if (response.status === 200) {
              setUpdateSuccess(true);
              message.success('Password changed successfully');
              console.log(oldPassword, newPassword, userId);
            } else {
              message.error('Failed to change password');
              console.log(oldPassword, newPassword, userId);
            }
          })
          .catch(error => {
            message.error('An error occurred while changing password');
            console.error(error);
            console.log(oldPassword, newPassword, userId);
          });
      });
  };
  
  

 

  return (
    <div className="w-400 mx-auto my-20 bg-slate-100">
      {userData ? (
        <Card className="w-96 m-auto mt-5 mb-5">
          <h4>User Info</h4>
          <Form form={form}>
            <Form.Item name="username" label="Username" className="mb-4">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" className="mb-4">
              <Input />
            </Form.Item>
            <Form.Item name="firstname" label="First Name" className="mb-4">
              <Input />
            </Form.Item>
            <Form.Item name="lastname" label="Last Name" className="mb-4">
              <Input />
            </Form.Item>
            <Form.Item name="phoneNumber" label="Phone Number" className="mb-4">
              <Input />
            </Form.Item>
            <Form.Item name="pwd" label="Password" className="mb-4">
              <Input.Password />
            </Form.Item>
          </Form>

          <div className="mb-4">
            <Button type="primary" className="bg-gray-300 text-blue-800" onClick={handleSave}>
              Save
            </Button>
          </div>

          <div>
            <Button
              type="primary"
              className="bg-gray-300 text-blue-800"
              onClick={() => setIsPasswordModalVisible(true)}
            >
              Change Password
            </Button>
          </div>

          <Modal
            title="Change Password"
            visible={isPasswordModalVisible}
            onCancel={() => setIsPasswordModalVisible(false)}
            footer={[
              <Button key="cancel" onClick={() => setIsPasswordModalVisible(false)}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={handleChangePassword}>
                Change Password
              </Button>,
            ]}
          >
            <Form>
              <Form.Item name="oldPassword" label="Old Password" className="mb-4">
                <Input.Password />
              </Form.Item>
              <Form.Item name="newPassword" label="New Password" className="mb-4">
                <Input.Password />
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      ) : null}
    </div>
  );
};

export default ProfilePage;
