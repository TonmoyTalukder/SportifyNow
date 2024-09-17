/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Form, Button, Card, Input, Image } from "antd";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import styles from "../../styles/Login.module.css";
import { useForgotPasswordMutation } from "../../redux/features/auth/authApi";

// Define a type for the form data
type FormData = {
  email: string;
};

const ForgetPassword = () => {
  const { control, handleSubmit, reset, setError } = useForm<FormData>();

  // State to manage success message and form submission status
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [forgotPassword] = useForgotPasswordMutation();

  const onSubmit = async (data: FormData) => {
    const toastLoggingId = toast.loading("Sending reset email");

    const userInfo = {
      email: data.email,
    };

    console.log(userInfo);

    try {
      // Simulate API call for password reset
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API delay
      const res = await forgotPassword(userInfo).unwrap();
      console.log(res);

      toast.success("Reset email sent", { id: toastLoggingId, duration: 2000 });

      // Set the success message
      setMessage("Check your email inbox for the reset link.");

      // Mark the form as submitted
      setIsSubmitted(true);

      // Reset the form
      reset();
    } catch (err: any) {
      if (err && err?.status === 404) {
        toast.error(err?.data.message || "User not found!", {
          id: toastLoggingId,
          duration: 2000,
        });
      } else {
        toast.error("Something went wrong!", {
          id: toastLoggingId,
          duration: 2000,
        });
        console.error("Reset error:", err);
      }
    }
  };

  return (
    <div className={styles.myComponent}>
      <Card className={styles.card} style={{ backgroundColor: "#FBFCF8" }}>
        <Link to="/">
          <Image width={200} src="/SportifyNow.png" alt="SportifyNow" preview={false} />
        </Link>
        <h2 className={styles.textSpecial}>Reset Password</h2>

        <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            style={{ color: "royalblue" }}
            rules={[
              {
                required: true,
                message: "Email is required",
              },
              {
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      // Custom validation
                      if (!e.target.value) {
                        setError("email", { type: "required", message: "Email is required" });
                      } else if (!/\S+@\S+\.\S+/.test(e.target.value)) {
                        setError("email", { type: "pattern", message: "Please enter a valid email" });
                      }
                    }}
                  />
                  {fieldState.error && <div style={{ color: "red" }}>{fieldState.error.message}</div>}
                </>
              )}
            />
          </Form.Item>

          {/* Display the success message if it exists */}
          {message && (
            <div style={{ color: "green", marginBottom: "16px" }}>
              {message}
            </div>
          )}

          {/* Conditional rendering: show Reset button if form not submitted, else show Login link */}
          {!isSubmitted ? (
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Reset Password
              </Button>
            </Form.Item>
          ) : (
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <Link to="/login">
                <Button type="default" block>
                  Go to Login
                </Button>
              </Link>
            </div>
          )}

          <p style={{color: "black"}}>
            Not a member yet?{" "}
            <span>
              <Link to="/register">Sign Up</Link>
            </span>{" "}
            here.
          </p>
        </Form>
      </Card>
    </div>
  );
};

export default ForgetPassword;
