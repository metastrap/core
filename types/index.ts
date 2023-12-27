import type { ParseResult } from '@babel/parser';
import type { File } from '@babel/types';

export type TAstValue = string | ParseResult<File> | { [key: string]: unknown };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TObject = { [key: string]: any };
