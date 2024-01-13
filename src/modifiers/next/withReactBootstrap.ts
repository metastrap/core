import { addCssImportToFile } from '@/utils/ast';
import { ParseResult } from '@babel/parser';
import { File } from '@babel/types';
import {
  TAstMap, TObject,
} from 'types';

export default function withReactBootstrap(
  baseAstMap: TAstMap,
) {
  /* package.json */
  const pkg = baseAstMap.get('package.json') as TObject;
  pkg.devDependencies = {
    ...pkg.devDependencies || {},
    'react-bootstrap': '^2.9.2',
    bootstrap: '^5.3.2',
  };

  addCssImportToFile(
    baseAstMap.get('app/layout.jsx') as ParseResult<File>,
    'bootstrap/dist/css/bootstrap.min.css',
  );
}
