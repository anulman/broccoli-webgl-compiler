import CachingWriter from 'broccoli-caching-writer';

import { all, denodeify } from 'rsvp';
import { dirname } from 'path';
import { readFile, writeFile, mkdirs } from 'fs-extra';

export default class WebGLPlugin extends CachingWriter {
  constructor(inputNode, options) {
    super([inputNode], {
      annotation: options && options.annotation,
      name: "broccoli-glsl-transpiler",
      persistentOutput: true,
    });
  }

  async build() {
    const baseInputPath = this.inputPaths[0];
    const baseOutputPath = this.outputPath;

    const _mkdirs = denodeify(mkdirs);
    const _readFile = denodeify(readFile);
    const _writeFile = denodeify(writeFile);

    return all(this.listFiles()
      .map(async (fullpath) => {
        let glsl = await _readFile(fullpath);
        let js = `export default new String('${encodeURIComponent(glsl)}');`;
        let filepath = baseOutputPath.concat(fullpath
          .replace(baseInputPath, '')
          .replace('.glsl', '.js'));

        await _mkdirs(dirname(filepath));

        return _writeFile(filepath, js);
      }));
  }
}
