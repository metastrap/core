import { pack } from '@/project';
import readZipToMap from '@/utils/read';
import mock from 'testUtils/mock';

describe('utils/read', () => {
  test('readFilesToMap', async () => {
    expect(
      await readZipToMap(
        pack(mock),
      ),
    ).toStrictEqual(mock);
  });
});
