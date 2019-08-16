import React, {  useState } from 'react';
import axios from 'axios';

import Category from './Category';

const Categories = ({ categories }) => {
  const [category, setCategory] = useState( { title: '', parentId: '' });
  const [error, setError] = useState(false);

  const handleAdd = (event) => {
    event.preventDefault();

    if (!event.target.checkValidity()) {
      setError(true);
      return;
    }

    const postUrl = 'https://test-task-server.herokuapp.com/api/v1/category/create';
    if(category.parentId) {
      axios.post(postUrl, category)
        .catch(() => setError(true));
      setCategory({ title: '', parentId: '' });
    } else {
      axios.post(postUrl, { ...category, parentId: null })
        .catch(() => setError(true));
      setCategory({ title: '', parentId: '' });
    }
  };

  const handleDelete = id => {
    const deleteUrl = `https://test-task-server.herokuapp.com/api/v1/category/${id}`;
    axios.delete(deleteUrl)
  };

  const update = obj => {
    const { id, parentId, title } = obj;
    const updateUrl = 'https://test-task-server.herokuapp.com/api/v1/category/update';
    axios.put(updateUrl, { _id: id, parentId, title })
  };

  const handleChangeTitle = (event) => {
    setError(false);
    setCategory({ ...category, title: event.target.value });
  };


  const handleChangeParent = event => {
    const value = event.target.value;
    setCategory({ ...category, parentId: value })
  };

  return (
    <>
      <h1>Categories</h1>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Parent</th>
          </tr>
          {
            categories.map(category => (
              <tr key={category._id}>
                <Category category={category} categories={categories} handleDelete={handleDelete} update={update}/>
              </tr>))
          }
        </tbody>
      </table>
      <form onSubmit={(event) => handleAdd(event)}>
        <input
          className={error ? 'error' : ''}
          type="text"
          name="title"
          value={category.title}
          onChange={(event) => handleChangeTitle(event)}
          required
        />
        <select name="parentId" onChange={(event) => handleChangeParent(event)} value={category.parentId}>
          <option value="">No parent</option>
          {
            categories.map(cat => <option value={cat._id} key={cat._id}>{cat.title}</option>)
          }
        </select>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default Categories;