import {
  EFrameworks, TAstMap, TOptions, TROAstMap,
} from 'types';
import { saveAs } from 'file-saver';
import type JSZip from 'jszip';

import { baseFiles } from './modifiers';
import { pack, setBaseProject } from './project';
import { print } from './utils/ast';

export * as modifiers from './modifiers';
export * as utils from './utils';
export * as types from 'types';
export * as project from './project';

export default class Metastrap<T extends EFrameworks> {
  private fullProject: TROAstMap;

  private project: TAstMap;

  private framework: EFrameworks;

  private options: TOptions<T>;

  private zip: JSZip;

  private downloadFileName: string;

  constructor(fullProject: TROAstMap, framework: T, options: TOptions<T>) {
    this.framework = framework;
    this.options = options;
    this.fullProject = fullProject;
    this.downloadFileName = options.downloadFileName ?? 'project.zip';
  }

  public run() {
    /* set the base project */
    this.project = setBaseProject(this.fullProject, baseFiles[this.framework]);

    /* modify the AST / content of the project */
    Object.entries(this.options.features).forEach(([feature, enabled]) => {
      if (enabled) {
        this.options.features[feature]?.call(this, this.project, this.fullProject);
      }
    });

    /* write the modified project to zip for download by client */
    this.zip = pack(
      print(this.project),
    );

    // enable chaining
    return this;
  }

  public getZip() {
    const fileName = `${
      this.downloadFileName
    }${
      this.downloadFileName.endsWith('.zip')
        ? '' : '.zip'
    }`;
    if (this.zip) {
      saveAs(this.zip, fileName);
    }
  }
}
