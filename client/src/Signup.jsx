import { Link } from "react-router-dom";
import Form from "./Form";
import "./Signup.css";
const Signup = () => {
  return (
    <div id="signupForm">
      <Form
        url="http://localhost:5000/signup"
        navigateTo="/"
        fields={[
          {
            name: "username",
            label: "Username",
            required: true,
          },
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

          {
            name: "confirmPassword",
            type: "password",
            label: "Confirm Password",
            required: true,
            dontSend: true,
          },
        ]}
        formTitle="Sign Up"
        submitText="Sign Up"
      />
      <div>
        Already have an account? <Link to="/login">Log in here!</Link>
      </div>
    </div>
  );
};

export default Signup;
