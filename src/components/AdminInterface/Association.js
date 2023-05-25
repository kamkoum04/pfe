import React, { useState, useEffect } from 'react';
import { Input, Modal, Table, Typography, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Association1 = () => {
  const [associations, setAssociations] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [editedAssociation, setEditedAssociation] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    const fetchAssociations = async () => {
      const response = await fetch('http://localhost:8282/association');
      const data = await response.json();
      setAssociations(data.associations);
    };

    fetchAssociations();
  }, [isDeleted]);

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
          <EditOutlined onClick={()=>{
            onEditingAssociation(record);
          }}
          style={{ color: 'blue' }}/>
          <DeleteOutlined
            onClick={() => onDeleteAssociation(record.id)}
            style={{ color: 'red', marginLeft: 12 }}
          />
        </>
      ),
    },
  ];

  const onDeleteAssociation = async (associationId) => {
    const response = await fetch(`http://localhost:8282/association/${associationId}`, {
      method: 'DELETE',
    });

    if (response.status === 200) {
      setIsDeleted(true);
      message.success('Association deleted successfully');
    } else {
      message.error('Failed to delete association');
    }
  };

  const onEditingAssociation = (record) => {
    setIsEditing(true);
    setEditedAssociation({ ...record, associationId: record.id, userId: record.userId, email: record.email });
  };
  
  const fetchAssociations = async () => {
    const response = await fetch('http://localhost:8282/association');
    const data = await response.json();
    setAssociations(data.associations);
  };
  
  const onUpdateAssociation = async () => {
    try {
      const response = await fetch(`http://localhost:8282/association`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editedAssociation,
          associationId: editedAssociation.associationId,
          userId: 2,
          mail: editedAssociation.email,
        }),
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
      console.log(error);
      message.error('Failed to update association');
    }
  };
  

  return (
    <div>
      <Typography.Title level={4}>Associations</Typography.Title>
      <Table dataSource={associations} columns={columns} />
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
  <Input value={editedAssociation?.phoneNumber} onChange={(e) => setEditedAssociation({ ...editedAssociation, phoneNumber: e.target.value })} />
  <Input value={editedAssociation?.adress} onChange={(e) => setEditedAssociation({ ...editedAssociation, adress: e.target.value })} />
  <Input value={editedAssociation?.email} onChange={(e) => setEditedAssociation({ ...editedAssociation, email: e.target.value })} />
</Modal>
    </div>
  );
}

export default Association1