import { addToBaseAst } from '@/utils/ast';
import {
  TAstMap, TObject,
  TROAstMap,
} from 'types';

export const NAMESPACE = 'vitest';

export const vitestFiles = [
  'vitest/__tests__/components/counter.test.jsx',
  'vitest/__tests__/utils/add.test.js',
  'vitest/__tests__/page.test.jsx',
  'vitest.config.js',
  'app/utils/add.js',
  'app/counter.jsx',
];

export default function withVitest(
  baseAstMap: TAstMap,
  fullAstMap: TROAstMap,
) {
  /* package.json */
  const pkg = baseAstMap.get('package.json') as TObject;
  pkg.devDependencies = {
    ...pkg.devDependencies || {},
    '@testing-library/react': '14.1.2',
    '@vitejs/plugin-react': '^4.2.1',
    vitest: '1.0.4',
    jsdom: '^23.0.1',
  };

  pkg.scripts = {
    ...pkg.scripts || {},
    test: 'vitest',
  };

  addToBaseAst(baseAstMap, vitestFiles, fullAstMap);

  /* Rename files since `vitest/` was added for namespacing */
  for (let i = 0; i < 3; i++) {
    const oldKey = vitestFiles[i];
    const newKey = oldKey.replace(`${NAMESPACE}/`, '');
    baseAstMap.set(newKey, baseAstMap.get(oldKey) as TObject);
    baseAstMap.delete(oldKey);
  }
}
