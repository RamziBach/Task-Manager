import React, { useContext } from 'react';

import { themeContext } from '../context/ThemeContextProvider';

const Header = () => {
  const { light } = useContext(themeContext);

  return (
    <div className="Header">
      <h1
        style={light ? {color: '#212121'} : {color: '#bcbcbc'}}
        className="title">
          Task Manager
      </h1>
    </div>
  );
};

export default Header;