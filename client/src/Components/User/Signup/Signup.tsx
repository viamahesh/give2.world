import React, { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { Footer, Header } from "../../Shell";
import { signUp } from "../../../hooks";

import Auth from "../../../services/auth";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

const SignUp = () => {
  const { doSignUp, error } = signUp();
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [error]);

  const validate = (values: FormValues) => {
    setShowError(false);
    const errors: FormErrors = {};
    if (!values.firstName) {
      errors.password = "First name is required";
    }
    if (!values.lastName) {
      errors.password = "Lasst name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        const { data } = await doSignUp({
          variables: { ...values },
        });
        Auth.login(data.login.token);
        navigate("/");
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <div className="framesheet">
      <div className="wrapper">
        <Header />
        <div className="page-container">
          <div className="page-form">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  id="firstName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <span className="error-text">
                    <i className="fas fa-exclamation-circle"></i>
                    {formik.errors.firstName}
                  </span>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  id="lastName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <span className="error-text">
                    <i className="fas fa-exclamation-circle"></i>
                    {formik.errors.lastName}
                  </span>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="charityName">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  id="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <span className="error-text">
                    <i className="fas fa-exclamation-circle"></i>
                    {formik.errors.email}
                  </span>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="missionStatement">Your password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <span className="error-text">
                    <i className="fas fa-exclamation-circle"></i>
                    {formik.errors.password}
                  </span>
                ) : null}
                {showError && (
                  <span className="error-text">
                    <i className="fas fa-exclamation-circle"></i>
                    Sign Up failed. Please try again
                  </span>
                )}
              </div>
              <button type="submit" className="form-button">
                Sign Up
              </button>
            </form>
          </div>
          <div className="page-description">
            <p className="page-text">
              <span className="page-title">New User Sign Up:</span> Please create a user account to register your charitable organization to receive donations.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
