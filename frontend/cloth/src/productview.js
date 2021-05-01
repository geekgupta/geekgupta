import React, { useState, useEffect,useContext } from "react";
import { Link, NavLink, Redirect , useHistory} from "react-router-dom";
import { connect } from "react-redux";
import store from "./auth_registration/store";
import { cart_data } from "./contexts/CartReducer";
import {useCookies} from 'react-cookie' ; 
import Cookies from 'universal-cookie' ; 
import { CartContext } from "./contexts/CartContext";

import axios from "axios";
function ProductView(props) {
  //const[cookies,setcookies] = useCookies(['name']);
  const { addProduct, cartItems, increase } = useContext(CartContext);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };
  const [product, setproduct] = useState([]);
  const [quant, setquant] = useState(1);
  const state = store.getState();
  const cookies = new Cookies() ; 
  const h = useHistory() ; 
  console.log(state.auth.isAuthenticated);
 
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
        const res = await axios.get(`http://127.0.0.1:8000/product/${slug}`);
        setproduct(res.data);
        console.log(slug);
      } catch (err) {}
    };
    fetchdata();
  }, [props.match.params.id]);
   function check() {
    if (state.auth.isAuthenticated) {
      cookies.remove('ordered_product');
      cookies.remove('ordered_product_cart');
      cookies.set('ordered_product', {"product_id":product.id,"product_name":product.product_name,"thumbnail":product.thumbnail,"description":product.description,"price_ht":product.price,'quantity':quant}) ;
      return h.push('/checkout') 
    } else {
      
      return h.push('/login') 
    }
  }
  function increas() {
      setquant(quant+1);
    }
  function decrease() {
    if (quant >=2){
    setquant(quant-1);
  }
  }
  
  const creatblog = () => {
    return { __html: product.content };
  };
  return (
    <div className="container ">
      <div className="col-md-12 mt-5 card border-gray shadow-sm">
        <section className="panel  rounded-3 p-4">
          <div className="row ">
            <div className="col-md-6 ">
              <div className="card limit m-auto border-l-2 shadow-sm ">

                <img
                  style={{
                    display: "block",
                    margin: "0 auto 10px",
                    maxHeight: "280px",
                    maxWidth: "280",
                  }}
                  className="img-fluid  bg-light"
                  src={product.thumbnail}
                  alt=""
                />
              </div>
            </div>
            <div className="col-md-6 ">
              <h4 className="display-5">{capitalized(product.product_name)}</h4>
              <p className = "text-success">{product.description}</p>
              <div className="product_meta">
                <h5 className="posted_in">
                  <strong>Categories : </strong>
                  {product.category}
                </h5>
                <h5 className="tagged_as">
                  <strong>Tags : </strong>
                    mens
                </h5>
              </div>
              <div className="m-bot15">
                 <h5 className="card-title">
              <strong className="text-muted ">Original Price :</strong>
              <del>{product.original_price}
              <span className="text-muted"> Rs.</span></del>
             </h5>
             <h4>
                <strong>Price</strong>
                <span className="display-6">     {product.price} Rs.</span>
                </h4>

              </div>
              <div className="d-flex justify-content-between my-2 ">
                <h6>
                  <strong>Quantity</strong>
                </h6>
                <div className="btn-group" role="group" aria-label="Basic example">
          <button className="btn  btn-sm mb-1 bg-secondary btn-sm" onClick = {decrease}
          >
            <svg
              width="2em"
              height="2em"
              viewBox="0 0 16 16"
              className="bi bi-dash"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
              />
            </svg>
          </button>
          <h3 className="btn btn-sm">{quant}</h3>
          <button className="btn btn-sm mb-1 bg-secondary btn-sm" onClick = {increas}
          >          <svg
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            className="bi bi-plus"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            />
          </svg>

          </button>
    
                </div>
              </div>
              <p className="d-flex justify-content-between mt-5">
                {isInCart(product) && (
              <button
                onClick={() => increase(product)}
                className="btn btn-outline-success float-left mb-2"
              >
                Add more
              </button>
            )}

            {!isInCart(product) && (
              <button
                onClick={() => addProduct(product)}
                className="btn btn-outline-success float-left mb-2"
              >
                Add to cart
              </button>
            )}
                <button
                  className="btn btn-outline-success btn-lg float-right"
                  onClick={check}
                >
                  Order
                </button>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProductView;
