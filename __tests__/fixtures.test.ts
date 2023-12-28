import fs from 'node:fs';
import {
  pack, saveToLocation, setBaseProject, fixtures,
} from '@/fixtures';

jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
jest.spyOn(fs, 'mkdirSync').mockImplementation(() => 'mock-dir-path');

describe('fixtures', () => {
  test('generate fixtures', async () => {
    const fixtureMap = await fixtures('next');
    expect(
      Array.from(fixtureMap.keys()),
    ).toMatchSnapshot();
  });
  test('pack map of files to zip', () => {
    const zip = pack(new Map([['file', 'content']]));
    expect(Object.keys(zip.files)).toStrictEqual(['file']);
  });

  test('save zip to location', async () => {
    const zip = pack(new Map([['file', 'content']]));
    await saveToLocation('./tmp', 'file', zip);
    expect(fs.mkdirSync).toHaveBeenCalledWith('./tmp', { recursive: true });
    expect(fs.writeFileSync).toHaveBeenCalledWith('./tmp/file.zip', expect.anything());
  });

  test('set base project', () => {
    const fullProject = new Map([
      ['file', 'content'],
      ['file2', 'content2'],
    ]);
    expect(
      Object.fromEntries(
        setBaseProject(fullProject, ['file']).entries(),
      ),
    ).toStrictEqual({
      file: 'content',
    });
  });
});
