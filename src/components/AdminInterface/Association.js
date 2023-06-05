import React, { useState, useEffect } from 'react';
import { Table, Typography, message, Tooltip, Modal } from 'antd';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';

const Association1 = () => {
  const [associations, setAssociations] = useState([]);
  const [isAssociationDeleted, setIsAssociationDeleted] = useState(false);
  const [associationToDelete, setAssociationToDelete] = useState(null);
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);

  useEffect(() => {
    fetchAssociations();
  }, [isAssociationDeleted]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
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
      key: 'adress',
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
          <Tooltip title="Delete Association">
            <DeleteOutlined onClick={() => showDeleteConfirmation(record)} style={{ color: 'red', marginLeft: 12 }} />
          </Tooltip>
        </>
      ),
    },
  ];

  const fetchAssociations = async () => {
    const response = await fetch('http://localhost:8282/association');
    const data = await response.json();
    setAssociations(data.associations);
  };

  const onDeleteAssociation = async (associationId) => {
    const response = await fetch(`http://localhost:8282/association/${associationId}`, {
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
  };

  const showDeleteConfirmation = (association) => {
    setAssociationToDelete(association);
    setIsDeleteConfirmationVisible(true);
  };

  const confirmDeleteAssociation = async () => {
    if (associationToDelete) {
      setIsDeleteConfirmationVisible(false);
      await onDeleteAssociation(associationToDelete.id);
    }
  };

  const cancelDeleteAssociation = () => {
    setAssociationToDelete(null);
    setIsDeleteConfirmationVisible(false);
  };

  return (
    <div>
      <Typography.Title level={4}>Associations</Typography.Title>
      <Table dataSource={associations} columns={columns} />
      <Modal
        title="Confirm Delete"
        visible={isDeleteConfirmationVisible}
        onCancel={cancelDeleteAssociation}
        onOk={confirmDeleteAssociation}
        okText="Confirm"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this association?</p>
      </Modal>
    </div>
  );
};

export default Association1;
