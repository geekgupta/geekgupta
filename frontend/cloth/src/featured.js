import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../node_modules/axios";
import { CartContext } from "./contexts/CartContext";
import "./product.css";

function Featured(props) {
  const { addProduct, cartItems, increase } = useContext(CartContext);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };
  const [products, setproducts] = useState([]);
  const [page, setpage] = useState(1);
  useEffect(() => {
    const fetchblog = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/product/offer?page=${page}`
        );
        setproducts((p) => [...p, ...res.data["results"]]);
        console.log(res.data);
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
    products.map((pro) => {
      return list.push(
        <div className="card ho mb-4 shadow-sm">
        <div className = "limit">
          <img
            style={{
              display: "block",
              margin: "0 auto 10px",
              maxHeight: "200px",
              maxWidth: "100",
            }}
            className="img-fluid"
            src={pro.thumbnail}
            alt="Card image cap"
          />
          </div>
           <span class="card-notify-year">{pro.discount}%</span>
          <div className="card-body">
            <strong className="d-inline-block mb-2 text-secondary">
              {capitalized(pro.category)}
            </strong>
            <h5 className="text-success">{capitalized(pro.product_name)}</h5>
            <h5 className="card-title">
              <span className="text-muted ">Original Price :</span>
              <del>{pro.original_price}
              <span className="text-muted"> Rs.</span></del>
             </h5>
            <h4 className="card-title">
              <span className="text-success">Price :</span>
              {pro.price}
              <span className="card-text"> Rs.</span>
            </h4>
            <hr className="my-4" />
            <Link
              exact
              to={`/productview/${pro.slug}`}
              className=" btn btn-outline-secondary float-left mb-2"
            >
              View
            </Link>
            {isInCart(pro) && (
              <button
                onClick={() => increase(pro)}
                className="btn btn-outline-success float-right mb-2"
              >
                Add more
              </button>
            )}

            {!isInCart(pro) && (
              <button
                onClick={() => addProduct(pro)}
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
    <div className="container">
      <h1 className="display-4 text-center">Featured</h1>
      <div className="alert alert-success" role="alert">
  This is a success alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
</div>
      {getproducts()}
      <nav
        aria-label="..."
        className=" d-flex unlock-item  justify-content-center mt-5 mb-5"
      >
        <button
          className="btn btn-outline-success mt-5  mb-5"
          onClick={() => setpage(page + 1)}
        >
          Load More ....
        </button>
      </nav>
    </div>
  );
}

export default Featured;
