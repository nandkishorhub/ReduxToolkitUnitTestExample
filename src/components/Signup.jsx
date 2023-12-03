import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAlert } from "../reducers/noteReducer/alertReducer";

function Signup(props) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = userData;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const jsonData = await response.json();
    if (jsonData.success) {
      localStorage.setItem("token", jsonData.authtoken);
      //props.showAlert("Successfully User Registered", "success");
      dispatch(
        setAlert({ message: "Successfully User Registered", type: "success" })
      );
      navigate("/");
    } else {
      // props.showAlert("Invalid details", "danger");
      //dispatch(setAlert("Invalid details", "danger"))
      dispatch(
        setAlert({ message: "Successfully User Registered", type: "success" })
      );
    }
  };

  return (
    <div className="container">
      <h2 className="my-3">Create a new account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            name="name"
            onChange={onChange}
            value={userData.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={userData.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value={userData.password}
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            value={userData.cpassword}
            minLength={5}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;