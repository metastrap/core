import { expect, test } from 'vitest';
import add  from '../../app/utils/add';

test('Test functions that import server-only', () => {
  expect(add(1, 2)).toBe(3)
});
