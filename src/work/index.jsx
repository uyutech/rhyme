/**
 * Created by army8735 on 2017/9/8.
 */

import './index.less';
import './work.html';

import TopNav from '../single/TopNav.jsx';
import BotNav from '../single/BotNav.jsx';
import Work from '../single/Work/Work.jsx';

let $page = $('#page');

let topNav = migi.render(
  <TopNav/>,
  document.body
);

let botNav = migi.render(
  <BotNav/>,
  document.body
);

topNav.show();
botNav.show();
botNav.hideMenu();
botNav.hideBall();

let work = migi.render(
  <Work/>,
  '#page'
);
let id = location.hash.slice('#'.length);
work.setId(id);
