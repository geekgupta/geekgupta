import React, { useEffect } from "react";
import Navbar from "./navbar";
import { connect } from "react-redux";
import {
  checkAuthenticated,
  load_user,
} from "./auth_registration/actions/auth";

function Layout(props) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        await props.checkAuthenticated();
        await props.load_user();
      } catch (err) {}
    };

    fetchData();
  }, []);

  return (
    <div style={{ backgroundcolor: "#e3f2fd" }}>
      <Navbar />
      {props.children}
    </div>
  );
}

export default connect(null, { checkAuthenticated, load_user })(Layout);
