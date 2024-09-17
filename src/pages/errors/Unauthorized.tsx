import { Button } from "antd";
import { Link } from "react-router-dom";
import { gradientStyle } from "../../styles/gradientStyle";

const Unauthorized = () => {
  return (
    <div
      style={{
        ...gradientStyle,
        textAlign: "center",
        padding: "50px",
        height: "100vh",
      }}
    >
      <h1
        style={{
          color: "red",
        }}
      >
        403 - Unauthorized Access
      </h1>
      <p
        style={{
          color: "white",
        }}
      >
        You do not have permission to view this page.
      </p>
      <Link to="/login">
        <Button type="primary">Go to Login</Button>
      </Link>
    </div>
  );
};

export default Unauthorized;
