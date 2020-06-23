import React, { useState, useEffect } from 'react';

const themeContext = React.createContext();

const ThemeContextProvider = props => {
  const [ light, setLight ] = useState(false);

  const toggleLight = () => {
    setLight(prevState => !prevState);
  }

  useEffect(() => {
    const body = document.querySelector('body');
    if (light) {
      body.style.backgroundColor = 'white';
      body.style.color = '#212121';
    } else {
      body.style.backgroundColor = '#212121';
      body.style.color = 'white';
    }
  }, [light]);

  return (
    <themeContext.Provider value={{light, toggleLight}}>
      {props.children}
    </themeContext.Provider>
  );
};

export { ThemeContextProvider, themeContext };