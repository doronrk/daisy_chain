define(["mapCache"],function(e){"use strict";var t={},n={};function o(e){if(t&&t.getItem(e)!==null){return t.getItem(e)}else{return null}}function s(e,n){t.setItem(e,n)}function r(e){t.removeItem(e)}function i(e){if(n&&n.getItem(e)!==null){return n.getItem(e)}else{return null}}function u(e,t){n.setItem(e,t)}function a(e){n.removeItem(e)}function l(o){function s(){var e=false;if(window.sessionStorage){try{window.sessionStorage.setItem("testkey","testvalue");window.sessionStorage.removeItem("testkey");e=true}catch(t){}}return e}function r(){var e=false;if(window.localStorage){try{window.localStorage.setItem("testkey","testvalue");window.localStorage.removeItem("testkey");e=true}catch(t){}}return e}if(o||!(s()&&r())){t=new e;n=new e}else{t=window.sessionStorage;n=window.localStorage}}l();return{getPersistent:i,setPersistent:u,removePersistent:a,getSession:o,setSession:s,removeSession:r,enableKeywordCache:l}});