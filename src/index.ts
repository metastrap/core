/* eslint-disable no-underscore-dangle */
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import {
  TAstMap, TOptions, TROAstMap,
} from 'types';
import { EFrameworks } from '@/constants/enum';

// eslint-disable-next-line import/no-named-default
import { default as rootModifiers, baseFiles } from './modifiers';
import { pack, setBaseProject } from './project';
import { convertTextToAst, print } from './utils/ast';
import readZipToMap from './utils/read';

export * as modifiers from './modifiers';
export * as utils from './utils';
export * as types from 'types';
export * as project from './project';
export * as enums from './constants/enum';

export default class Metastrap<T extends EFrameworks> {
  private fullProject: TROAstMap;

  private project: TAstMap;

  private framework: EFrameworks;

  private options: TOptions<T>;

  private _zip: JSZip;

  private downloadFileName: string;

  constructor(zip: JSZip, framework: T, options: TOptions<T>) {
    this._zip = zip;
    this.framework = framework;
    this.options = options;
    this.downloadFileName = options.downloadFileName ?? 'project.zip';
  }

  public async run() {
    /* extract zip contents into AST */
    this.fullProject = convertTextToAst(
      await readZipToMap(this._zip),
    );
    /* set the base project */
    this.project = setBaseProject(this.fullProject, baseFiles[this.framework]);

    /* modify the AST / content of the project */
    Object.entries(this.options.features).forEach(([feature, enabled]) => {
      if (enabled) {
        rootModifiers[this.framework][feature](this.project, this.fullProject);
      }
    });

    /* write the modified project to zip for download by client */
    this._zip = pack(
      print(this.project),
    );

    // enable chaining
    return this;
  }

  public async downloadZip() {
    const fileName = `${
      this.downloadFileName
    }${
      this.downloadFileName.endsWith('.zip')
        ? '' : '.zip'
    }`;
    if (this._zip) {
      saveAs(
        await this._zip.generateAsync({ type: 'blob' }),
        fileName,
      );
    }
  }

  get zip() {
    return this._zip;
  }
}
