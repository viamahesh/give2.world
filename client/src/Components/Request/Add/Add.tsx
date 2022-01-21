import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
// @ts-ignore
import MaskedInput from 'react-text-mask';
import { toast } from 'react-toast';

import { Header, Footer } from '../../Shell';
import { addRequestMutation, charityQuery } from '../../../hooks';

import './add.css';

interface FormValues {
  requestTitle: string;
  requestDescription: string;
  neededDate: string;
}

interface FormErrors {
  requestTitle?: string;
  requestDescription?: string;
  neededDate?: string;
}

const AddRequest: React.FC = () => {
  const { charityId } = useParams();
  const navigate = useNavigate();
  const { doAddRequest, error } = addRequestMutation();
  const { loading, data } = charityQuery(charityId);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [error]);

  const isFutureDate = (date: string) => {
    let dateArr: string[] = date.split('-');
    let inputDate = new Date(`${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`);
    let currentDate = new Date();
    return inputDate > currentDate ? true : false;
  };

  const validate = (values: FormValues) => {
    setShowError(false);
    const errors: FormErrors = {};
    if (!values.requestTitle || values.requestTitle.length < 5) {
      errors.requestTitle = 'Title name is required';
    }
    if (!values.requestDescription || values.requestDescription.length < 5) {
      errors.requestDescription = 'Description is required';
    }
    if (values.neededDate && !isFutureDate(values.neededDate)) {
      errors.neededDate = 'Needed date must be in the future';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      requestTitle: '',
      requestDescription: '',
      neededDate: '',
    },
    validate,
    onSubmit: async (values) => {
      try {
        const updateValues = {
          ...values,
          isFulfilled: false,
          comments: [],
          charity_ID: charityId,
        };
        const { data } = await doAddRequest({
          variables: { ...updateValues },
        });
        toast.success(`Request added successfully`);
        navigate('/request/list/' + charityId);
      } catch (e) {
        console.log(e);
      }
    },
  });

  if (loading) return <span className="loading-ani"></span>;

  return (
    <div className="framesheet">
      <div className="wrapper">
        <Header breadcrumb={[{
          title: "Manage Requests",
          link: "/request/list/" + charityId
        }, "Request Stuff"]} />
        <div className="page-container">
          {data.charity.charityName && (
            <p className="default-text">
              <i className="fas fa-desktop"></i>Your are requesting donations
              for{" "}
              <span className="text-bold highlight-text">
                {data.charity.charityName}
              </span>
            </p>
          )}
          <div className="page-form">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label htmlFor="requestTitle">Request Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="requestTitle"
                  name="requestTitle"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.requestTitle}
                />
                {formik.touched.requestTitle && formik.errors.requestTitle ? (
                  <span className="error-text">
                    <i className="fas fa-exclamation-circle"></i>
                    {formik.errors.requestTitle}
                  </span>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="requestDescription">Request Description</label>
                <textarea
                  className="form-textarea"
                  name="requestDescription"
                  id="requestDescription"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.requestDescription}
                ></textarea>
                {formik.touched.requestDescription &&
                formik.errors.requestDescription ? (
                  <span className="error-text">
                    <i className="fas fa-exclamation-circle"></i>
                    {formik.errors.requestDescription}
                  </span>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="neededDate">
                  Needed on or before (MM-DD-YYYY)
                </label>
                <MaskedInput
                  mask={[
                    /\d/,
                    /\d/,
                    "-",
                    /\d/,
                    /\d/,
                    "-",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                  type="text"
                  className="form-control"
                  id="neededDate"
                  name="neededDate"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.neededDate}
                />
                {formik.touched.neededDate && formik.errors.neededDate ? (
                  <span className="error-text">
                    <i className="fas fa-exclamation-circle"></i>
                    {formik.errors.neededDate}
                  </span>
                ) : null}
                {showError && (
                  <span className="error-text">
                    <i className="fas fa-exclamation-circle"></i>
                    Operation failed. Please try again
                  </span>
                )}
              </div>
              <button type="submit" className="form-button">
                Request
              </button>
            </form>
          </div>
          <div className="page-description">
            <p className="page-text">
              <span className="page-title">Request Stuff:</span> Asking
              individuals for donations is one of the most common fundraising
              strategies used by nonprofits. Use this form to request donations
              to your institution.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddRequest;
