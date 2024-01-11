// eslint-disable-next-line import/no-extraneous-dependencies
import fg from 'fast-glob';
import path from 'node:path';
import fs from 'node:fs/promises';
import { EFrameworks } from '@/constants/enum';
import { TAstValue } from 'types/index';
import { convertTextToAst } from '@/utils/ast';
import { setBaseProject } from '@/project';
import { baseFiles } from '@/modifiers/next';

export async function readFilesToMap(
  dir: string,
): Promise<Map<string, string>> {
  const files = await fg([`${dir}/**/*`], { dot: true });
  return new Map(
    await Promise.all(
      files.map(async (file) => {
        const contents = await fs.readFile(file, 'utf8');
        return [
          file.replace(`${dir}/`, ''),
          contents || '',
        ] as [string, string];
      }),
    ),
  );
}

export async function readFixture(framework: EFrameworks): Promise<Map<string, string>> {
  return await readFilesToMap(
    path.join(process.cwd(), 'fixtures', framework.toString()),
  );
}

export async function astFromFixture(): Promise<[
  Map<string, TAstValue>,
  Map<string, TAstValue>
]> {
  const fullProject = convertTextToAst(
    await readFilesToMap(
      path.join(process.cwd(), 'fixtures', 'next'),
    ),
  );
  return [
    fullProject,
    setBaseProject(fullProject, baseFiles),
  ];
}
