import { cached } from '../util/core.js';

const decode = decodeURIComponent;
const encode = encodeURIComponent;

export function parseQuery(query) {
  const res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res;
  }

  // Simple parse
  query.split('&').forEach(param => {
    const parts = param.replace(/\+/g, ' ').split('=');

    res[parts[0]] = parts[1] && decode(parts[1]);
  });

  return res;
}

export function stringifyQuery(obj, ignores = []) {
  const qs = [];

  for (const key in obj) {
    if (ignores.indexOf(key) > -1) {
      continue;
    }

    qs.push(
      obj[key]
        ? `${encode(key)}=${encode(obj[key])}`.toLowerCase()
        : encode(key),
    );
  }

  return qs.length ? `?${qs.join('&')}` : '';
}

export const isAbsolutePath = cached(path => {
  return /(:|(\/{2}))/g.test(path);
});

export const removeParams = cached(path => {
  return path.split(/[?#]/)[0];
});

export const getParentPath = cached(path => {
  if (/\/$/g.test(path)) {
    return path;
  }

  const matchingParts = path.match(/(\S*\/)[^/]+$/);
  return matchingParts ? matchingParts[1] : '';
});

export const cleanPath = cached(path => {
  return path.replace(/^\/+/, '/').replace(/([^:])\/{2,}/g, '$1/');
});

export const resolvePath = cached(path => {
  const segments = path.replace(/^\//, '').split('/');
  const resolved = [];
  for (const segment of segments) {
    if (segment === '..') {
      resolved.pop();
    } else if (segment !== '.') {
      resolved.push(segment);
    }
  }

  return '/' + resolved.join('/');
});

/**
 * Normalises the URI path to handle the case where CMD is
 * hosted off explicit files, i.e. /index.html. This function
 * eliminates any path segments that contain `#` fragments.
 *
 * This is used to map browser URIs to markdown file sources.
 *
 * For example:
 *
 * http://example.org/base/index.html#/blah
 *
 * would be mapped to:
 *
 * http://example.org/base/blah.md.
 *
 * See here for more information:
 *
 *
 * @param {string} path The URI path to normalise
 * @return {string} { path, query }
 */

function normaliseFragment(path) {
  return path
    .split('/')
    .filter(p => p.indexOf('#') === -1)
    .join('/');
}

export function getPath(...args) {
  return cleanPath(args.map(normaliseFragment).join('/'));
}

export const replaceSlug = cached(path => {
  return path.replace('#', '?id=');
});
