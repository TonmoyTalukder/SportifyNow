import { Button } from "antd";
import { useAppDispatch } from "../../redux/hook";
import { logout } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";

const Dashboard = () => {

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout())
    toast.info('Log out!', {duration: 800})
  }
  return (
    <div>
      <h1> This is dashboard component </h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Dashboard;
