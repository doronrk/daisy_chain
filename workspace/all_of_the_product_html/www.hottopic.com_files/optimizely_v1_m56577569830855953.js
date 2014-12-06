(function() {
    var projectId = optimizelyEnvProjectId; //[/*YOUR PROJECT ID*/];
    var protocol = ('https:' == document.location.protocol ? 'https://' : 'http://');
    var scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.async = true;
    scriptTag.src = protocol + 'cdn.optimizely.com/js/' + projectId + '.js';
    var head = document.getElementsByTagName('head')[0];
    head.parentNode.insertBefore(scriptTag, head);
  })();
function optimizelyTimeout() {
  window.optimizely = window.optimizely || [];
  if (!window.optimizely.data) {
            window.optimizely.push("disable");
  }
}
setTimeout(optimizelyTimeout, 200);
