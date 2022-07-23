import { INTERPRETER_CONSTS } from './consts';

const Token = (type, name = null, value = null) => {
  return {
    type,
    name,
    value,
  };
};

// eslint-disable-next-line no-unused-vars
const throwErrorMain = (message, line, char) => {
  throw `ERROR - ${message} at line ${line} position ${char}`;
};

export const Tokenizer = code => {
  if (!code) {
    return null;
  }

  const lines = code.split('\n').map(line => line.trim());

  const tokenizedLines = lines.map((line, lineNumber) => {
    let charIndex = 0;
    let currentChar = null;
    const tokens = [];

    const throwError = message => throwErrorMain(message, lineNumber + 1, charIndex);

    const pickNextChar = () => {
      currentChar = line[charIndex] || null;
      charIndex++;
    };

    const pickIgnoreSpaces = () => {
      pickNextChar();
      while (currentChar === ' ') {
        pickNextChar();
      }
    };

    // We pick the first char
    pickNextChar();

    // Then we loop until we hit a end of line
    while (currentChar !== null) {
      // We rule out each option one after the other
      if (currentChar === '/') {
        // We need to check the next char, it is either a comment or a divide operator
        pickNextChar();
        if (currentChar === '/') {
          // It was a comment, lets skip it and return the tokens
          return tokens;
        } else {
          // It was a divide => we add the corresponding token and go to the next one
          tokens.push(Token(INTERPRETER_CONSTS.OPERATOR, INTERPRETER_CONSTS.OPERATOR_DIVIDE, '/'));
          // We cannot pick the next char has it has already been done and not yet processed
        }
      } else if (currentChar === '*' || currentChar === '+' || currentChar === '-') {
        // It is an operator, let's find it's name and add it
        let operatorName = null;
        switch (currentChar) {
          case '*':
            operatorName = INTERPRETER_CONSTS.OPERATOR_MULTIPLY;
            break;
          case '+':
            operatorName = INTERPRETER_CONSTS.OPERATOR_ADD;
            break;
          case '-':
            operatorName = INTERPRETER_CONSTS.OPERATOR_SUBTRACT;
            break;
        }
        tokens.push(Token(INTERPRETER_CONSTS.OPERATOR, operatorName, currentChar));
        // We need to pick the char for the next loop run
        pickIgnoreSpaces();
      } else if (currentChar.match(/\d/)) {
        // It's a number
        let value = '';
        while (currentChar && currentChar.match(/(\d|\.)/)) {
          if (currentChar === '.' && value.includes('.')) {
            // We have two points in the same number => throw an error
            throwError(`Not expecting a decimal separator`);
          }
          // We add the char to the output and pick the next one
          value += currentChar;
          pickNextChar();
        }
        if (currentChar && currentChar.match(/[a-zA-Z]/)) {
          // We should not find a letter directly after a number
          throwError('Not expecting a letter here (forgot a space?)');
        } else if (value[value.length - 1] === '.') {
          throwError('Unterminated number (dangling ".")');
        }
        tokens.push(Token(INTERPRETER_CONSTS.NUMBER, INTERPRETER_CONSTS.NUMBER, +value));
      } else if (currentChar.match(/([A-Z])/)) {
        // It is a capital letter => a keyword
        let value = '';
        while (currentChar && currentChar.match(/([A-Z])/)) {
          value += currentChar;
          pickNextChar();
        }
        if (currentChar && currentChar !== ' ') {
          // A keyword is always followed by a space
          throwError(`Unrecognised character after a keyword ("${currentChar}")`);
        }
        // Now we find the type of keyword
        let keywordName = null;
        switch (value) {
          case 'DEFINE':
            keywordName = INTERPRETER_CONSTS.KEYWORD_DEFINE;
            break;
          case 'POINT':
            keywordName = INTERPRETER_CONSTS.KEYWORD_POINT;
            break;
          case 'LINE':
            keywordName = INTERPRETER_CONSTS.KEYWORD_LINE;
            break;
          case 'DRAFT':
            keywordName = INTERPRETER_CONSTS.KEYWORD_DRAFT;
            break;
          case 'LAYER':
            keywordName = INTERPRETER_CONSTS.KEYWORD_LAYER;
            break;
          case 'AS':
            keywordName = INTERPRETER_CONSTS.KEYWORD_AS;
            break;
          case 'USE':
            keywordName = INTERPRETER_CONSTS.KEYWORD_USE;
            break;
          default:
            throwError(`Unknown keyword "${value}"`);
        }
        tokens.push(Token(INTERPRETER_CONSTS.KEYWORD, keywordName, value));
      } else if (currentChar.match(/([a-z])/)) {
        // It is a lower-case letter => a variable name
        let value = '';
        while (currentChar && currentChar.match(/([a-z]|\d|_|\.)/)) {
          value += currentChar;
          pickNextChar();
        }
        // We have a variable name, and probably some property access
        const out = value.split('.');
        tokens.push(Token(INTERPRETER_CONSTS.EXPRESSION, INTERPRETER_CONSTS.EXPRESSION, out.shift()));
        out.forEach(v => tokens.push(Token(INTERPRETER_CONSTS.PROPERTY_ACCESS, INTERPRETER_CONSTS.PROPERTY_ACCESS, v)));
      } else if (currentChar === '[') {
        tokens.push(Token(INTERPRETER_CONSTS.BRACKET, INTERPRETER_CONSTS.OPENING_SQUARE_BRACKET, '['));
        pickIgnoreSpaces();
      } else if (currentChar === ']') {
        tokens.push(Token(INTERPRETER_CONSTS.BRACKET, INTERPRETER_CONSTS.CLOSING_SQUARE_BRACKET, ']'));
        pickIgnoreSpaces();
      } else if (currentChar === '(') {
        tokens.push(Token(INTERPRETER_CONSTS.BRACKET, INTERPRETER_CONSTS.OPENING_ROUND_BRACKET, '('));
        pickIgnoreSpaces();
      } else if (currentChar === ')') {
        tokens.push(Token(INTERPRETER_CONSTS.BRACKET, INTERPRETER_CONSTS.CLOSING_ROUND_BRACKET, ')'));
        pickIgnoreSpaces();
      } else if (currentChar === ',') {
        tokens.push(Token(INTERPRETER_CONSTS.COMMA, INTERPRETER_CONSTS.COMMA, ','));
        pickIgnoreSpaces();
      } else if (currentChar === ' ') {
        pickIgnoreSpaces();
      } else {
        // We don't know what it is, let's throw an error
        throwError(`Unknown character "${currentChar}"`);
      }
    }

    return tokens;
  });

  return tokenizedLines.filter(line => line && line.length > 0);
};
