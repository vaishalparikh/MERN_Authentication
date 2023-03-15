import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const postData = (e) => {
    e.preventDefault();
    axios
      .get("http://143.110.178.131:8080/user/login", {
        email,
        password,
      })
      .then((res) => {
        console.log("Posting Data", res);
        alert("Login Succeessful.");
      })
      .catch((err) => {
        console.log("Error", err);
        alert("First Registration");
        navigate("/register");
      });
  };

  return (
    <div className="grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl font-bold text-center mb-4">Login Now</h1>
        <form className="max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter Your Email Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button className="primary" onClick={postData}>
            Login
          </button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account?{" "}
            <Link className="underline text-blue-500" to={"/signup"}>
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
