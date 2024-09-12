import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  Input,
  Button,
  Modal,
  Form,
  Input as AntdInput,
  notification,
  Switch, // Import Switch from Ant Design
} from "antd";
import { TUser } from "../../types/userType";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/features/user/userApi";
import styles from "../../styles/CreateAdmin.module.css";

const AllUsers: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const { data: usersData = [], isLoading } = useGetUsersQuery(undefined);
  const users = Array.isArray(usersData.data) ? usersData.data : [];
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [adminOnly, setAdminOnly] = useState(false); // State for Admin Only filter

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user: { name: string; email: string; role: string }) => {
        const matchesSearch =
          (user.name?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
          (user.email?.toLowerCase() || "").includes(searchText.toLowerCase());
        const matchesAdminFilter = adminOnly ? user.role === "admin" : true; // Filter by admin if adminOnly is true
        return matchesSearch && matchesAdminFilter;
      },
    );
  }, [users, searchText, adminOnly]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleUpdate = (user: TUser) => {
    setSelectedUser(user);
  };

  const handleDelete = async (userId: string) => {
    console.log(userId);
    try {
      await deleteUser(userId).unwrap();
      notification.success({ message: "User deleted successfully" });
    } catch (error) {
      notification.error({ message: "Failed to delete user" });
    }
  };

  const handleUpdateUser = async (values: TUser) => {
    try {
      if (!selectedUser?._id) {
        throw new Error("User ID is missing");
      }

      const updateData = { ...values, _id: selectedUser._id };
      console.log("Updating user with data:", updateData);

      await updateUser(updateData).unwrap();
      notification.success({ message: "User updated successfully" });
      setSelectedUser(null);
    } catch (error) {
      notification.error({ message: "Failed to update user" });
      console.log("Update error:", error);
    }
  };

  const columns = [
    { title: "Username", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: TUser) => (
        <>
          <Button
            onClick={() => handleUpdate(record)}
            type="primary"
            style={{ marginRight: 8 }}
          >
            Update
          </Button>
          <Button onClick={() => handleDelete(record._id)} type="default" style={{backgroundColor: 'red', border: 'transparent'}}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1 className={styles.textSpecial2}>All Users</h1>
      <Input
        placeholder="Search by username or email"
        value={searchText}
        onChange={handleSearch}
        style={{ marginBottom: 16, width: isMobile ? "45%" : "25%" }}
      />
      <span style={{ marginLeft: 16 }}>
        <Switch checked={adminOnly} onChange={setAdminOnly} style={{ marginRight: 8 }} />
        Admin Only
      </span>
      <Table
        dataSource={filteredUsers}
        columns={columns}
        rowKey="_id"
        loading={isLoading}
      />
      {selectedUser && (
        <Modal
          title="Update User"
          open={!!selectedUser}
          onCancel={() => setSelectedUser(null)}
          footer={null}
        >
          <Form initialValues={selectedUser} onFinish={handleUpdateUser}>
            <Form.Item
              name="name"
              label="Username"
              rules={[
                { required: true, message: "Please input the username!" },
              ]}
            >
              <AntdInput />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input the email!" }]}
            >
              <AntdInput />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                { required: true, message: "Please input the phone number!" },
              ]}
            >
              <AntdInput />
            </Form.Item>
            <Form.Item
              name="sex"
              label="Sex"
              rules={[
                { required: true, message: "Please input the sex details!" },
              ]}
            >
              <AntdInput />
            </Form.Item>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select the role!" }]}
            >
              <AntdInput />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: "Please input the address!" }]}
            >
              <AntdInput />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default AllUsers;
