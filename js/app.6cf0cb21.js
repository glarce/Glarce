(function(e){function r(r){for(var t,i,c=r[0],u=r[1],l=r[2],f=0,d=[];f<c.length;f++)i=c[f],o[i]&&d.push(o[i][0]),o[i]=0;for(t in u)Object.prototype.hasOwnProperty.call(u,t)&&(e[t]=u[t]);s&&s(r);while(d.length)d.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,r=0;r<a.length;r++){for(var n=a[r],t=!0,c=1;c<n.length;c++){var u=n[c];0!==o[u]&&(t=!1)}t&&(a.splice(r--,1),e=i(i.s=n[0]))}return e}var t={},o={app:0},a=[];function i(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=t,i.d=function(e,r,n){i.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,r){if(1&r&&(e=i(e)),8&r)return e;if(4&r&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var t in e)i.d(n,t,function(r){return e[r]}.bind(null,t));return n},i.n=function(e){var r=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(r,"a",r),r},i.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},i.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=r,c=c.slice();for(var l=0;l<c.length;l++)r(c[l]);var s=u;a.push([0,"chunk-vendors"]),n()})({0:function(e,r,n){e.exports=n("56d7")},"56d7":function(e,r,n){"use strict";n.r(r);n("cadf"),n("551c"),n("f751"),n("097d");var t=n("2b0e"),o=function(){var e=this,r=e.$createElement,n=e._self._c||r;return n("a-scene",{attrs:{embedded:"",arjs:"detectionMode: mono_and_matrix; matrixCodeType: 3x3;"}},[e._l(e.markers,function(r,t){return e._t("default",["marker"==r.style?e._t("default",[n("a-marker",{attrs:{preset:r.value}},[n("a-box",{attrs:{position:"0 0.5 0",material:"color: black;"}})],1)]):"barcode"==r.style?e._t("default",[n("a-marker",{attrs:{type:"barcode",value:r.value}},[n("a-box",{attrs:{position:"0 0.5 0",material:"color: green;"}})],1)]):e._e()])}),n("a-entity",{attrs:{camera:""}})],2)},a=[],i={name:"app",components:{},data:function(){return{markers:[{style:"marker",value:"hiro"},{style:"marker",value:"kanji"},{style:"barcode",value:5}]}}},c=i,u=(n("5c0b"),n("2877")),l=Object(u["a"])(c,o,a,!1,null,null,null),s=l.exports,f=n("9483");Object(f["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),t["a"].config.productionTip=!1,new t["a"]({render:function(e){return e(s)}}).$mount("#app")},"5c0b":function(e,r,n){"use strict";var t=n("5e27"),o=n.n(t);o.a},"5e27":function(e,r,n){}});
//# sourceMappingURL=app.6cf0cb21.js.map