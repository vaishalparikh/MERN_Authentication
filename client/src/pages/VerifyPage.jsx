import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const headers = { "Content-Type": "application/json" };
  const data = JSON.stringify({ email: email, otp: otp });

  const postData = (e) => {
    e.preventDefault();
    console.log("Data", data);
    axios
      .get("http://143.110.178.131:8080/user/verify-otp", {
        headers,
        data,
      })
      .then((res) => {
        console.log("Posting Data", res);
        alert("Registration Succeessful. Now You can Login Now");
        navigate("/login");
      })
      .catch((err) => {
        console.log("Error", err);
        alert("Already Register. You can Login Now");
      });
  };

  return (
    <div className="grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl font-bold text-center mb-4">Verify Now</h1>
        <form className="max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter Your Email Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Enter Otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          ></input>
          <button className="primary" onClick={postData}>
            Verify Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyPage;
