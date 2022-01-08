import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFormik } from 'formik';
// import { toast } from 'react-toast';

import { Header, Footer } from '../../Shell';
// import { addCharityMutation, charityQuery } from '../../../hooks';

import './add.css';

interface FormValues {
  requestTitle: string;
  requestDescription: string;
  neededDate: Date | null;
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
  const [neededDate, setNeededDate] = useState<Date | null>(new Date());

  // useEffect(() => {
  //   if (error) {
  //     setShowError(true);
  //   } else {
  //     setShowError(false);
  //   }
  // }, [error]);

  const validate = (values: FormValues) => {
    setShowError(false);
    const errors: FormErrors = {};
    if (!values.requestTitle) {
      errors.requestTitle = 'Title name is required';
    }
    if (!values.requestDescription) {
      errors.requestDescription = 'Description is required';
    }
    if (!values.neededDate) {
      errors.neededDate = 'Date is required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      requestTitle: '',
      requestDescription: '',
      neededDate: neededDate
    },
    enableReinitialize: true,
    validate,
    onSubmit: async (values) => {
      try {
        console.log(values);
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
                <label htmlFor="neededDate">Needed on or before</label>
                <DatePicker selected={neededDate} onChange={(date) => setNeededDate(date)} />
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
