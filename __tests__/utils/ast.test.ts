import { ParseResult } from "@babel/parser";
import * as t from '@babel/types';
import { convertTextToAst, print } from "@/utils/ast";
import type { File } from '@babel/types';

const textMap = new Map([
  ['index.ts', 'export default function index(name: string): string { return `Hello, ${name}`; }'],
  ['package.json', '{"name": "test"}'],
  ['app/layout.tsx', 'export default function Layout({children}:{children:React.ReactNode}) { return <div>{children}</div>; }'],
  ['app/app.jsx', 'export default function Layout() { return <div>Main</div>; }'],
  ['util/index.js', 'export default function index() { return "Hello World"; }'],
  ['styles/globals.css', 'body { margin: 0; }'],
]);

describe('utils/ast', () => {
  test('ast conversion of files in project', () => {
    expect(
      convertTextToAst(textMap)
    ).toMatchSnapshot();
  });

  test('convert back ast to text', () => {
    const asTree = convertTextToAst(textMap);
    (asTree.get('app/app.jsx') as ParseResult<File>)?.program.body.unshift(
      t.importDeclaration(
        [], t.stringLiteral('./globals.css')
      )
    );
    expect(
      print(asTree)
    ).toMatchSnapshot();
  });
});
