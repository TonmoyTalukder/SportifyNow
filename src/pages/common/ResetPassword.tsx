import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Button, Input, Card, Image } from "antd";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import styles from "../../styles/Login.module.css";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";

// Define the form data type
interface ResetPasswordFormValues {
  password: string;
}

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>(); // Get the token from URL params
  const { control, handleSubmit, reset, setError, clearErrors, formState: { errors } } = useForm<ResetPasswordFormValues>();

  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resetPassword] = useResetPasswordMutation();

  // Type the onSubmit handler with SubmitHandler
  const onSubmit: SubmitHandler<ResetPasswordFormValues> = async (data) => {
    const toastLoggingId = toast.loading("Processing your request...", { duration: 2000 });

    // Basic client-side validation
    if (!data.password) {
      setError("password", { type: "manual", message: "Password is required" });
      toast.error("Password is required", { id: toastLoggingId, duration: 2000 });
      return;
    } else if (data.password.length < 8) {
      setError("password", { type: "manual", message: "Password must be at least 8 characters long" });
      toast.error("Password must be at least 8 characters long", { id: toastLoggingId, duration: 2000 });
      return;
    }

    clearErrors("password"); // Clear any existing errors

    try {
      // Make API call to reset password
      await resetPassword({ token: token!, password: data.password }).unwrap();

      toast.success("Password reset successfully. Go to the login page.", {
        id: toastLoggingId,
        duration: 2000,
      });

      setMessage("Password reset successfully. Please ");
      setIsSubmitted(true);

      reset();
    } catch (err: any) {
      const errorMessage = 
        err?.status === 404 ? "Not found. Please check your email." :
        err?.status === 400 ? "Invalid request. Please try again." :
        "Something went wrong. Please try again later.";

      toast.error(errorMessage, { id: toastLoggingId, duration: 2000 });
      console.error("Reset error:", err);
    }
  };

  return (
    <div className={styles.myComponent}>
      <Card className={styles.card} style={{ backgroundColor: "#FBFCF8" }}>
      <Link to="/">
          <Image width={200} src="/SportifyNow.png" alt="SportifyNow" preview={false} />
        </Link>
        <h2 className={styles.textSpecial}>Reset Password</h2>

        {!isSubmitted ? (
          <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
            <Form.Item
              label="New Password"
              style={{ textAlign: 'left' }}
            >
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <>
                    <Input.Password {...field} />
                    {errors.password && (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.password.message}
                      </div>
                    )}
                  </>
                )}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <div style={{ textAlign: 'center', color: 'black' }}>
            {message}
            <Link to="/login">
              <span style={{ padding: 0, color: 'lightblue' }}>
                Login here
              </span>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ResetPassword;
