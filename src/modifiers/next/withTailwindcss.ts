import { ParseResult } from '@babel/parser';
import * as t from '@babel/types';

import type { File } from '@babel/types';

import { TAstValue, TObject } from 'types';

export const tailwindFiles = [
  'postcss.config.js',
  'tailwind.config.js',
  'app/globals.css',
];

export function withTailwindcss(
  baseAstMap: Map<string, TAstValue>,
  fullAstMap: Map<string, TAstValue>,
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
  const globalCssLocation = './globals.css';
  const importNodeIndex = appLayout.program
    .body
    .findIndex(
      (node) => node.type === 'ImportDeclaration'
          && node.source.value === globalCssLocation,
    );
  if (!~importNodeIndex) {
    appLayout.program.body.unshift(
      t.importDeclaration([], t.stringLiteral(globalCssLocation)),
    );
  }

  tailwindFiles.forEach((file) => {
    baseAstMap.set(file, fullAstMap.get(file) || '');
  });
}

export function undoTailwindcss(astMap: Map<string, TAstValue>) {
  /* package.json */
  const pkg = astMap.get('package.json') as TObject;
  delete pkg.devDependencies.tailwindcss;
  delete pkg.devDependencies.autoprefixer;
  delete pkg.devDependencies.postcss;

  tailwindFiles.forEach((file) => {
    astMap.delete(file);
  });
}
