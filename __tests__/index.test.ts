import index from '@/index';

describe('index', () => {
  test('print text', () => {
    const result = index();
    expect(result).toBe("Hello World");
  });
});