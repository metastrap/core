import JSZip from 'jszip';

import type { TAstValue } from 'types/index';

export function pack(data: Map<string, string>): JSZip {
  const zip = new JSZip();
  data.forEach((content, file) => {
    zip.file(file, content);
  });
  return zip;
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
