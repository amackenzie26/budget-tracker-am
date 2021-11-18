const preprocessor = require('./index');
const fixtures = require('./fixtures');
const p = preprocessor;

beforeEach(() => {
  process.env = {};
});

describe('ifenv', () => {
  it('should keep lines if set', () => {
    process.env['STEAM'] = 1;
    expect(p(fixtures.ifenv)).toBe(fixtures.ifenv_set);
  });

  it('should remove lines unset', () => {
    expect(p(fixtures.ifenv)).toBe(fixtures.ifenv_unset);
  });

  it('should remove else if set', () => {
    process.env['GOG'] = 1;
    expect(p(fixtures.ifenv_else)).toBe(fixtures.ifenv_else_set);
  });

  it('should keep else if unset', () => {
    expect(p(fixtures.ifenv_else)).toBe(fixtures.ifenv_else_unset);
  });

  it('can be used multiple times set', () => {
    process.env['LOGGING'] = 'WARN';
    expect(p(fixtures.ifenv_multiple)).toBe(fixtures.ifenv_multiple_set);
  });

  it('can be used multiple times unset', () => {
    expect(p(fixtures.ifenv_multiple)).toBe(fixtures.ifenv_multiple_unset);
  });
});

describe('ifnenv', () => {
  it('should remove lines if set', () => {
    process.env['RELEASE_NO'] = 1;
    expect(p(fixtures.ifnenv)).toBe(fixtures.ifnenv_set);
  });

  it('should keep lines unset', () => {
    expect(p(fixtures.ifnenv)).toBe(fixtures.ifnenv_unset);
  });

  it('should keep else if set', () => {
    process.env['TOOLCHAIN'] = 'gcc';
    expect(p(fixtures.ifnenv_else)).toBe(fixtures.ifnenv_else_set);
  });

  it('should remove else if unset', () => {
    expect(p(fixtures.ifnenv_else)).toBe(fixtures.ifnenv_else_unset);
  });
});

it('should not otherwise change the input', () => {
  expect(p(fixtures.identity)).toBe(fixtures.identity);
});
