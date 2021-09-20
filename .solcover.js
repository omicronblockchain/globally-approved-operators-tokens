module.exports = {
  istanbulReporter: ['html', 'lcov', 'text'],
  norpc: true,
  testCommand: 'yarn test',
  compileCommand: 'yarn run build',
  skipFiles: [
    'mocks',
  ],
  providerOptions: {
    default_balance_ether: '10000000000000000000000000',
  },
  mocha: {
    fgrep: '[skip-on-coverage]',
    invert: true,
  },
}