import { Space, Table, Typography, message, Modal } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const User = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [confirmAction, setConfirmAction] = useState("");
  const [confirmUserId, setConfirmUserId] = useState(null);

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

  const handleConfirm = () => {
    if (confirmAction === "activate") {
      handleActivateUser(confirmUserId);
    } else if (confirmAction === "deactivate") {
      handleDeactivateUser(confirmUserId);
    } else if (confirmAction === "delete") {
      handleDeleteUser(confirmUserId);
    }
    setConfirmModalVisible(false);
    setConfirmAction("");
    setConfirmUserId(null);
  };

  const handleActivateUser = (userId) => {
    axios
      .put(`http://localhost:8282/user/activate/${userId}`)
      .then((res) => {
        message.success("User activated");
        // Update the user's status in the data source
        const updatedDataSource = dataSource.map((user) => {
          if (user.id === userId) {
            return { ...user, status: "active" };
          }
          return user;
        });
        setDataSource(updatedDataSource);
      })
      .catch((error) => {
        console.error("Error activating user:", error);
      });
  };
  
  const handleDeactivateUser = (userId) => {
    axios
      .put(`http://localhost:8282/user/desactivate/${userId}`)
      .then((res) => {
        message.success("User deactivated");
        // Update the user's status in the data source
        const updatedDataSource = dataSource.map((user) => {
          if (user.id === userId) {
            return { ...user, status: "inactive" };
          }
          return user;
        });
        setDataSource(updatedDataSource);
      })
      .catch((error) => {
        console.error("Error deactivating user:", error);
      });
  };
  
  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:8282/user/delete/${userId}`);
      const responseData = response.data;
  
      switch (responseData.code) {
        case '200':
          message.success('user deleted successfully');
          setDataSource(dataSource.filter((user) => user.id !== userId));
          break;
        case '500':
          switch (responseData.message) {
            case 'delete Association failed':
              message.error('An error occurred while deleting user');
              break;
            default:
              message.error('user has a association');
              break;
          }
          break;
        default:
          console.error(responseData);
          message.error('An error occurred');
          break;
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleCancel = () => {
    setConfirmModalVisible(false);
    setConfirmAction("");
    setConfirmUserId(null);
  };

  const showConfirmModal = (action, userId) => {
    setConfirmModalVisible(true);
    setConfirmAction(action);
    setConfirmUserId(userId);
  };

  const getActionText = () => {
    if (confirmAction === "activate") {
      return "activation";
    } else if (confirmAction === "deactivate") {
      return "désactivation";
    } else if (confirmAction === "delete") {
      return "suppression";
    }
    return "";
  };

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Users</Typography.Title>
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
            title: "activate/deactivate/delete",
            dataIndex: "actions",
            key: "actions",
            render: (_, user) => (
              <>
                <CheckOutlined
                  style={{ color: "green", marginLeft: 40 }}
                  onClick={() => showConfirmModal("activate", user.id)}
                />
                <CloseOutlined
                  style={{ color: "red", marginLeft: 12 }}
                  onClick={() => showConfirmModal("deactivate", user.id)}
                />
                <DeleteOutlined
                  style={{ color: "red", marginLeft: 12 }}
                  onClick={() => showConfirmModal("delete", user.id)}
                />
              </>
            ),
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
      <Modal
        title="Confirmation"
        visible={confirmModalVisible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText="Confirm"
        cancelText="Cancel"
        okButtonProps={{ style: { backgroundColor: "green", borderColor: "green", color: "white" } }}
      >
        <p>Are you sure you want to perform {getActionText()}?</p>
      </Modal>
    </Space>
  );
};

export default User;
