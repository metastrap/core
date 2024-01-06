import path from 'node:path';
import { TAstValue } from 'types/index';
import { baseFiles } from '@/modifiers/next';
import { convertTextToAst, print } from '@/utils/ast';
import { setBaseProject } from '@/project';
import { readFilesToMap } from 'testUtils/read';
import withWindi, { windiFiles } from '@/modifiers/next/withWindi';

let baseAsTree: Map<string, TAstValue>; let
  fullProject: Map<string, TAstValue>;

describe('modifiers/next/withWindi', () => {
  beforeEach(async () => {
    fullProject = convertTextToAst(
      await readFilesToMap(
        path.join(process.cwd(), 'fixtures', 'next'),
      ),
    );
    baseAsTree = setBaseProject(fullProject, baseFiles);
  });

  test('withWindi', () => {
    withWindi(baseAsTree, fullProject);

    /* ensure `windi.config.js` is added */
    expect(
      windiFiles.map((file) => typeof baseAsTree.get(file)),
    ).toStrictEqual([
      'object',
    ]);

    /* ensure `next.config.js` is modified */
    expect(
      print(baseAsTree).get('next.config.js'),
    ).toMatchSnapshot();

    /* ensure `app/layout.jsx` is modified */
    expect(
      print(baseAsTree).get('app/layout.jsx'),
    ).toMatchSnapshot();
  });
});
