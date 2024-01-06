import { withTailwindcss } from './withTailwindcss';
import withMdx from './withMdx';

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
  withTailwindcss,
  withMdx,
};
