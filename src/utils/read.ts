import JSZip from 'jszip';

export default async function readZipToMap(
  zip: JSZip,
): Promise<Map<string, string>> {
  const files = Object.keys(zip.files);

  const maybeContentList = files.map(async (file) => {
    if (!zip.files[file].dir) {
      const contents = await zip.files[file].async('text');
      return [
        file,
        contents || '',
      ] as [string, string];
    }
    /* directories will return null */
    return null;
  });

  const contentList = (
    await Promise.all(maybeContentList)
  ).filter((file) => !!file);

  return new Map(contentList);
}
