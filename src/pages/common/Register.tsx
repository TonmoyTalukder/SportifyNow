import { Form, Button, Card, Input, Image, Radio, Modal, Spin } from "antd";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../redux/hook";
import { resetRedirect, setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TUser } from "../../types/userType";
import styles from "../../styles/Login.module.css";
import { useSignUpMutation } from "../../redux/features/auth/authApi";
import CustomPhoneInput from "../../components/ui/CustomPhoneInput";
import { useState } from "react";
import { useValidateReferralCodeMutation } from "../../redux/features/user/userApi";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

// Define the type for the form data
type FormData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  sex: string;
  referralCode?: string;
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const booking = useSelector((state: RootState) => state.auth);
  const [isReferralModalVisible, setIsReferralModalVisible] = useState(false); // Referral modal state
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false); // Confirmation modal state
  const [formData, setFormData] = useState<FormData | null>(null); // Form data before confirmation
  const [isCheckingReferral, setIsCheckingReferral] = useState(false); // Loading state for referral code check
  const [referralError, setReferralError] = useState<string | null>(null); // Referral code error message
  const [referralCodeInput, setReferralCodeInput] = useState(""); // Local state for referral input
  const [referralCodeCheck, setReferralCodeCheck] = useState(false); // Local state for referral input

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
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
  const [validateReferralCode] = useValidateReferralCodeMutation(); // Referral code validation API

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = (data) => {
    setFormData(data); // Store form data temporarily
    setIsReferralModalVisible(true); // Show referral code modal
  };

  // Handle referral code submission
  const handleReferralCodeSubmit = async () => {
    setIsCheckingReferral(true);
    setReferralError(null);

    try {
      const result = await validateReferralCode(referralCodeInput).unwrap(); // API to validate referral code
      if (result.valid) {
        setValue("referralCode", referralCodeInput); // Set referral code in form data if valid
        toast.success("Referral code applied!");
        setIsReferralModalVisible(false); // Close referral modal
        setIsConfirmationModalVisible(true); // Show confirmation modal
        setReferralCodeCheck(true);
      } else {
        setReferralError("Invalid referral code");
      }
    } catch (error) {
      setReferralError("Invalid referral code");
      console.log("error => ", error);
    } finally {
      setIsCheckingReferral(false);
    }
  };

  // Handle confirmation modal
  const handleConfirm = async () => {
    setIsConfirmationModalVisible(false);
    if (formData) {
      const toastLoggingId = toast.loading("Registering", { duration: 2000 });

      const userInfo = {
        ...formData,
        referralCode: referralCodeCheck ? referralCodeInput : ""
      };

      console.log("userInfo => ", userInfo);
      try {
        const res = await signUp(userInfo).unwrap();
        const user = verifyToken(res.accessToken) as TUser;

        dispatch(
          setUser({ user: { ...user, newUser: true }, token: res.accessToken }),
        );

        toast.success("Logged in", { id: toastLoggingId, duration: 2000 });
        if (booking?.fromBooking) {
          navigate(booking!.bookingURL!);
          dispatch(resetRedirect());
        } else {
          navigate(`/${user.role}/dashboard`); // Redirect based on user role
        }
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
          <p style={{ color: "black" }}>
            Already a member?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </Form>

        {/* Referral Code Modal */}
        <Modal
          title="Enter Referral Code (Optional)"
          open={isReferralModalVisible}
          onOk={handleReferralCodeSubmit}
          onCancel={() => {
            setIsReferralModalVisible(false);
            setIsConfirmationModalVisible(true); // Open confirmation modal after referral modal closes
          }}
          okText="Submit"
          cancelText="Skip"
        >
          <Form.Item
            label="Referral Code"
            validateStatus={referralError ? "error" : ""}
            help={referralError}
          >
            <Input
              value={referralCodeInput}
              onChange={(e) => setReferralCodeInput(e.target.value)}
              placeholder="Enter referral code (optional)"
            />
          </Form.Item>

          {isCheckingReferral && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Spin size="large" />
            </div>
          )}
        </Modal>

        {/* Confirmation Modal */}
        <Modal
          title="Confirm your information"
          open={isConfirmationModalVisible}
          onOk={handleConfirm}
          onCancel={() => setIsConfirmationModalVisible(false)}
          okText="Confirm"
          cancelText="Edit"
        >
          <p>
            <strong>Name:</strong> {formData?.name}
          </p>
          <p>
            <strong>Email:</strong> {formData?.email}
          </p>
          <p>
            <strong>Phone:</strong> {formData?.phone}
          </p>
          <p>
            <strong>Sex:</strong> {formData?.sex}
          </p>
          <p>
            <strong>Address:</strong> {formData?.address}
          </p>
        </Modal>
      </Card>
    </div>
  );
};

export default Register;
