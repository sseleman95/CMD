function appendScript() {
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.google-analytics.com/analytics.js';
  document.body.appendChild(script);
}

function init(id) {
  appendScript();
  window.ga =
    window.ga ||
    function () {
      (window.ga.q = window.ga.q || []).push(arguments);
    };

  window.ga.l = Number(new Date());
  window.ga('create', id, 'auto');
}

function collect() {
  if (!window.ga) {
    init($CMD.ga);
  }

  window.ga('set', 'page', location.hash);
  window.ga('send', 'pageview');
}

const install = function (hook) {
  if (!$CMD.ga) {
    // eslint-disable-next-line no-console
    console.error('[CMD] ga is required.');
    return;
  }

  hook.beforeEach(collect);
};

window.$CMD = window.$CMD || {};
$CMD.plugins = [install, ...($CMD.plugins || [])];
