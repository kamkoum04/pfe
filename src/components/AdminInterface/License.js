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
  footer={[
    <Button key="finish" type="primary" className='text-black' onClick={() => {
      
      setIsModalVisible(false)
     
    }}>
      Finish
    </Button>,
  ]}
>
  
  <div class="mt-6 border-t border-gray-100">
    <dl class="divide-y divide-gray-100">
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">License ID</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">{selectedLicense && selectedLicense.id}</dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">Association</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">{selectedLicense && selectedLicense.association.name}</dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">Status</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">{selectedLicense && selectedLicense.status.label}</dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">Request Type</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">{selectedLicense && selectedLicense.requestType.label}</dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
  <dt class="text-sm font-medium leading-6 text-gray-900">Members</dt>
  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
    {selectedLicense &&
      selectedLicense.menbersLicence &&
      selectedLicense.menbersLicence.map((member) => (
        <div key={member.id}>
          {`${member.firstname} ${member.lastname} - ${member.responsibility ? member.responsibility.label : ''}`}
          <br />
        </div>
      ))}
  </dd>
</div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">Comment</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">{selectedLicense && selectedLicense.comment}</dd>
      </div>
      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">Documents License</dt>
        <dd class="mt-2 text-sm text-gray-900 sm:col-span-2">
          
        </dd>
      </div>
    </dl>
  </div>
  <div>
    <Input placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
  </div>
  <div class="flex justify-end mt-6">
    <Button  onClick={handleAccept} className="mr-2 text-black hover:bg-lime-600" >
      Accept
    </Button>
    <Button  onClick={handleReject} className="mr-2 text-black hover:bg-red-700">
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