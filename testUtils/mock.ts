export default new Map([
  // eslint-disable-next-line no-template-curly-in-string
  ['index.ts', 'export default function index(name: string): string { return `Hello, ${name}`; }'],
  ['package.json', '{"name": "test"}'],
  ['.gitignore', 'dist\nbuild\nnode_modules\n'],
  ['app/layout.tsx', 'export default function Layout({children}:{children:React.ReactNode}) { return <div>{children}</div>; }'],
  ['app/app.jsx', 'export default function Layout() { return <div>Main</div>; }'],
  ['util/index.js', 'export default function index() { return "Hello World"; }'],
  ['styles/globals.css', 'body { margin: 0; }'],
]);
