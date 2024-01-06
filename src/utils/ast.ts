/* browser */
import { ParseResult, ParserPlugin, parse } from '@babel/parser';
import generate from '@babel/generator';

import type { File } from '@babel/types';

import { TAstMap, TAstValue } from 'types';
import logger from './logger';

enum EFileFeature {
  JAVASCRIPT = 1,
  TYPESCRIPT = 2,
  JSX = 4,
  JSON = 8,
}

export function convertTextToAst(
  fileContentMap: Map<string, string>,
): TAstMap {
  const resultMap = new Map<string, TAstValue>();

  fileContentMap.forEach((content, file) => {
    let featureFlag = 0;
    const extname = file.split('.').pop() || '';
    const babelParsePlugins: ParserPlugin[] = ['classProperties'];

    let result: TAstValue = content;
    switch (extname) {
      case 'js':
        featureFlag |= EFileFeature.JAVASCRIPT;
        break;
      case 'ts':
        featureFlag |= EFileFeature.TYPESCRIPT;
        break;
      case 'jsx':
        featureFlag |= EFileFeature.JSX;
        break;
      case 'tsx':
        featureFlag |= EFileFeature.TYPESCRIPT | EFileFeature.JSX;
        break;
      case 'json':
        try {
          result = JSON.parse(content);
        } catch (e) {
          logger((e as Error).message);
        }
    }

    if (featureFlag & EFileFeature.TYPESCRIPT) babelParsePlugins.push('typescript');
    if (featureFlag & EFileFeature.JSX) babelParsePlugins.push('jsx');

    if (featureFlag & (EFileFeature.JAVASCRIPT | EFileFeature.TYPESCRIPT | EFileFeature.JSX)) {
      try {
        result = parse(content, {
          sourceType: 'module',
          plugins: babelParsePlugins,
        });
      } catch (e) {
        logger((e as Error).message);
        result = content;
      }
    }
    resultMap.set(file, result);
  });
  return resultMap;
}

export function print(ast: Map<string, TAstValue>): Map<string, string> {
  const resultMap = new Map<string, string>();
  ast.forEach((astValue, file) => {
    if (typeof astValue === 'string') {
      resultMap.set(file, astValue);
      return;
    }
    if (astValue.program) {
      resultMap.set(file, generate(astValue as ParseResult<File>).code);
      return;
    }
    if (typeof astValue === 'object') {
      try {
        resultMap.set(file, JSON.stringify(astValue, null, 2));
      } catch (e) {
        resultMap.set(file, astValue.toString?.() || '');
      }
    }
  });
  return resultMap;
}
