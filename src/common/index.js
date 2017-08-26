/**
 * Created by army on 2017/7/9.n
 */

import 'migi-es6-shim';
import 'migi';
import $ from './jquery-3.2.1';
import util from './util';

import './index.less';

let IS_MOBILE = false;

if(/iP(hone|od|ad)/.test(navigator.userAgent)) {
  IS_MOBILE = true;
  document.documentElement.classList.add('mobile');
  let v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/),
    version = parseInt(v[1], 10);
  if(version >= 8){
    document.documentElement.classList.add('hairlines');
  }
}
if(/Android/.test(navigator.userAgent)) {
  IS_MOBILE = true;
  document.documentElement.classList.add('mobile');
}

window.requestAnimationFrame = function() {
  return window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function(callback) {
      window.setTimeout(callback, 16.7);
    };
}();

window.$ = $;
window.util = util;
