(function() {var g,l=l||{},m=this;function aa(){}
function n(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function p(a){var b=n(a);return"array"==b||"object"==b&&"number"==typeof a.length}function q(a){return"string"==typeof a}var ca="closure_uid_"+(1E9*Math.random()>>>0),da=0;function ea(a,b,c){return a.call.apply(a.bind,arguments)}
function fa(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function r(a,b,c){r=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ea:fa;return r.apply(null,arguments)}
function s(a,b){function c(){}c.prototype=b.prototype;a.ea=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.pa=function(a,c,f){return b.prototype[c].apply(a,Array.prototype.slice.call(arguments,2))}};function t(a,b){return a<b?-1:a>b?1:0};var u=Array.prototype,ga=u.indexOf?function(a,b,c){return u.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(q(a))return q(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},ha=u.forEach?function(a,b,c){u.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)};
function ia(a){var b;a:{b=ja;for(var c=a.length,d=q(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:q(a)?a.charAt(b):a[b]}function ka(a){return u.concat.apply(u,arguments)}function la(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};function ma(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function na(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}var oa="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function pa(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<oa.length;f++)c=oa[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};function qa(a){if("function"==typeof a.l)return a.l();if(q(a))return a.split("");if(p(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return ma(a)}function ra(a,b,c){if("function"==typeof a.forEach)a.forEach(b,c);else if(p(a)||q(a))ha(a,b,c);else{var d;if("function"==typeof a.n)d=a.n();else if("function"!=typeof a.l)if(p(a)||q(a)){d=[];for(var e=a.length,f=0;f<e;f++)d.push(f)}else d=na(a);else d=void 0;for(var e=qa(a),f=e.length,h=0;h<f;h++)b.call(c,e[h],d&&d[h],a)}};function v(a,b){this.j={};this.d=[];this.c=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){a instanceof v?(c=a.n(),d=a.l()):(c=na(a),d=ma(a));for(var e=0;e<c.length;e++)this.set(c[e],d[e])}}g=v.prototype;g.l=function(){sa(this);for(var a=[],b=0;b<this.d.length;b++)a.push(this.j[this.d[b]]);return a};g.n=function(){sa(this);return this.d.concat()};g.A=function(a){return w(this.j,a)};
g.clear=function(){this.j={};this.c=this.d.length=0};g.remove=function(a){return w(this.j,a)?(delete this.j[a],this.c--,this.d.length>2*this.c&&sa(this),!0):!1};function sa(a){if(a.c!=a.d.length){for(var b=0,c=0;b<a.d.length;){var d=a.d[b];w(a.j,d)&&(a.d[c++]=d);b++}a.d.length=c}if(a.c!=a.d.length){for(var e={},c=b=0;b<a.d.length;)d=a.d[b],w(e,d)||(a.d[c++]=d,e[d]=1),b++;a.d.length=c}}g.get=function(a,b){return w(this.j,a)?this.j[a]:b};
g.set=function(a,b){w(this.j,a)||(this.c++,this.d.push(a));this.j[a]=b};g.forEach=function(a,b){for(var c=this.n(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};g.clone=function(){return new v(this)};function w(a,b){return Object.prototype.hasOwnProperty.call(a,b)};var x;a:{var ta=m.navigator;if(ta){var ua=ta.userAgent;if(ua){x=ua;break a}}x=""}function y(a){return-1!=x.indexOf(a)};var va=y("Opera")||y("OPR"),z=y("Trident")||y("MSIE"),A=y("Gecko")&&-1==x.toLowerCase().indexOf("webkit")&&!(y("Trident")||y("MSIE")),B=-1!=x.toLowerCase().indexOf("webkit");function wa(){var a=m.document;return a?a.documentMode:void 0}var xa=function(){var a="",b;if(va&&m.opera)return a=m.opera.version,"function"==n(a)?a():a;A?b=/rv\:([^\);]+)(\)|;)/:z?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:B&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(x))?a[1]:"");return z&&(b=wa(),b>parseFloat(a))?String(b):a}(),ya={};
function C(a){var b;if(!(b=ya[a])){b=0;for(var c=String(xa).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),d=String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var h=c[f]||"",k=d[f]||"",ba=RegExp("(\\d*)(\\D*)","g"),rb=RegExp("(\\d*)(\\D*)","g");do{var L=ba.exec(h)||["","",""],M=rb.exec(k)||["","",""];if(0==L[0].length&&0==M[0].length)break;b=t(0==L[1].length?0:parseInt(L[1],10),0==M[1].length?0:parseInt(M[1],10))||t(0==L[2].length,0==M[2].length)||
t(L[2],M[2])}while(0==b)}b=ya[a]=0<=b}return b}var za=m.document,Aa=za&&z?wa()||("CSS1Compat"==za.compatMode?parseInt(xa,10):5):void 0;var Ba=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;function Ca(a){if(Da){Da=!1;var b=m.location;if(b){var c=b.href;if(c&&(c=(c=Ca(c)[3]||null)?decodeURI(c):c)&&c!=b.hostname)throw Da=!0,Error();}}return a.match(Ba)}var Da=B;function D(a,b){var c;if(a instanceof D)this.f=void 0!==b?b:a.f,Ea(this,a.o),c=a.s,E(this),this.s=c,c=a.k,E(this),this.k=c,Fa(this,a.v),c=a.h,E(this),this.h=c,Ga(this,a.m.clone()),c=a.p,E(this),this.p=c;else if(a&&(c=Ca(String(a)))){this.f=!!b;Ea(this,c[1]||"",!0);var d=c[2]||"";E(this);this.s=F(d);d=c[3]||"";E(this);this.k=F(d,!0);Fa(this,c[4]);d=c[5]||"";E(this);this.h=F(d,!0);Ga(this,c[6]||"",!0);c=c[7]||"";E(this);this.p=F(c)}else this.f=!!b,this.m=new G(null,0,this.f)}g=D.prototype;g.o="";
g.s="";g.k="";g.v=null;g.h="";g.p="";g.la=!1;g.f=!1;g.toString=function(){var a=[],b=this.o;b&&a.push(H(b,Ha,!0),":");if(b=this.k){a.push("//");var c=this.s;c&&a.push(H(c,Ha,!0),"@");a.push(encodeURIComponent(String(b)).replace(/%25([0-9a-fA-F]{2})/g,"%$1"));b=this.v;null!=b&&a.push(":",String(b))}if(b=this.h)this.k&&"/"!=b.charAt(0)&&a.push("/"),a.push(H(b,"/"==b.charAt(0)?Ia:Ja,!0));(b=this.m.toString())&&a.push("?",b);(b=this.p)&&a.push("#",H(b,Ka));return a.join("")};
g.resolve=function(a){var b=this.clone(),c=!!a.o;c?Ea(b,a.o):c=!!a.s;if(c){var d=a.s;E(b);b.s=d}else c=!!a.k;c?(d=a.k,E(b),b.k=d):c=null!=a.v;d=a.h;if(c)Fa(b,a.v);else if(c=!!a.h){if("/"!=d.charAt(0))if(this.k&&!this.h)d="/"+d;else{var e=b.h.lastIndexOf("/");-1!=e&&(d=b.h.substr(0,e+1)+d)}e=d;if(".."==e||"."==e)d="";else if(-1!=e.indexOf("./")||-1!=e.indexOf("/.")){for(var d=0==e.lastIndexOf("/",0),e=e.split("/"),f=[],h=0;h<e.length;){var k=e[h++];"."==k?d&&h==e.length&&f.push(""):".."==k?((1<f.length||
1==f.length&&""!=f[0])&&f.pop(),d&&h==e.length&&f.push("")):(f.push(k),d=!0)}d=f.join("/")}else d=e}c?(E(b),b.h=d):c=""!==a.m.toString();c?Ga(b,F(a.m.toString())):c=!!a.p;c&&(a=a.p,E(b),b.p=a);return b};g.clone=function(){return new D(this)};function Ea(a,b,c){E(a);a.o=c?F(b,!0):b;a.o&&(a.o=a.o.replace(/:$/,""))}function Fa(a,b){E(a);if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("Bad port number "+b);a.v=b}else a.v=null}function I(a){return a.h}
function Ga(a,b,c){E(a);b instanceof G?(a.m=b,a.m.V(a.f)):(c||(b=H(b,La)),a.m=new G(b,0,a.f))}function E(a){if(a.la)throw Error("Tried to modify a read-only Uri");}g.V=function(a){this.f=a;this.m&&this.m.V(a);return this};function F(a,b){return a?b?decodeURI(a):decodeURIComponent(a):""}function H(a,b,c){return q(a)?(a=encodeURI(a).replace(b,Ma),c&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Ma(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)}
var Ha=/[#\/\?@]/g,Ja=/[\#\?:]/g,Ia=/[\#\?]/g,La=/[\#\?@]/g,Ka=/#/g;function G(a,b,c){this.e=a||null;this.f=!!c}function J(a){if(!a.b&&(a.b=new v,a.c=0,a.e))for(var b=a.e.split("\x26"),c=0;c<b.length;c++){var d=b[c].indexOf("\x3d"),e=null,f=null;0<=d?(e=b[c].substring(0,d),f=b[c].substring(d+1)):e=b[c];e=decodeURIComponent(e.replace(/\+/g," "));e=K(a,e);a.add(e,f?decodeURIComponent(f.replace(/\+/g," ")):"")}}g=G.prototype;g.b=null;g.c=null;
g.add=function(a,b){J(this);this.e=null;a=K(this,a);var c=this.b.get(a);c||this.b.set(a,c=[]);c.push(b);this.c++;return this};g.remove=function(a){J(this);a=K(this,a);return this.b.A(a)?(this.e=null,this.c-=this.b.get(a).length,this.b.remove(a)):!1};g.clear=function(){this.b=this.e=null;this.c=0};g.A=function(a){J(this);a=K(this,a);return this.b.A(a)};g.n=function(){J(this);for(var a=this.b.l(),b=this.b.n(),c=[],d=0;d<b.length;d++)for(var e=a[d],f=0;f<e.length;f++)c.push(b[d]);return c};
g.l=function(a){J(this);var b=[];if(q(a))this.A(a)&&(b=ka(b,this.b.get(K(this,a))));else{a=this.b.l();for(var c=0;c<a.length;c++)b=ka(b,a[c])}return b};g.set=function(a,b){J(this);this.e=null;a=K(this,a);this.A(a)&&(this.c-=this.b.get(a).length);this.b.set(a,[b]);this.c++;return this};g.get=function(a,b){var c=a?this.l(a):[];return 0<c.length?String(c[0]):b};
g.toString=function(){if(this.e)return this.e;if(!this.b)return"";for(var a=[],b=this.b.n(),c=0;c<b.length;c++)for(var d=b[c],e=encodeURIComponent(String(d)),d=this.l(d),f=0;f<d.length;f++){var h=e;""!==d[f]&&(h+="\x3d"+encodeURIComponent(String(d[f])));a.push(h)}return this.e=a.join("\x26")};g.clone=function(){var a=new G;a.e=this.e;this.b&&(a.b=this.b.clone(),a.c=this.c);return a};function K(a,b){var c=String(b);a.f&&(c=c.toLowerCase());return c}
g.V=function(a){a&&!this.f&&(J(this),this.e=null,this.b.forEach(function(a,c){var d=c.toLowerCase();c!=d&&(this.remove(c),this.remove(d),0<a.length&&(this.e=null,this.b.set(K(this,d),la(a)),this.c+=a.length))},this));this.f=a};g.extend=function(a){for(var b=0;b<arguments.length;b++)ra(arguments[b],function(a,b){this.add(b,a)},this)};var Na=!z||z&&9<=Aa,Oa=z&&!C("9");!B||C("528");A&&C("1.9b")||z&&C("8")||va&&C("9.5")||B&&C("528");A&&!C("8")||z&&C("9");function Pa(){0!=Qa&&(this[ca]||(this[ca]=++da));this.Q=this.Q;this.ma=this.ma}var Qa=0;Pa.prototype.Q=!1;function N(a,b){this.type=a;this.currentTarget=this.target=b;this.defaultPrevented=this.r=!1;this.da=!0}N.prototype.stopPropagation=function(){this.r=!0};N.prototype.preventDefault=function(){this.defaultPrevented=!0;this.da=!1};function Ra(a){Ra[" "](a);return a}Ra[" "]=aa;function O(a,b){N.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.charCode=this.keyCode=this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.B=this.state=null;if(a){var c=this.type=a.type;this.target=a.target||a.srcElement;this.currentTarget=b;var d=a.relatedTarget;if(d){if(A){var e;a:{try{Ra(d.nodeName);e=!0;break a}catch(f){}e=!1}e||(d=null)}}else"mouseover"==c?d=
a.fromElement:"mouseout"==c&&(d=a.toElement);this.relatedTarget=d;this.offsetX=B||void 0!==a.offsetX?a.offsetX:a.layerX;this.offsetY=B||void 0!==a.offsetY?a.offsetY:a.layerY;this.clientX=void 0!==a.clientX?a.clientX:a.pageX;this.clientY=void 0!==a.clientY?a.clientY:a.pageY;this.screenX=a.screenX||0;this.screenY=a.screenY||0;this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=
a.metaKey;this.state=a.state;this.B=a;a.defaultPrevented&&this.preventDefault()}}s(O,N);O.prototype.stopPropagation=function(){O.ea.stopPropagation.call(this);this.B.stopPropagation?this.B.stopPropagation():this.B.cancelBubble=!0};O.prototype.preventDefault=function(){O.ea.preventDefault.call(this);var a=this.B;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Oa)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var P="closure_listenable_"+(1E6*Math.random()|0),Sa=0;function Ta(a,b,c,d,e){this.q=a;this.J=null;this.src=b;this.type=c;this.F=!!d;this.G=e;this.key=++Sa;this.w=this.D=!1}function Ua(a){a.w=!0;a.q=null;a.J=null;a.src=null;a.G=null};function Q(a){this.src=a;this.g={};this.M=0}Q.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.g[f];a||(a=this.g[f]=[],this.M++);var h=Va(a,b,d,e);-1<h?(b=a[h],c||(b.D=!1)):(b=new Ta(b,this.src,f,!!d,e),b.D=c,a.push(b));return b};Q.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.g))return!1;var e=this.g[a];b=Va(e,b,c,d);return-1<b?(Ua(e[b]),u.splice.call(e,b,1),0==e.length&&(delete this.g[a],this.M--),!0):!1};
function Wa(a,b){var c=b.type;if(c in a.g){var d=a.g[c],e=ga(d,b),f;(f=0<=e)&&u.splice.call(d,e,1);f&&(Ua(b),0==a.g[c].length&&(delete a.g[c],a.M--))}}Q.prototype.S=function(a,b,c,d){a=this.g[a.toString()];var e=-1;a&&(e=Va(a,b,c,d));return-1<e?a[e]:null};function Va(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.w&&f.q==b&&f.F==!!c&&f.G==d)return e}return-1};var Xa="closure_lm_"+(1E6*Math.random()|0),Ya={},Za=0;function R(a,b,c,d,e){if("array"==n(b))for(var f=0;f<b.length;f++)R(a,b[f],c,d,e);else if(c=$a(c),a&&a[P])a.u.add(String(b),c,!1,d,e);else{if(!b)throw Error("Invalid event type");var f=!!d,h=S(a);h||(a[Xa]=h=new Q(a));c=h.add(b,c,!1,d,e);c.J||(d=ab(),c.J=d,d.src=a,d.q=c,a.addEventListener?a.addEventListener(b.toString(),d,f):a.attachEvent(bb(b.toString()),d),Za++)}}
function ab(){var a=cb,b=Na?function(c){return a.call(b.src,b.q,c)}:function(c){c=a.call(b.src,b.q,c);if(!c)return c};return b}function db(a,b,c,d,e){if("array"==n(b))for(var f=0;f<b.length;f++)db(a,b[f],c,d,e);else c=$a(c),a&&a[P]?a.u.remove(String(b),c,d,e):a&&(a=S(a))&&(b=a.S(b,c,!!d,e))&&eb(b)}
function eb(a){if("number"!=typeof a&&a&&!a.w){var b=a.src;if(b&&b[P])Wa(b.u,a);else{var c=a.type,d=a.J;b.removeEventListener?b.removeEventListener(c,d,a.F):b.detachEvent&&b.detachEvent(bb(c),d);Za--;(c=S(b))?(Wa(c,a),0==c.M&&(c.src=null,b[Xa]=null)):Ua(a)}}}function bb(a){return a in Ya?Ya[a]:Ya[a]="on"+a}function fb(a,b,c,d){var e=1;if(a=S(a))if(b=a.g[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.F==c&&!f.w&&(e&=!1!==gb(f,d))}return Boolean(e)}
function gb(a,b){var c=a.q,d=a.G||a.src;a.D&&eb(a);return c.call(d,b)}
function cb(a,b){if(a.w)return!0;if(!Na){var c;if(!(c=b))a:{c=["window","event"];for(var d=m,e;e=c.shift();)if(null!=d[e])d=d[e];else{c=null;break a}c=d}e=c;c=new O(e,this);d=!0;if(!(0>e.keyCode||void 0!=e.returnValue)){a:{var f=!1;if(0==e.keyCode)try{e.keyCode=-1;break a}catch(h){f=!0}if(f||void 0==e.returnValue)e.returnValue=!0}e=[];for(f=c.currentTarget;f;f=f.parentNode)e.push(f);for(var f=a.type,k=e.length-1;!c.r&&0<=k;k--)c.currentTarget=e[k],d&=fb(e[k],f,!0,c);for(k=0;!c.r&&k<e.length;k++)c.currentTarget=
e[k],d&=fb(e[k],f,!1,c)}return d}return gb(a,new O(b,this))}function S(a){a=a[Xa];return a instanceof Q?a:null}var hb="__closure_events_fn_"+(1E9*Math.random()>>>0);function $a(a){if("function"==n(a))return a;a[hb]||(a[hb]=function(b){return a.handleEvent(b)});return a[hb]};function ib(){}ib.prototype.X=null;function jb(a){return a.X||(a.X=a.$())};var kb;function T(){}s(T,ib);T.prototype.P=function(){var a=lb(this);return a?new ActiveXObject(a):new XMLHttpRequest};T.prototype.$=function(){var a={};lb(this)&&(a[0]=!0,a[1]=!0);return a};
function lb(a){if(!a.Z&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.Z=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.Z}kb=new T;function U(){}s(U,ib);U.prototype.P=function(){var a=new XMLHttpRequest;if("withCredentials"in a)return a;if("undefined"!=typeof XDomainRequest)return new mb;throw Error("Unsupported browser");};U.prototype.$=function(){return{}};
function mb(){this.i=new XDomainRequest;this.readyState=0;this.responseText=this.onreadystatechange=null;this.status=-1;this.statusText=this.responseXML=null;this.i.onload=r(this.ia,this);this.i.onerror=r(this.Y,this);this.i.onprogress=r(this.ja,this);this.i.ontimeout=r(this.ka,this)}g=mb.prototype;g.open=function(a,b,c){if(null!=c&&!c)throw Error("Only async requests are supported.");this.i.open(a,b)};
g.send=function(a){if(a)if("string"==typeof a)this.i.send(a);else throw Error("Only string data is supported");else this.i.send()};g.abort=function(){this.i.abort()};g.setRequestHeader=function(){};g.getResponseHeader=function(a){return"content-type"==a.toLowerCase()?this.i.contentType:""};g.ia=function(){this.status=200;this.responseText=this.i.responseText;nb(this,4)};g.Y=function(){this.status=500;this.responseText=null;nb(this,4)};g.ka=function(){this.Y()};
g.ja=function(){this.status=200;nb(this,1)};function nb(a,b){a.readyState=b;if(a.onreadystatechange)a.onreadystatechange()}g.getAllResponseHeaders=function(){return"content-type: "+this.i.contentType};function V(){Pa.call(this);this.u=new Q(this);this.ha=this;this.ba=null}s(V,Pa);V.prototype[P]=!0;V.prototype.addEventListener=function(a,b,c,d){R(this,a,b,c,d)};V.prototype.removeEventListener=function(a,b,c,d){db(this,a,b,c,d)};
V.prototype.dispatchEvent=function(a){var b,c=this.ba;if(c)for(b=[];c;c=c.ba)b.push(c);var c=this.ha,d=a.type||a;if(q(a))a=new N(a,c);else if(a instanceof N)a.target=a.target||c;else{var e=a;a=new N(d,c);pa(a,e)}var e=!0,f;if(b)for(var h=b.length-1;!a.r&&0<=h;h--)f=a.currentTarget=b[h],e=W(f,d,!0,a)&&e;a.r||(f=a.currentTarget=c,e=W(f,d,!0,a)&&e,a.r||(e=W(f,d,!1,a)&&e));if(b)for(h=0;!a.r&&h<b.length;h++)f=a.currentTarget=b[h],e=W(f,d,!1,a)&&e;return e};
function W(a,b,c,d){b=a.u.g[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var h=b[f];if(h&&!h.w&&h.F==c){var k=h.q,ba=h.G||h.src;h.D&&Wa(a.u,h);e=!1!==k.call(ba,d)&&e}}return e&&0!=d.da}V.prototype.S=function(a,b,c,d){return this.u.S(String(a),b,c,d)};function ob(a,b,c){if("function"==n(a))c&&(a=r(a,c));else if(a&&"function"==typeof a.handleEvent)a=r(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<b?-1:m.setTimeout(a,b||0)};function pb(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);};function qb(a){V.call(this);this.headers=new v;this.O=a||null;this.t=!1;this.N=this.a=null;this.I=this.U="";this.C=this.T=this.H=this.R=!1;this.L=0;this.K=null;this.ca=sb;this.W=this.oa=!1}s(qb,V);var sb="",tb=/^https?$/i,ub=["POST","PUT"];g=qb.prototype;
g.send=function(a,b,c,d){if(this.a)throw Error("[goog.net.XhrIo] Object is active with another request\x3d"+this.U+"; newUri\x3d"+a);b=b?b.toUpperCase():"GET";this.U=a;this.I="";this.R=!1;this.t=!0;this.a=this.O?this.O.P():kb.P();this.N=this.O?jb(this.O):jb(kb);this.a.onreadystatechange=r(this.aa,this);try{this.T=!0,this.a.open(b,String(a),!0),this.T=!1}catch(e){vb(this,e);return}a=c||"";var f=this.headers.clone();d&&ra(d,function(a,b){f.set(b,a)});d=ia(f.n());c=m.FormData&&a instanceof m.FormData;
!(0<=ga(ub,b))||d||c||f.set("Content-Type","application/x-www-form-urlencoded;charset\x3dutf-8");f.forEach(function(a,b){this.a.setRequestHeader(b,a)},this);this.ca&&(this.a.responseType=this.ca);"withCredentials"in this.a&&(this.a.withCredentials=this.oa);try{wb(this),0<this.L&&((this.W=xb(this.a))?(this.a.timeout=this.L,this.a.ontimeout=r(this.fa,this)):this.K=ob(this.fa,this.L,this)),this.H=!0,this.a.send(a),this.H=!1}catch(h){vb(this,h)}};
function xb(a){return z&&C(9)&&"number"==typeof a.timeout&&void 0!==a.ontimeout}function ja(a){return"content-type"==a.toLowerCase()}g.fa=function(){"undefined"!=typeof l&&this.a&&(this.I="Timed out after "+this.L+"ms, aborting",this.dispatchEvent("timeout"),this.abort(8))};function vb(a,b){a.t=!1;a.a&&(a.C=!0,a.a.abort(),a.C=!1);a.I=b;yb(a);zb(a)}function yb(a){a.R||(a.R=!0,a.dispatchEvent("complete"),a.dispatchEvent("error"))}
g.abort=function(){this.a&&this.t&&(this.t=!1,this.C=!0,this.a.abort(),this.C=!1,this.dispatchEvent("complete"),this.dispatchEvent("abort"),zb(this))};g.aa=function(){this.Q||(this.T||this.H||this.C?Ab(this):this.na())};g.na=function(){Ab(this)};
function Ab(a){if(a.t&&"undefined"!=typeof l&&(!a.N[1]||4!=X(a)||2!=Bb(a)))if(a.H&&4==X(a))ob(a.aa,0,a);else if(a.dispatchEvent("readystatechange"),4==X(a)){a.t=!1;try{if(Cb(a))a.dispatchEvent("complete"),a.dispatchEvent("success");else{var b;try{b=2<X(a)?a.a.statusText:""}catch(c){b=""}a.I=b+" ["+Bb(a)+"]";yb(a)}}finally{zb(a)}}}function zb(a){if(a.a){wb(a);var b=a.a,c=a.N[0]?aa:null;a.a=null;a.N=null;a.dispatchEvent("ready");try{b.onreadystatechange=c}catch(d){}}}
function wb(a){a.a&&a.W&&(a.a.ontimeout=null);"number"==typeof a.K&&(m.clearTimeout(a.K),a.K=null)}function Cb(a){var b=Bb(a),c;a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=!0;break a;default:c=!1}if(!c){if(b=0===b)a=Ca(String(a.U))[1]||null,!a&&self.location&&(a=self.location.protocol,a=a.substr(0,a.length-1)),b=!tb.test(a?a.toLowerCase():"");c=b}return c}function X(a){return a.a?a.a.readyState:0}function Bb(a){try{return 2<X(a)?a.a.status:-1}catch(b){return-1}}
g.getResponseHeader=function(a){return this.a&&4==X(this)?this.a.getResponseHeader(a):void 0};g.getAllResponseHeaders=function(){return this.a&&4==X(this)?this.a.getAllResponseHeaders():""};function Db(a,b,c,d){c="http://earth.georeferencer.com/collection/"+b+c;var e=new qb(new U);R(e,"complete",function(){if(Cb(e)){var c;c=e.a?pb(e.a.responseText):void 0;if(d)c=encodeURIComponent(a)+"\x26"+I(new D(c.transcription_url||""))+"\x26\x26\x26\x26\x26"+b;else{var h=(c.visualize_url||"").replace("/?#","/").replace("/#","/");c=encodeURIComponent(c.title)+"\x26"+I(new D(c.transcription_url||""))+"\x26"+I(new D(c.georeference_url||""))+"\x26"+I(new D(h))+"\x26\x26"+I(new D(c.object_url||""))+
"\x26"+b}window.location.hash=c;window.location.reload()}});e.send(c)};!A&&!z||z&&z&&9<=Aa||A&&C("1.9.1");var Eb=z&&!C("9");function Fb(a){var b=document;return q(a)?b.getElementById(a):a}function Gb(a,b){if("textContent"in a)a.textContent=b;else if(3==a.nodeType)a.data=b;else if(a.firstChild&&3==a.firstChild.nodeType){for(;a.lastChild!=a.firstChild;)a.removeChild(a.lastChild);a.firstChild.data=b}else{for(var c;c=a.firstChild;)a.removeChild(c);a.appendChild((9==a.nodeType?a:a.ownerDocument||a.document).createTextNode(String(b)))}}var Hb={SCRIPT:1,STYLE:1,HEAD:1,IFRAME:1,OBJECT:1},Ib={IMG:" ",BR:"\n"};
function Jb(a){if(Eb&&"innerText"in a)a=a.innerText.replace(/(\r\n|\r|\n)/g,"\n");else{var b=[];Kb(a,b,!0);a=b.join("")}a=a.replace(/ \xAD /g," ").replace(/\xAD/g,"");a=a.replace(/\u200B/g,"");Eb||(a=a.replace(/ +/g," "));" "!=a&&(a=a.replace(/^\s*/,""));return a}
function Kb(a,b,c){if(!(a.nodeName in Hb))if(3==a.nodeType)c?b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g,"")):b.push(a.nodeValue);else if(a.nodeName in Ib)b.push(Ib[a.nodeName]);else for(a=a.firstChild;a;)Kb(a,b,c),a=a.nextSibling};function Lb(a){function b(a,b,e){b=d[b];a=Fb("link-"+a);if((void 0===e||1==e)&&b&&0<b.length){if(void 0!=a.firstElementChild)e=a.firstElementChild;else for(e=a.firstChild;e&&1!=e.nodeType;)e=e.nextSibling;e&&(e.href+=c);return e}a&&a.parentNode&&a.parentNode.removeChild(a);return null}var c=window.location.hash.toString(),d=c.split("\x26"),e=d[a];if(e){var f=window.LANG||"en";"cy"==f&&(f="cy-gb");Fb("app-frame").src=Lb.ga+e+"?lang\x3d"+f}var h=d[6],e=null!=h&&0<h,k="";0<d.length&&(f=Fb("map-title"),
k=decodeURIComponent(d[0].substr(1)),Gb(f,(e?Jb(f):"")+k));b("transcribe",1);b("georeference",2);b("visualize",3);b("accuracy",4);b("this-map",5);f=b("next-random",6,e);e&&R(f,"click",function(b){var c=1==a;Db(k,h,c?"/supplement/random/public/transcription/json":"/random/public/georeference/json",c);b.preventDefault()})}Lb.ga="http://earth.georeferencer.com";var Mb=Lb,Y=["initTool"],Z=m;Y[0]in Z||!Z.execScript||Z.execScript("var "+Y[0]);
for(var $;Y.length&&($=Y.shift());)Y.length||void 0===Mb?Z=Z[$]?Z[$]:Z[$]={}:Z[$]=Mb;})();
