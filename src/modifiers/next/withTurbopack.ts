import {
  TAstMap, TObject,
} from 'types';

export default function withEslint(
  baseAstMap: TAstMap,
) {
  /* package.json */
  const pkg = baseAstMap.get('package.json') as TObject;
  pkg.scripts = {
    ...pkg.scripts || {},
    dev: 'next dev --turbo',
  };
}
