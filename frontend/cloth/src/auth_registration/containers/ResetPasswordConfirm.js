import React, { useState } from "react";
import { Link, Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm } from "../actions/auth";

const ResetPasswordConfirm = (props) => {
  const [requestSent, setRequestSent] = useState(false);

  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });

  const { new_password, re_new_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    const uid = props.match.params.uid;
    const token = props.match.params.token;

    props.reset_password_confirm(uid, token, new_password, re_new_password);
    setRequestSent(true);
  };

  if (requestSent) return <Redirect to="/" />;
  return (
    <div>
      <nav className="navbar shadow navbar-expand-lg navbar-dark bg-dark navbar-expand-lg p-4">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <NavLink className="navbar-brand " to exact="/">
            <svg
              width="2em"
              height="2em"
              viewBox="0 0 16 16"
              class="bi bi-bag-fill inline-block align-bottom mr-2"
              fill="orange"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"
              />
            </svg>
            Clothing Solutions
          </NavLink>

          <ul className="navbar-nav mr-auto">
            <li className="nav-item active ">
              <NavLink className="nav-link  mt-3" exact to="/product">
                Store <span className="sr-only ">(current)</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container mt-5">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="New Password"
              name="new_password"
              value={new_password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="Confirm New Password"
              name="re_new_password"
              value={re_new_password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <button className="btn btn-success" type="submit">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
