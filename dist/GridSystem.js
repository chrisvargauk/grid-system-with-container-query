!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.GridSystem=e():t.GridSystem=e()}(window,function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=5)}([function(t,e,n){var r=n(1);"string"==typeof r&&(r=[[t.i,r,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};n(3)(r,i);r.locals&&(t.exports=r.locals)},function(t,e,n){(t.exports=n(2)(!1)).push([t.i,"[class*='col-'] {\n  float: left;\n  overflow-y: auto; }\n\n.cont {\n  overflow-y: auto; }\n",""])},function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=function(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var i=(s=r,l=btoa(unescape(encodeURIComponent(JSON.stringify(s)))),a="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(l),"/*# ".concat(a," */")),o=r.sources.map(function(t){return"/*# sourceURL=".concat(r.sourceRoot).concat(t," */")});return[n].concat(o).concat([i]).join("\n")}var s,l,a;return[n].join("\n")}(e,t);return e[2]?"@media ".concat(e[2],"{").concat(n,"}"):n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},i=0;i<this.length;i++){var o=this[i][0];null!=o&&(r[o]=!0)}for(var s=0;s<t.length;s++){var l=t[s];null!=l[0]&&r[l[0]]||(n&&!l[2]?l[2]=n:n&&(l[2]="(".concat(l[2],") and (").concat(n,")")),e.push(l))}},e}},function(t,e,n){var r,i,o={},s=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===i&&(i=r.apply(this,arguments)),i}),l=function(t){var e={};return function(t,n){if("function"==typeof t)return t();if(void 0===e[t]){var r=function(t,e){return e?e.querySelector(t):document.querySelector(t)}.call(this,t,n);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(t){r=null}e[t]=r}return e[t]}}(),a=null,c=0,f=[],u=n(4);function d(t,e){for(var n=0;n<t.length;n++){var r=t[n],i=o[r.id];if(i){i.refs++;for(var s=0;s<i.parts.length;s++)i.parts[s](r.parts[s]);for(;s<r.parts.length;s++)i.parts.push(v(r.parts[s],e))}else{var l=[];for(s=0;s<r.parts.length;s++)l.push(v(r.parts[s],e));o[r.id]={id:r.id,refs:1,parts:l}}}}function p(t,e){for(var n=[],r={},i=0;i<t.length;i++){var o=t[i],s=e.base?o[0]+e.base:o[0],l={css:o[1],media:o[2],sourceMap:o[3]};r[s]?r[s].parts.push(l):n.push(r[s]={id:s,parts:[l]})}return n}function h(t,e){var n=l(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=f[f.length-1];if("top"===t.insertAt)r?r.nextSibling?n.insertBefore(e,r.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),f.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var i=l(t.insertAt.before,n);n.insertBefore(e,i)}}function m(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=f.indexOf(t);e>=0&&f.splice(e,1)}function g(t){var e=document.createElement("style");if(void 0===t.attrs.type&&(t.attrs.type="text/css"),void 0===t.attrs.nonce){var r=function(){0;return n.nc}();r&&(t.attrs.nonce=r)}return y(e,t.attrs),h(t,e),e}function y(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function v(t,e){var n,r,i,o;if(e.transform&&t.css){if(!(o="function"==typeof e.transform?e.transform(t.css):e.transform.default(t.css)))return function(){};t.css=o}if(e.singleton){var s=c++;n=a||(a=g(e)),r=x.bind(null,n,s,!1),i=x.bind(null,n,s,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(t){var e=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",y(e,t.attrs),h(t,e),e}(e),r=function(t,e,n){var r=n.css,i=n.sourceMap,o=void 0===e.convertToAbsoluteUrls&&i;(e.convertToAbsoluteUrls||o)&&(r=u(r));i&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");var s=new Blob([r],{type:"text/css"}),l=t.href;t.href=URL.createObjectURL(s),l&&URL.revokeObjectURL(l)}.bind(null,n,e),i=function(){m(n),n.href&&URL.revokeObjectURL(n.href)}):(n=g(e),r=function(t,e){var n=e.css,r=e.media;r&&t.setAttribute("media",r);if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,n),i=function(){m(n)});return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else i()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=s()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=p(t,e);return d(n,e),function(t){for(var r=[],i=0;i<n.length;i++){var s=n[i];(l=o[s.id]).refs--,r.push(l)}t&&d(p(t,e),e);for(i=0;i<r.length;i++){var l;if(0===(l=r[i]).refs){for(var a=0;a<l.parts.length;a++)l.parts[a]();delete o[l.id]}}}};var b,w=(b=[],function(t,e){return b[t]=e,b.filter(Boolean).join("\n")});function x(t,e,n,r){var i=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=w(e,i);else{var o=document.createTextNode(i),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(o,s[e]):t.appendChild(o)}}},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,r=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var i,o=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(o)?t:(i=0===o.indexOf("//")?o:0===o.indexOf("/")?n+o:r+o.replace(/^\.\//,""),"url("+JSON.stringify(i)+")")})}},function(t,e,n){"use strict";n.r(e);var r={screen:{getWidth:function(){return void 0!==window.screen.availWidth?window.screen.availWidth:Math.max(document.documentElement.clientWidth,window.innerWidth)},getWidthDesktop:function(){Math.max(document.documentElement.clientWidth,window.innerWidth)},getWidthDomElement:function(t){if(null==t||!(t instanceof HTMLElement))throw"ERROR: provided value has to be a DOM Element.";return Math.max(t.clientWidth,t.offsetWidth)}}};n(0);e.default=class{constructor(t,e){this.util=r,this.listDCol=[],this.listCont=[],this.dGridWrapper=document.body,this.config={listBreakpoint:t||{default:{"col-4-4":100,"col-3-4":75,"col-2-4":50,"col-1-4":25},600:{"col-4-4":100,"col-3-4":100,"col-2-4":50,"col-1-4":50},400:{"col-4-4":100,"col-3-4":100,"col-2-4":100,"col-1-4":100}}},this.indexed=this.createIndex(),window.addEventListener("resize",this.handlerResize.bind(this)),this.regGrid(e),this.handlerResize()}createIndex(){const t={};if(this.config.listBreakpoint instanceof Array)t.listDColName=this.config.listBreakpoint,t.listBreakpointWidth=this.config.listBreakpoint.map(t=>parseInt(t)).filter(t=>!isNaN(t)).sort((t,e)=>e-t),t.isActiveGrid=!1;else{const e=Object.keys(this.config.listBreakpoint)[0],n=this.config.listBreakpoint[e];t.listDColName=Object.keys(n),t.listBreakpointWidth=Object.keys(this.config.listBreakpoint).map(t=>parseInt(t)).filter(t=>!isNaN(t)).sort((t,e)=>e-t),t.isActiveGrid=!0}return t}regGrid(t=document.body){this.dGridWrapper=t,this.listCont=[];const e=t.querySelectorAll(".cont");for(let t=0;t<e.length;t++){const n=e[t];this.listCont.push(n)}if(!this.indexed.isActiveGrid)return;const n=t.querySelector(".grid");null!==n&&this.listCont.push(n),this.listDCol=this.getListDCol(t)}getListDCol(t){const e=t.querySelector(".grid")||document.body,n=[];return e.querySelectorAll(".grid > [class*='col-']").forEach(t=>{if(t.parentElement!==e)return;const r=Array.prototype.filter.call(t.classList,t=>this.indexed.listDColName.includes(t))[0];n.push({domElement:t,type:r})}),n}handlerResize(){for(let t=0;t<this.listCont.length;t++){const e=this.listCont[t],n=this.util.screen.getWidthDomElement(e.parentElement),r=this.getMatchingBreakpoint(n);e.setAttribute("breakpoint",r.width)}if(!this.indexed.isActiveGrid)return;const t=this.categoriseColsByRow();this.calcColumnWith(t)}categoriseColsByRow(){let t=0,e=[],n=[];for(let r=0;r<this.listDCol.length;r++){const i=this.listDCol[r],o=i.domElement,s=o.parentElement,l=this.util.screen.getWidthDomElement(s);t+=this.getMatchingBreakpoint(l).listObjCol[i.type],e.push(i),100!==t&&r!==this.listDCol.length-1||(n.push(e),t=0,e=[]),o.style.height="auto"}return n}calcColumnWith(t){const e=this.util.screen.getWidthDomElement(this.dGridWrapper),n=this.getMatchingBreakpoint(e),r=this.calcGutter(n);for(let e=0;e<t.length;e++){const i=t[e];for(let t=0;t<i.length;t++){const o=i[t];let s=n.listObjCol[o.type],l=0,a=0;0===t&&(s-=2*r,l=2*r,t!==i.length-1&&(s-=1*r,a=1*r)),t===i.length-1&&(s-=2*r,a=2*r,0!==t&&(s-=1*r,l=1*r)),0!==t&&t!==i.length-1&&(s-=2*r,l=1*r,a=1*r),o.domElement.style.width=s+"%",o.domElement.style.marginLeft=l+"%",o.domElement.style.marginRight=a+"%",o.domElement.style.marginTop=0===e?2*r+"%":r+"%",o.domElement.style.marginBottom=r+"%"}let o=0;for(let t=0;t<i.length;t++){const e=i[t].domElement;o<e.offsetHeight&&(o=e.offsetHeight)}for(let t=0;t<i.length;t++){i[t].domElement.style.height=o+1+"px"}}}calcGutter(t){const e=t.listObjCol.gutter||"0%";let n=0;if("string"==typeof e&&-1!==e.indexOf("%"))n=e.split("%").join("")/2;else{if("string"!=typeof e||-1===e.indexOf("px"))throw'ERROR: GridSystem: "'+e+'" is an unknown gutter format - in configuration. Expected formats: "10px", "0.5%"';n=parseFloat(e.split("px").join(""))/2/(this.dGridWrapper.offsetWidth/100)}return n}getMatchingBreakpoint(t){let e;for(let n=0;n<this.indexed.listBreakpointWidth.length;n++){const r=this.indexed.listBreakpointWidth[n];if(!(t<r))break;e=r}return{listObjCol:e?this.config.listBreakpoint[e]:this.config.listBreakpoint.default,width:e||"default"}}}}])});
//# sourceMappingURL=GridSystem.js.map