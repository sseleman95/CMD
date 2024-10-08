/**
 * Gen toc tree
 * @param  {Array} toc List of TOC elements
 * @param  {Number} maxLevel Deep level
 * @return {Array} Headlines
 */
export function genTree(toc, maxLevel) {
  const headlines = [];
  const last = {};

  toc.forEach(headline => {
    const level = headline.level || 1;
    const len = level - 1;

    if (level > maxLevel) {
      return;
    }

    if (last[len]) {
      last[len].children = [...(last[len].children || []), headline];
    } else {
      headlines.push(headline);
    }

    last[level] = headline;
  });

  return headlines;
}
