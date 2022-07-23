import React from 'react';

import { AppContext } from '../AppContext';
import { Interpreter } from '../interpreter';

export const Renderer = () => {
  const { appState } = React.useContext(AppContext);

  const [formattedCode, error] = React.useMemo(() => {
    try {
      return [Interpreter(appState.code), null];
    } catch (e) {
      if (e.message) {
        throw e;
      }
      return [null, e];
    }
  }, [appState.code]);

  if (error) {
    return <div style={{ color: '#EB886F' }}>{error.message || error}</div>;
  }

  return (
    <textarea
      value={JSON.stringify(formattedCode, null, 2)}
      style={{
        width: '100%',
        height: '100%',
        color: '#fdf0d5',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        fontSize: 16,
        fontFamily: '"Fira code", "Fira Mono", monospace',
      }}
      onChange={() => {}}
    />
  );
};
