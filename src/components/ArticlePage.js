import React from 'react';

const Article = ({ match }) => (
  <>
    <h1>Article</h1>
    <p>{match.params.id}</p>
  </>
);

export default Article;