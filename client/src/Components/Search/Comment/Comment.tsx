import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { addCommentMutation } from "../../../hooks";
import { toast } from "react-toast";
import emailjs from "emailjs-com";

import { charityOwnerQuery } from "../../../hooks";

interface FormValues {
  donorName: string;
  message: string;
}

interface FormErrors {
  donorName?: string;
  message?: string;
}

const Comment = ({
  requestId,
  requestTitle,
  ownerId,
  closeModal,
}: {
  requestId: string;
  requestTitle: string;
  ownerId: string;
  closeModal: () => void;
}) => {
  const [showError, setShowError] = useState(false);
  const { doAddComment, error } = addCommentMutation();
  const { data: charityOwnerData } = charityOwnerQuery(ownerId);
  console.log(charityOwnerData);
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
        const updateValues = {
          ...values,
          requestId,
        };
        console.log(updateValues);
        const { data } = await doAddComment({
          variables: { ...updateValues },
        });
        closeModal();
        const templateParams = {
          to_email: charityOwnerData.charityOwner.email,
          to_name: charityOwnerData.charityOwner.firstName,
          request_name: requestTitle,
          donor_name: values.donorName,
          message: values.message,
        };
        emailjs
          .send(
            "service_1vmuoah",
            "template_0hc3wwj",
            templateParams,
            "user_H55sPMRsY8pP8ln6ice4m"
          )
          .then(
            (response) => {
              console.log("SUCCESS!", response.status, response.text);
            },
            (err) => {
              console.log("FAILED...", err);
            }
          );
        toast.success(`Message recorded successfully`);
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
