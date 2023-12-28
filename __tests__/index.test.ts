import { saveAs } from 'file-saver';
import fixtures from '@/fixtures';
import Metastrap from '@/index';
import { EFrameworks, TOptions, TROAstMap } from 'types';

let fullProject: TROAstMap;
let nextOptions: TOptions<EFrameworks.next>;

jest.spyOn(saveAs, 'saveAs').mockImplementation(() => true);

describe('metastrap class', () => {
  beforeAll(async () => {
    fullProject = await fixtures(EFrameworks.next);
    nextOptions = {
      downloadFileName: 'nextjs.zip',
      features: {
        withTailwindcss: true,
      },
    };
  });

  test('should be true', () => {
    const ms = new Metastrap(
      fullProject,
      EFrameworks.next,
      nextOptions,
    ).run();
    ms.getZip();
    expect(saveAs.saveAs).toHaveBeenCalledWith(expect.anything(), nextOptions.downloadFileName);
    expect(1).toBe(1);
  });
});
