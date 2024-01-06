import type { ParseResult } from '@babel/parser';
import type { File } from '@babel/types';
import * as t from '@babel/types';
import {
  TAstMap, TObject,
  TROAstMap,
} from 'types';

export const mdxFiles = [
  'mdx-components.jsx',
  'app/blog/page.mdx',
];

export default function withMdx(
  baseAstMap: TAstMap,
  fullAstMap: TROAstMap,
) {
  // eslint-disable-next-line no-debugger
  debugger;
  /* package.json */
  const pkg = baseAstMap.get('package.json') as TObject;
  pkg.devDependencies = {
    ...pkg.devDependencies || {},
    '@next/mdx': 'latest',
  };

  nextConfigTransform(
    baseAstMap.get('next.config.js') as ParseResult<File>,
  );

  mdxFiles.forEach((file) => {
    baseAstMap.set(file, fullAstMap.get(file) || '');
  });
}

function nextConfigTransform(nextConfig: ParseResult<File>) {
  const { body } = nextConfig.program;

  /* find the line where 'nextConfig' is declared */
  const nextConfigDeclaration = body.find(
    (node) => node.type === 'VariableDeclaration'
      && node.declarations.some(
        (declaration) => (declaration.id as t.Identifier).name === 'nextConfig',
      ),
  ) as t.VariableDeclaration;

  /* assign 'pageExtensions' in place of empty object */
  nextConfigDeclaration.declarations[0].init = t.objectExpression([
    t.objectProperty(
      t.identifier('pageExtensions'),
      t.arrayExpression([
        t.stringLiteral('js'),
        t.stringLiteral('jsx'),
        t.stringLiteral('mdx'),
      ]),
    ),
    t.objectProperty(
      t.identifier('experimental'),
      t.objectExpression(
        [
          t.objectProperty(
            t.identifier('mdxRs'),
            t.booleanLiteral(true),
          ),
        ],
      ),
    ),
  ]);

  /* require `@next/mdx` with init */
  body.unshift(
    t.variableDeclaration('const', [
      t.variableDeclarator(
        t.identifier('withMDX'),
        t.callExpression(
          t.callExpression(
            t.identifier('require'),
            [
              t.stringLiteral('@next/mdx'),
            ],
          ),
          [],
        ),
      ),
    ]),
  );

  /* find `module.exports` */
  const moduleExports = body.find(
    (node) => node.type === 'ExpressionStatement'
      && node.expression.type === 'AssignmentExpression'
      && node.expression.left.type === 'MemberExpression'
      && (node.expression.left.object as t.Identifier).name === 'module'
      && (node.expression.left.property as t.Identifier).name === 'exports',
  ) as t.ExpressionStatement;

  /* replace `module.exports = withMDX(nextConfig)` */
  (moduleExports.expression as t.AssignmentExpression).right = t.callExpression(
    t.identifier('withMDX'),
    [
      t.identifier('nextConfig'),
    ],
  );
}
