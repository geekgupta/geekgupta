import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink , useHistory } from "react-router-dom";
import axios from "axios";

import "./error.css";
function ErrorPage() {
	
	return (
		<div className = "errorpage">
		<div id="clouds">
            <div className="cloud x1"></div>
            <div className="cloud x1_5"></div>
            <div className="cloud x2"></div>
            <div className="cloud x3"></div>
            <div className="cloud x4"></div>
            <div className="cloud x5"></div>
        </div>
        <div className='c'>
            <div className='_404'>404</div>
            <hr className = "e"/>
            <div className='_1'>THE PAGE</div>
            <div className='_2'>WAS NOT FOUND</div>
            <a className='btnn' href='#'>BACK TO Shoping</a>
        </div>
		 </div>
	);
}
export default ErrorPage ; 