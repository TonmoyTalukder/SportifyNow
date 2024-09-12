import { Button } from "antd";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>403 - Unauthorized Access</h1>
      <p>You do not have permission to view this page.</p>
      <Link to="/login">
        <Button type="primary">Go to Login</Button>
      </Link>
    </div>
  );
};

export default Unauthorized;
