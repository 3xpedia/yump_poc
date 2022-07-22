import React from 'react';

import { AppContextProvider } from './AppContext';
import { CodeEditor } from './editor';
import { Renderer } from './renderer';

export const App = () => {
  return (
    <AppContextProvider>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#264653',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
        }}>
        <div style={{ flex: 1 }}>
          <CodeEditor />
        </div>
        <div style={{ flex: 1 }}>
          <Renderer />
        </div>
      </div>
    </AppContextProvider>
  );
};
