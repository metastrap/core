/* browser */
import { INextOptions } from 'types';
import { EFrameworks } from '@/constants/enum';
import { baseFiles as nextBaseFiles, modifiers as nextModifiers } from './next';

// eslint-disable-next-line import/prefer-default-export
export const baseFiles: {
  [key in EFrameworks]: string[];
} = {
  [EFrameworks.next]: nextBaseFiles,
  [EFrameworks.react]: nextBaseFiles,
};

const modifiers: {
  [key in EFrameworks]: { [keys in keyof INextOptions['features']]: (TAstMap, TROAstMap) => void };
} = {
  [EFrameworks.next]: nextModifiers,
  [EFrameworks.react]: nextModifiers,
};

export default modifiers;
