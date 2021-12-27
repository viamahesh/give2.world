import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import "./add.css";

import { Header, Footer } from "../../Shell";

import { QUERY_CHARITIES } from "../../../graph/queries";
import { ADD_CHARITY } from "../../../graph/mutations";

const AddCharity: React.FC = () => {
  const { loading, data } = useQuery(QUERY_CHARITIES);
  const [addCharity, { error }] = useMutation(ADD_CHARITY);
  const charitiesList = data?.charities || [];

  const [formData, setFormData] = useState({
    charityName: "",
    missionStatement: "",
    charityType: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const { data } = await addCharity({
        variables: { ...formData },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="framesheet">
      <div className="wrapper">
        <Header />
        <div className="page-container">
          <div className="page-form">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="charityName">Charity Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="charityName"
                  name="charityName"
                  placeholder="Charity Name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="missionStatement">Mission Statement</label>
                <input
                  type="text"
                  className="form-control"
                  id="missionStatement"
                  name="missionStatement"
                  placeholder="Mission Statement"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="charityType">Charity Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="charityType"
                  name="charityType"
                  placeholder="Charity Type"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address1">Address 1</label>
                <input
                  type="text"
                  className="form-control"
                  id="address1"
                  name="address1"
                  placeholder="Address 1"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address2">Address 2</label>
                <input
                  type="text"
                  className="form-control"
                  id="address2"
                  name="address2"
                  placeholder="Address 2"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  placeholder="City"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  name="state"
                  placeholder="State"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">Zip Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="zipCode"
                  name="zipCode"
                  placeholder="Zip Code"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactPerson">Contact Person</label>
                <input
                  type="text"
                  className="form-control"
                  id="contactPerson"
                  name="contactPerson"
                  placeholder="Contact Person"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  className="form-control"
                  id="website"
                  name="website"
                  placeholder="Website"
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="form-button">
                Add
              </button>
            </form>
          </div>
          <div className="page-description">
            <p className="page-text">
              <span className="page-title">Add Your Charity:</span> If your institution does not have a website or an online donation
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
