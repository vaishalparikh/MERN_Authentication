import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const postData = (e) => {
    e.preventDefault();
    axios
      .post("http://143.110.178.131:8080/user/register", {
        fullName,
        email,
        password,
      })
      .then((res) => {
        console.log("Posting Data", res);
        alert("Registration Succeessful. Now You can Verify Your Email");
        navigate("/verify");
      })
      .catch((err) => {
        console.log("Error", err);
        alert("Already Register. You can Login Now");
      });
  };

  return (
    <div className="grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl font-bold text-center mb-4">Register Now</h1>
        <form className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Enter Your Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          ></input>
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
            Register Now
          </button>
          <div className="text-center py-2 text-gray-500">
            If you have already register?{" "}
            <Link className="underline text-blue-500" to={"/login"}>
              Login Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
