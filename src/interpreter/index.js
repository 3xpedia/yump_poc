import { AstBuilder } from './ast_builder';
import { Tokenizer } from './tokenizer';

export const Interpreter = code => {
  return AstBuilder(Tokenizer(code));
};
