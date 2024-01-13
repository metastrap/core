/* browser */
import { addCssImportToFile } from '@/utils/ast';
import { ParseResult } from '@babel/parser';

import type { File } from '@babel/types';

import {
  TAstMap, TObject, TROAstMap,
} from 'types';

export const tailwindFiles = [
  'postcss.config.js',
  'tailwind.config.js',
  'app/globals.css',
];

export function withTailwindcss(
  baseAstMap: TAstMap,
  fullAstMap: TROAstMap,
) {
  /* package.json */
  const pkg = baseAstMap.get('package.json') as TObject;
  pkg.devDependencies = {
    ...pkg.devDependencies || {},
    // ToDo: can npm ncu update this?
    tailwindcss: '^2.0.2',
    autoprefixer: '^10.0.1',
    postcss: '^8',
  };

  const appLayout = baseAstMap.get('app/layout.jsx') as ParseResult<File>;
  addCssImportToFile(appLayout, './globals.css');

  tailwindFiles.forEach((file) => {
    baseAstMap.set(file, fullAstMap.get(file) || '');
  });
}

export function undoTailwindcss(astMap: TAstMap) {
  /* package.json */
  const pkg = astMap.get('package.json') as TObject;
  delete pkg.devDependencies.tailwindcss;
  delete pkg.devDependencies.autoprefixer;
  delete pkg.devDependencies.postcss;

  tailwindFiles.forEach((file) => {
    astMap.delete(file);
  });
}
