/**
 * Created by army8735 on 2017/10/2.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * c404(ctx) {
      yield ctx.render('404.html');
    }
    * qr(ctx) {
      ctx.redirect('http://test.circling.cc');
      // yield ctx.render('404.html');
    }
  }
  return Controller;
};
