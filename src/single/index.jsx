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

let weibo;
let luck;
let index;
let geography;
let history;
let legend;
let character;
let rhyme;
let about;

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
  // topNav.show();
  // botNav.show();
});
if(window.LUCK_MES) {
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
