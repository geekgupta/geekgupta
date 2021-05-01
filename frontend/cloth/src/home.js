import React from "react";
import { Link } from "react-router-dom";
import "./homepage.css";
import shop from './shoping.png';

function Home() {
  return (
    <div className="homepage">
      <div className="banner">
        <div className="description">
          <h1 className="display-4 cha">
            <a>Clothing Solutions</a>
          </h1>
          <p className="mt-3 text-secondary">
            We provides Quality Products to Our Customers.
            <br />
            This site is only for men's wears.
          </p>
          <Link
            exact
            to="/product"
            className="btn btn-outline-secondary btn-lg mt-3 text-white"
          >
            Shop Now
          </Link>
        </div>
        <div className="img-section">
          <img
            style={{
              display: "block",
              margin: "0 auto 10px",
              maxHeight: "400px",
              maxWidth: "400",
            }}
            className="img-fluid"
            src={shop}
            alt="Card image cap"
          />
        </div>
      </div>
      <div className="wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill=" #424949 "
            fill-opacity="1"
            d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default Home;
