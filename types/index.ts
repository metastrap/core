import type { ParseResult } from '@babel/parser';
import type { File } from '@babel/types';
import { EFrameworks } from '@/constants/enum';

export type TAstValue = string | ParseResult<File> | { [key: string]: unknown };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TObject = { [key: string]: any };

export type TAstMap = Map<string, TAstValue>;
export type TROAstMap = ReadonlyMap<string, TAstValue>;

export type TFrameworks = typeof EFrameworks;

export interface ICommonOptions {
  downloadFileName: string;
}

export interface INextOptions extends ICommonOptions {
  features: {
    withTailwindcss: boolean;
  }
}

export interface IReactOptions extends ICommonOptions {
  features: null;
}

export type TOptions<T extends EFrameworks> = T extends EFrameworks.next
  ? INextOptions
  : IReactOptions;
