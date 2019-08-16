import React, { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';
import AdminReceipts from './AdminReceipts';
import AdminArticles from './AdminArticles';
import AdminCategories from './AdminCategories';
import axios from "axios";

const AdminPanel = () => {
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
  });

  return (
    <>
      <h1>Admin panel</h1>

      <NavLink to="/admin/receipts">All Receipts</NavLink>
      <NavLink to="/admin/categories">All Categories</NavLink>
      <NavLink to="/admin/articles">All Articles</NavLink>

      <Route path="/admin/receipts" render={() => <AdminReceipts categories={categories} />} />
      <Route path="/admin/categories" render={() => <AdminCategories categories={categories}/>} />
      <Route path="/admin/articles" render={() => <AdminArticles categories={categories} setCategories={setCategories} />} />
    </>
  )
};

export default AdminPanel;
