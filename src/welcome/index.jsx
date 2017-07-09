/**
 * Created by army on 2017/7/9.
 */
 
import './welcome.html';
import './index.less';

let $window = $(window);
let WIDTH = 1980;
let HEIGHT = 1080;
let RATIO = WIDTH / HEIGHT;

let $rainbow = $('#rainbow');

function resize() {
  let width = $window.width();
  let height = $window.height();
  console.log(width / height, RATIO);
  if(width / height >= RATIO) {
    $rainbow.css('top', width * 0.28);
  }
  else {
    $rainbow.css('top', height * 0.55);
  }
}
resize();
$window.on('resize', resize);
