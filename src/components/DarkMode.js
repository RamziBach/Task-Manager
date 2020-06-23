import React, { useContext } from 'react';

import { themeContext } from '../context/ThemeContextProvider';

const DarkMode = () => {
  const { light, toggleLight } = useContext(themeContext);

  return (
    <div className="DarkMode">
      <button
        title={light ? 'Toggle dark mode' : 'Toggle light mode'}
        style={light ? {backgroundColor: 'white'} : {backgroundColor: '#212121'}}
        id="themeBtn"
        className="btn"
        onClick={toggleLight}><i className="far fa-lightbulb"></i>
      </button>
    </div>
  );
};

export default DarkMode;