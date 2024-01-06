import {
  TAstMap, TObject,
} from 'types';

// eslint-disable-next-line import/prefer-default-export
export function withEslint(
  baseAstMap: TAstMap,
) {
  /* package.json */
  const pkg = baseAstMap.get('package.json') as TObject;
  pkg.devDependencies = {
    ...pkg.devDependencies || {},
    eslint: '^7.24.0',
    'eslint-config-next': 'latest',
  };

  pkg.scripts = {
    ...pkg.scripts || {},
    lint: 'next lint',
  };
}
