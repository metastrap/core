/* node */
import path from 'node:path';

import type { TAstValue, EFrameworks } from 'types/index';
import { readFilesToMap } from './utils/walk';

export default async function fixtures(framework: EFrameworks): Promise<Map<string, TAstValue>> {
  return await readFilesToMap(
    path.join(process.cwd(), 'fixtures', framework.toString()),
  );
}
