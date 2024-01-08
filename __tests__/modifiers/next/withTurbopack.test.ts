import path from 'node:path';
import { TAstValue } from 'types/index';
import { baseFiles } from '@/modifiers/next';
import { convertTextToAst, print } from '@/utils/ast';
import { setBaseProject } from '@/project';
import { readFilesToMap } from 'testUtils/read';
import withTurbopack from '@/modifiers/next/withTurbopack';

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
    withTurbopack(baseAsTree);

    /* ensure `next.config.js` is modified */
    expect(
      print(baseAsTree).get('package.json'),
    ).toMatchSnapshot();
  });
});
