import { documentReady } from './util/dom.js';
import { CMD } from './CMD.js';
import initGlobalAPI from './global-api.js';

// TODO This global API and auto-running CMD will be deprecated, and removed
// in a major release. Instead we'll tell users to use `new CMD()` to create
// and manage their instance(s).

/**
 * Global API
 */
initGlobalAPI();

/**
 * Run CMD
 */
documentReady(() => new CMD());
