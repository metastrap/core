import { withTailwindcss } from './withTailwindcss';
import withMdx from './withMdx';
import withReactBootstrap from './withReactBootstrap';
import withWindi from './withWindi';
import withTurbopack from './withTurbopack';
import withVitest from './withVitest';

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
  withReactBootstrap,
  withTailwindcss,
  withTurbopack,
  withVitest,
  withWindi,
};
