import React, { useState, useEffect } from 'react';
import { Table, Typography, Modal, Button , Input } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const License1 = () => {
  const [licenses, setLicenses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    async function fetchLicenses() {
      const response = await axios.get('http://localhost:8282/license');
      setLicenses(response.data.licences);
    }
    fetchLicenses();
  }, []);

  const handleAccept = async () => {
    try {
      const response = await axios.put('http://localhost:8282/license/state', {
        licenceId: selectedLicense.id,
        stateId: 2,
        comment: comment,
      });
      const updatedLicenses = licenses.map((license) => {
        if (license.id === selectedLicense.id) {
          return {
            ...license,
            status: { id: 2, label: 'Accepté' },
          };
        }
        return license;
      });
      setLicenses(updatedLicenses);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsModalVisible(false);
    }
  };

  const handleReject = async () => {
    try {
      const response = await axios.put('http://localhost:8282/license/state', {
        licenceId: selectedLicense.id,
        stateId: 3,
        comment: comment,
      });
      // Update license status in licenses array
      const updatedLicenses = licenses.map(license => {
        if (license.id === selectedLicense.id) {
          license.status.label = "Refusé";
        }
        return license;
      });
      setLicenses(updatedLicenses);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsModalVisible(false);
    }
  };

  const columns = [
    {
      title: 'License ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Association',
      dataIndex: 'association',
      key: 'association',
      render: (association) => association.name,
    },
    {
      title: 'User',
      dataIndex: 'association',
      key: 'user',
      render: (association) => association.user.username,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => status.label,
    },
    {
      title: 'Request Type',
      dataIndex: 'requestType',
      key: 'requestType',
      render: (requestType) => requestType.label,
    },
    {
      title: 'Members License',
      dataIndex: 'menbersLicence',
      key: 'membersLicence',
      render: (membersLicence) => {
        if (Array.isArray(membersLicence)) {
          return membersLicence.map((member, index) => (
            <span key={index}>
              {member.firstname} {member.lastname}{' '}
              {member.responsibility && (
                <span className="responsibility" style={{ color: 'blue' }}>
                  {member.responsibility.label}
                </span>
              )}
              <br />
            </span>
          ));
        } else {
          return '';
        }
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <InfoCircleOutlined
            style={{ color: 'green', marginLeft: 12, fontSize: 20 }}
            onClick={() => {
              setSelectedLicense(record);
              setIsModalVisible(true);
            }}
          />
          <Modal
            title="License Details"
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
          >
                      <p>{selectedLicense && `License ID: ${selectedLicense.id}`}</p>
                      <p>{selectedLicense && `Association: ${selectedLicense.association.name}`}</p>
                      <p>{selectedLicense && `Status: ${selectedLicense.status.label}`}</p>
                      <p>{selectedLicense && `Request Type: ${selectedLicense.requestType.label}`}</p>
                      <p>
                      {selectedLicense &&
                          selectedLicense.menbersLicence &&
                          selectedLicense.menbersLicence.map((member) => (
                          <div key={member.id}>
                          {`${member.firstname} ${member.lastname} - ${
                          member.responsibility ? member.responsibility.label : ''
                          }`}
                        <br />
                        </div>
  ))
}
                      </p>
                      <p>{selectedLicense && `Comment: ${selectedLicense.comment}`}</p>
                      <p>Documents Licence:</p>
                      {selectedLicense &&
                        selectedLicense.documentsLicence.map((doc) => (
                          <a href={doc.url} target="_blank" rel="noreferrer">
                            {doc.name}
                          </a>
                        ))}
                      <div>
                      <Input placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
              
            </div>
            <div>
              <Button type="primary" onClick={handleAccept}>
                Accept
              </Button>
              <Button type="danger" onClick={handleReject}>
                Refusé
              </Button>
            </div>
          </Modal>
        </>
      ),
    },
  ];

  return (
    <div>
      <Typography.Title level={4}>License</Typography.Title>
      <Table dataSource={licenses} columns={columns} />
    </div>
  );
}

export default License1