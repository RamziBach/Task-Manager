import React, { useContext } from 'react';

import { themeContext } from '../context/ThemeContextProvider';

const TodoForm = props => {
  const { light } = useContext(themeContext);

  return (
    <div className="TodoForm-container">
      <form className="TodoForm" onSubmit={props.onSubmit}>
        <input
          style={light ? {backgroundColor: 'white', color: '#212121'} : {backgroundColor: '#212121', color: 'white'}}
          className="form-input"
          type="text"
          placeholder="Add a task..."
          value={props.value}
          onChange={props.onChange}
          maxLength="40"
          ref={props.reference}
          required
        />
        <div className="btn-container">
          <button
            style={light ? {backgroundColor: 'white'} : {backgroundColor: '#212121'}}
            className="form-btn"
            type="submit">{!props.isEditing ? 'Add a task' : 'Edit Task'}
          </button>
          <button
            style={light ? {backgroundColor: 'white'} : {backgroundColor: '#212121'}}
            className="form-btn"
            type="button" onClick={props.onClick}>{!props.isEditing ? 'Clear tasks' : 'Cancel'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;