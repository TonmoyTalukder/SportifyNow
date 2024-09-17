import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { avatar1, avatar2, avatars } from "./Avatar"; // Import avatars
import {
  Col,
  Image,
  Row,
  Card,
  Typography,
  Spin,
  Button,
  Form,
  Input,
  Modal,
  Tooltip,
  Radio,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import "./Profile.css";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useChangePasswordMutation,
} from "../../redux/features/user/userApi";
import { SerializedError } from "@reduxjs/toolkit";
import CustomPhoneInput from "../../components/ui/CustomPhoneInput";
import { setUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import NotFound from "../errors/NotFound";
import ReferralCode from "../../components/ui/ProtectedPageUI/ReferralCode";

const { Title, Text } = Typography;

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user!);
  const token = useSelector((state: RootState) => state.auth.token!);
  const dispatch = useDispatch();

  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useGetSingleUserQuery(user.id);

  const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation();
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPasswordModal, setIsChangingPassword] = useState(false);
  const [isAvatarEditing, setIsAvatarEditing] = useState(false);

  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();

  // State for phone number
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  // State for avatar
  const [avatar, setAvatar] = useState<string>("");
  const [avatarKey, setAvatarKey] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (userData?.data) {
      setPhoneNumber(userData.data.phone || "");
      setAvatar(userData.data.avatar || (userData.data.sex === "male" ? avatar1 : avatar2));
    }
  }, [userData]);

  const handleUpdateUser = async (values: any) => {
    const [countryCode, ...phoneNumberParts] = phoneNumber.split(" ");
    const phone = `${countryCode} ${phoneNumberParts.join(" ")}`;

    try {
      await updateUser({ _id: user.id, ...values, phone, avatar }).unwrap();
      // message.success("User details updated successfully.");
      toast.success("User details updated successfully.", { duration: 2000 });
      setIsEditing(false);
    } catch (err: any) {
        toast.error(err.data.message, {
          duration: 2000,
        });
    }
  };

  const handleChangePassword = async (values: any) => {
    try {
      await changePassword(values).unwrap();
      // message.success("Password changed successfully.");
      toast.success("Password changed successfully.", { duration: 2000 });
      setIsChangingPassword(false);
    } catch (err: any) {
      toast.error(err.data.message, {
        duration: 2000,
      });
    }
  };

  const handleUpdateAvatar = async (selectedAvatar: string) => {
    try {
      setAvatar(selectedAvatar);
      setAvatarKey(prevKey => prevKey + 1); // Force re-render
      await updateUser({ _id: user.id, avatar: selectedAvatar }).unwrap();
      // message.success("Avatar updated successfully.");
      toast.success("Avatar updated successfully.", { duration: 2000 });
      setIsAvatarEditing(false);
      dispatch(setUser({ user: {...user, avatar: selectedAvatar}, token }));
    } catch (err: any) {
      toast.error(err.data.message, {
        duration: 2000,
      });
    }
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    const errorMessage =
      (error as SerializedError)?.message || "An unexpected error occurred.";
      console.log(errorMessage);
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        Error: {errorMessage}
      </div>
    );
  }

  const fetchedUser = userData?.data;

  if (!fetchedUser) {
    return (
      <NotFound/>
    );
  }

  let avatarSrc = avatar;

  if (!avatarSrc || avatarSrc === "") {
    avatarSrc = user.sex === "male" ? avatar1 : avatar2;
  }

  const capitalizeFirstLetter = (text: string) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  return (
    <div
      style={{
        height: "auto",
        margin: "20px",
        borderRadius: "10px",
        backgroundColor: "#f5f5f5",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Card
        bordered={false}
        style={{
          backgroundColor: "transparent",
          position: 'relative',
        }}
      >
        <Row gutter={[16, 16]} justify="center">
          <Col
            span={isMobile ? 24 : 8}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="image-wrapper"
              style={{
                position: 'relative',
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
              }}
            >
              <Image
                key={avatarKey} // Use key prop to force re-render
                src={avatarSrc}
                alt="User Avatar"
                style={{
                  height: isMobile ? "20vh" : "25vh",
                  borderRadius: "50%",
                  border: "5px solid #f5f5f5",
                }}
                preview={false}
              />
              <Tooltip title="Update Avatar" placement="topRight">
                <Button
                  icon={<EditOutlined />}
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    borderRadius: '50%',
                  }}
                  onClick={() => setIsAvatarEditing(true)}
                />
              </Tooltip>
            </div>
          </Col>
          <Col
            span={isMobile ? 24 : 16}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: isMobile ? "20px" : "0",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            <Title level={isMobile ? 3 : 2} style={{ marginBottom: "10px", color: 'black' }}>
              {fetchedUser.name}
            </Title>
            <Text type="secondary" style={{ fontSize: "16px" }}>
              <strong>Email:</strong> {fetchedUser.email}
            </Text>
            <Text
              type="secondary"
              style={{ fontSize: "16px", marginTop: "10px" }}
            >
              <strong>Phone:</strong> {fetchedUser.phone || "N/A"}
            </Text>
            <Text
              type="secondary"
              style={{ fontSize: "16px", marginTop: "10px" }}
            >
              <strong>Sex:</strong> {capitalizeFirstLetter(fetchedUser.sex)}
            </Text>
            <Text
              type="secondary"
              style={{ fontSize: "16px", marginTop: "10px" }}
            >
              <strong>Address:</strong> {fetchedUser.address || "N/A"}
            </Text>
            <Button
              type="primary"
              onClick={() => setIsEditing(true)}
              style={{ marginTop: "20px", width: isMobile ? "25vw" : "10vw" }}
            >
              Edit Details
            </Button>
            <Button
              type="default"
              onClick={() => setIsChangingPassword(true)}
              style={{ marginTop: "10px", width: isMobile ? "25vw" : "10vw" }}
            >
              Change Password
            </Button>
            <ReferralCode/>
          </Col>
        </Row>
      </Card>

      

      <Modal
        title="Edit Details"
        open={isEditing}
        onCancel={() => setIsEditing(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ ...fetchedUser, phone: phoneNumber }}
          onFinish={handleUpdateUser}
        >
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input type="email" />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <CustomPhoneInput
              value={phoneNumber}
              onChange={(value: string) => setPhoneNumber(value)}
            />
          </Form.Item>
          <Form.Item
              name="sex"
              label="Sex"
              rules={[
                { required: true, message: "Please input the sex details!" },
              ]}
            >
              <Radio.Group id="role">
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </Radio.Group>
            </Form.Item>
          <Form.Item name="address" label="Address">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isUpdatingUser}>
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Change Password"
        open={isChangingPasswordModal}
        onCancel={() => setIsChangingPassword(false)}
        footer={null}
      >
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handleChangePassword}
        >
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[
              { required: true, message: "Please enter your current password" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[{ required: true, message: "Please enter a new password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isChangingPassword}
            >
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for Avatar Selection */}
      <Modal
        title="Select Avatar"
        open={isAvatarEditing}
        onCancel={() => setIsAvatarEditing(false)}
        footer={null}
      >
        <Row gutter={[16, 16]}>
          {avatars.map((avatarUrl, index) => (
            <Col span={8} key={index}>
              <Image
                src={avatarUrl}
                alt={`Avatar ${index + 1}`}
                preview={false}
                style={{
                  width: "100%",
                  cursor: "pointer",
                  border: avatarUrl === avatar ? "2px solid #1890ff" : "none",
                  borderRadius: "50%",
                }}
                onClick={() => handleUpdateAvatar(avatarUrl)}
              />
            </Col>
          ))}
        </Row>
      </Modal>
    </div>
  );
};

export default Profile;
