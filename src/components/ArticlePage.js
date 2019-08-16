import React, { useState, useEffect } from 'react';
import axios from "axios";
import { NavLink } from "react-router-dom";

const Article = ({ match }) => {
  const [parents, setParents] = useState([]);
  const [article, setAticle] = useState({});

  useEffect(() => {
    let isSubscribed = true;
    axios.get(`https://test-task-server.herokuapp.com/api/v1/article/categoryList/${match.params.id}`)
      .then(res => {
        const parents = res.data;
        if(isSubscribed) {
          setParents(parents);
        }
      });
    axios.get(`https://test-task-server.herokuapp.com/api/v1/article/item/${match.params.id}`)
      .then(res => {
        const article = res.data;
        if(isSubscribed) {
          setAticle({...article});
        }
      });
    return () => isSubscribed = false;
  },[]);

  return (
    <>
      <h1>{article.title}</h1>
      <NavLink to={`/categories`} exact className="all-categories">All categories</NavLink>
      {
        parents.map(parent => <NavLink to={`/categories/${parent._id}`} className="breadcrumb" key={parent._id}>{parent.title}</NavLink>)
      }
        <p>{article.text}</p>
    </>
  )
};

export default Article;