import React, { useState, useEffect, useRef, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import TodoForm from './TodoForm';
import Header from './Header';
import TodoList from './TodoList';

import { themeContext } from '../context/ThemeContextProvider';

const TodoApp = () => {
  const { light } = useContext(themeContext);
  const LOCAL_STORAGE = () => JSON.parse(localStorage.getItem('Tasks')) || [];
  const [tasks, setTasks] = useState(LOCAL_STORAGE);
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState('');

  const inputRef = useRef(null);

  const handleChange = e => setText(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    inputRef.current.focus();
    if (text.length === 0) return;
    if (isEditing) {
      setTasks(prevState => {
        const newTasks = [...prevState];
        const index = newTasks.findIndex(task => task.id === editId);
        newTasks.splice(index, 1, { id: uuidv4(), text, completed: false });
        return newTasks;
      });
      setText('');
      setEditId('');
      setIsEditing(false);
      return;
    }
    setTasks(prevState => [
      ...prevState,
      { id: uuidv4(), text, completed: false },
    ]);
    setText('');
  };

  const handleClear = () => {
    inputRef.current.focus();
    setTasks([]);
  };

  const handleCancel = () => {
    inputRef.current.focus();
    setIsEditing(false);
    setText('');
    setEditId('');
  };

  const handleDelete = id =>
    setTasks(prevState => prevState.filter(task => task.id !== id));

  const handleEdit = (id, text) => {
    inputRef.current.focus();
    setText(text);
    setIsEditing(true);
    setEditId(id);
  };

  const handleCheck = (id, text, completed) => {
    if (completed) {
      setTasks(prevState => {
        const newTasks = [...prevState];
        const index = newTasks.findIndex(task => task.id === id);
        newTasks.splice(index, 1, { id: uuidv4(), text, completed: false });
        return newTasks;
      });
      return;
    }
    setTasks(prevState => {
      const newTasks = [...prevState];
      const index = newTasks.findIndex(task => task.id === id);
      newTasks.splice(index, 1, { id: uuidv4(), text, completed: true });
      return newTasks;
    });
  };

  useEffect(() => inputRef.current.focus(), []);

  useEffect(() => localStorage.setItem('Tasks', JSON.stringify(tasks)), [
    tasks,
  ]);

  const liStyle = {
    textDecoration: 'line-through',
    fontWeight: '100',
    fontStyle: 'italic',
  };

  const taskLists = tasks.map(task => {
    return (
      <li
        className="list"
        style={task.completed ? liStyle : { textDecoration: 'none' }}
        key={task.id}
      >
        {task.text}
        <div>
          <button
            style={
              light
                ? { backgroundColor: 'white' }
                : { backgroundColor: '#212121' }
            }
            title="Delete"
            className="btn"
            onClick={() => handleDelete(task.id)}
            disabled={isEditing ? true : false}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
          <button
            style={
              light
                ? { backgroundColor: 'white' }
                : { backgroundColor: '#212121' }
            }
            title="Edit"
            className="btn"
            onClick={() => handleEdit(task.id, task.text)}
            disabled={isEditing ? true : false}
          >
            <i className="fas fa-pen-fancy"></i>
          </button>
          <button
            style={
              light
                ? { backgroundColor: 'white' }
                : { backgroundColor: '#212121' }
            }
            title="Complete"
            className="btn"
            onClick={() => handleCheck(task.id, task.text, task.completed)}
            disabled={isEditing ? true : false}
          >
            <i className="fas fa-check"></i>
          </button>
        </div>
      </li>
    );
  });
  return (
    <div className="TodoApp">
      <div className="todoapp_child">
        <Header />
        <TodoForm
          onSubmit={handleSubmit}
          value={text}
          onChange={handleChange}
          onClick={!isEditing ? handleClear : handleCancel}
          isEditing={isEditing}
          reference={inputRef}
        />
        <TodoList>
          {tasks.length > 0 ? (
            taskLists
          ) : (
            <span className="no-task">
              <i className="fas fa-tasks"></i>
              <span className="no-task-p">Add tasks above</span>
            </span>
          )}
        </TodoList>
      </div>
    </div>
  );
};

export default TodoApp;
