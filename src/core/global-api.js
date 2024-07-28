import prism from 'prismjs';
import { marked } from 'marked';
import * as util from './util/index.js';
import * as dom from './util/dom.js';
import { Compiler } from './render/compiler.js';
import { slugify } from './render/slugify.js';
import { get } from './util/ajax.js';

// TODO This is deprecated, kept for backwards compatibility. Remove in a
// major release. We'll tell people to get everything from the CMD global
// when using the global build, but we'll highly recommend for them to import
// from the ESM build (f.e. dist/CMD.esm.js and dist/CMD.min.esm.js).
export default function initGlobalAPI() {
  window.CMD = {
    util,
    dom,
    get,
    slugify,
    version: '__VERSION__',
  };
  window.CMDCompiler = Compiler;
  window.marked = marked;
  window.Prism = prism;
}
