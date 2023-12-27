import index from '../src';

describe('index', () => {
  test('print text', () => {
    const result = index();
    expect(result).toBe("Hello World");
  });
});