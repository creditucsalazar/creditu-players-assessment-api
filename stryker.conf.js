module.exports = {
  packageManager: 'npm',
  testRunner: 'jest',
  mutate: [
    'src/**/*.ts',
    '!src/main.ts',
    '!src/**/*.module.ts',
    '!src/**/*.dto.ts',
    '!src/**/*.schema.ts',
    '!src/**/*.spec.ts',
  ],
};
