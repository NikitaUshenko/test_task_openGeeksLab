import React, {  useState } from 'react';
import axios from 'axios';

import AdminCategory from './AdminCategory';

const AdminCategories = ({ categories }) => {
  const [category, setCategory] = useState( { title: '', parentId: '' });

  const handleAdd = (event) => {
    event.preventDefault();

    const postUrl = 'https://test-task-server.herokuapp.com/api/v1/category/create';
    if(category.parentId) {
      axios.post(postUrl, category);
      setCategory({ title: '', parentId: '' });
    } else {
      axios.post(postUrl, { ...category, parentId: null });
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
    setCategory({ ...category, title: event.target.value });
  };


  const handleChangeParent = event => {
    const value = event.target.value;
    setCategory({ ...category, parentId: value })
  };

  return (
    <>
      <h1>Categories</h1>
      <form onSubmit={(event) => handleAdd(event)}>
        <input
          className="title"
          placeholder="Enter title"
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
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Parent</th>
          </tr>
          {
            categories.map(category => (
              <tr key={category._id}>
                <AdminCategory category={category} categories={categories} handleDelete={handleDelete} update={update}/>
              </tr>))
          }
        </tbody>
      </table>
    </>
  );
};

export default AdminCategories;