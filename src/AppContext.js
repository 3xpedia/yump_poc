import React from 'react';
import PropTypes from 'prop-types';

export const AppContext = React.createContext();

export const AppContextProvider = ({ children }) => {
  const [appState, setAppState] = React.useState({});

  return <AppContext.Provider value={{ appState, setAppState }}>{children}</AppContext.Provider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.element,
};
