import { Link, NavLink } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "./contexts/CartContext";
import axios from "axios";
function SearchView(props) {
  const { addProduct, cartItems, increase } = useContext(CartContext);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };
  const [product, setproduct] = useState([]);
  const [page, setpage] = useState(1);
  const capitalized = (word) => {
    if (word) {
      return word.charAt(0).toUpperCase() + word.slice([1]);
    }

    return "";
  };
  useEffect(() => {
    const fetchdata = async () => {
      const slug = props.match.params.id;
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/product/api/query?page=${page}&search=${slug}`
        );
        setproduct((p) => [...p, ...res.data["results"]]);
        console.log(slug);
      } catch (err) {}
    };
    fetchdata();
  }, [page, props.match.params.id]);

  const getresult = () => {
    let list = [];
    let result = [];
    product.map((prduct) => {
      return list.push(
        <div className="row  p-2 bg-light rounded">
          <div className="col-md-6 float-left">
            <div className="card m-auto ">
             <div className = "limit">
              <img
                style={{
                  display: "block",
                  margin: "0 auto 10px",
                  maxHeight: "200px",
                  maxWidth: "200",
                }}
                className="img-fluid  bg-light"
                src={prduct.thumbnail}
                alt=""
              />
              </div>
            </div>
          </div>
          <div
            className="col-md-6 d-flex flex-column float-right position-static"
            style={{ height: "230px" }}
          >
            <strong className="d-inline-block mb-2 text-secondary">
              {capitalized(prduct.category)}
            </strong>
            <h3 className="mb-0">{capitalized(prduct.product_name)}</h3>
            <div className="mb-1 mt-1 text-dark display-5">
              <h5>
                <span className="text-success">Price :</span> {prduct.price}
                <strong>
                  <span className="text-muted"> Rs.</span>
                </strong>
              </h5>
            </div>
            <p className="card-text mb-auto">{prduct.description}</p>
            <div className=" text-primary display-6 ">
              <Link
                exact
                to={`/productview/${prduct.slug}`}
                className=" btn btn-outline-secondary float-left"
              >
                View
              </Link>
              {isInCart(prduct) && (
                <button
                  onClick={() => increase(prduct)}
                  className="btn btn-outline-success float-right"
                >
                  Add more
                </button>
              )}

              {!isInCart(prduct) && (
                <button
                  onClick={() => addProduct(prduct)}
                  className="btn btn-outline-success float-right"
                >
                  Add to cart
                </button>
              )}
            </div>
            <hr className="my-4 border-danger" />
          </div>
        </div>
      );
    });

    for (let i = 0; i < list.length; i += 1) {
      result.push(
        <div key={i} className="row mb-3">
          <div className="col-md-7 m-auto">{list[i]}</div>
        </div>
      );
    }

    return result;
  };

  return (
    <div className="container ">
      <div className="col-md-12 mt-5">{getresult()}</div>
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

export default SearchView;
