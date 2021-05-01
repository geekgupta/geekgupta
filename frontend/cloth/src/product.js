import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
//import "./inline.css";
import InfiniteScroll from "react-infinite-scroll-component";

import { Makecontext } from "./makecontext";
import { CartContext } from "./contexts/CartContext";
import "./product.css";
import store from "./auth_registration/store";
function Product() {
  const d = store.getState();
  const { addProduct, cartItems, increase } = useContext(CartContext);
  const {val} = useContext(Makecontext);
  const isInCart = (product) => {
    if (d.auth.isAuthenticated) {
      return !!val.find((item) => item.product.id === product.id);
    } else {
      return !!cartItems.find((item) => item.id === product.id);
    }
  };
  const [products, setproducts] = useState([]);
  const [feature, setfeature] = useState([]);
  const [page, setpage] = useState(1);

  useEffect(() => {
    const fetchblog = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/product/?page=${page}`
        );

        setproducts((p) => [...p, ...res.data["results"]]);
      } catch (err) {}
    };
    fetchblog();
  }, [page]);

  const capitalized = (word) => {
    if (word) {
      return word.charAt(0).toUpperCase() + word.slice([1]);
    }

    return "";
  };

  const getproducts = () => {
    let list = [];
    let result = [];
    products.map((product) => {
      return list.push(
        <div className="card mb-4 shadow-sm">
        <div className = "limit">
          <img
            style={{
              display: "block",
              margin: "0 auto 10px",
              maxHeight: "200px",
              maxWidth: "100",
            }}
            className="img-fluid"
            src={product.thumbnail}
            alt="Card image cap"
          />
          </div>
          <span class="card-notify-year">{product.discount}%</span>
          <div className="card-body">
            <strong className="d-inline-block mb-2 text-secondary">
              {capitalized(product.category)}
            </strong>
            <h5 className="card-title">{capitalized(product.product_name)}</h5>
            <h5 className="card-title">
              <span className="text-muted ">Original Price :</span>
              <del>{product.original_price}
              <span className="text-muted"> Rs.</span></del>
             </h5>
            <h4 className="card-title">
              <span className="text-success">Price :</span>
              {product.price}
              <span className="card-text"> Rs.</span>
            </h4>
            <hr className="my-4" />
            <Link
              exact
              to={`/productview/${product.slug}`}
              className=" btn btn-outline-secondary float-left mb-2"
            >
              View
            </Link>
            {isInCart(product) && (
              <button
                onClick={() => increase(product)}
                className="btn btn-outline-success float-right mb-2"
              >
                Add more
              </button>
            )}

            {!isInCart(product) && (
              <button
                onClick={() => addProduct(product)}
                className="btn btn-outline-success float-right mb-2"
              >
                Add to cart
              </button>
            )}
          </div>
        </div>
      );
    });

    for (let i = 0; i < list.length; i += 3) {
      result.push(
        <div className="container">
          <div key={i} className="row">
            <div className="col-md-4">{list[i] ? list[i] : null}</div>
            <div className="col-md-4">{list[i + 1] ? list[i + 1] : null}</div>
            <div className="col-md-4">{list[i + 2] ? list[i + 2] : null}</div>
          </div>
        </div>
      );
    }

    return result;
  };

  return (
    <div className="">
      <div id="myCarousel" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://source.unsplash.com/1201x501/?tshirt,men"
              className="d-block w-100 rounded"
              alt="..."
            />
            <div class="container">
              <div class="carousel-caption text-left">
                <h1>T-Shirts For Men</h1>
                <p>
                  Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                  Donec id elit non mi porta gravida at eget metus. Nullam id
                  dolor id nibh ultricies vehicula ut id elit.
                </p>
                <p>
                  <Link
                    class="btn btn-lg btn-primary"
                    exact
                    path="#"
                    role="button"
                  >
                    Sign up today
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://source.unsplash.com/900x300/?hoodie,men"
              className="d-block w-100 rounded"
              alt="..."
            />
            <div class="container">
              <div class="carousel-caption">
                <h1>Hoodies For Men</h1>
                <p>
                  Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                  Donec id elit non mi porta gravida at eget metus. Nullam id
                  dolor id nibh ultricies vehicula ut id elit.
                </p>
                <p>
                  <Link class="btn btn-lg btn-primary" href="#" role="button">
                    Learn more
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://source.unsplash.com/1201x501/?jeans,men"
              className="d-block w-100 rounded"
              alt="..."
            />
            <div className="container">
              <div className="carousel-caption text-right">
                <h1>Jeans For Men</h1>
                <p>
                  Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                  Donec id elit non mi porta gravida at eget metus. Nullam id
                  dolor id nibh ultricies vehicula ut id elit.
                </p>
                <p>
                  <Link
                    className="btn btn-lg btn-primary"
                    exact
                    path="#"
                    role="button"
                  >
                    Browse gallery
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Link
          className="carousel-control-prev"
          exact
          path="#myCarousel"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </Link>
        <Link
          className="carousel-control-next"
          exact
          path="#myCarousel"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </Link>
      </div>
      <div className="container">
        <div className="jumbotron p-2 p-md-2 text-white rounded bg-dark m-0">
          <div className="col-md-6 p-1 pl-5">
            <h1 className="display-4 font m-0">
              50%<span class="display-8"> off</span>
            </h1>
            <p className="display-5 font mt-1 ">Discount on Top Products</p>
            <p className="lead m-0">
              <Link
                exact
                to="/featured"
                className="text-white font-weight-bold btn btn-sm btn-outline-secondary"
              >
                Continue Shoping...
              </Link>
            </p>
          </div>
        </div>

 {/*discount *

      

<div className="">
      <div id="myCarousel" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          
        </ol>
       
     
        <div class="carousel-inner">
          <div class="carousel-item active">
           
           <div  className="row">
            <div className="col-md-4">
    

   
            
            </div>
             <div className="col-md-4">
           
            
            </div> 
             <div className="col-md-4">
           
            
            </div>
          </div>
          </div>
          
      
          <div class="carousel-item">
           <div  className="row">
            <div className="col-md-4">
           
            
            </div> 
             <div className="col-md-4">
           
            
            </div>
             <div className="col-md-4">
           
            
            </div>
          </div>
          </div>
          
        </div>
        <Link
          className="carousel-control-prev"
          exact
          path="#myCarousel"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </Link>
        <Link
          className="carousel-control-next"
          exact
          path="#myCarousel"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </Link>
      </div>
      </div>


 {/* --end--- */}


        <div className="nav-scroller py-1 mb-2 rounded font-weight-bold m-1">
          <nav className="nav d-flex justify-content-between">
            <Link className="p-2 text-dark " exact to="/product">
              All Product
            </Link>

            <Link className="p-2 text-dark " exact to="category/SHIRTS">
              SHIRTS
            </Link>
            <Link className="p-2 text-dark " exact to="category/HOODIES">
              HOODIES
            </Link>
            <Link className="p-2 text-dark " exact to="category/JEANS">
              JEANS
            </Link>
            <Link className="p-2 text-dark " exact to="category/SHOTS">
              SHOTS
            </Link>
            <Link className="p-2 text-dark  " exact to="category/TROUSERS">
              TROUSERS
            </Link>
            <Link className="p-2 text-dark " exact to="category/JACKET">
              JACKET
            </Link>
            <Link className="p-2 text-dark " exact to="category/TSHIRTS">
              TSHIRTS
            </Link>
            <Link className="p-2 text-dark " exact to="category/PANT">
              PANT
            </Link>
            <Link className="p-2 text-dark" exact to="category/UNDERWEAR">
              UNDERWEAR
            </Link>
            <Link className="p-2 text-dark " exact to="category/DENIM">
              DENIM
            </Link>
          </nav>
        </div>
      </div>

      {getproducts()}
      <nav
        aria-label="..."
        className=" d-flex unlock-item  justify-content-center mt-5 mb-5"
      >
        <button
          className="btn btn-outline-success mt-2  mb-2"
          onClick={() => setpage(page + 1)}
        >
          <i className="fa fa-chevron-circle-down" aria-hidden="true"></i>
          <span></span>Load More ....
        </button>
      </nav>

      <footer className="blog-footer">
        <p>
          Clothing solution built for Shoping by{" "}
          <a href="http://guptron.pythonanywhere.com/">Guptron</a>.
        </p>
        <p>
          <a href="#myCarousel">Back to top</a>
        </p>
      </footer>
    </div>
  );
}

export default Product;
