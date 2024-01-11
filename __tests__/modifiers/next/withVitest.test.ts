import { TAstValue } from 'types/index';
import { print } from '@/utils/ast';
import { astFromFixture } from 'testUtils/read';
import withVitest, { NAMESPACE, vitestFiles } from '@/modifiers/next/withVitest';

let baseAsTree: Map<string, TAstValue>;
let fullProject: Map<string, TAstValue>;

describe('modifiers/next/withVitest', () => {
  beforeEach(async () => {
    [fullProject, baseAsTree] = await astFromFixture();
  });

  test('contains required devDependencies', () => {
    withVitest(baseAsTree, fullProject);

    expect(
      print(baseAsTree).get('package.json'),
    ).toMatchSnapshot();
  });

  test('it contains new list of files for vitest', () => {
    withVitest(baseAsTree, fullProject);
    expect(
      vitestFiles.map((file) => typeof baseAsTree.get(file.replace(`${NAMESPACE}/`, ''))),
    ).toStrictEqual(
      new Array(vitestFiles.length)
        .fill('object'),
    );
  });
});
