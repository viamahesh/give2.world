import React from "react";
// import React, { useState, useEffect } from "react";
// import { useMutation } from "@apollo/client";
import { useFormik } from 'formik';

import { Header, Footer } from "../../Shell";
import { type } from "os";
// import { LOGIN_USER } from "../../../graph/mutations";

// import Auth from "../../../services/auth";

interface FormValues {
  email: string;
  password: string;
} 

interface FormErrors {
  email?: string;
  password?: string;
} 

const Login = () => {
  // const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  // const [validated] = useState(false);
  // const [showAlert, setShowAlert] = useState(false);

  // const [login, { error }] = useMutation(LOGIN_USER);

  // useEffect(() => {
  //   if (error) {
  //     setShowAlert(true);
  //   } else {
  //     setShowAlert(false);
  //   }
  // }, [error]);

  // const handleInputChange = (event: any) => {
  //   const { name, value } = event.target;
  //   setUserFormData({ ...userFormData, [name]: value });
  // };

  // const handleFormSubmit = async (event: any) => {
  //   event.preventDefault();

  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }

  //   try {
  //     const { data } = await login({
  //       variables: { ...userFormData },
  //     });

  //     console.log(data);
  //     Auth.login(data.login.token);
  //   } catch (e) {
  //     console.error(e);
  //   }

  //   // clear form values
  //   setUserFormData({
  //     email: "",
  //     password: "",
  //   });
  // };

  const validate = (values: FormValues) => {
    const errors: FormErrors = {};
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } 
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
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
                <label htmlFor="charityName">Your email</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your email"
                  name="email"
                  id="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.errors.email ? <span className="error-text"><i className="fas fa-exclamation-circle"></i>{formik.errors.email}</span> : null}
              </div>
              <div className="form-group">
                <label htmlFor="missionStatement">Your password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Your password"
                  name="password"
                  id="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password ? <span className="error-text"><i className="fas fa-exclamation-circle"></i>{formik.errors.password}</span> : null}
              </div>
              <button type="submit" className="form-button">
                Login
              </button>
            </form>
          </div>
          <div className="page-description">
            <p className="page-text">
              <span className="page-title">Charity Login:</span> Please enter your email address and
                password to access your charity account.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
