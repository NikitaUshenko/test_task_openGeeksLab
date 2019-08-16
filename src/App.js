import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import AdminPanel from './components/AdminPanel';
import CategoriesPage from './components/CategoriesPage';
import CategoryPage from './components/CategoryPage';
import NotFound from './components/NotFound';
import Article from './components/ArticlePage';
import Recipe from './components/RecipePage';

function App() {
    return (
    <div>
      <NavLink to="/" className="main-nav" exact>Home page</NavLink>
      <NavLink to="/admin" className="main-nav">Admin panel</NavLink>
      <Switch>
        <Route path="/categories/:id" render={({match}) => <CategoryPage match={match}/>}/>
        <Route path="/categories/" render={() => <CategoriesPage />}/>
        <Route path="/admin" component={AdminPanel} />
        <Route path="/recipes/:id" component={Recipe} />
        <Route path="/articles/:id" component={Article} />
        <Route path="/" exact component={Home} />
        <Route path="/" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
