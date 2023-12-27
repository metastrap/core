import path from 'node:path';
import { walk } from "@/utils/walk";

describe('utils/walk', () => {
  test('walk through fixtures', async () => {
    const fixtures = await walk(path.join(process.cwd(), 'fixtures', 'next'));
    expect(fixtures.map(
      file => file.replace(`${process.cwd()}/fixtures/next/`, '')
    )).toMatchSnapshot();
  });
});
