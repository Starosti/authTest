import { Link, useNavigate } from "react-router-dom";
import Form from "./Form";
import "./Login.css";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import toastConfig from "./toastConfig";

const Login = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies([]);

  useEffect(() => {
    if (cookies.token) {
      navigate("/");
      toast.error("You are already logged in!", toastConfig);
    }
  }, [cookies, navigate]);

  return (
    <div id="loginForm">
      <Form
        url="http://localhost:5000/login"
        navigateTo="/"
        fields={[
          {
            name: "email",
            label: "Email",
            required: true,
          },
          {
            name: "password",
            label: "Password",
            required: true,
          },
        ]}
        formTitle="Log In"
        submitText="Log In"
      />
      <div>
        Do not have an account yet? <Link to="/signup">Sign up here!</Link>
      </div>
    </div>
  );
};

export default Login;
