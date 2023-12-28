import fixtures from '@/fixtures';
import { EFrameworks } from '../types';

describe('fixtures', () => {
  test('generate fixtures', async () => {
    const fixtureMap = await fixtures(EFrameworks.next);
    expect(
      Array.from(fixtureMap.keys()),
    ).toMatchSnapshot();
  });
});
