(function() {var g,k=k||{},m=this;function aa(){}
function n(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function p(a){var b=n(a);return"array"==b||"object"==b&&"number"==typeof a.length}function q(a){return"string"==typeof a}var ba="closure_uid_"+(1E9*Math.random()>>>0),ca=0;function da(a,b,c){return a.call.apply(a.bind,arguments)}
function ea(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function r(a,b,c){r=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?da:ea;return r.apply(null,arguments)}
function s(a,b){function c(){}c.prototype=b.prototype;a.T=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.ba=function(a,c,f){return b.prototype[c].apply(a,Array.prototype.slice.call(arguments,2))}};function t(a,b){return a<b?-1:a>b?1:0};var u=Array.prototype,fa=u.indexOf?function(a,b,c){return u.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(q(a))return q(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},ga=u.forEach?function(a,b,c){u.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)};
function ha(a){var b;a:{b=ia;for(var c=a.length,d=q(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:q(a)?a.charAt(b):a[b]};var v;a:{var ja=m.navigator;if(ja){var ka=ja.userAgent;if(ka){v=ka;break a}}v=""}function w(a){return-1!=v.indexOf(a)};function la(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function ma(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}var na="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function oa(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<na.length;f++)c=na[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};var pa=w("Opera")||w("OPR"),x=w("Trident")||w("MSIE"),y=w("Gecko")&&-1==v.toLowerCase().indexOf("webkit")&&!(w("Trident")||w("MSIE")),z=-1!=v.toLowerCase().indexOf("webkit");function qa(){var a=m.document;return a?a.documentMode:void 0}var ra=function(){var a="",b;if(pa&&m.opera)return a=m.opera.version,"function"==n(a)?a():a;y?b=/rv\:([^\);]+)(\)|;)/:x?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:z&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(v))?a[1]:"");return x&&(b=qa(),b>parseFloat(a))?String(b):a}(),sa={};
function A(a){var b;if(!(b=sa[a])){b=0;for(var c=String(ra).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),d=String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g,"").split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var h=c[f]||"",l=d[f]||"",R=RegExp("(\\d*)(\\D*)","g"),Ya=RegExp("(\\d*)(\\D*)","g");do{var E=R.exec(h)||["","",""],F=Ya.exec(l)||["","",""];if(0==E[0].length&&0==F[0].length)break;b=t(0==E[1].length?0:parseInt(E[1],10),0==F[1].length?0:parseInt(F[1],10))||t(0==E[2].length,0==F[2].length)||
t(E[2],F[2])}while(0==b)}b=sa[a]=0<=b}return b}var ta=m.document,ua=ta&&x?qa()||("CSS1Compat"==ta.compatMode?parseInt(ra,10):5):void 0;!y&&!x||x&&x&&9<=ua||y&&A("1.9.1");x&&A("9");function B(a){var b=document;return q(a)?b.getElementById(a):a}function C(a,b){if("textContent"in a)a.textContent=b;else if(3==a.nodeType)a.data=b;else if(a.firstChild&&3==a.firstChild.nodeType){for(;a.lastChild!=a.firstChild;)a.removeChild(a.lastChild);a.firstChild.data=b}else{for(var c;c=a.firstChild;)a.removeChild(c);a.appendChild((9==a.nodeType?a:a.ownerDocument||a.document).createTextNode(String(b)))}};function D(){}D.prototype.L=null;function va(a){return a.L||(a.L=a.O())};var G;function H(){}s(H,D);H.prototype.D=function(){var a=wa(this);return a?new ActiveXObject(a):new XMLHttpRequest};H.prototype.O=function(){var a={};wa(this)&&(a[0]=!0,a[1]=!0);return a};
function wa(a){if(!a.N&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.N=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.N}G=new H;function I(){}s(I,D);I.prototype.D=function(){var a=new XMLHttpRequest;if("withCredentials"in a)return a;if("undefined"!=typeof XDomainRequest)return new xa;throw Error("Unsupported browser");};I.prototype.O=function(){return{}};
function xa(){this.d=new XDomainRequest;this.readyState=0;this.responseText=this.onreadystatechange=null;this.status=-1;this.statusText=this.responseXML=null;this.d.onload=r(this.W,this);this.d.onerror=r(this.M,this);this.d.onprogress=r(this.X,this);this.d.ontimeout=r(this.Y,this)}g=xa.prototype;g.open=function(a,b,c){if(null!=c&&!c)throw Error("Only async requests are supported.");this.d.open(a,b)};
g.send=function(a){if(a)if("string"==typeof a)this.d.send(a);else throw Error("Only string data is supported");else this.d.send()};g.abort=function(){this.d.abort()};g.setRequestHeader=function(){};g.getResponseHeader=function(a){return"content-type"==a.toLowerCase()?this.d.contentType:""};g.W=function(){this.status=200;this.responseText=this.d.responseText;J(this,4)};g.M=function(){this.status=500;this.responseText=null;J(this,4)};g.Y=function(){this.M()};g.X=function(){this.status=200;J(this,1)};
function J(a,b){a.readyState=b;if(a.onreadystatechange)a.onreadystatechange()}g.getAllResponseHeaders=function(){return"content-type: "+this.d.contentType};function K(){0!=ya&&(this[ba]||(this[ba]=++ca));this.F=this.F;this.Z=this.Z}var ya=0;K.prototype.F=!1;var za=!x||x&&9<=ua,Aa=x&&!A("9");!z||A("528");y&&A("1.9b")||x&&A("8")||pa&&A("9.5")||z&&A("528");y&&!A("8")||x&&A("9");function L(a,b){this.type=a;this.currentTarget=this.target=b;this.defaultPrevented=this.g=!1;this.S=!0}L.prototype.stopPropagation=function(){this.g=!0};L.prototype.preventDefault=function(){this.defaultPrevented=!0;this.S=!1};function M(a){M[" "](a);return a}M[" "]=aa;function N(a,b){L.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.charCode=this.keyCode=this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.l=this.state=null;if(a){var c=this.type=a.type;this.target=a.target||a.srcElement;this.currentTarget=b;var d=a.relatedTarget;if(d){if(y){var e;a:{try{M(d.nodeName);e=!0;break a}catch(f){}e=!1}e||(d=null)}}else"mouseover"==c?d=
a.fromElement:"mouseout"==c&&(d=a.toElement);this.relatedTarget=d;this.offsetX=z||void 0!==a.offsetX?a.offsetX:a.layerX;this.offsetY=z||void 0!==a.offsetY?a.offsetY:a.layerY;this.clientX=void 0!==a.clientX?a.clientX:a.pageX;this.clientY=void 0!==a.clientY?a.clientY:a.pageY;this.screenX=a.screenX||0;this.screenY=a.screenY||0;this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=
a.metaKey;this.state=a.state;this.l=a;a.defaultPrevented&&this.preventDefault()}}s(N,L);N.prototype.stopPropagation=function(){N.T.stopPropagation.call(this);this.l.stopPropagation?this.l.stopPropagation():this.l.cancelBubble=!0};N.prototype.preventDefault=function(){N.T.preventDefault.call(this);var a=this.l;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Aa)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var O="closure_listenable_"+(1E6*Math.random()|0),Ba=0;function Ca(a,b,c,d,e){this.f=a;this.u=null;this.src=b;this.type=c;this.p=!!d;this.r=e;this.key=++Ba;this.k=this.o=!1}function P(a){a.k=!0;a.f=null;a.u=null;a.src=null;a.r=null};function Q(a){this.src=a;this.c={};this.A=0}Q.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.c[f];a||(a=this.c[f]=[],this.A++);var h=S(a,b,d,e);-1<h?(b=a[h],c||(b.o=!1)):(b=new Ca(b,this.src,f,!!d,e),b.o=c,a.push(b));return b};Q.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.c))return!1;var e=this.c[a];b=S(e,b,c,d);return-1<b?(P(e[b]),u.splice.call(e,b,1),0==e.length&&(delete this.c[a],this.A--),!0):!1};
function Da(a,b){var c=b.type;if(c in a.c){var d=a.c[c],e=fa(d,b),f;(f=0<=e)&&u.splice.call(d,e,1);f&&(P(b),0==a.c[c].length&&(delete a.c[c],a.A--))}}Q.prototype.H=function(a,b,c,d){a=this.c[a.toString()];var e=-1;a&&(e=S(a,b,c,d));return-1<e?a[e]:null};function S(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.k&&f.f==b&&f.p==!!c&&f.r==d)return e}return-1};var Ea="closure_lm_"+(1E6*Math.random()|0),Fa={},Ga=0;function Ha(a,b,c,d,e){if("array"==n(b))for(var f=0;f<b.length;f++)Ha(a,b[f],c,d,e);else if(c=Ia(c),a&&a[O])a.j.add(String(b),c,!1,d,e);else{if(!b)throw Error("Invalid event type");var f=!!d,h=T(a);h||(a[Ea]=h=new Q(a));c=h.add(b,c,!1,d,e);c.u||(d=Ja(),c.u=d,d.src=a,d.f=c,a.addEventListener?a.addEventListener(b.toString(),d,f):a.attachEvent(Ka(b.toString()),d),Ga++)}}
function Ja(){var a=La,b=za?function(c){return a.call(b.src,b.f,c)}:function(c){c=a.call(b.src,b.f,c);if(!c)return c};return b}function Ma(a,b,c,d,e){if("array"==n(b))for(var f=0;f<b.length;f++)Ma(a,b[f],c,d,e);else c=Ia(c),a&&a[O]?a.j.remove(String(b),c,d,e):a&&(a=T(a))&&(b=a.H(b,c,!!d,e))&&Na(b)}
function Na(a){if("number"!=typeof a&&a&&!a.k){var b=a.src;if(b&&b[O])Da(b.j,a);else{var c=a.type,d=a.u;b.removeEventListener?b.removeEventListener(c,d,a.p):b.detachEvent&&b.detachEvent(Ka(c),d);Ga--;(c=T(b))?(Da(c,a),0==c.A&&(c.src=null,b[Ea]=null)):P(a)}}}function Ka(a){return a in Fa?Fa[a]:Fa[a]="on"+a}function Oa(a,b,c,d){var e=1;if(a=T(a))if(b=a.c[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.p==c&&!f.k&&(e&=!1!==Pa(f,d))}return Boolean(e)}
function Pa(a,b){var c=a.f,d=a.r||a.src;a.o&&Na(a);return c.call(d,b)}
function La(a,b){if(a.k)return!0;if(!za){var c;if(!(c=b))a:{c=["window","event"];for(var d=m,e;e=c.shift();)if(null!=d[e])d=d[e];else{c=null;break a}c=d}e=c;c=new N(e,this);d=!0;if(!(0>e.keyCode||void 0!=e.returnValue)){a:{var f=!1;if(0==e.keyCode)try{e.keyCode=-1;break a}catch(h){f=!0}if(f||void 0==e.returnValue)e.returnValue=!0}e=[];for(f=c.currentTarget;f;f=f.parentNode)e.push(f);for(var f=a.type,l=e.length-1;!c.g&&0<=l;l--)c.currentTarget=e[l],d&=Oa(e[l],f,!0,c);for(l=0;!c.g&&l<e.length;l++)c.currentTarget=
e[l],d&=Oa(e[l],f,!1,c)}return d}return Pa(a,new N(b,this))}function T(a){a=a[Ea];return a instanceof Q?a:null}var Qa="__closure_events_fn_"+(1E9*Math.random()>>>0);function Ia(a){if("function"==n(a))return a;a[Qa]||(a[Qa]=function(b){return a.handleEvent(b)});return a[Qa]};function U(){K.call(this);this.j=new Q(this);this.V=this;this.Q=null}s(U,K);U.prototype[O]=!0;U.prototype.addEventListener=function(a,b,c,d){Ha(this,a,b,c,d)};U.prototype.removeEventListener=function(a,b,c,d){Ma(this,a,b,c,d)};
U.prototype.dispatchEvent=function(a){var b,c=this.Q;if(c)for(b=[];c;c=c.Q)b.push(c);var c=this.V,d=a.type||a;if(q(a))a=new L(a,c);else if(a instanceof L)a.target=a.target||c;else{var e=a;a=new L(d,c);oa(a,e)}var e=!0,f;if(b)for(var h=b.length-1;!a.g&&0<=h;h--)f=a.currentTarget=b[h],e=V(f,d,!0,a)&&e;a.g||(f=a.currentTarget=c,e=V(f,d,!0,a)&&e,a.g||(e=V(f,d,!1,a)&&e));if(b)for(h=0;!a.g&&h<b.length;h++)f=a.currentTarget=b[h],e=V(f,d,!1,a)&&e;return e};
function V(a,b,c,d){b=a.j.c[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var h=b[f];if(h&&!h.k&&h.p==c){var l=h.f,R=h.r||h.src;h.o&&Da(a.j,h);e=!1!==l.call(R,d)&&e}}return e&&0!=d.S}U.prototype.H=function(a,b,c,d){return this.j.H(String(a),b,c,d)};function Ra(a,b,c){if("function"==n(a))c&&(a=r(a,c));else if(a&&"function"==typeof a.handleEvent)a=r(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<b?-1:m.setTimeout(a,b||0)};function Sa(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);};function Ta(a){if("function"==typeof a.q)return a.q();if(q(a))return a.split("");if(p(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return la(a)}function Ua(a,b){if("function"==typeof a.forEach)a.forEach(b,void 0);else if(p(a)||q(a))ga(a,b,void 0);else{var c;if("function"==typeof a.m)c=a.m();else if("function"!=typeof a.q)if(p(a)||q(a)){c=[];for(var d=a.length,e=0;e<d;e++)c.push(e)}else c=ma(a);else c=void 0;for(var d=Ta(a),e=d.length,f=0;f<e;f++)b.call(void 0,d[f],c&&c[f],a)}};function W(a,b){this.e={};this.b=[];this.i=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){a instanceof W?(c=a.m(),d=a.q()):(c=ma(a),d=la(a));for(var e=0;e<c.length;e++)this.set(c[e],d[e])}}g=W.prototype;g.q=function(){Va(this);for(var a=[],b=0;b<this.b.length;b++)a.push(this.e[this.b[b]]);return a};g.m=function(){Va(this);return this.b.concat()};
g.clear=function(){this.e={};this.i=this.b.length=0};g.remove=function(a){return Object.prototype.hasOwnProperty.call(this.e,a)?(delete this.e[a],this.i--,this.b.length>2*this.i&&Va(this),!0):!1};function Va(a){if(a.i!=a.b.length){for(var b=0,c=0;b<a.b.length;){var d=a.b[b];Object.prototype.hasOwnProperty.call(a.e,d)&&(a.b[c++]=d);b++}a.b.length=c}if(a.i!=a.b.length){for(var e={},c=b=0;b<a.b.length;)d=a.b[b],Object.prototype.hasOwnProperty.call(e,d)||(a.b[c++]=d,e[d]=1),b++;a.b.length=c}}
g.get=function(a,b){return Object.prototype.hasOwnProperty.call(this.e,a)?this.e[a]:b};g.set=function(a,b){Object.prototype.hasOwnProperty.call(this.e,a)||(this.i++,this.b.push(a));this.e[a]=b};g.forEach=function(a,b){for(var c=this.m(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};g.clone=function(){return new W(this)};var Wa=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/,Xa=z;function Za(a,b){if(Xa){Xa=!1;var c=m.location;if(c){var d=c.href;if(d&&(d=(d=Za(3,d))?decodeURI(d):d)&&d!=c.hostname)throw Xa=!0,Error();}}return b.match(Wa)[a]||null};function $a(a){U.call(this);this.headers=new W;this.C=a||null;this.h=!1;this.B=this.a=null;this.t=this.J="";this.n=this.I=this.s=this.G=!1;this.w=0;this.v=null;this.R=ab;this.K=this.aa=!1}s($a,U);var ab="",bb=/^https?$/i,cb=["POST","PUT"];g=$a.prototype;
g.send=function(a,b,c,d){if(this.a)throw Error("[goog.net.XhrIo] Object is active with another request\x3d"+this.J+"; newUri\x3d"+a);b=b?b.toUpperCase():"GET";this.J=a;this.t="";this.G=!1;this.h=!0;this.a=this.C?this.C.D():G.D();this.B=this.C?va(this.C):va(G);this.a.onreadystatechange=r(this.P,this);try{this.I=!0,this.a.open(b,String(a),!0),this.I=!1}catch(e){db(this,e);return}a=c||"";var f=this.headers.clone();d&&Ua(d,function(a,b){f.set(b,a)});d=ha(f.m());c=m.FormData&&a instanceof m.FormData;!(0<=
fa(cb,b))||d||c||f.set("Content-Type","application/x-www-form-urlencoded;charset\x3dutf-8");f.forEach(function(a,b){this.a.setRequestHeader(b,a)},this);this.R&&(this.a.responseType=this.R);"withCredentials"in this.a&&(this.a.withCredentials=this.aa);try{eb(this),0<this.w&&((this.K=fb(this.a))?(this.a.timeout=this.w,this.a.ontimeout=r(this.U,this)):this.v=Ra(this.U,this.w,this)),this.s=!0,this.a.send(a),this.s=!1}catch(h){db(this,h)}};
function fb(a){return x&&A(9)&&"number"==typeof a.timeout&&void 0!==a.ontimeout}function ia(a){return"content-type"==a.toLowerCase()}g.U=function(){"undefined"!=typeof k&&this.a&&(this.t="Timed out after "+this.w+"ms, aborting",this.dispatchEvent("timeout"),this.abort(8))};function db(a,b){a.h=!1;a.a&&(a.n=!0,a.a.abort(),a.n=!1);a.t=b;gb(a);hb(a)}function gb(a){a.G||(a.G=!0,a.dispatchEvent("complete"),a.dispatchEvent("error"))}
g.abort=function(){this.a&&this.h&&(this.h=!1,this.n=!0,this.a.abort(),this.n=!1,this.dispatchEvent("complete"),this.dispatchEvent("abort"),hb(this))};g.P=function(){this.F||(this.I||this.s||this.n?ib(this):this.$())};g.$=function(){ib(this)};
function ib(a){if(a.h&&"undefined"!=typeof k&&(!a.B[1]||4!=X(a)||2!=jb(a)))if(a.s&&4==X(a))Ra(a.P,0,a);else if(a.dispatchEvent("readystatechange"),4==X(a)){a.h=!1;try{if(kb(a))a.dispatchEvent("complete"),a.dispatchEvent("success");else{var b;try{b=2<X(a)?a.a.statusText:""}catch(c){b=""}a.t=b+" ["+jb(a)+"]";gb(a)}}finally{hb(a)}}}function hb(a){if(a.a){eb(a);var b=a.a,c=a.B[0]?aa:null;a.a=null;a.B=null;a.dispatchEvent("ready");try{b.onreadystatechange=c}catch(d){}}}
function eb(a){a.a&&a.K&&(a.a.ontimeout=null);"number"==typeof a.v&&(m.clearTimeout(a.v),a.v=null)}function kb(a){var b=jb(a),c;a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=!0;break a;default:c=!1}if(!c){if(b=0===b)a=Za(1,String(a.J)),!a&&self.location&&(a=self.location.protocol,a=a.substr(0,a.length-1)),b=!bb.test(a?a.toLowerCase():"");c=b}return c}function X(a){return a.a?a.a.readyState:0}function jb(a){try{return 2<X(a)?a.a.status:-1}catch(b){return-1}}
g.getResponseHeader=function(a){return this.a&&4==X(this)?this.a.getResponseHeader(a):void 0};g.getAllResponseHeaders=function(){return this.a&&4==X(this)?this.a.getAllResponseHeaders():""};function lb(){var a=new $a(new I);Ha(a,"complete",function(){if(kb(a)){var b;b=a.a?Sa(a.a.responseText):void 0;var c=b.map,d=c.supplement;b=Math.max(Math.max(c.products.transcription.contributors,c.products.georeference.contributors),Math.max(d.products.transcription.contributors,d.products.georeference.contributors));d=c.components.label+d.components.label;c=c.objects;C(B("stats_total_volunteers"),b);C(B("stats_records_transed"),d);C(B("stats_maps"),c)}},!1,this);a.send("http://cynefin.georeferencer.com/repository/15872231/stats.json")}
var Y=["Home"],Z=m;Y[0]in Z||!Z.execScript||Z.execScript("var "+Y[0]);for(var $;Y.length&&($=Y.shift());)Y.length||void 0===lb?Z=Z[$]?Z[$]:Z[$]={}:Z[$]=lb;})();
