import path from 'node:path';
import { TAstValue } from 'types/index';
import { baseFiles } from '@/modifiers/next';
import { convertTextToAst } from '@/utils/ast';
import { setBaseProject } from '@/project';
import { readFilesToMap } from 'testUtils/read';
import withMdx, { mdxFiles } from '@/modifiers/next/withMdx';

let baseAsTree: Map<string, TAstValue>; let
  fullProject: Map<string, TAstValue>;

describe('modifiers/next/withMDx', () => {
  beforeEach(async () => {
    fullProject = convertTextToAst(
      await readFilesToMap(
        path.join(process.cwd(), 'fixtures', 'next'),
      ),
    );
    baseAsTree = setBaseProject(fullProject, baseFiles);
  });

  test('withMdx', () => {
    withMdx(baseAsTree, fullProject);
    expect(
      mdxFiles.map((file) => typeof baseAsTree.get(file)),
    ).toStrictEqual([
      'object', 'string',
    ]);
    expect(baseAsTree.get('next.config.js'))
      .toMatchSnapshot();
  });
});
