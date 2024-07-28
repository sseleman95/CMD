/**
 * Converts a colon formatted string to a object with properties.
 *
 * This is process a provided string and look for any tokens in the format
 * of `:name[=value]` and then convert it to a object and return.
 * An example of this is ':include :type=code :fragment=demo' is taken and
 * then converted to:
 *
 * ```
 * {
 *  include: '',
 *  type: 'code',
 *  fragment: 'demo'
 * }
 * ```
 *
 * @param {string}   str   The string to parse.
 *
 * @return {{str: string, config: object}} The original string formatted, and parsed object, { str, config }.
 */
export function getAndRemoveConfig(str = '') {
  const config = {};

  if (str) {
    str = str
      .replace(/^('|")/, '')
      .replace(/('|")$/, '')
      .replace(/(?:^|\s):([\w-]+:?)=?([\w-%]+)?/g, (m, key, value) => {
        if (key.indexOf(':') === -1) {
          config[key] = (value && value.replace(/&quot;/g, '')) || true;
          return '';
        }

        return m;
      })
      .trim();
  }

  return { str, config };
}

/**
 * Remove the <a> tag from sidebar when the header with link, details see issue 1069
 * @param {string}   str   The string to deal with.
 *
 * @return {string}   The string after delete the <a> element.
 */
export function removeAtag(str = '') {
  return str.replace(/(<\/?a.*?>)/gi, '');
}

/**
 * Remove the CMDIgnore configs and return the str
 * @param {string}   content   The string to deal with.
 *
 * @return {{content: string, ignoreAllSubs: boolean, ignoreSubHeading: boolean}} The string after delete the CMDIgnore configs, and whether to ignore some or all.
 */
export function getAndRemoveCMDIgnoreConfig(content = '') {
  let ignoreAllSubs, ignoreSubHeading;
  if (/<!-- {CMD-ignore} -->/g.test(content)) {
    content = content.replace('<!-- {CMD-ignore} -->', '');
    ignoreSubHeading = true;
  }

  if (/{CMD-ignore}/g.test(content)) {
    content = content.replace('{CMD-ignore}', '');
    ignoreSubHeading = true;
  }

  if (/<!-- {CMD-ignore-all} -->/g.test(content)) {
    content = content.replace('<!-- {CMD-ignore-all} -->', '');
    ignoreAllSubs = true;
  }

  if (/{CMD-ignore-all}/g.test(content)) {
    content = content.replace('{CMD-ignore-all}', '');
    ignoreAllSubs = true;
  }

  return { content, ignoreAllSubs, ignoreSubHeading };
}
