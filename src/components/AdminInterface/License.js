import React, { useState, useEffect } from 'react';
import { Table, Typography, Modal, Button, Input } from 'antd';
import { InfoCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import axios from 'axios';
import 'resize-observer-polyfill/dist/ResizeObserver.global';


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
      const confirmed = window.confirm('Are you sure you want to accept this license?');
      if (confirmed) {
        const response = await axios.put('http://localhost:8282/license/state', {
          licenceId: selectedLicense.id,
          stateId: 2,
          comment: comment,
        });
        const updatedLicenses = licenses.map((license) => {
          if (license.id === selectedLicense.id) {
            return {
              ...license,
              status: { id: 2, label: 'Accepted' },
            };
          }
          return license;
        });
        setLicenses(updatedLicenses);
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsModalVisible(false);
    }
  };
  
  const handleReject = async () => {
    try {
      const confirmed = window.confirm('Are you sure you want to reject this license?');
      if (confirmed) {
        const response = await axios.put('http://localhost:8282/license/state', {
          licenceId: selectedLicense.id,
          stateId: 3,
          comment: comment,
        });
        const updatedLicenses = licenses.map((license) => {
          if (license.id === selectedLicense.id) {
            return {
              ...license,
              status: { id: 3, label: 'Rejected' },
            };
          }
          return license;
        });
        setLicenses(updatedLicenses);
        console.log(response.data);
      }
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
          
        </>
      ),
    },
  ];
  const handledownload=()=>{

  }
  return (
    <div>
      <Typography.Title level={2}>License Requests</Typography.Title>
      <Table dataSource={licenses} columns={columns} />
      <Modal
            title="License Details"
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={[
              <Button
                key="finish"
                type="primary"
                className="text-black"
                onClick={() => {
                  setIsModalVisible(false);
                }}
              >
                Finish
              </Button>,
            ]}
          >
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">License ID</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                    {selectedLicense && selectedLicense.id}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Association</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                    {selectedLicense && selectedLicense.association.name}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Status</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                    {selectedLicense && selectedLicense.status.label}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Request Type</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                    {selectedLicense && selectedLicense.requestType.label}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Members</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                    {selectedLicense &&
                      selectedLicense.menbersLicence &&
                      selectedLicense.menbersLicence.map((member) => (
                        <div key={member.id}>
                          {`${member.firstname} ${member.lastname} - ${
                            member.responsibility ? member.responsibility.label : ''
                          }`}
                          <br />
                        </div>
                      ))}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Documents</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                    
                  <div class=" w-9 h-9 rounded-full bg-blue-400 flex items-center justify-center">
                          <DownloadOutlined
                          onClick={handledownload}/>
                         
                          <br />
                        </div>
                      
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Comment</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                    <Input.TextArea
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </dd>
                </div>
              </dl>
            </div>
            {selectedLicense && selectedLicense.status.id === 1 && (
              <div className="flex justify-end mt-4">
                <Button type="primary" onClick={handleAccept} className='text-black'>
                  Accept
                </Button>
                <Button className="ml-2" onClick={handleReject}>
                  Reject
                </Button>
              </div>
            )}
          </Modal>
    </div>
  );
};

export default License1;
