// LicensePage.js
import React, { useState, useEffect } from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from 'axios';
import RefreshIcon from '@material-ui/icons/Refresh';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Renew from './Renew';



const LicensePage = ({ associationId }) => {
  const [licenses, setLicenses] = useState([]);
  const [showRenew, setShowRenew] = useState(false);
  const [renewLicenseId, setRenewLicenseId] = useState(null);


  const handleRenewClick = (licenseId) => {
    setShowRenew(true);
    setRenewLicenseId(licenseId); 
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8282/license`);
        const filteredLicenses = response.data.licences.filter(
          (license) => license.association.id === associationId,
          


        );
        setLicenses(filteredLicenses);
      } catch (error) {
        console.log('Error fetching licenses:', error);
      }
    };

    fetchData();
  }, [associationId]);

  
  const handleDownload = async (licenseId) => {
    try {
      const response = await axios.get(`http://localhost:8282/document/licencefiles/${licenseId}license.pdf`, {
        responseType: 'blob',
      });
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'license.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" w-full">
          {!showRenew ? (

      <Timeline>
      {licenses.map((license) => (
        <React.Fragment key={license.id}>
        <TimelineItem>
          <TimelineConnector />
          <TimelineHeader className="h-3">
            <TimelineIcon />
            <Typography variant="h6" color="blue-gray" className="leading-none">
              Association Name
            </Typography>
          </TimelineHeader>
          <TimelineBody className="pb-8">
            {licenses.map((license) => (
              <Typography
                key={license.id}
                variant="small"
                color="gray"
                className="font-normal text-gray-600"
              >
                {license.association.name}
              </Typography>
            ))}
          </TimelineBody>
        </TimelineItem>
        <TimelineItem>
          <TimelineConnector />
          <TimelineHeader className="h-3">
            <TimelineIcon />
            <Typography variant="h6" color="blue-gray" className="leading-none">
              Status
            </Typography>
          </TimelineHeader>
          <TimelineBody className="pb-8">
            {licenses.map((license) => (
              <Typography
                key={license.id}
                variant="small"
                color="gray"
                className="font-normal text-gray-600"
              >
                {license.status.label}
              </Typography>
            ))}
          </TimelineBody>
        </TimelineItem>
        <TimelineItem>
          <TimelineConnector />
          <TimelineHeader className="h-3">
            <TimelineIcon />
            <Typography variant="h6" color="blue-gray" className="leading-none">
              Request Type
            </Typography>
          </TimelineHeader>
          <TimelineBody className="pb-8">
            {licenses.map((license) => (
              <Typography
                key={license.id}
                variant="small"
                color="gray"
                className="font-normal text-gray-600"
              >
                {license.requestType.label}
              </Typography>
            ))}
          </TimelineBody>
        </TimelineItem>
        <TimelineItem>
          <TimelineConnector />
          <TimelineHeader className="h-3">
            <TimelineIcon />
            <Typography variant="h6" color="blue-gray" className="leading-none">
              Members License
            </Typography>
          </TimelineHeader>
          <TimelineBody className="pb-8">
            {licenses.map((license) => (
              <Typography
                key={license.id}
                variant="small"
                color="gray"
                className="font-normal text-gray-600"
              >
                {license.menbersLicence.map((member) => (
                  <p key={member.id}>{member.firstname} {member.lastname} ({member.responsibility.label})</p>
                ))}
              </Typography>
            ))}
          </TimelineBody>
        </TimelineItem>
        <TimelineItem>
          <TimelineConnector />
          <TimelineHeader className="h-3">
            <TimelineIcon/>
            <Typography variant="h6" color="blue-gray" className="leading-none">
              Download License
            </Typography>
          </TimelineHeader>
          <TimelineBody className="pb-8">
              {licenses.map((license) => (
                <Button
                  key={license.id}
                  color="blue"
                  buttonType="filled"
                  size="regular"
                  rounded={false}
                  block={false}
                  iconOnly={false}
                  ripple="light"
                  onClick={() => handleDownload(license.id)}
                  className=' mt-2'
                >
                  Download
                </Button>
              ))}
            </TimelineBody>
        </TimelineItem>
        {license.status.label === "Refusé" ? (
           <TimelineItem>
           <TimelineConnector />
           <TimelineHeader className="h-3">
             <TimelineIcon/>
             <Typography variant="h6" color="blue-gray" className="leading-none">
               renew License
             </Typography>
           </TimelineHeader>
           <TimelineBody className="pb-8">
             {licenses.map((license) => (
               <Tooltip title="Renew" key={license.id}>
                 <IconButton onClick={() => handleRenewClick(license.id)}>
                   <RefreshIcon className="text-red-500" />
                 </IconButton>
               </Tooltip>
             ))}
           </TimelineBody>
         </TimelineItem>
         
          ) : null}
        </React.Fragment>
      ))}

      </Timeline>
      ) : (
       
        <Renew
        associationId={associationId}
        licenseId={renewLicenseId}
      />
             
      )}
    
    </div>
  );
};

export default LicensePage;
