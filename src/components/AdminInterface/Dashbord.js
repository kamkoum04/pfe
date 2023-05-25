import React, { useEffect, useState } from 'react'
import {  Card, Space, Statistic, Table, Typography } from "antd";
import {
  AppstoreOutlined,
  ShopOutlined,
  FileTextOutlined ,
  UserOutlined,
} from "@ant-design/icons";
import { getAssociation } from './API';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);


const Dashbord = () => {
  const [userCount, setUserCount] = useState(0);
  const [Assocount, setAssocount] = useState(0);
  const [Licensecount, setLicensecount] = useState(0);


  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch('http://localhost:8282/user/filter');
      const data = await response.json();
      setUserCount(data.users.length);
    }
    fetchUserData();
  }, []);
  useEffect(() => {
    async function fetchAssociations() {
      const response = await fetch('http://localhost:8282/association');
      const data = await response.json();
      setAssocount(data.associations.length);
    }
    fetchAssociations();
  }, []);
  useEffect(() => {
    async function fetchLicenses() {
      const response = await fetch('http://localhost:8282/license');
      const data = await response.json();
      setLicensecount(data.licences.length);
    }
    fetchLicenses();
  }, []);
  
  return (
    <Space size={20} direction='vertical' >      
        <Typography.Title level={4}>Dashbord</Typography.Title>
        <Space direction='horizental'>
          
          <DashbaordCard icon={ <ShopOutlined 
          style={{
            color: "green",
            backgroundColor: "rgba(0,255,0,0.25)",
            borderRadius: 20,
            fontSize: 24,
            padding: 8,
          }}/>}
           title={"Associations"} value={Assocount}  />
          <DashbaordCard icon={ <FileTextOutlined   
           style={{
            color: "blue",
            backgroundColor: "rgba(0,0,255,0.25)",
            borderRadius: 20,
            fontSize: 24,
            padding: 8,
          }}/>}
           title={"Licenses"} value={Licensecount}  />
         
          <DashbaordCard
        icon={<UserOutlined
          style={{
            color: 'purple',
            backgroundColor: 'rgba(0,255,255,0.25)',
            borderRadius: 20,
            fontSize: 24,
            padding: 8,
          }}
          />}
                          title="Utilisateurs"
                   value={userCount}
      />
           

        </Space>
        <Space>
          
             <RecentAssociation/>
             <Dashboardcharts   />
        </Space>



    </Space>
  )
};


function DashbaordCard({title,value,icon}){
return (

          <Card>
          <Space direction='horizental'>

              {icon}
          <Statistic title={title} value={value}/>
          </Space>
         
          </Card>
          
          

          
          
         

);  
};


function RecentAssociation() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAssociation().then(res => {
      const associations = res.associations.map(association => ({
        ...association,
        username: association.user.username
      }));
      setDataSource(associations.splice(0,4));
      setLoading(false);
    });
  }, []);

  return (
    <div style={{marginTop:'20px', marginRight:'50px'}}><Typography.Text>Recent Associations</Typography.Text>
    <Table 
      columns={[
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: 'Name',
          dataIndex: 'name'
        },
        {
          title: 'Username',
          dataIndex: 'username'
        },
        {
          title: 'Adresse',
          dataIndex: 'adress'
        }
      ]}
      loading={loading}
      dataSource={dataSource}
    /></div>
    
  );
}
function Dashboardcharts() {
  const [licenseData, setLicenseData] = useState(null);

  useEffect(() => {
    async function fetchLicenseData() {
      const response = await fetch('http://localhost:8282/license');
      const data = await response.json();
      setLicenseData(data);
    }
    fetchLicenseData();
  }, []);

  if (!licenseData) {
    return <p>Loading data...</p>;
  }

  const acceptedLicenses = licenseData.licences.filter(
    (license) => license.status.label === 'Accepté'
  ).length;

  const refusedLicenses = licenseData.licences.filter(
    (license) => license.status.label === 'Refusé'
  ).length;

  const inProgressLicenses = licenseData.licences.filter(
    (license) => license.status.label === 'demande en cour .. '
  ).length;

  const data = {
    labels: ['Accepté', 'Refusé', 'Demande en cours'],
    datasets: [
      {
        label: '# of Votes',
        data: [acceptedLicenses, refusedLicenses, inProgressLicenses],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
  <div style={{marginLeft:'50px'}}>
    <Typography.Text>License status</Typography.Text>
    <Doughnut data={data} />;
  </div>
  )
}

export default Dashbord