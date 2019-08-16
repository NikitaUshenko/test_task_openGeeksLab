import React, { useState,useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';
import axios from 'axios';

const CategoryPage = ({ match }) => {
  const [parents, setParents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    axios.get(`https://test-task-server.herokuapp.com/api/v1/category/all`)
      .then(res => {
        const categories = res.data;
        if(isSubscribed) {
          setCategories(categories);
        }
      });
    axios.get(`https://test-task-server.herokuapp.com/api/v1/category/categoryList/${match.params.id}`)
      .then(res => {
        const parents = res.data;
        if(isSubscribed) {
          setParents(parents);
        }
      });
    axios.get(`https://test-task-server.herokuapp.com/api/v1/recipe/byCategory/${match.params.id}`)
      .then(res => {
        const recipes = res.data;
        if(isSubscribed) {
          setRecipes(recipes);
        }
      });
    return () => isSubscribed = false;
  });

  return(
    <>
      <h2>Links</h2>
      <NavLink to={`/categories`} exact>All categories</NavLink>
      {
        parents.map(parent => <NavLink to={`/categories/${parent._id}`} key={parent._id}>{parent.title}</NavLink>)
      }
      <h2>Sub cats</h2>
      {
        categories
          .filter(cat => cat.parentId === match.params.id)
          .map(child => <NavLink key={child._id} to={`/categories/${child._id}`}><li>{child.title}</li></NavLink>)
      }
      <h2>Articles</h2>
      {

      }
      <h2>Recipes</h2>
      {
        recipes.map(recipe => <NavLink to={`/recipes/${recipe._id}`}><li>{recipe.title}</li></NavLink>)
      }
    </>
  );
};

export default CategoryPage;