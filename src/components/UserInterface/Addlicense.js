import React, { useState } from 'react';
import { Form, Input, Button, Select ,message } from 'antd';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const StyledForm = styled(Form)`
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
`;

const AddLicense = ({ associationId }) => {
  const [form] = Form.useForm();
  const [members, setMembers] = useState([]);

  const handleSubmit = async (values) => {
    const requestData = {
      associationId: associationId,
      menbresLicenceRequest: members,
      requestTypeId: values.requestTypeId,
      statusId: 1,
    };

    try {
      const response = await axios.post('http://localhost:8282/license', requestData);

      if (response.data.code == 200) {
        message.success('license add  successfully');
        form.resetFields(); // Clear form fields
        setMembers([]); // Clear members array
        const licenseId = response.data.num; // Assurez-vous d'utiliser la clé correcte pour obtenir l'ID de licence de la réponse de l'API
        localStorage.setItem('licenseId', licenseId);
        console.log(members)
      }else if (response.data.code == 201) {
        console.log(response.data.code);
        console.log(associationId, members, values.requestTypeId, values.statusId);
        message.error('license exist');
      } 
      else {
        console.log(response.data.code);
        console.log(associationId, members, values.requestTypeId, values.statusId);
        message.error('license add  failed');
      }
    } catch (error) {
      console.log(error);
      console.log(associationId, members, values.requestTypeId, values.statusId);
    }
  };

  const addMember = () => {
    setMembers([
      ...members,
      {
        cinNumber: '',
        firstname: '',
        lastname: '',
        phoneNumber: '',
        responsibilityId: '',
      },
    ]);
  };

  const updateMemberField = (index, field, value) => {
    const newMembers = [...members];
    const updatedMember = { ...newMembers[index], [field]: value };
    newMembers[index] = updatedMember;
    setMembers(newMembers);
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item label="Request Type" name="requestTypeId">
        <Select placeholder="Select Request Type">
          <Option value="1">Demande de licence</Option>
          <Option value="2" disabled>Renewal of license</Option>
          <Option value="3" disabled>License Cancellation</Option>
        </Select>
      </Form.Item>

     

      <h3>License Members Request:</h3>
      {members.map((member, index) => (
        <div key={index} style={{ display: 'flex', marginBottom: '16px' }}>
          <Form.Item
            name={['members', index, 'cinNumber']}
            style={{ marginRight: '16px' }}
          >
            <Input
              value={member.cinNumber}
              onChange={(e) => updateMemberField(index, 'cinNumber', e.target.value)}
              placeholder="CIN Number"
              required
            />
          </Form.Item>
          <Form.Item
            name={['members', index, 'firstname']}
            style={{ marginRight: '16px' }}
          >
            <Input
              value={member.firstname}
              onChange={(e) => updateMemberField(index, 'firstname', e.target.value)}
              placeholder="First Name"
              required
            />
          </Form.Item>
          <Form.Item
            name={['members', index, 'lastname']}
            style={{ marginRight: '16px' }}
          >
            <Input
              value={member.lastname}
              onChange={(e) => updateMemberField(index, 'lastname', e.target.value)}
              placeholder="Last Name"
              required
            />
          </Form.Item>
          <Form.Item
            name={['members', index, 'phoneNumber']}
            style={{ marginRight: '16px' }}
          >
            <Input
              value={member.phoneNumber}
              onChange={(e) => updateMemberField(index, 'phoneNumber', e.target.value)}
              placeholder="Phone Number"
              required
            />
          </Form.Item>
          <Form.Item name={['members', index, 'responsibilityId']}>
  <Select
    value={member.responsibilityId || undefined} // Set the value to undefined if it is falsy
    onChange={(value) => updateMemberField(index, 'responsibilityId', value)}
    style={{ width: '100%' }}
    placeholder="Select Responsibility"
    required
  >
              <Option value="1">President</Option>
              <Option value="2">Secretary</Option>
              <Option value="3">Treasurer</Option>
              <Option value="4">Event Coordinator</Option>
              <Option value="5">Communication Manager</Option>
              <Option value="6">Technical Officer</Option>
            </Select>
          </Form.Item>
        </div>
      ))}
      <Button icon={<PlusOutlined />} onClick={addMember}>Add Member</Button>

      <br />

      <Button className="bg-blue-300" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddLicense;
