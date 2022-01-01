import React, { useEffect, useState, useContext } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { Header, Footer } from '../../Shell';
import { login } from '../../../hooks';

import Auth from '../../../services/auth';
import { UserContext } from '../../../providers';

interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const Login = () => {
  const { doLogin, error } = login();
  const [showError, setShowError] = useState(false);
  const { setUserData } = useContext(UserContext);
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
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
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
      password: '',
    },
    validate,
    onSubmit: async (values) => {
      try {
        const { data } = await doLogin({
          variables: { ...values },
        });
        setUserData(data.login);
        Auth.login(data.login.token);
        navigate('/');
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
                <label htmlFor="charityName">Your email</label>
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
                    Login failed. Please try again
                  </span>
                )}
              </div>
              <button type="submit" className="form-button">
                Login
              </button>
            </form>
          </div>
          <div className="page-description">
            <p className="page-text">
              <span className="page-title">Charity Login:</span> Please enter
              your email address and password to access your charity account.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
