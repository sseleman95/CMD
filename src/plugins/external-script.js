function handleExternalScript() {
  const container = CMD.dom.getNode('#main');
  const scripts = CMD.dom.findAll(container, 'script');

  for (const script of scripts) {
    if (script.src) {
      const newScript = document.createElement('script');

      Array.from(script.attributes).forEach(attribute => {
        newScript[attribute.name] = attribute.value;
      });

      script.parentNode.insertBefore(newScript, script);
      script.parentNode.removeChild(script);
    }
  }
}

const install = function (hook) {
  hook.doneEach(handleExternalScript);
};

window.$CMD = window.$CMD || {};
$CMD.plugins = [install, ...($CMD.plugins || [])];
