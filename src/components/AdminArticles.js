import React, { useEffect, useState } from 'react';
import axios from 'axios';

import AdminArticle from './AdminArticle';

const AdminArticles = ({ categories }) => {
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
      case 'categoryId':
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
      <form onSubmit={event => handleSubmit(event)}>
        <input type="text" name="title" className="title" placeholder="Enter title" value={article.title} onChange={event => handleChange(event)} required />
        <textarea type="text" name="text" className="text" placeholder="Enter text" rows="7" value={article.text} onChange={event => handleChange(event)} required />
        <textarea type="text" name="description" className="description" placeholder="Enter description" rows="7" value={article.description} onChange={event => handleChange(event)} required />
        <select name="categoryId" className="category" onChange={(event) => handleChange(event)} value={article.categoryId} required>
          <option value="">No category</option>
          {
            categories.map(cat => <option value={cat._id} key={cat._id}>{cat.title}</option>)
          }
        </select>
        <button type="submit">add</button>
      </form>
      <table>
        <tbody>
          {
            articles.map(article => (
              <tr key={article._id}>
                <AdminArticle article={article} categories={categories} handleDelete={handleDelete} update={handleUpdate} />
              </tr>))
          }
        </tbody>
      </table>
    </>
  );
};

export default AdminArticles;