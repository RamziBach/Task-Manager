import React from 'react';
import TodoApp from './TodoApp';
import DarkMode from './DarkMode';
import '../css/App.css';

function App() {
  return (
    <div className="App">
        <DarkMode />
        <TodoApp />
    </div>
  );
}

export default App;
