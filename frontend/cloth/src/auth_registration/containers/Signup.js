import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect, NavLink } from "react-router-dom";
import { signup } from "../actions/auth";

const Signup = ({ signup, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
  });

  const [accountCreated, setAccountCreated] = useState(false);

  const { name, email, password, re_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password === re_password) {
      signup({ name, email, password, re_password });
      setAccountCreated(true);
    }
  };

  if (isAuthenticated) return <Redirect to="/" />;
  if (accountCreated) return <Redirect to="login" />;

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
      <div className="container ">
        <div className="row justify-content-center align-items-center mt-3 ">
          <div className="col-10 col-md-8 col-lg-4 bg-light pb-5 pt-5 pl-3 pr-3 mt-5">
            <div className="panel panel-primary mt-1">
              <div className="panel-heading">
                <h4 className=" text-center mb-5 ">
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
                  <span>Clothing Solutions </span>
                </h4>
                <h1>Sign Up</h1>
                <p>Create your Account</p>
              </div>
              <div className="panel-body">
                <form onSubmit={(e) => onSubmit(e)}>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Name*"
                      name="name"
                      value={name}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Email*"
                      name="email"
                      value={email}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Password*"
                      name="password"
                      value={password}
                      onChange={(e) => onChange(e)}
                      minLength="6"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Confirm Password*"
                      name="re_password"
                      value={re_password}
                      onChange={(e) => onChange(e)}
                      minLength="6"
                      required
                    />
                  </div>
                  <button className="btn btn-success" type="submit">
                    Register
                  </button>
                </form>
                <p className="mt-3">
                  Already have an account? <Link to="/login">Sign In</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Signup);
