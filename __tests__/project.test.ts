import { pack, setBaseProject } from '@/project';

describe('project', () => {
  test('pack map of files to zip', () => {
    const zip = pack(new Map([['file', 'content']]));
    expect(Object.keys(zip.files)).toStrictEqual(['file']);
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
