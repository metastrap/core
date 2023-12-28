import path from 'node:path';

import type { TAstValue, TFrameworks } from 'types/index';
import { readFilesToMap } from './utils/walk';

export default async function fixtures(framework: TFrameworks): Promise<Map<string, TAstValue>> {
  return await readFilesToMap(
    path.join(process.cwd(), 'fixtures', framework),
  );
}
