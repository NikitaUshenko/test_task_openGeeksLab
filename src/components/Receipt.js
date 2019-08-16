import React, { useState } from 'react';

const Receipt = ({ receipt, categories, handleDelete, update }) => {
  const [edit, setEdit] = useState(
    {
      editable: false,
      title: receipt.title,
      categoryId: receipt.categoryId,
      id: receipt._id,
      text: receipt.text,
      description: receipt.description,
    }
  );

  const handleChange = event => {
    const { value, name } = event.target;

    switch(name) {
      case 'title':
        setEdit({ ...edit, title: value });
        break;
      case 'categoryId':
        setEdit({ ...edit, categoryId: value });
        break;
      case 'text':
        setEdit({ ...edit, text: value });
        break;
      default:
        break;
    }
  };

  const handleUpdate = () => {
    update(edit);
    setEdit({...edit, editable: false})
  };

  return(
    <>
      <td>
        {
          edit.editable
            ? <input type="text" name="title" value={edit.title} onChange={(event) => handleChange(event)} />
            : receipt.title
        }
      </td>
      <td>
        {
          edit.editable
            ? <textarea name="text" cols="30" rows="5" value={edit.text} onChange={(event) => handleChange(event)} />
            : receipt.text
        }
      </td>
      <td>
        {
          edit.editable
            ? (
              <select name="categoryId" onChange={(event) => handleChange(event)} value={edit.categoryId}>
                <option value="">No category</option>
                {
                  categories.map(cat => <option value={cat._id} key={cat._id}>{cat.title}</option>)
                }
              </select>
            )
            : categories.filter(cat => cat._id === receipt.categoryId).map(cat => cat.title)

        }
      </td>
      <td>
        {
          edit.editable
            ? (
              <>
                <button onClick={() => handleUpdate()}>Approve</button>
                <button onClick={() => setEdit({ ...edit, editable: false })}>Discard</button>
              </>
            )
            : <button onClick={() => setEdit({...edit, editable: true})}>Update</button>
        }

      </td>
      <td><button onClick={() => handleDelete(receipt._id)}>Delete</button></td>
    </>
  );
};

export default Receipt;