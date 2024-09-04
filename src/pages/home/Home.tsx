import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  }
  return (
    <div>
      <h1>SportifyNow App</h1>
      <h2> This is home component </h2>
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default Home;
