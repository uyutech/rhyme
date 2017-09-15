/**
 * Created by army8735 on 2017/9/15.
 */

import $ from 'anima-yocto-ajax';

export default {
  ajax: function(url, data, success, error, type) {
    // 兼容无host
    if (!/^http(s)?:\/\//.test(url)) {
      url = 'http://test.rhymesland.com/' + url.replace(/^\//, '');
      // url = '/' + url.replace(/^\//, '');
    }
    // console.log('ajax: ' + url + ', ' + JSON.stringify(data));
    function load() {
      return $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        cache: false,
        crossDomain: true,
        timeout: 6000,
        type: type || 'get',
        // ajax 跨域设置必须加上
        beforeSend: function (xhr) {
          xhr.withCredentials = true;
        },
        success: function (data, state, xhr) {
          // console.log('ajax success: ' + url + ', ' + JSON.stringify(data));
          // if(!data.success && data.code === 1000) {
          //   migi.eventBus.emit('NEED_LOGIN');
          //   return;
          // }
          success(data, state, xhr);
        },
        error: function (data) {
          // console.error('ajax error: ' + url + ', ' + JSON.stringify(data));
          if(!error.__hasExec) {
            error.__hasExec = true;
            error(data || {});
          }
        }
      });
    }
    return load();
  },
};
