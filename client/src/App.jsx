import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyPage from "./pages/VerifyPage";
import Layout from "./Layout";
import "./App.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/verify" element={<VerifyPage />} />
      </Route>
    </Routes>
  );
}

export default App;
