import { Form, Button, Card, Input, Image } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hook";
import { setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TUser } from "../../types/userType";
import styles from "../../styles/Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string; }>();

  const [login] = useLoginMutation();

  const onSubmit = async (data: { email: string; password: string;}) => {
    const toastLoggingId = toast.loading("Logging in");

    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.accessToken) as TUser;

      dispatch(setUser({ user: {...user, newUser: false}, token: res.accessToken }));

      toast.success("Logged in", { id: toastLoggingId, duration: 2000 });
      navigate(`/${user.role}/dashboard`); // Redirect based on user role
    } catch (err: any) {
      toast.error(err.data.message, {
        id: toastLoggingId,
        duration: 2000,
      });
      // console.error("Login error:", err.data.message);
    }
  };

  return (
    <div className={styles.myComponent}>
      <Card className={styles.card} style={{ backgroundColor: "#FBFCF8" }}>
        <Link to="/">
          <Image width={200} src="/SportifyNow.png" alt="SportifyNow" preview={false} />
        </Link>
        <h2 className={styles.textSpecial}>Login</h2>

        <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
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
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email",
                },
              }}
              render={({ field }) => <Input {...field} />}
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
              }}
              render={({ field }) => <Input.Password {...field} />}
            />
            <span>
              <Link to="/forget-password">Forgot Password?</Link>
            </span>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>

          <p>
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

export default Login;
