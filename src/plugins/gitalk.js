/* global gitalk */
function install(hook) {
  const dom = CMD.dom;

  hook.mounted(_ => {
    const div = dom.create('div');
    div.id = 'gitalk-container';
    const main = dom.getNode('#main');
    div.style = `width: ${main.clientWidth}px; margin: 0 auto 20px;`;
    dom.appendTo(dom.find('.content'), div);
  });

  hook.doneEach(_ => {
    const el = document.getElementById('gitalk-container');
    while (el.hasChildNodes()) {
      el.removeChild(el.firstChild);
    }

    gitalk.render('gitalk-container');
  });
}

window.$CMD = window.$CMD || {};
$CMD.plugins = [install, ...($CMD.plugins || [])];
