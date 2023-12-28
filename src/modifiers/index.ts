/* browser */
import { EFrameworks, INextOptions } from 'types';
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
