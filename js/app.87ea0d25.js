(function(e){function t(t){for(var r,a,s=t[0],c=t[1],l=t[2],d=0,f=[];d<s.length;d++)a=s[d],o[a]&&f.push(o[a][0]),o[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);u&&u(t);while(f.length)f.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,s=1;s<n.length;s++){var c=n[s];0!==o[c]&&(r=!1)}r&&(i.splice(t--,1),e=a(a.s=n[0]))}return e}var r={},o={app:0},i=[];function a(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=r,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/Glarce/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var u=c;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("a-scene",{attrs:{embedded:"",arjs:"detectionMode: mono_and_matrix; matrixCodeType: 3x3;",stats:""}},[n("a-assets",e._l(e.markers,function(e,t){return n("video",{staticClass:"vidh",attrs:{autoplay:"",preload:"auto",id:"vid"+e.value,loop:"true",crossorigin:"","webkit-playsinline":"",playsinline:"",controls:"",type:"video/webm",src:e.vid}})}),0),e._l(e.markers,function(t,r){return e._t("default",["barcode"==t.style?e._t("default",[n("a-marker",{attrs:{type:"barcode",value:t.value,vidhandler:t.value}},[n("a-video",{attrs:{id:"videoScreen"+t.value,rotation:"-90 0 0",src:"#vid"+t.value,autoplay:"true",height:t.height,width:t.width}})],1)]):e._e()])}),n("a-entity",{attrs:{camera:""}})],2)},i=[],a={name:"app",components:{},data:function(){return{markers:[{style:"barcode",value:5,vid:"vids/5.webm",width:16/3,height:3}]}},methods:{},mounted:function(){AFRAME.registerComponent("vidhandler",{schema:{default:0},init:function(){this.vid=document.getElementById("vid".concat(this.data)),this.vid.pause(),this.tick=AFRAME.utils.throttleTick(this.tick,200,this)},tick:function(){1==this.el.object3D.visible?this.toggle||(this.toggle=!0,this.vid.play()):(this.toggle=!1,this.vid.pause())}})}},s=a,c=n("2877"),l=Object(c["a"])(s,o,i,!1,null,null,null),u=l.exports,d=n("9483");Object(d["a"])("".concat("/Glarce/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(u)}}).$mount("#app")}});