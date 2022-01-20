import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import MaskedInput from 'react-text-mask';
import { toast } from 'react-toast';

import { Header, Footer } from '../../Shell';
import { addCharityMutation } from '../../../hooks';

import AuthService from '../../../services/auth';

import './add.css';

interface FormValues {
  charityName: string;
  missionStatement: string;
  charityType: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  owner_ID: string;
}

interface FormErrors {
  charityName?: string;
  address1?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
}

const AddCharity: React.FC = () => {
  const navigate = useNavigate();
  const user: any = AuthService.getProfile();
  const userId = user.data._id;
  const { doAddCharity, error } = addCharityMutation();
  const [showError, setShowError] = useState(false);
  const phoneNumberMask = [
    '(',
    /[1-9]/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];

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
    if (!values.charityName) {
      errors.charityName = 'Charity name is required';
    }
    if (!values.address1) {
      errors.address1 = 'Address 1 is required';
    }
    if (!values.city) {
      errors.city = 'City is required';
    }
    if (!values.state) {
      errors.state = 'State is required';
    }
    if (!values.zipCode) {
      errors.zipCode = 'Zip Code is required';
    } else if (!/(^\d{5}$)|(^\d{5}-\d{4}$)/i.test(values.zipCode)) {
      errors.zipCode = 'Invalid zip code';
    }
    if (!values.contactPerson) {
      errors.contactPerson = 'Contact Person is required';
    }
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.phone) {
      errors.phone = 'Phone is required';
    } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(values.phone)) {
      errors.phone = 'Invalid phone number';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      charityName: '',
      missionStatement: '',
      charityType: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      contactPerson: '',
      email: '',
      phone: '',
      website: '',
      owner_ID: userId
    },
    validate,
    onSubmit: async (values) => {
      try {
        const { data } = await doAddCharity({
          variables: { ...values },
        });
        toast.success(`${data.addCharity.charityName} added successfully`);
        navigate('/charity/list');
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <div className="framesheet">
      <div className="wrapper">
        <Header breadcrumb={["Add Charity"]} />
        <div className="page-container">
          <div className="page-form">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label htmlFor="charityName">Charity Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="charityName"
                  name="charityName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.charityName}
                />
                {formik.touched.charityName && formik.errors.charityName ? (
                  <span className="error-text">
                    <i className="fas fa-exclamation-circle"></i>
                    {formik.errors.charityName}
                  </span>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="missionStatement">Mission Statement</label>
                <input
                  type="text"
                  className="form-control"
                  id="missionStatement"
                  name="missionStatement"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.missionStatement}
                />
              </div>
              <div className="form-group select-container">
                <label htmlFor="charityType">Charity Type</label>
                <select
                  id="charityType"
                  name="charityType"
                  value={formik.values.charityType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="animalServices">Animal Services</option>
                  <option value="children">Children</option>
                  <option value="humanRights">Civil and Human Rights</option>
                  <option value="education">Education</option>
                  <option value="health">Health</option>
                  <option value="humanServices">Human Services</option>
                  <option value="other">Other</option>
                </select>
                <div className="select-icon">
                  <i className="fas fa-sort-down"></i>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="address1">Address 1</label>
                <input
                  type="text"
                  className="form-control"
                  id="address1"
                  name="address1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address1}
                />
                {formik.touched.address1 && formik.errors.address1 ? (
                  <span className="error-text">
                    <i className="fas fa-exclamation-circle"></i>
                    {formik.errors.address1}
                  </span>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="address2">Address 2</label>
                <input
                  type="text"
                  className="form-control"
                  id="address2"
                  name="address2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address2}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                />
                {formik.touched.city && formik.errors.city ? (
                  <span className="error-text">
                    <i className="fas fa-exclamation-circle"></i>
                    {formik.errors.city}
                  </span>
                ) : null}
              </div>
              <div className="form-group select-container">
                <label htmlFor="state">State</label>
                <select
                  id="state"
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
                <div className="select-icon">
                  <i className="fas fa-sort-down"></i>
                </div>
                {formik.touched.state && formik.errors.state ? (
                  <span className="error-text">
                    <i className="fas fa-exclamation-circle"></i>
                    {formik.errors.state}
                  </span>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">Zip Code</label>
                <MaskedInput
                  mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
                  type="text"
                  className="form-control"
                  id="zipCode"
                  name="zipCode"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.zipCode}
                />
                {formik.touched.zipCode && formik.errors.zipCode ? (
                  <span className="error-text">
                    <i className="fas fa-exclamation-circle"></i>
                    {formik.errors.zipCode}
                  </span>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="contactPerson">Contact Person</label>
                <input
                  type="text"
                  className="form-control"
                  id="contactPerson"
                  name="contactPerson"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.contactPerson}
                />
                {formik.touched.contactPerson && formik.errors.contactPerson ? (
                  <span className="error-text">
                    <i className="fas fa-exclamation-circle"></i>
                    {formik.errors.contactPerson}
                  </span>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
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
                <label htmlFor="phone">Phone</label>
                <MaskedInput
                  mask={phoneNumberMask}
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <span className="error-text">
                    <i className="fas fa-exclamation-circle"></i>
                    {formik.errors.phone}
                  </span>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  className="form-control"
                  id="website"
                  name="website"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.website}
                />
                {showError && (
                  <span className="error-text">
                    <i className="fas fa-exclamation-circle"></i>
                    Operation failed. Please try again
                  </span>
                )}
              </div>
              <button type="submit" className="form-button">
                Add
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

export default AddCharity;
