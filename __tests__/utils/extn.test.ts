import { getExtn } from '@/utils/extn';

describe('getExtn', () => {
  it('should return the file extension', () => {
    const filename = 'example.txt';
    const extn = getExtn(filename);
    expect(extn).toBe('txt');
  });

  it('should return an empty string if the filename has no extension', () => {
    const filename = 'srcDir';
    const extn = getExtn(filename);
    expect(extn).toBe(undefined);
  });

  it('should return the correct extension for filenames with multiple dots', () => {
    const filename = 'example.min.js';
    const extn = getExtn(filename);
    expect(extn).toBe('js');
  });
});
