import { Button } from "antd";
import { Link } from "react-router-dom";
import { gradientStyle } from "../../styles/gradientStyle";

const NotFound = () => {
  return (
    <div style={{ ...gradientStyle, textAlign: "center", padding: "50px", height: '100vh',  }}>
      <h1
        style={{
          color: "red",
        }}
      >
        404 - Page Not Found
      </h1>
      <p
        style={{
          color: "white",
        }}
      >
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/">
        <Button type="primary">Go to Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
