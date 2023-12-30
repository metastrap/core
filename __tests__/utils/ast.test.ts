import { ParseResult } from '@babel/parser';
import * as t from '@babel/types';
import type { File } from '@babel/types';
import { convertTextToAst, print } from '@/utils/ast';
import mock from 'testUtils/mock';

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
