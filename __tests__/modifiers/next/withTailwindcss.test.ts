import path from 'node:path';
import { TAstValue } from 'types/index';
import { baseFiles } from '@/modifiers/next';
import { readFilesToMap } from '@/utils/walk';
import { convertTextToAst } from '@/utils/ast';
import { setBaseProject } from '@/project';
import { withTailwindcss, tailwindFiles } from '@/modifiers/next/withTailwindcss';

let baseAsTree: Map<string, TAstValue>; let
  fullProject: Map<string, TAstValue>;

describe('modifiers/next/withTailwindcss', () => {
  beforeEach(async () => {
    fullProject = convertTextToAst(
      await readFilesToMap(
        path.join(process.cwd(), 'fixtures', 'next'),
      ),
    );
    baseAsTree = setBaseProject(fullProject, baseFiles);
  });

  test('withTailwindcss', () => {
    withTailwindcss(baseAsTree, fullProject);
    expect(
      tailwindFiles.map((file) => typeof baseAsTree.get(file)),
    ).toStrictEqual([
      'object', 'object', 'string',
    ]);
  });
});
