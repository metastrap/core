import fixtures from '@/fixtures';

describe('fixtures', () => {
  test('generate fixtures', async () => {
    const fixtureMap = await fixtures('next');
    expect(
      Array.from(fixtureMap.keys()),
    ).toMatchSnapshot();
  });
});
