import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import { toast } from "react-toastify";
import toastConfig from "./toastConfig";

const Form = ({ formTitle, fields, submitText, url, navigateTo }) => {
  const navigate = useNavigate();

  const fieldList = fields.map((field) => {
    return field.name;
  });

  const [inputValues, setInputValues] = useState(
    fieldList.reduce((acc, field) => {
      return { ...acc, [field]: "" };
    }, {})
  );

  useEffect(() => {
    if (inputValues.password && inputValues.confirmPassword) {
      let confPass = document.querySelector("#confirmPassword");
      if (inputValues.password !== inputValues.confirmPassword) {
        confPass.setCustomValidity("Passwords do not match");
        confPass.className = "invalid";
      } else {
        confPass.setCustomValidity("");
        confPass.className = "valid";
      }
    }
  }, [inputValues]);

  const handleError = (error) => {
    toast.error(error, toastConfig);
  };
  const handleSuccess = (message) => {
    toast.success(message, toastConfig);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if password and confirmPassword match
    if (
      fieldList.includes("confirmPassword") &&
      inputValues.password !== inputValues.confirmPassword
    ) {
      handleError("Passwords do not match");
      return;
    }

    // filter inputValues to remove any fields that have dontSend: true
    const filteredInputValues = Object.keys(inputValues).reduce((acc, key) => {
      if (fields.find((field) => field.name === key).dontSend) {
        return acc;
      }
      return { ...acc, [key]: inputValues[key] };
    }, {});

    try {
      const data = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filteredInputValues),
        credentials: "include",
      });

      // rate limiting
      if (data.status === 429) {
        handleError(await data.text());
        return;
      }

      const { success, message } = await data.json();
      if (success) {
        handleSuccess(message);
        navigate(navigateTo);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError("An error occurred. Please try again later.");
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  return (
    <div id="formContainer">
      <h2 id="formTitle">{formTitle}</h2>

      <form id="form" onSubmit={handleSubmit}>
        {fields.map((field) => {
          return (
            <React.Fragment key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                type={field.type || field.name}
                id={field.id || field.name}
                name={field.name}
                required={field.required}
                value={inputValues[field.name]}
                placeholder={field.placeholder || field.label}
                onChange={handleOnChange}
              />
            </React.Fragment>
          );
        })}
        <button type="submit" id="formSubmitBtn">
          {submitText}
        </button>
      </form>
    </div>
  );
};

export default Form;
