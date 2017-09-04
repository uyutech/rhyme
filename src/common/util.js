/**
 * Created by army on 2017/5/20.
 */

import env from 'ENV';
import sort from './sort';

let util = {
  isIPhone: function(){
    return navigator.appVersion.match(/iphone/gi);
  },
  getJSON: function(url, data, success, error) {
    if (typeof data === 'function') {
      error = success;
      success = data;
      data = {};
    }
    error = error || function() {};
    return env.ajax(url, data, success, error, 'get');
  },
  postJSON: function(url, data, success, error) {
    if (typeof data === 'function') {
      error = success;
      success = data;
      data = {};
    }
    error = error || function() {};
    return env.ajax(url, data, success, error, 'post');
  },
  sort,
  ERROR_MESSAGE: '人气大爆发，请稍后再试。'
};

export default util;
