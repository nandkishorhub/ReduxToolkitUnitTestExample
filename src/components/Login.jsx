import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useDispatch } from "react-redux";
import { setAlert } from "../reducers/noteReducer/alertReducer";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const [loginData, setLoginData] = useState({
  //   email: "",
  //   password: "",
  // });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleSubmit2 = async (e) => {
  //   e.preventDefault();
  //   const response = await fetch("http://localhost:5000/api/auth/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(loginData),
  //   });
  //   const jsonData = await response.json();
  //   if (jsonData.success) {
  //     localStorage.setItem("token", jsonData.authtoken);
  //     //props.showAlert("Successfuly logged In", "success");
  //     dispatch(setAlert({ message: "Successfuly logged In", type: "success" }));
  //     navigate("/");
  //   } else {
  //     //props.showAlert("Invalid credentails", "danger");
  //     dispatch(setAlert({ message: "Invalid credentails", type: "success" }));
  //   }
  // };

  // const onChange = (e) => {
  //   setLoginData({ ...loginData, [e.target.name]: e.target.value });
  // };

  const submitForm = async (formData) => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const jsonData = await response.json();
    console.log("JSSON", jsonData);
    if (jsonData.success) {
      localStorage.setItem("token", jsonData.authtoken);
      //props.showAlert("Successfuly logged In", "success");
      dispatch(setAlert({ message: "Successfuly logged In", type: "success" }));
      navigate("/");
    } else {
      //props.showAlert("Invalid credentails", "danger");
      dispatch(setAlert({ message: "Invalid credentails", type: "success" }));
    }
  };

  return (
    <div>
      <h2 className="my-3">Login to continue</h2>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="mb-3 my-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            {...register("email", { required: "This is required." })}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <p className="text-danger">{message}</p>}
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
            data-testid="loginPassword"
            {...register("password", {
              required: "This is required.",
              minLength: { value: 5, message: "Minimum 5 characters long" },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <p className="text-danger">{message}</p>}
          />
        </div>
        <button
          data-testid="loginSubmit"
          type="submit"
          className="btn btn-primary"
          disabled={!isDirty || !isValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
