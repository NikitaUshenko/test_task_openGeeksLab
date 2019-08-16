// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from "axios";
import {NavLink} from "react-router-dom";

const Recipe = ({ match }) => {
  const [parents, setParents] = useState([]);
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    let isSubscribed = true;
    axios.get(`https://test-task-server.herokuapp.com/api/v1/recipe/categoryList/${match.params.id}`)
      .then(res => {
        const parents = res.data;
        if(isSubscribed) {
          setParents(parents);
        }
      });
    axios.get(`https://test-task-server.herokuapp.com/api/v1/recipe/item/${match.params.id}`)
      .then(res => {
        const recipe = res.data;
        if(isSubscribed) {
          setRecipe({...recipe});
        }
      });
    return () => isSubscribed = false;
  },[]);

  return (
    <>
      <h1>{recipe.title}</h1>
      <NavLink to={`/categories`} exact>All categories</NavLink>
      {
        parents.map(parent => <NavLink to={`/categories/${parent._id}`} key={parent._id}>{parent.title}</NavLink>)
      }
      <p>{recipe.text}</p>
    </>
  )
};

export default Recipe;