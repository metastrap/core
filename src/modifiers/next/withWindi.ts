import type { ParseResult } from '@babel/parser';
import type { File } from '@babel/types';
import * as t from '@babel/types';
import { TAstMap, TROAstMap, TObject } from 'types';

export const windiFiles = [
  'windi.config.js',
];

export default function withWindi(
  baseAstMap: TAstMap,
  fullAstMap: TROAstMap,
) {
  /* package.json */
  const pkg = baseAstMap.get('package.json') as TObject;
  pkg.devDependencies = {
    ...pkg.devDependencies || {},
    windicss: '3.5.1',
    'windicss-webpack-plugin': '1.6.7',
  };

  addImportToAppLayout(
    baseAstMap.get('app/layout.jsx') as ParseResult<File>,
    'windi.css',
  );

  nextConfigTransform(
    baseAstMap.get('next.config.js') as ParseResult<File>,
  );

  windiFiles.forEach((file) => {
    baseAstMap.set(file, fullAstMap.get(file) || '');
  });
}

function addImportToAppLayout(
  appLayout: ParseResult<File>,
  importLocation: string,
) {
  const importNodeIndex = appLayout.program
    .body
    .findIndex(
      (node) => node.type === 'ImportDeclaration'
        && node.source.value === importLocation,
    );
  if (!~importNodeIndex) {
    appLayout.program.body.unshift(
      t.importDeclaration(
        [],
        t.stringLiteral(importLocation),
      ),
    );
  }
}

function nextConfigTransform(nextConfig: ParseResult<File>) {
  const { body } = nextConfig.program;

  /* require `@next/mdx` with init */
  body.unshift(
    t.variableDeclaration('const', [
      t.variableDeclarator(
        t.identifier('WindiCSSWebpackPlugin'),
        t.callExpression(
          t.callExpression(
            t.identifier('require'),
            [
              t.stringLiteral('windicss-webpack-plugin'),
            ],
          ),
          [],
        ),
      ),
    ]),
  );

  /* find the line where 'nextConfig' is declared */
  const nextConfigDeclaration = body.find(
    (node) => node.type === 'VariableDeclaration'
      && node.declarations.some(
        (declaration) => (declaration.id as t.Identifier).name === 'nextConfig',
      ),
  ) as t.VariableDeclaration;

  const nextConfigObjectExp = nextConfigDeclaration.declarations.find(
    (declarator) => (declarator.id as t.Identifier).name === 'nextConfig',
  )?.init as t.ObjectExpression;

  /* find the line where 'webpack' is declared */
  const webpackFunction = nextConfigObjectExp.properties.find(
    (property): property is t.ObjectProperty => t.isObjectProperty(property)
      && (property.key as t.Identifier).name === 'webpack',
  ).value as unknown as t.ArrowFunctionExpression;

  /* add windi plugin to webpack config */
  (webpackFunction.body as t.BlockStatement).body.unshift(
    t.expressionStatement(
      t.callExpression(
        t.memberExpression(
          t.memberExpression(
            t.identifier('config'),
            t.identifier('plugins'),
          ),
          t.identifier('push'),
        ),
        [
          t.newExpression(
            t.identifier('WindiCSSWebpackPlugin'),
            [],
          ),
        ],
      ),
    ),
  );
}
