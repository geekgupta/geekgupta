import React, { useState } from "react";
//import { Redirect } from 'react-router-dom';
import { Link, Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../actions/auth";

const Activate = (props) => {
  const [verified, setVerified] = useState(false);

  const verify_account = (e) => {
    const uid = props.match.params.uid;
    const token = props.match.params.token;

    props.verify(uid, token);
    setVerified(true);
  };

  if (verified) return <Redirect to="/" />;
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
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "200px",
          }}
        >
          <h1>Verify your Account:</h1>
          <button
            onClick={verify_account}
            style={{ marginTop: "50px" }}
            type="button"
            className="btn btn-success"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { verify })(Activate);
