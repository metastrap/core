import { saveAs } from 'file-saver';
import Metastrap from '@/index';
import { TOptions } from 'types';
import { EFrameworks } from '@/constants/enum';
import { baseFiles } from '@/modifiers';
import { tailwindFiles } from '@/modifiers/next/withTailwindcss';
import { readFixture } from 'testUtils/read';
import { pack } from '@/project';
import type JSZip from 'jszip';

let zip: JSZip;
let nextOptions: TOptions<EFrameworks.next>;

jest.spyOn(saveAs, 'saveAs').mockImplementation(() => true);

describe('metastrap class', () => {
  beforeAll(async () => {
    zip = pack(
      await readFixture(EFrameworks.next),
    );
    nextOptions = {
      downloadFileName: 'nextjs.zip',
      features: {
        withTailwindcss: true,
      },
    };
  });

  test('main class transforms into correct zip', async () => {
    const ms = await (new Metastrap(
      zip,
      EFrameworks.next,
      nextOptions,
    )).run();
    await ms.downloadZip();
    expect(saveAs)
      .toHaveBeenCalledWith(
        expect.anything(),
        nextOptions.downloadFileName,
      );
    expect(
      Object.keys(ms.zip.files)
        .filter((file) => !file.endsWith('/'))
        .sort(),
    ).toStrictEqual([
      ...baseFiles[EFrameworks.next],
      ...tailwindFiles,
    ].sort());
  });
});
