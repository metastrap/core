import path from 'node:path';

import type { TAstValue, TFrameworks } from 'types/index';
import { readFilesToMap } from './utils/walk';

export default async function fixtures(framework: TFrameworks) {
  return await readFilesToMap(
    path.join(process.cwd(), 'fixtures', framework),
  );
}

export function setBaseProject(
  fullProject: Map<string, TAstValue>,
  baseFiles: string[],
): Map<string, TAstValue> {
  const baseProject = new Map<string, TAstValue>();
  fullProject.forEach((content, file) => {
    if (baseFiles.includes(file)) {
      baseProject.set(file, content);
    }
  });
  return baseProject;
}
