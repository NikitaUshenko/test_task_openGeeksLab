import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Category = ({ categories, category, handleDelete, update }) => {
  const [edit, setEdit] = useState({ editable: false, title: category.title, parentId: category.parentId || '', id: category._id });

  useEffect(() => {
    setEdit({ editable: false, title: category.title, parentId: category.parentId || '', id: category._id })
  },[]);

  const handleChange = event => {
    const { value, name } = event.target;
    switch(name) {
      case 'parentId':
        setEdit({ ...edit, parentId: value });
        break;
      case 'title':
        setEdit({ ...edit, title: value });
        break;
      default:
        break;
    }
  };

  const handleUpdate = () => {
    update(edit);
    setEdit({...edit, editable: false})
  };

  return (
    <>
      <td>
        {
          edit.editable
            ? <input type="text" value={edit.title} name="title" onChange={(event) => handleChange(event)}/>
            : category.title
        }
      </td>
      <td>
        {
          edit.editable
            ? (
              <select name="parentId" onChange={(event) => handleChange(event)} value={edit.parentId}>
                <option value="">No parent</option>
                {
                  categories.map(cat => <option value={cat._id} key={cat._id}>{cat.title}</option>)
                }
              </select>
            )
            : category.parentId && categories.filter(cat => cat._id === category.parentId).map(cat => cat.title)
        }
      </td>
      <td>
        {
          edit.editable
            ? (
              <>
                <button
                onClick={() => handleUpdate()}
                >
                  Approve
                </button>
                <button
                  onClick={() => setEdit({ editable: false, title: category.title, parentId: category.parentId || '' })}
                >
                  Discard
                </button>
              </>
            )
            : (
              <>
                <button onClick={() => setEdit({...edit, editable: true})}>Edit</button>
                <button onClick={() => handleDelete(category._id)}>Delete</button>
              </>
            )
        }
      </td>
    </>
  );
};

Category.propTypes = {
  category: PropTypes.shape({
    title: PropTypes.string.isRequired,
    parentId: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }).isRequired
};

export default Category;