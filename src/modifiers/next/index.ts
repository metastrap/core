import { withTailwindcss } from './withTailwindcss';
import withMdx from './withMdx';
import withWindi from './withWindi';
import withTurbopack from './withTurbopack';

/* browser */
export const baseFiles = [
  '.gitignore',
  'app/layout.jsx',
  'app/page.jsx',
  'jsconfig.json',
  'next.config.js',
  'package.json',
];

export const modifiers = {
  withMdx,
  withTailwindcss,
  withTurbopack,
  withWindi,
};
