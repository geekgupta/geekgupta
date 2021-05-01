import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink,useHistory } from "react-router-dom";
import axios from "axios";
//import "./order.css";
import Cookies from 'universal-cookie' ; 

function Checkout() {
  const [products, setproducts] = useState([]);
  const cookies = new Cookies() ;
  console.log(cookies.get('ordered_product'));
  
  const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

  useEffect(() => {
    const fetchblog = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/product/");
        console.log(res);
        //setproducts((p) => [...p, ...res.data["results"]]);
        if(cookies.get('ordered_product') != null){
        setproducts([cookies.get('ordered_product')]);
        }
        else {
          setproducts(cookies.get('ordered_product_cart')); 
        }

      } catch (err) {}
    };
    fetchblog();
  }, []);
  const h = useHistory() ; 
  let check = null ; 
  const blog = async () => {
     const id = localStorage.getItem("id");
     if(cookies.get('ordered_product') != null){
      check = "product" ; 
     }
     else{
      check = "cart" ;
     }
     try {
        const res = await axios.post(
          "http://127.0.0.1:8000/product/place/order",
          { products,id,check},
          config
        );
        if(res.data.localeCompare('data')){
          h.push('/ordersuccessfull');
        }
        else{
          console.log("fail"); 
        }


      } catch (err) {}
    };

  const getproducts = () => {
    let list = [];
    let result = [];
    if(cookies.get('ordered_product') != null){
    products.map((product) => {
      return list.push(
        <li className="list-group-item d-flex justify-content-between lh-condensed">
          <div className="col-sm-2 p-1">
            <img
              style={{ maxHeight: "50px" }}
              src={product.thumbnail}
              className="img-fluid d-block"
            />
          </div>
          <div className="col-sm-6 p-1 text-left ">
            <h6 className="my-0">{product.name}</h6>
            <small className="text-muted">{product.description}</small>
          </div>
          <div className="col-sm-3 p-1 text-right">
            <span className="text-muted">{product.price_ht} .Rs</span>
          </div>
        </li>
      );
    });
    }
    else{
     products.map((product) => {
      return list.push(
        <li className="list-group-item d-flex justify-content-between lh-condensed">
          <div className="col-sm-2 p-1">
            <img
              style={{ maxHeight: "50px" }}
              src={`http://127.0.0.1:8000${product.product.thumbnail}`}
              className="img-fluid d-block"
            />
          </div>
          <div className="col-sm-6 p-1 text-left ">
            <h6 className="my-0">{product.product.product_name}</h6>
            <small className="text-muted">{product.product.description}</small>
          </div>
          <div className="col-sm-3 p-1 text-right">
            <span className="text-muted">{product.price_ht} .Rs</span>
          </div>
        </li>
      );
    }); 
    }
    for (let i = 0; i < list.length; i++) {
      result.push(<div className="">{list[i]}</div>);
    }

    return result;
  };
  let itemCount = 0 ; 
  let total = 0 ; 
  itemCount = products.reduce((total, product) => total + product.quantity,0);
  if(cookies.get('ordered_product') != null){
    total = products.reduce((total, product) => total + product.price_ht*product.quantity, 0)
    .toFixed(2);
  }
  else{
    total = products.reduce((total, product) => total + product.price_ht, 0)
    .toFixed(2);

  }
 

  
  return (
    <div className="container">
      <div className="py-5 text-center">
        <svg
          width="3em"
          height="3em"
          viewBox="0 0 16 16"
          class="bi bi-bag-fill inline-block align-bottom mr-2 "
          fill="orange"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"
          />
        </svg>
        <h2>Checkout form</h2>
        <p className="lead"></p>
      </div>
       {itemCount > 0 ? (
      <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your Order</span>
            <span className="badge badge-secondary badge-pill">{itemCount}</span>
          </h4>
          <ul className="list-group mb-3">
            {getproducts()}
            <li className="list-group-item d-flex justify-content-between">
              <span>Total</span>
              <strong>{total} .Rs</strong>
            </li>
          </ul>

          <form className="card p-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Promo code"
              />
              <div className="input-group-append">
                <button type="submit" className="btn btn-secondary">
                  Redeem
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Billing address</h4>
          <form className="needs-validation" novalidate>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label for="firstName">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder=""
                  value=""
                  required
                />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label for="lastName">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder=""
                  value=""
                  required
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label for="username">Username</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">@</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Username"
                  required
                />
                <div className="invalid-feedback" style={{ width: "100%" }}>
                  Your username is required.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label for="email">
                Email <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="you@example.com"
              />
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div className="mb-3">
              <label for="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="1234 Main St"
                required
              />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div className="mb-3">
              <label for="address2">
                Address 2 <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="address2"
                placeholder="Apartment or suite"
              />
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label for="country">Country</label>
                <select
                  className="custom-select d-block w-100"
                  id="country"
                  required
                >
                  <option value="">Choose...</option>
                  <option>India</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label for="state">State</label>
                <select
                  className="custom-select d-block w-100"
                  id="state"
                  required
                >
                  <option value="">Choose...</option>
                  <option>Maharastra</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label for="zip">Zip</label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  placeholder=""
                  required
                />
                <div className="invalid-feedback">Zip code required.</div>
              </div>
            </div>
            <hr className="mb-4" />
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="same-address"
              />
              <label className="custom-control-label" for="same-address">
                Shipping address is the same as my billing address
              </label>
            </div>
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="save-info"
              />
              <label className="custom-control-label" for="save-info">
                Save this information for next time
              </label>
            </div>
            <hr className="mb-4" />

            <h4 className="mb-3">Payment</h4>

            <div className="d-block my-3">
              <div className="custom-control custom-radio">
                <input
                  id="credit"
                  name="paymentMethod"
                  type="radio"
                  className="custom-control-input"
                  checked
                  required
                />
                <label className="custom-control-label" for="credit">
                  Cash On Delivery
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  id="debit"
                  name="paymentMethod"
                  type="radio"
                  className="custom-control-input"
                  required
                />
                <label className="custom-control-label" for="debit">
                  Debit card
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  id="paypal"
                  name="paymentMethod"
                  type="radio"
                  className="custom-control-input"
                  required
                />
                <label className="custom-control-label" for="paypal">
                  PayPal
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  id="paypal"
                  name="paymentMethod"
                  type="radio"
                  className="custom-control-input"
                  required
                />
                <label className="custom-control-label" for="paypal">
                  Credit
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label for="cc-name">Name on card</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-name"
                  placeholder=""
                  required
                />
                <small className="text-muted">
                  Full name as displayed on card
                </small>
                <div className="invalid-feedback">Name on card is required</div>
              </div>
              <div className="col-md-6 mb-3">
                <label for="cc-number">Credit card number</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-number"
                  placeholder=""
                  required
                />
                <div className="invalid-feedback">
                  Credit card number is required
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label for="cc-expiration">Expiration</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-expiration"
                  placeholder=""
                  required
                />
                <div className="invalid-feedback">Expiration date required</div>
              </div>
              <div className="col-md-3 mb-3">
                <label for="cc-cvv">CVV</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-cvv"
                  placeholder=""
                  required
                />
                <div className="invalid-feedback">Security code required</div>
              </div>
            </div>
            <hr className="mb-4" />
            <button className="btn btn-primary btn-lg btn-block" type="submit" onClick= {blog}>
              Place Order
            </button>
          </form>
        </div>
      </div>
      ) : (
            <div className="p-3 text-center text-muted">You Have not orderd anything yet :( </div>
          )}

      <footer className="my-5 pt-5 text-muted text-center text-small">
        <p className="mb-1">&copy; 2017-2020 Clothing Solution</p>
        <ul className="list-inline">
          <li className="list-inline-item">
            <Link exact to="#">
              Privacy
            </Link>
          </li>
          <li className="list-inline-item">
            <Link exact to="#">
              Terms
            </Link>
          </li>
          <li className="list-inline-item">
            <Link exact to="#">
              Support
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Checkout;
