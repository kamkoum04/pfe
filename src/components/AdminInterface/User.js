import {  Space, Table, Typography ,message } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { CheckOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";


const User = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8282/user/filter")
      .then((res) => {
        setDataSource(res.data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleActivateUser = (userId) => {
    axios
      .put(`http://localhost:8282/user/activate/${userId}`)
      .then((res) => {
        message.success('utilisateur activé');
      })
      .catch((error) => {
        console.error("Error activating user:", error);
      });
  };
  const handleDesactivateUser = (userId) => {
    axios
      .put(`http://localhost:8282/user/desactivate/${userId}`)
      .then((res) => {
        message.success('utilisateur désactiver');
      })
      .catch((error) => {
        console.error("Error desactived user:", error);
      });
  };
     

  const handleDeleteUser = (userId) => {
    axios
      .delete(`http://localhost:8282/user/delete/${userId}`)
      .then((res) => {
        message.success("Utilisateur supprimé");
        // remove the deleted user from the data source
        setDataSource(dataSource.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };


  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Utilisateur</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "First Name",
            dataIndex: "firstname",
            key: "firstname",
          },
          {
            title: "Last Name",
            dataIndex: "lastname",
            key: "lastname",
          },
          {
            title: "Email",
            dataIndex: "email",
            key: "email",
          },
          {
            title: "Phone",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
          },
          {
            title: "Ville",
            dataIndex: "town",
            key: "address",
            render: (town) => {
              return (
                <span>
                  {town && town.name}, {town && town.city}
                </span>
              );
            },
          },
          {
            title: "Activez/désactiver/supprimer",
            dataIndex: "actions",
            key: "actions",
            render: (_, user) => (
              <>
                <CheckOutlined
                  style={{ color: "green", marginLeft: 40 }}
                  onClick={() => handleActivateUser(user.id)}
                />
                <CloseOutlined 
                style={{ color: "red", marginLeft: 12 }} 
                onClick={() => handleDesactivateUser(user.id)}
                />
                <DeleteOutlined style={{ color: "red", marginLeft: 12 }} 
                onClick={() => handleDeleteUser(user.id)}/>
                
              </>
            ),
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
  );
}

export default User