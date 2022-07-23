export const LanguageDefinition = {
  keyword: {
    pattern: /(^|\s*)\b(DEFINE|POINT|LINE|DRAFT|LAYER|AS)\b/,
    lookbehind: true,
  },
  number: [
    { pattern: /\d+\.\d+/, lookbehind: true },
    { pattern: /\d+/, lookbehind: true },
  ],
  operator: /\+|-|\*|\//,
};
