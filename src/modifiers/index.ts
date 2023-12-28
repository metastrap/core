/* browser */
import { EFrameworks } from 'types';
import { baseFiles as nextBaseFiles } from './next';

// eslint-disable-next-line import/prefer-default-export
export const baseFiles: {
  [key in EFrameworks]: string[];
} = {
  [EFrameworks.next]: nextBaseFiles,
  [EFrameworks.react]: nextBaseFiles,
};
