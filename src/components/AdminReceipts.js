import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AdminReceipt from './AdminReceipt';

const AdminReceipts = ({ categories }) => {
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
      case 'categoryId':
        setReceipt({ ...receipt, categoryId: value });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { title, categoryId, text } = receipt;

    const postUrl = 'https://test-task-server.herokuapp.com/api/v1/recipe/create';

    if(title && categoryId && text) {
      axios.post(postUrl, receipt)
        .then(() => {
          getData();
        })
        .then(
          () => setReceipt( { title: '', categoryId: '', text: '' } )
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
      <form onSubmit={event => handleSubmit(event)}>
        <input type="text" name="title" className="title" placeholder="Enter title" value={receipt.title} onChange={event => handleChange(event)} required />
        <textarea type="text" name="text" className="text" placeholder="Enter text" rows="7" value={receipt.text} onChange={event => handleChange(event)} required />
        <select name="categoryId" className="category" onChange={(event) => handleChange(event)} value={receipt.categoryId} required>
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
            receipts.map(receipt => (
              <tr key={receipt._id}>
                <AdminReceipt receipt={receipt} categories={categories} update={handleUpdate}/>
              </tr>)
            )
          }
        </tbody>
      </table>
    </>
  );
};

export default AdminReceipts;