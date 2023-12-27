/* https://gist.github.com/lovasoa/8691344?permalink_comment_id=2927279#gistcomment-2927279 */
import { promises as fs } from 'fs';
import path from 'path';

export async function walk(dir: string) {
  const fileList = await fs.readdir(dir);
  const files: string[] = await Promise.all(
    fileList.map(async file => {
      const filePath = path.join(dir, file);
      const stats = await fs.stat(filePath);
      if (stats.isDirectory()) return walk(filePath);
      else if (stats.isFile()) return filePath;
    }).filter(file => !!file) as Promise<string>[]
  );

  return files.reduce(
    (all, folderContents) => all.concat(folderContents || ''),
    [] as unknown as string[]
  );
}

export async function readFilesToMap(
  dir: string,
): Promise<Map<string, string>> {
  const map = new Map();
  const files = await walk(dir);

  for (const file of files) {
    const contents = await fs.readFile(file, 'utf8');
    map.set(file.replace(`${dir}/`, ''), contents || '');
  }

  return map;
}