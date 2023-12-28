import { saveAs } from 'file-saver';
import fixtures from '@/fixtures';
import Metastrap from '@/index';
import { EFrameworks, TOptions, TROAstMap } from 'types';
import { convertTextToAst } from '@/utils/ast';
import { baseFiles } from '@/modifiers';
import { tailwindFiles } from '@/modifiers/next/withTailwindcss';

let fullProject: TROAstMap;
let nextOptions: TOptions<EFrameworks.next>;

jest.spyOn(saveAs, 'saveAs').mockImplementation(() => true);

describe('metastrap class', () => {
  beforeAll(async () => {
    fullProject = convertTextToAst(
      await fixtures(EFrameworks.next),
    );
    nextOptions = {
      downloadFileName: 'nextjs.zip',
      features: {
        withTailwindcss: true,
      },
    };
  });

  test('main class transforms into correct zip', () => {
    const ms = new Metastrap(
      fullProject,
      EFrameworks.next,
      nextOptions,
    ).run();
    ms.getZip();
    expect(saveAs)
      .toHaveBeenCalledWith(
        expect.anything(),
        nextOptions.downloadFileName,
      );
    expect(
      Object.keys(ms.zip.files)
        .filter((file) => !file.endsWith('/')),
    ).toStrictEqual([
      ...baseFiles[EFrameworks.next],
      ...tailwindFiles,
    ]);
  });
});
