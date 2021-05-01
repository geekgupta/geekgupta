import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
function Blog() {
  const [blogs, setblogs] = useState([]);
  const [feature, setfeature] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/featured");
        setfeature(res.data[0]);
      } catch (err) {}
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const fetchblog = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/");
        setblogs(res.data);
      } catch (err) {}
    };
    fetchblog();
  }, []);

  const capitalized = (word) => {
    if (word) {
      return word.charAt(0).toUpperCase() + word.slice([1]);
    }

    return "";
  };

  const getblogs = () => {
    let list = [];
    let result = [];
    blogs.map((blogpost) => {
      return list.push(
        <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div className="col p-4 d-flex flex-column position-static">
            <strong className="d-inline-block mb-2 text-white">
              {capitalized(blogpost.category)}
            </strong>
            <h3 className="mb-0">{blogpost.title}</h3>
            <div className="mb-1 text-muted">
              {blogpost.month} {blogpost.day}
            </div>
            <p className="card-text mb-auto">{blogpost.excerpt}</p>
            <Link
              exact
              to={`/blog/${blogpost.slug}`}
              className="stretched-link btn btn-outline-secondary"
            >
              Continue reading
            </Link>
          </div>
          <div className="col-auto d-none d-lg-block">
            <img
              className="bd-placeholder-img"
              width="200"
              height="200"
              alt=""
              src={blogpost.thumbnail}
              aria-label="Placeholder: Thumbnail"
            />
          </div>
        </div>
      );
    });

    for (let i = 0; i < list.length; i += 2) {
      result.push(
        <div key={i} className="row mb-2">
          <div className="col-md-6">{list[i]}</div>
          <div className="col-md-6">{list[i + 1] ? list[i + 1] : null}</div>
        </div>
      );
    }

    return result;
  };

  return (
    <div className="container">
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleCaptions"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://www.w3schools.com/images/w3schools_green.jpg"
              className="d-block w-100 h-50"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src="..." className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="..." className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </div>
          </div>
        </div>

        <NavLink
          className="carousel-control-prev"
          to
          exact="#carouselExampleCaptions"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </NavLink>
        <NavLink
          className="carousel-control-next"
          to
          exact="#carouselExampleCaptions"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </NavLink>
      </div>

      <div
        className="nav-scroller py-1 mt-3 mb-3 bg-secondary rounded font-weight-bold"
        disabled
      >
        <nav className="nav d-flex justify-content-between ">
          <Link className="p-2 text-white " exact to="category/WORLD">
            World
          </Link>

          <Link className="p-2 text-white " exact to="category/technology">
            Technology
          </Link>
          <Link className="p-2 text-white " exact to="category/design">
            Design
          </Link>
          <Link className="p-2 text-white " exact to="category/culture">
            Culture
          </Link>
          <Link className="p-2 text-white " exact to="category/business">
            Business
          </Link>
          <Link className="p-2 text-white " exact to="category/political">
            Politics
          </Link>
          <Link className="p-2 text-white " exact to="category/opinion">
            Opinion
          </Link>
          <Link className="p-2 text-white " exact to="category/science">
            Science
          </Link>
          <Link className="p-2 text-white " exact to="category/health">
            Health
          </Link>
          <Link className="p-2 text-white " exact to="category/style">
            Style
          </Link>
          <Link className="p-2 text-white " exact to="category/travel">
            Travel
          </Link>
          <Link
            className="p-2 text-white "
            exact
            to="category/computer science"
          >
            Computer Science
          </Link>
        </nav>
      </div>
      <div className="jumbotron p-4 p-md-5 text-white rounded bg-dark">
        <div className="col-md-6 px-0">
          <h1 className="display-4 font">{capitalized(feature.title)}</h1>
          <p className="lead my-3">{feature.excerpt}</p>
          <p className="lead mb-0">
            <Link
              exact
              to="/blogpost"
              className="text-white font-weight-bold btn btn-sm btn-outline-secondary"
            >
              Continue reading...
            </Link>
          </p>
        </div>
      </div>
      {getblogs()}
      <nav
        aria-label="..."
        className=" d-flex unlock-item m-auto justify-content-center"
      >
        <ul className="pagination pagination-m">
          <li className="page-item active" aria-current="page">
            <span className="page-link">
              1<span className="sr-only">(current)</span>
            </span>
          </li>
          <li className="page-item">
            <NavLink className="page-link" to exact="#">
              2
            </NavLink>
          </li>
          <li className="page-item">
            <NavLink className="page-link" to exact="#">
              3
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="card" style={{ width: "18rem" }}>
        <img className="card-img-top" src="..." alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <NavLink to exact="#" class="btn btn-primary">
            Add Cart
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Blog;
