import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Receipt from './Receipt';

const Receipts = ({ categories }) => {
  const [receipts, setReceipts] = useState([]);
  const [receipt, setReceipt] = useState({ title: '', categoryId: '', text: '' });

  const getData = () => {
    axios.get(`https://test-task-server.herokuapp.com/api/v1/recipe/all`)
      .then(res => {
        const receipts = res.data;
        setReceipts(receipts);
      });
  };

  useEffect(() => {
    getData();
  });

  const handleChange = event => {
    const { value, name } = event.target;

    switch(name) {
      case 'title':
        setReceipt({...receipt, title: value});
        break;
      case 'text':
        setReceipt({...receipt, text: value});
        break;
      case 'description':
        setReceipt({...receipt, description: value});
        break;
      case 'parentId':
        setReceipt({ ...receipt, categoryId: value });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { title, description, categoryId, text } = receipt;

    const postUrl = 'https://test-task-server.herokuapp.com/api/v1/recipe/create';

    if(title && description && categoryId && text) {
      axios.post(postUrl, receipt)
        .then(() => {
          getData();
        })
        .then(
          () => setReceipt( { title: '', description: '', categoryId: '', text: '' } )
        )
    }
  };

  const handleUpdate = obj => {
    const { id, categoryId, title, text, description } = obj;
    const updateUrl = 'https://test-task-server.herokuapp.com/api/v1/recipe/update';
    axios.put(updateUrl, { _id: id, categoryId, title, text, description })
      .then(() => getData());
  };

  return (
    <>
      <h1>Receipts</h1>
      <table>
        <tbody>
          {
            receipts.map(receipt => (
              <tr key={receipt._id}>
                <Receipt receipt={receipt} categories={categories} update={handleUpdate}/>
              </tr>)
            )
          }
        </tbody>
      </table>
      <form onSubmit={event => handleSubmit(event)}>
        <input type="text" name="title" value={receipt.title} onChange={event => handleChange(event)} required />
        <textarea type="text" name="text" value={receipt.text} onChange={event => handleChange(event)} required />
        <textarea type="text" name="description" value={receipt.description} onChange={event => handleChange(event)} required />
        <select name="parentId" onChange={(event) => handleChange(event)} value={receipt.categoryId} required>
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

export default Receipts;