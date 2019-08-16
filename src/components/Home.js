import React from 'react';
import { NavLink, Route } from 'react-router-dom';

const Home = () => (
  <>
    <h1>Home</h1>
    <NavLink to="/categories">Categories</NavLink>
  </>
);

export default Home;
