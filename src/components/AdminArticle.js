import React, { useState } from 'react';

const AdminArticle = ({ article, categories, handleDelete, update }) => {
  const [edit, setEdit] = useState(
      {
        editable: false,
        title: article.title,
        categoryId: article.categoryId,
        id: article._id,
        text: article.text,
        description: article.description,
      }
    );

  const handleChange = event => {
    const { value, name } = event.target;

    switch(name) {
      case 'description':
        setEdit({ ...edit, description: value });
        break;
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
    const { title, text, categoryId, description } = edit;
    if(title && text && categoryId && description) {
      update(edit);
      setEdit({...edit, editable: false})
    }
  };

  return(
    <>
      <td className="title">
        {
          edit.editable
            ? <input type="text" className="title" name="title" value={edit.title} onChange={(event) => handleChange(event)} />
            : article.title
        }
      </td>
      <td className="text">
        {
          edit.editable
            ? <textarea name="text" className="text" placeholder="Enter text" rows="7" value={edit.text} onChange={(event) => handleChange(event)} />
            : article.text
        }
      </td>
      <td className="description">
        {
          edit.editable
            ? <textarea name="description" className="description" placeholder="Enter description" rows="7" value={edit.description} onChange={(event) => handleChange(event)} />
            : article.description
        }
      </td>
      <td className="category">
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
            : categories.filter(cat => cat._id === article.categoryId).map(cat => cat.title)

        }
      </td>
      <td className="edit">
        {
          edit.editable
            ? (
              <>
                <button onClick={() => handleUpdate()}>
                  Approve
                </button>
                <button onClick={() => setEdit({ ...edit, editable: false })}>
                  Discard
                </button>
              </>
            )
            : (
              <>
                <button onClick={() => setEdit({...edit, editable: true})}>Update</button>
                <button onClick={() => handleDelete(article._id)}>Delete</button>
              </>
            )
        }
      </td>
    </>
  );
};

export default AdminArticle;