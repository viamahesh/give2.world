import React, { useState } from "react";
import { useFormik } from "formik";

interface FormValues {
  donorName: string;
  message: string;
}

interface FormErrors {
  donorName?: string;
  message?: string;
}

const Comment = () => {
  const [showError, setShowError] = useState(false);

  const validate = (values: FormValues) => {
    setShowError(false);
    const errors: FormErrors = {};
    if (!values.donorName || values.donorName.length < 5) {
      errors.donorName = "Name is required";
    }
    if (!values.message || values.message.length < 5) {
      errors.message = "Message is required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      donorName: "",
      message: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        // const updateValues = {
        //   ...values,
        //   isFulfilled: false,
        //   comments: [],
        //   charity_ID: charityId,
        // };
        // const { data } = await doAddRequest({
        //   variables: { ...updateValues },
        // });
        // toast.success(`Request added successfully`);
        // navigate('/request/list/' + charityId);
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="donorName">Donor Name</label>
          <input
            type="text"
            className="form-control"
            id="donorName"
            name="donorName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.donorName}
          />
          {formik.touched.donorName && formik.errors.donorName ? (
            <span className="error-text">
              <i className="fas fa-exclamation-circle"></i>
              {formik.errors.donorName}
            </span>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            className="form-textarea"
            name="message"
            id="message"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            placeholder="Message to the charity. Please include at least one contact detail..."
          ></textarea>
          {formik.touched.message && formik.errors.message ? (
            <span className="error-text">
              <i className="fas fa-exclamation-circle"></i>
              {formik.errors.message}
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
          Send
        </button>
      </form>
    </>
  );
};

export default Comment;
