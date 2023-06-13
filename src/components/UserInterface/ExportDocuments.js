import React, { useState } from 'react';
import { Button, Select, Upload } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const ExportDocuments = () => {
  const [selectedMemberType, setSelectedMemberType] = useState('');

  const handleMemberTypeChange = (value) => {
    setSelectedMemberType(value);
  };

  const handleMemberExport = () => {
    const licenseId = localStorage.getItem('licenseId');
  
    const memberTypes = {
      CIN: { typeDocId: 1, name: 'CIN' },
      Passport: { typeDocId: 2, name: 'Passport' },
    };
  
    const formData = new FormData();
    formData.append('file', document.getElementById('memberDocumentFile').files[0]);
    formData.append('licenceId', licenseId);
    formData.append('name', memberTypes[selectedMemberType].name);
    formData.append('typeDocId', memberTypes[selectedMemberType].typeDocId);
  
    axios
      .post('http://localhost:8282/document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const handleAuthorizationExport = () => {
    const licenseId = localStorage.getItem('licenseId');
  
    const formData = new FormData();
    formData.append('file', document.getElementById('authorizationDocumentFile').files[0]);
    formData.append('licenceId', licenseId);
    formData.append('name', 'Autorisation');
    formData.append('typeDocId', 3);
  
    axios
      .post('http://localhost:8282/document', formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Export de document pour membre documents</h2>
      <Select
        className="w-1/2 mb-4"
        placeholder="Sélectionner un type de document"
        value={selectedMemberType}
        onChange={handleMemberTypeChange}
      >
        <Option value="CIN">CIN</Option>
        <Option value="Passport">Passport</Option>
      </Select>
      {selectedMemberType && (
        <div className="mb-4">
          <h3 className="text-lg font-bold">Export de document pour {selectedMemberType}</h3>
          <Upload id="memberDocumentFile" className="mb-2">
            <Button icon={<CloudUploadOutlined />} className="text-sm">
              Importer
            </Button>
          </Upload>
          <Button
            type="primary"
            icon={<CloudUploadOutlined />}
            onClick={handleMemberExport}
            className="text-sm text-black"
          >
            Exporter
          </Button>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Export de document pour autorisation</h2>
      <Upload id="authorizationDocumentFile" className="mb-2">
        <Button icon={<CloudUploadOutlined />} className="text-sm">
          Importer
        </Button>
      </Upload>
      <Button
        type="primary"
        icon={<CloudUploadOutlined />}
        onClick={handleAuthorizationExport}
        className="text-sm text-black"
      >
        Exporter
      </Button>
    </div>
  );
};

export default ExportDocuments;
