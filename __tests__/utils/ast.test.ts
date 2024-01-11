import { ParseResult } from '@babel/parser';
import * as t from '@babel/types';
import type { File } from '@babel/types';
import { convertTextToAst, print, addToBaseAst } from '@/utils/ast';
import mock from 'testUtils/mock';
import { TAstValue } from 'types/index';

describe('utils/ast', () => {
  test('ast conversion of files in project', () => {
    expect(
      convertTextToAst(mock),
    ).toMatchSnapshot();
  });

  test('convert back ast to text', () => {
    const asTree = convertTextToAst(mock);
    (asTree.get('app/app.jsx') as ParseResult<File>)?.program.body.unshift(
      t.importDeclaration([], t.stringLiteral('./globals.css')),
    );
    expect(
      print(asTree),
    ).toMatchSnapshot();
  });
});

describe('addToBaseAst', () => {
  let baseAstMap: Map<string, TAstValue>;
  let fullAstMap: Map<string, TAstValue>;

  beforeAll(() => {
    baseAstMap = new Map<string, TAstValue>();
    fullAstMap = new Map<string, TAstValue>([
      ['file1.js', ''],
      ['file2.js', ''],
    ]);
  });

  test('should add files to the base AST map', async () => {
    await addToBaseAst(baseAstMap, ['file1.js', 'file2.js'], fullAstMap);

    expect(fullAstMap.size).toBe(2);
    expect(fullAstMap.get('file1.js')).toBeDefined();
    expect(fullAstMap.get('file2.js')).toBeDefined();
  });

  test('should handle empty file list', async () => {
    await addToBaseAst(baseAstMap, ['file1.js', 'file2.js'], fullAstMap);

    expect(fullAstMap.size).toBe(2);
  });

  test('should handle duplicate files', async () => {
    await addToBaseAst(baseAstMap, ['file1.js', 'file1.js'], fullAstMap);

    expect(fullAstMap.get('file1.js')).toBeDefined();
  });
});
