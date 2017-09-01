/**
 * Created by army8735 on 2017/8/25.
 */

import './single.html';
import './index.less';
import '../404.html';

import TopNav from './TopNav.jsx';
import BotNav from './BotNav.jsx';

import Loading from './loading/Loading.jsx';
import Weibo from './weibo/Weibo.jsx';
import Luck from './weibo/Luck.jsx';
import Index from './index/Index.jsx';
import Geography from './geography/Geography.jsx';
import History from './history/History.jsx';
import Legend from './legend/Legend.jsx';
import Character from './character/Character.jsx';
import Rhyme from './rhyme/Rhyme.jsx';
import About from './history/About.jsx';
import SComment from './scomment/SComment.jsx';

import qs from 'anima-querystring';
let search = qs.parse(location.search.replace(/^\?/, ''));
let cid = window.cid = search.cid;

let $page = $('#page');
migi.eventBus.on('changeBgi', function(name) {
  $page[0].className = 'page';
  $page.addClass(name);
});

let last;

let topNav = migi.render(
  <TopNav/>,
  document.body
);

let loading = migi.render(
  <Loading/>,
  '#page'
);

let audio = migi.render(
  <audio autoplay="autoplay" loop="loop">
    <source src="http://rhymesland.oss-cn-shanghai.aliyuncs.com/bgm/BGM.mp3" type="audio/mpeg"/>
  </audio>,
  document.body
);

topNav.on('music', function(bool) {
  if(bool) {
    audio.element.play();
  }
  else {
    audio.element.pause();
  }
});

let weibo;
let luck;
let index;
let geography;
let history;
let legend;
let character;
let rhyme;
let about;
let scomment;

let botNav = migi.render(
  <BotNav/>,
  document.body
);

if(window.IS_MOBILE) {
  topNav.on('clickLogo', function() {
    botNav.clickLogo();
  });
}

botNav.on('change', function(type) {
  if(last) {
    last.hide();
  }

  switch (type) {
    case 'weibo':
      if(!weibo) {
        weibo = migi.render(
          <Weibo/>,
          '#page'
        );
      }
      last = weibo;
      migi.eventBus.emit('changeBgi', 'weibo');
      topNav.name = '登录';
      break;
    case 'luck':
      if(!luck) {
        luck = migi.render(
          <Luck/>,
          '#page'
        );
        luck.on('ok', function() {
          botNav.emit('change', 'index');
        });
      }
      last = luck;
      migi.eventBus.emit('changeBgi', 'luck');
      topNav.name = '提示';
      break;
    case 'index':
      if(!index) {
        index = migi.render(
          <Index/>,
          '#page'
        );
      }
      last = index;
      migi.eventBus.emit('changeBgi', 'index');
      topNav.name = '首页';
      break;
    case 'geography':
      if(!geography) {
        geography = migi.render(
          <Geography/>,
          '#page'
        );
      }
      last = geography;
      migi.eventBus.emit('changeBgi', 'geography');
      topNav.name = '地理';
      break;
    case 'history':
      if(!history) {
        history = migi.render(
          <History/>,
          '#page'
        );
      }
      last = history;
      migi.eventBus.emit('changeBgi', 'history');
      topNav.name = '历史';
      break;
    case 'legend':
      if(!legend) {
        legend = migi.render(
          <Legend/>,
          '#page'
        );
        legend.on('choose', function(name, chineseName) {
          botNav.clear();
          if(last) {
            last.hide();
          }
          if(!character) {
            character = migi.render(
              <Character/>,
              '#page'
            );
          }
          character.user(name);
          last = character;
          last.show();
          topNav.name = chineseName;
          $page.scrollTop(0);
        });
      }
      last = legend;
      migi.eventBus.emit('changeBgi', 'legend');
      topNav.name = '传记';
      break;
    case 'rhyme':
      if(!rhyme) {
        rhyme = migi.render(
          <Rhyme/>,
          '#page'
        );
      }
      last = rhyme;
      migi.eventBus.emit('changeBgi', 'rhyme');
      topNav.name = '歌谣';
      break;
    case 'about':
      if(!about) {
        about = migi.render(
          <About/>,
          '#page'
        );
        about.on('jiemeng', function() {
          botNav.clear();
          if(last) {
            last.hide();
          }
          if(!character) {
            character = migi.render(
              <Character/>,
              '#page'
            );
          }
          character.user('jiemeng');
          last = character;
          last.show();
          topNav.name = '结梦';
          $page.scrollTop(0);
        });
      }
      last = about;
      migi.eventBus.emit('changeBgi', 'history');
      topNav.name = '关于';
      break;
    case 'comment':
      if(!scomment) {
        scomment = migi.render(
          <SComment/>,
          '#page'
        );
        last = scomment;
        migi.eventBus.emit('changeBgi', 'scomment');
        topNav.name = '留言';
        $page.scrollTop(0);
      }
      break;
  }
  if(last) {
    last.show();
  }
  if(window.IS_MOBILE) {
    if(type !== 'index' && type !== 'luck') {
      botNav.hideMenu();
    }
    else {
      botNav.showMenu();
    }
  }
  $page.scrollTop(0);
});

loading.on('fin', function() {
  loading.clean();
  botNav.emit('change', 'weibo');
});

if(location.hash) {
  switch (location.hash) {
    case '#legend':
      loading.hide();
      botNav.emit('change', 'legend');
      topNav.show();
      botNav.show();
      break;
    case '#history':
      loading.hide();
      botNav.emit('change', 'history');
      topNav.show();
      botNav.show();
      break;
    case '#about':
      loading.hide();
      botNav.emit('change', 'about');
      topNav.show();
      botNav.show();
      break;
  }
}
else if(cid) {
  if(window.IS_LOGIN !== 'True') {
    location.href = window.LOGIN_URL;
  }
  else {
    loading.hide();
    botNav.emit('change', 'comment');
    topNav.show();
    botNav.show();
    if($.cookie('share') == 1) {
      audio.element.pause();
      topNav.stop();
      alert('分享链接已复制成功，可以分享给亲朋好友啦！如没有复制成功，也可以直接复制浏览器中的网址哦！');
    }
    $.removeCookie('share');
  }
}
else if(window.LUCK_MES) {
  loading.hide();
  botNav.emit('change', 'luck');
  topNav.show();
  botNav.show();
}
else if(window.IS_LOGIN === 'True') {
  loading.hide();
  botNav.emit('change', 'index');
  topNav.show();
  botNav.show();
}
// botNav.emit('change', 'index');
// topNav.show();
// botNav.show();
// loading.clean();
// if(!character) {
//   character = migi.render(
//     <Character/>,
//     '#page'
//   );
// }
// character.user('hetu');
// character.show();
