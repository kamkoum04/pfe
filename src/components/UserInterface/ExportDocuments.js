import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import axios from 'axios';

const ExportDocuments = () => {
  const [selectedMemberType, setSelectedMemberType] = useState('');
  

  const handleMemberTypeChange = (event) => {
    setSelectedMemberType(event.target.value);
  };



  const handleMemberExport = () => {
    let typeDocId;
    let name;
    const licenseId = localStorage.getItem('licenseId');

    if (selectedMemberType === 'CIN') {
      typeDocId = 1;
      name = 'CIN';
    } else if (selectedMemberType === 'Passport') {
      typeDocId = 2;
      name = 'Passport';
    }

    const data = new FormData();
    data.append('file', document.getElementById('memberDocumentFile').files[0]);
    data.append('licenceId', licenseId); // Use the prop value instead of hardcoding the value
    data.append('name', name);
    data.append('typeDocId', typeDocId);

    axios.post('http://localhost:8282/document', data)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleAuthorizationExport = () => {
    const data = new FormData();
    const licenseId = localStorage.getItem('licenseId');

    data.append('file', document.getElementById('authorizationDocumentFile').files[0]);
    data.append('licenceId', licenseId); 
    data.append('name', 'Autorisation');
    data.append('typeDocId', 3);

    axios.post('http://localhost:8282/document', data)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Export de document pour membre documents</h2>
      <FormControl variant="outlined" className="w-1/2 mb-4">
        <InputLabel id="member-type-label">Sélectionner un type de document</InputLabel>
        <Select
          labelId="member-type-label"
          id="member-type-select"
          value={selectedMemberType}
          onChange={handleMemberTypeChange}
          label="Type de document"
        >
          <MenuItem value="">
            <em>Choisir...</em>
          </MenuItem>
          <MenuItem value="CIN">CIN</MenuItem>
          <MenuItem value="Passport">Passport</MenuItem>
        </Select>
      </FormControl>
      {selectedMemberType && (
        <div className="mb-4">
          <h3 className="text-lg font-bold">Export de document pour {selectedMemberType}</h3>
          <input type="file" id="memberDocumentFile" className="mb-2" />
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudUpload />}
            onClick={handleMemberExport}
            className="text-sm"
          >
            Exporter
          </Button>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Export de document pour autorisation</h2>
      <input type="file" id="authorizationDocumentFile" className="mb-2" />
      <Button
        variant="contained"
        color="primary"
        startIcon={<CloudUpload />}
        onClick={handleAuthorizationExport}
        className="text-sm"
      >
        Exporter
      </Button>
    </div>
  );
};

export default ExportDocuments;
