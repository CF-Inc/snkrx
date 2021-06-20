#!/usr/bin/env node

const { types, scopes, ticketNumberPrefix } = require('./.cz-config.js');

const typeValues = types.map(({ value }) => value);
const scopeNames = scopes.map(({ name }) => name);

const Configuration = {
  extends: ['@commitlint/config-angular'],
  formatter: '@commitlint/format',

  parserPreset: {
    parserOpts: {
      issuePrefixes: ticketNumberPrefix,
    },
  },

  rules: {
    'type-enum': [2, 'always', typeValues],
    'scope-enum': [2, 'always', scopeNames],
    'scope-empty': [2, 'never'],
    'subject-max-length': [2, 'always', 72],
    'body-empty': [2, 'never'],
    'body-full-stop': [2, 'never'],
    'signed-off-by': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
  },

  defaultIgnores: true,
  helpUrl: 'https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit',
};

module.exports = Configuration;
