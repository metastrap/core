import path from 'node:path';
import { TAstValue } from 'types/index';
import { baseFiles } from '@/modifiers/next';
import { convertTextToAst } from '@/utils/ast';
import { setBaseProject } from '@/project';
import withReactBootstrap from '@/modifiers/next/withReactBootstrap';
import { readFilesToMap } from 'testUtils/read';

let baseAsTree: Map<string, TAstValue>; let
  fullProject: Map<string, TAstValue>;

describe('modifiers/next/withReactBootstrap', () => {
  beforeEach(async () => {
    fullProject = convertTextToAst(
      await readFilesToMap(
        path.join(process.cwd(), 'fixtures', 'next'),
      ),
    );
    baseAsTree = setBaseProject(fullProject, baseFiles);
  });

  test('withReactBootstrap', () => {
    withReactBootstrap(baseAsTree);
    expect(
      (baseAsTree.get('package.json') as Record<string, unknown>).devDependencies,
    ).toMatchObject({
      bootstrap: expect.anything(),
      'react-bootstrap': expect.anything(),
    });
  });
});
