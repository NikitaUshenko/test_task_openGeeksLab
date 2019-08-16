import React, { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    axios.get(`https://test-task-server.herokuapp.com/api/v1/category/all`)
      .then(res => {
        const categories = res.data;
        if(isSubscribed) {
          setCategories(categories);
        }
      });
    return () => isSubscribed = false
  }, []);

     return(
    <>
      <h1>Categories</h1>
      <ul>
        {
          categories.map(
            cat => !cat.parentId && <li key={cat._id}><NavLink to={`/categories/${cat._id}`} className={'category-btn'}>{cat.title}</NavLink></li>
          )
        }
      </ul>
    </>
  );
};

export default CategoriesPage;