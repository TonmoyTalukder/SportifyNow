/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Button, Card, Input, Radio, Modal, ConfigProvider } from "antd";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import styles from "../../styles/CreateAdmin.module.css";
import { useState } from "react";
import { useSignUpMutation } from "../../redux/features/auth/authApi";
import CustomPhoneInput from "../../components/ui/CustomPhoneInput";

// Define the type for the form data
type FormData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  sex: string;
  role: string;
};
const CreateAdmin = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [formData, setFormData] = useState<FormData | null>(null); // To store form data before confirmation

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      sex: "",
      role: "admin", // Default to admin role
    },
    mode: "onBlur", // Validate on blur
  });

  const [createAdmin] = useSignUpMutation(); // Hook for admin creation

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = (data) => {
    setFormData(data); // Store form data temporarily
    setIsModalVisible(true); // Show confirmation modal
  };

  // Handle the confirmation modal
  const handleConfirm = async () => {
    setIsModalVisible(false);
    if (formData) {
      const toastLoggingId = toast.loading("Creating Admin...", {
        duration: 2000,
      });

      const adminInfo = {
        ...formData,
      };

      try {
        await createAdmin(adminInfo).unwrap(); // API call for admin creation

        toast.success("Admin Created Successfully", {
          id: toastLoggingId,
          duration: 2000,
        });
        navigate("/admin/all-users"); // Redirect to admin dashboard
      } catch (err: any) {
        toast.error("Something went wrong!", {
          id: toastLoggingId,
          duration: 2000,
        });
        console.error("Admin creation error:", err);
      }
    }
  };

  return (
    <div
      className={styles.myComponent}
      style={{ overflowX: "hidden", overflowY: 'auto', width: "auto" }}
    >
      <Card
        className={styles.card}
        style={{
          backgroundColor: "#FBFCF8",
        //   marginTop: '8vh',
        //   height: "82vh",
        //   overflowY: "auto",
        }}
      >
        <h2 className={styles.textSpecial}>Create Admin</h2>
        <ConfigProvider
          theme={{
            components: {
              Form: {
                labelColor: ''
              },
            },
          }}
        >
          <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
            <Form.Item
              label="Name"
              validateStatus={errors.name ? "error" : ""}
              help={errors.name?.message}
            >
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => <Input {...field} id="name" />}
              />
            </Form.Item>

            <Form.Item
              label="Email"
              validateStatus={errors.email ? "error" : ""}
              help={errors.email?.message}
            >
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email",
                  },
                }}
                render={({ field }) => <Input {...field} id="email" />}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              validateStatus={errors.password ? "error" : ""}
              help={errors.password?.message}
            >
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                }}
                render={({ field }) => (
                  <Input.Password {...field} id="password" />
                )}
              />
            </Form.Item>

            <Form.Item
              label="Phone"
              validateStatus={errors.phone ? "error" : ""}
              help={errors.phone?.message}
            >
              <Controller
                name="phone"
                control={control}
                rules={{ required: "Phone number is required" }}
                render={({ field }) => <CustomPhoneInput {...field} id="phone" />}
              />
            </Form.Item>

            <Form.Item
              label="Sex"
              validateStatus={errors.sex ? "error" : ""}
              help={errors.sex?.message}
            >
              <Controller
                name="sex"
                control={control}
                rules={{ required: "Please select your sex" }}
                render={({ field }) => (
                  <Radio.Group  {...field} id="sex">
                    <Radio style={{color: 'white'}} value="male">Male</Radio>
                    <Radio style={{color: 'white'}} value="female">Female</Radio>
                  </Radio.Group>
                )}
              />
            </Form.Item>

            <Form.Item
              label="Address"
              validateStatus={errors.address ? "error" : ""}
              help={errors.address?.message}
            >
              <Controller
                name="address"
                control={control}
                rules={{ required: "Address is required" }}
                render={({ field }) => <Input {...field} id="address" />}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Create Admin
              </Button>
            </Form.Item>
          </Form>
        </ConfigProvider>
        {/* Confirmation Modal */}
        <Modal
          title="Confirm Admin Creation"
          open={isModalVisible}
          onOk={handleConfirm}
          onCancel={() => setIsModalVisible(false)}
          okText="Confirm"
          cancelText="Cancel"
        >
          <p>
            Are you sure you want to create this admin with the provided
            information?
          </p>
        </Modal>
      </Card>
    </div>
  );
};

export default CreateAdmin;
