import type { ParseResult } from '@babel/parser';
import type { File } from '@babel/types';

export type TAstValue = string | ParseResult<File> | { [key: string]: unknown };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TObject = { [key: string]: any };

export type TAstMap = Map<string, TAstValue>;
export type TROAstMap = ReadonlyMap<string, TAstValue>;

export enum EFrameworks {
  next = 'next',
  react = 'react',
}

export type TFrameworks = typeof EFrameworks;

interface ICommonOptions {
  downloadFileName: string;
}

export interface INextOptions extends ICommonOptions {
  features: {
    withTailwindcss: boolean;
  }
}

interface IReactOptions extends ICommonOptions {
  features: null;
}

export type TOptions<T extends EFrameworks> = T extends EFrameworks.next
  ? INextOptions
  : IReactOptions;
