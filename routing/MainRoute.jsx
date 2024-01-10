import { Routes, Route } from "react-router-dom";
import Login from "../component/Login";
import Otp from "../component/Otp";
import Dashboard from "../component/Dashboard";
import Details from "../component/Details";

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/details/:id" element={<Details />} />
    </Routes>
  );
};

export default MainRoute;
