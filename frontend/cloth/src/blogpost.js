import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Blogpost(props) {
  const [blogs, setblogs] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const slug = props.match.params.id;
      try {
        const res = await axios.get(`http://127.0.0.1:8000/${slug}`);
        setblogs(res.data);
        console.log(slug);
      } catch (err) {}
    };
    fetchdata();
  }, [props.match.params.id]);
  const creatblog = () => {
    return { __html: blogs.content };
  };
  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-2">{blogs.title}</h1>
        <h2 className="text-muted mt-3">{blogs.category}</h2>
        <h4>
          {blogs.month} {blogs.day}
        </h4>
        <div className="mt-5 mb-5" dangerouslySetInnerHTML={creatblog()} />
        <hr />
        <p className="lead mb-5">
          <Link className=" btn btn-info font-weight-hold" to="/blog">
            Back to previous
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Blogpost;
