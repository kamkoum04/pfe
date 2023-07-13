import React, { useState, useEffect } from 'react';
import { Input, Modal, Table, message, Button, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, FileTextOutlined } from '@ant-design/icons';
import axios from 'axios';
import Addlicense from './Addlicense';
import ExportDocuments from './ExportDocuments';
import LicensePage from './LicensePage';




const Associations = () => {
  const [associations, setAssociations] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [editedAssociation, setEditedAssociation] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [associationId, setAssociationId] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLicenseModalVisible, setIsLicenseModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [associationToDelete, setAssociationToDelete] = useState(null);
   
  const fetchAssociations = async () => {
    const userId = localStorage.getItem('userId'); 

    try {
      const response = await axios.get(`http://localhost:8282/association`, {
        
        params: {
          userId: userId
        }
      });
      const data = response.data;
      console.log(data)
      setAssociations(data.associations);
    } catch (error) {
      console.error('Failed to fetch associations:', error);
    }
  };

  const onDeleteAssociation = (association) => {
    setAssociationToDelete(association);
    setIsDeleteModalVisible(true);
  };

  const confirmDeleteAssociation = async () => {
    const response = await fetch(`http://localhost:8282/association/${associationToDelete.id}`, {
      method: 'DELETE',
    });

    const responseData = await response.json();
    console.log('Response code:', responseData.code);

    switch (responseData.code) {
      case '200':
        message.success('Association deleted successfully');
        fetchAssociations();
        break;
      case '500':
        switch (responseData.message) {
          case 'delete Association failed':
            message.error('An error occurred while deleting association');
            break;
          default:
            message.error('Association has a license');
            break;
        }
        break;
      default:
        console.error(responseData);
        message.error('An error occurred');
        break;
    }
    
    setIsDeleteModalVisible(false);
  };

  const cancelDeleteAssociation = () => {
    setIsDeleteModalVisible(false);
  };

  const onEditingAssociation = (record) => {
    setIsEditing(true);
    setEditedAssociation({ ...record, associationId: record.id, userId: record.userId, email: record.email });
  };

  const onUpdateAssociation = async () => {
    const userId = localStorage.getItem('userId'); // Get the userId from localStorage

    try {
      const response = await fetch(`http://localhost:8282/association`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editedAssociation,
          associationId: editedAssociation.associationId,
          userId:userId ,
          mail: editedAssociation.email,
        }),
      });

      if (response.status === 200) {
        message.success('Association updated successfully');
        setIsEditing(false);
        setEditedAssociation(null);
        fetchAssociations();
      } else if (response.status === 201) {
        const errorData = await response.json();
        message.error('Failed to update association');
        setErrorMessage(errorData.message);
      } else {
        message.error('Failed to update association');
      }
    } catch (error) {
      console.log(error);
      message.error('Failed to update association');
    }
  };

  const handleLicenseModal = (associationId) => {
    setIsLicenseModalVisible(true);
    setAssociationId(associationId);
  };

  const onDemandLicence = (associationId) => {
    setIsModalVisible(true);
    setAssociationId(associationId);
    setCurrentStep(0);
  };

  const clearLicenseId = () => {
    localStorage.removeItem('licenseId');
  };

  useEffect(() => {
    fetchAssociations();
  }, [isDeleted]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Address',
      dataIndex: 'adress',
      key: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Tooltip title="Edit Association">
            <EditOutlined onClick={() => onEditingAssociation(record)} style={{ color: 'blue' }} />
          </Tooltip>
          <Tooltip title="Delete Association">
            <DeleteOutlined onClick={() => onDeleteAssociation(record)} style={{ color: 'red', marginLeft: 12 }} />
          </Tooltip>
          <Tooltip title="View License">
            <FileTextOutlined style={{ color: 'green', marginLeft: 12 }} onClick={() => handleLicenseModal(record.id)}  />
          </Tooltip>
          <Button
            type="primary"
            className="text-black"
            style={{ marginLeft: 12 }}
            onClick={() => onDemandLicence(record.id)}
          >
           Request License
          </Button>
          
        </>
      ),
    },
  ];

  return (
    <div>
      <Table style={{ padding: '20px 50px 14px 50px' }} dataSource={associations} columns={columns} />
      <Modal
        title="Edit Association"
        visible={isEditing}
        okText="Save"
        onCancel={() => setIsEditing(false)}
        footer={[
          <Button
            key="finish"
            type="primary"
            className="text-black"
            onClick={() => {
              onUpdateAssociation();
              setIsEditing(false);
              setEditedAssociation(null);
            }}
          >
            Finish
          </Button>,
        ]}
      >
        <Input
          value={editedAssociation?.name}
          onChange={(e) => setEditedAssociation({ ...editedAssociation, name: e.target.value })}
        />
        <Input
          value={editedAssociation?.phoneNumber}
          onChange={(e) => setEditedAssociation({ ...editedAssociation, phoneNumber: e.target.value })}
        />
        <Input
          value={editedAssociation?.adress}
          onChange={(e) => setEditedAssociation({ ...editedAssociation, adress: e.target.value })}
        />
        <Input
          value={editedAssociation?.email}
          onChange={(e) => setEditedAssociation({ ...editedAssociation, email: e.target.value })}
        />
      </Modal>
      <Modal
        title="Licence Details"
        visible={isLicenseModalVisible}
        onCancel={() => setIsLicenseModalVisible(false)}
        footer={[
          <Button
            key="finish"
            type="primary"
            className="text-black"
            onClick={() => {
              setIsLicenseModalVisible(false);
            }}
          >
            Finish
          </Button>,
        ]}
        width={800}
        height={600}
        
      >
        <LicensePage associationId={associationId}/> 
      </Modal>
      <Modal
        title="Demande de Licence"
        visible={isModalVisible && currentStep === 0}
        footer={[
          <Button
            key="next"
            type="primary"
            className="text-black"
            onClick={() => setCurrentStep(1)}
          >
            Next
          </Button>,
        ]}
        width={1000}
        height={600}
      >
        <Addlicense associationId={associationId} />
      </Modal>
      <Modal
        title="Export Documents"
        visible={isModalVisible && currentStep === 1}
        footer={[
          <Button
            key="finish"
            type="primary"
            className="text-black"
            onClick={() => {
              setIsModalVisible(false);
              clearLicenseId();
            }}
          >
            Finish
          </Button>,
        ]}
        width={600}
      >
        <ExportDocuments  />
      </Modal>
      <Modal
        title="Confirm Association Deletion"
        visible={isDeleteModalVisible}
        onCancel={cancelDeleteAssociation}
        footer={[
          <Button key="cancel" onClick={cancelDeleteAssociation}>
            Cancel
          </Button>,
          <Button key="delete" type="danger" onClick={confirmDeleteAssociation} className='hover:bg-red-700'>
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete the association {associationToDelete?.name}?</p>
      </Modal>
    </div>
  );
};

export default Associations;
