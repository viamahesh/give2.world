import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import MaskedInput from 'react-text-mask';
// import { toast } from 'react-toast';

import { Header, Footer } from '../../Shell';
// import { addCharityMutation, charityQuery } from '../../../hooks';

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
  const navigate = useNavigate();
  // const { doAddCharity, error } = addCharityMutation();
  const [showError, setShowError] = useState(false);

  // useEffect(() => {
  //   if (error) {
  //     setShowError(true);
  //   } else {
  //     setShowError(false);
  //   }
  // }, [error]);

  const isFutureDate = (date: string) => {
    let dateArr: string[] = date.split("-");
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
      neededDate: ''
    },
    enableReinitialize: true,
    validate,
    onSubmit: async (values) => {
      try {
        console.log(values.neededDate);
        // const { data } = await doAddCharity({
        //   variables: { ...values },
        // });
        // toast.success(`${data.addCharity.charityName} added successfully`);
        // navigate('/charity/list');
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <div className="framesheet">
      <div className="wrapper">
        <Header breadcrumb={["Request Stuff"]} />
        <div className="page-container">
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
                <input
                  type="text"
                  className="form-control"
                  id="requestDescription"
                  name="requestDescription"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.requestDescription}
                />
                {formik.touched.requestDescription && formik.errors.requestDescription ? (
                  <span className="error-text">
                    <i className="fas fa-exclamation-circle"></i>
                    {formik.errors.requestDescription}
                  </span>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="neededDate">Needed on or before (MM-DD-YYYY)</label>
                <MaskedInput
                  mask={[/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
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
              </div>
              <button type="submit" className="form-button">
                Request
              </button>
            </form>
          </div>
          <div className="page-description">
            <p className="page-text">
              <span className="page-title">Add Your Charity:</span> If your
              institution does not have a website or an online donation
              facility, Give2World can help. In fact, even if you have an online
              donation facility, it is still important that you register with us
              in order to maximise your online donations. If your charity is not
              yet listed within the Give2World directory this is not a problem,
              simply complete the form below.
            </p>
            <p className="page-text">
              We will verify your details and contact you once your institution
              have been added to the Give2World Directory.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddRequest;
