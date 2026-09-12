export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'chore', 'ci', 'revert'],
    ],
    'header-max-length': [2, 'always', 72],
  },
}
