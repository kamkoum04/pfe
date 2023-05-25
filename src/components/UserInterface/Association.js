import React, { useState, useEffect } from 'react';
import { Input, Modal, Table,  message, Button , Tooltip  } from 'antd';
import { EditOutlined, DeleteOutlined, FileTextOutlined } from '@ant-design/icons';
import axios from 'axios';
import Addlicense from './Addlicense';
import ExportDocuments from './ExportDocuments';

const Associations = ({ userId = 2 }) => {
  const [associations, setAssociations] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [editedAssociation, setEditedAssociation] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [associationId, setAssociationId] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLicenseModalVisible, setIsLicenseModalVisible] = useState(false);

  const fetchAssociations = async () => {
    try {
      const response = await axios.get(`http://localhost:8282/association`, {
        params: {
          userId: userId
        }
      });
      const data = response.data;
      setAssociations(data.associations);
    } catch (error) {
      console.error('Failed to fetch associations:', error);
    }
  };

  const onDeleteAssociation = async (associationId) => {
    try {
      const response = await axios.delete(`http://localhost:8282/association/${associationId}`);
      if (response.status === 200) {
        setIsDeleted(true);
        message.success('Association deleted successfully');
      } else {
        message.error('Failed to delete association');
      }
    } catch (error) {
      console.error('Failed to delete association:', error);
      message.error('Failed to delete association');
    }
  };

  const onEditingAssociation = (record) => {
    setIsEditing(true);
    setEditedAssociation({ ...record, associationId: record.id, userId: record.userId, email: record.email });
  };

  const onUpdateAssociation = async () => {
    try {
      const response = await axios.put(`http://localhost:8282/association`, {
        ...editedAssociation,
        associationId: editedAssociation.associationId,
        userId: 14,
        mail: editedAssociation.email,
      });
      if (response.status === 200) {
        message.success('Association updated successfully');
        setIsEditing(false);
        setEditedAssociation(null);
        fetchAssociations();
      } else {
        message.error('Failed to update association');
      }
    } catch (error) {
      console.error('Failed to update association:', error);
      message.error('Failed to update association');
    }
  };
  const handleLicenseModal = () => {
    setIsLicenseModalVisible(true);
  };

  const onDemandLicence = (associationId) => {
    setIsModalVisible(true);
    setAssociationId(associationId);
    setCurrentStep(0); // Reset the stepper to the first step
  };

  const clearLicenseId = () => {
    localStorage.removeItem('licenseId');
  };

  useEffect(() => {
    fetchAssociations();
  }, [isDeleted, userId]);

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
            <DeleteOutlined onClick={() => onDeleteAssociation(record.id)} style={{ color: 'red', marginLeft: 12 }} />
          </Tooltip>
          <Tooltip title="View License">
            <FileTextOutlined style={{ color: 'green', marginLeft: 12 }} onClick={handleLicenseModal} />
          </Tooltip>
          <Button type="primary" className="text-black" style={{ marginLeft: 12 }} onClick={() => onDemandLicence(record.id)}>
            Demander Licence
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
        onCancel={() => {
          setIsEditing(false);
          setEditedAssociation(null);
        }}
        onOk={onUpdateAssociation}
      >
        <Input value={editedAssociation?.name} onChange={(e) => setEditedAssociation({ ...editedAssociation, name: e.target.value })} />
        <Input
          value={editedAssociation?.phoneNumber}
          onChange={(e) => setEditedAssociation({ ...editedAssociation, phoneNumber: e.target.value })}
        />
        <Input value={editedAssociation?.adress} onChange={(e) => setEditedAssociation({ ...editedAssociation, address: e.target.value })} />
        <Input value={editedAssociation?.email} onChange={(e) => setEditedAssociation({ ...editedAssociation, email: e.target.value })} />
      </Modal>
      <Modal
         title="Licence Details"
         visible={isLicenseModalVisible}
         onCancel={() => setIsLicenseModalVisible(false)}
          // ... autres propriétés du modal
           >
           {/* Contenu du modal de consultation de la licence */}
       </Modal>
      <Modal
        title="Demande de Licence"
        visible={isModalVisible && currentStep === 0}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="next" type="primary" className='text-black' onClick={() => setCurrentStep(1)}>
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
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="finish" type="primary" className='text-black' onClick={() => {
            setIsModalVisible(false);
            clearLicenseId(); // Appel de la fonction pour vider l'élément du stockage local
          }}>
            Finish
          </Button>,
        ]}
        width={600}
      >
        <ExportDocuments licenseId={associationId}  />
      </Modal>
    </div>
  );
};

export default Associations;
