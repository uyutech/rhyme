/**
 * Created by army8735 on 2017/8/24.
 */

import './history.html';
import './index.less';

let $con = $('#con');
let $c = $con.find('.c');
let $scroll = $con.find('.scroll');
let $bar = $scroll.find('.bar');
let $window = $(window);

function setBarSize() {
  let conHeight = $con.height();
  let cHeight = $c.outerHeight();
  if(conHeight >= cHeight) {
    $scroll.addClass('fn-hide');
  }
  else {
    $scroll.removeClass('fn-hide');
    let height = Math.pow(conHeight, 2) / cHeight;
    $bar.css('height', height);
  }
}
setBarSize();
$window.on('resize', function() {
  setBarSize();
});

$c.on('mousewheel', function(e, delta) {
  console.log(e, delta);
});
