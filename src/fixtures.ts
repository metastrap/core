import path from 'node:path';
import fs from 'node:fs';
import JSZip from 'jszip';

import type { TAstValue, TFrameworks } from 'types/index';
import { readFilesToMap } from './utils/walk';

export async function fixtures(framework: TFrameworks): Promise<Map<string, TAstValue>> {
  return await readFilesToMap(
    path.join(process.cwd(), 'fixtures', framework),
  );
}

export function pack(data: Map<string, string>): JSZip {
  const zip = new JSZip();
  data.forEach((content, file) => {
    zip.file(file, content);
  });
  return zip;
}

export function saveToLocation(dir: string, fileName: string, zip: JSZip): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    zip.generateAsync({ type: 'nodebuffer' }).then((content) => {
      try {
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(
          `${dir}/${fileName}${path.extname(fileName) ? '' : '.zip'}`,
          content,
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
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
