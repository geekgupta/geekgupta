import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./layout";
import Category from "./category";
import Blogpost from "./blogpost";
import Home from "./home";
import Blog from "./blog";
import Profile from "./profile";
import cors from "cors";
import Product from "./product";
//import Cart from "./cart";
//import Login from "./login";
import ProductView from "./productview";
import Search from "./search";
import { ContextProvider } from "./makecontext";
import Addaccount from "./addaccount";
import Cart from "./cart/index";
import { CartContext } from "./contexts/CartContext";
import { CartContextProvider } from "./contexts/CartContext";
import Login from "./auth_registration/containers/Login";
import Signup from "./auth_registration/containers/Signup";
import Activate from "./auth_registration/containers/Activate";
import ResetPassword from "./auth_registration/containers/ResetPassword";
import ResetPasswordConfirm from "./auth_registration/containers/ResetPasswordConfirm";
import { Provider } from "react-redux";
import store from "./auth_registration/store";
import Featured from "./featured";
import OrderSuccessfull from "./ordersuccessfull" ;
import ErrorPage from "./errorpage" ; 
import Order from "./order";
import Checkout from "./checkout";
import {CookiesProvider} from 'react-cookie' ; 

function App() {
  return (
    <Provider store={store}>
    <CookiesProvider>
      <CartContextProvider>
        <ContextProvider>
          <Router>
            <Switch>
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/addaccount" component={Addaccount} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/reset_password" component={ResetPassword} />
              <Route
                exact
                path="/password/reset/confirm/:uid/:token"
                component={ResetPasswordConfirm}
              />
              <Route exact path="/activate/:uid/:token" component={Activate} />
              <Route exact path="/login" component={Login} />
              <Layout>
                <Route exact path="/" component={Home} />
                <Route exact path="/order" component={Order} />
                <Route exact path="/checkout" component={Checkout} />
                <Route exact path="/product" component={Product} />
                <Route exact path="/blog/:id" component={Blogpost} />
                <Route exact path="/featured" component={Featured} />
                <Route exact path="/category/:id" component={Category} />
	              <Route exact path="/ordersuccessfull" component={OrderSuccessfull} />
                <Route exact path="/errorpage" component={ErrorPage} />
                <Route exact path="/search/:id" component={Search} />
                <Route exact path="/productview/:id" component={ProductView} />
              </Layout>
            </Switch>
          </Router>
        </ContextProvider>
      </CartContextProvider>
      </CookiesProvider>
    </Provider>
  );
}
export default App;
