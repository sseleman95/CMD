import parser from './parser.js';

const install = function (hook, vm) {
  // Used to remove front matter from embedded pages if installed.
  vm.config.frontMatter = {};
  vm.config.frontMatter.installed = true;
  vm.config.frontMatter.parseMarkdown = function (content) {
    const { body } = parser(content);
    return body;
  };

  hook.beforeEach(content => {
    const { attributes, body } = parser(content);

    vm.frontmatter = attributes;

    return body;
  });
};

window.$CMD = window.$CMD || {};
$CMD.plugins = [install, ...($CMD.plugins || [])];
