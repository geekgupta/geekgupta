import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink , useHistory } from "react-router-dom";
import axios from "axios";
import "./order.css";

function OrderSuccessfull() {
const h = useHistory() ; 
function goback(){
 return h.push('/product')
}
  return (
	  <div className = "bg-success" style = {{"height":"100vh"}}>
	   <div className="pyro">
  <div className="before"></div>
  <div className="after"></div>
        <div className="jumbotron rounded-0 text-white bg-success  m-0 d-flex justify-content-center"  >
          <div className = "d-flex flex-column">
            <h1 className="display-4 font m-0 text-center">
              Order Successfull <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-patch-check-fll" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984a.5.5 0 0 0-.708-.708L7 8.793 5.854 7.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
</svg>
            </h1>
	        <div className = " d-flex justify-content-center flex-column">
            <p className="lead">Thank You for Shoping With Us </p>
            <p className="lead mt-5 ">
              <Link
                exact
                to="/product"
                className="font-weight-bold btn btn-sm btn-outline-light"
              >
                Back To Shoping 
              </Link>
            </p>
	</div>
    </div>
	
</div>
        </div>
	  </div>
	
);
}
export default OrderSuccessfull ; 
