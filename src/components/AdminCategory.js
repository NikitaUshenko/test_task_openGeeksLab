import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const AdminCategory = ({ categories, category, handleDelete, update }) => {
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
    const { title } = edit;
    if(title) {
      update(edit);
      setEdit({...edit, editable: false})
    }
  };

  return (
    <>
      <td className="title">
        {
          edit.editable
            ? <input type="text" value={edit.title} name="title" className="title" onChange={(event) => handleChange(event)}/>
            : category.title
        }
      </td>
      <td className="category">
        {
          edit.editable
            ? (
              <select name="parentId" className="category" onChange={(event) => handleChange(event)} value={edit.parentId}>
                <option value="">No parent</option>
                {
                  categories.map(cat => <option value={cat._id} key={cat._id}>{cat.title}</option>)
                }
              </select>
            )
            : category.parentId && categories.filter(cat => cat._id === category.parentId).map(cat => cat.title)
        }
      </td>
      <td className="edit">
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

AdminCategory.propTypes = {
  category: PropTypes.shape({
    title: PropTypes.string.isRequired,
    parentId: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }).isRequired
};

export default AdminCategory;