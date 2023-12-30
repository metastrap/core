// eslint-disable-next-line import/no-extraneous-dependencies
import fg from 'fast-glob';
import path from 'node:path';
import fs from 'node:fs/promises';
import { EFrameworks } from '@/constants/enum';

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
