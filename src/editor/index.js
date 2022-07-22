import React from 'react';
import { highlight } from 'prismjs/components/prism-core';
import Editor from 'react-simple-code-editor';

import { AppContext } from '../AppContext';
import { useDebounce } from '../utils/hooks/useDebounce';

import { LanguageDefinition } from './language.definition';

import './theme.css';

export const CodeEditor = () => {
  const { setAppState } = React.useContext(AppContext);

  const [code, setCode] = React.useState(``);

  const debouncedCode = useDebounce(code, 500);

  React.useEffect(() => {
    setAppState(os => ({ ...os, code: debouncedCode }));
  }, [debouncedCode]);

  return (
    <Editor
      value={code}
      onValueChange={code => setCode(code)}
      highlight={code => highlight(code, LanguageDefinition)}
      padding={10}
      style={{
        color: '#fdf0d5',
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 16,
        height: '100%',
        overflowY: 'scroll',
      }}
    />
  );
};
