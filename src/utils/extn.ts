// eslint-disable-next-line import/prefer-default-export
export function getExtn(filename: string) {
  return /\.(\w+)$/.exec(filename)?.[1];
}
