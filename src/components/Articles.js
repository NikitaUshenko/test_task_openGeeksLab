import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Article from './Article';

const Articles = ({ categories }) => {
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState({ title: '', description: '', categoryId: '', text: '' });

  const getData = () => {
    axios.get(`https://test-task-server.herokuapp.com/api/v1/article/all`)
    .then(res => {
      const articles = res.data;
      setArticles(articles);
    });
  };

  useEffect(() => {
    getData();
  },[]);

  const handleChange = event => {
    const { value, name } = event.target;

    switch(name) {
      case 'title':
        setArticle({...article, title: value});
        break;
      case 'text':
        setArticle({...article, text: value});
        break;
      case 'description':
        setArticle({...article, description: value});
        break;
      case 'parentId':
        setArticle({ ...article, categoryId: value });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { title, description, categoryId, text } = article;

    const postUrl = 'https://test-task-server.herokuapp.com/api/v1/article/create';

    if(title && description && categoryId && text) {
      axios.post(postUrl, article)
        .then(() => {
          getData();
        })
        .then(
          () => setArticle( { title: '', description: '', categoryId: '', text: '' } )
        )
    }
  };

  const handleDelete = id => {
    const deleteUrl = `https://test-task-server.herokuapp.com/api/v1/article/${id}`;
    axios.delete(deleteUrl)
      .then(() => getData());
  };

  const handleUpdate = obj => {
    const { id, categoryId, title, text, description } = obj;
    const updateUrl = 'https://test-task-server.herokuapp.com/api/v1/article/update';
    axios.put(updateUrl, { _id: id, categoryId, title, text, description })
      .then(() => getData());
  };

  return (
    <>
      <h1>Articles</h1>
      <table>
        <tbody>
          {
            articles.map(article => (
              <tr key={article._id}>
                <Article article={article} categories={categories} handleDelete={handleDelete} update={handleUpdate} />
              </tr>))
          }
        </tbody>
      </table>
      <form onSubmit={event => handleSubmit(event)}>
        <input type="text" name="title" value={article.title} onChange={event => handleChange(event)} required />
        <textarea type="text" name="text" value={article.text} onChange={event => handleChange(event)} required />
        <textarea type="text" name="description" value={article.description} onChange={event => handleChange(event)} required />
        <select name="parentId" onChange={(event) => handleChange(event)} value={article.categoryId} required>
          <option value="">No category</option>
          {
            categories.map(cat => <option value={cat._id} key={cat._id}>{cat.title}</option>)
          }
        </select>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default Articles;