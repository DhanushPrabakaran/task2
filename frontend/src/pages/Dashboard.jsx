// src/pages/Dashboard.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="text-4xl font-bold">Welcome to the Dashboard</h1>
      <button onClick={logout} className="btn btn-secondary mt-4">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
