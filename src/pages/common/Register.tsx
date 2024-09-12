/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Button, Card, Input, Image, Radio, Modal } from "antd";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../redux/hook";
import { setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TUser } from "../../types/userType";
import styles from "../../styles/Login.module.css";
import { useSignUpMutation } from "../../redux/features/auth/authApi";
import CustomPhoneInput from "../../components/ui/CustomPhoneInput";
import { useState } from "react";

// Define the type for the form data
type FormData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  sex: string;
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
    },
    mode: "onBlur", // Validate on blur
  });

  const [signUp] = useSignUpMutation();

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = (data) => {
    setFormData(data); // Store form data temporarily
    setIsModalVisible(true); // Show confirmation modal
  };

  // Handle the confirmation modal
  const handleConfirm = async () => {
    setIsModalVisible(false);
    if (formData) {
      const toastLoggingId = toast.loading("Registering", { duration: 2000 });

      const userInfo = {
        ...formData,
      };

      // console.log(userInfo);

      try {
        const res = await signUp(userInfo).unwrap();
        const user = verifyToken(res.accessToken) as TUser;

        dispatch(
          setUser({ user: { ...user, newUser: true }, token: res.accessToken }),
        );

        toast.success("Logged in", { id: toastLoggingId, duration: 2000 });
        navigate("/user/dashboard"); // Redirect based on user role
      } catch (err: any) {
        if (err && err?.status === 400) {
          toast.error(err?.data.message || "Registration failed", {
            id: toastLoggingId,
            duration: 2000,
          });
        } else {
          toast.error("Something went wrong!", {
            id: toastLoggingId,
            duration: 2000,
          });
          console.error("Signup error:", err);
        }
      }
    }
  };

  return (
    <div className={styles.myComponent}>
      <Card
        className={styles.card}
        style={{
          backgroundColor: "#FBFCF8",
          maxHeight: "92vh",
          overflowY: "auto",
        }}
      >
        <Link to="/">
          <Image
            width={160}
            src="\SportifyNow.png"
            alt="SportifyNow"
            preview={false}
          />
        </Link>
        <h2 className={styles.textSpecial}>Register Yourself</h2>

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
              render={({ field }) => <CustomPhoneInput {...field} id="phone" />}
            />
          </Form.Item>

          <Form.Item
            label="Sex"
            validateStatus={errors.sex ? "error" : ""}
            help={errors.sex?.message}
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Controller
              name="sex"
              control={control}
              rules={{ required: "Please select your sex" }}
              render={({ field }) => (
                <Radio.Group {...field} id="sex">
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
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
              Sign Up
            </Button>
          </Form.Item>
          <p>
            Already a member?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </Form>

        {/* Confirmation Modal */}
        <Modal
          title="Confirm Registration"
          open={isModalVisible}
          onOk={handleConfirm}
          onCancel={() => setIsModalVisible(false)}
          okText="Confirm"
          cancelText="Cancel"
        >
          <p>Are you sure you want to register with this information?</p>
        </Modal>
      </Card>
    </div>
  );
};

export default Register;
