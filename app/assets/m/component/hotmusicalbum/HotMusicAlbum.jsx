/**
 * Created by army8735 on 2017/10/29.
 */

'use strict';

import util from '../../../d/common/util';

class HotMusicAlbum extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    if(self.props.dataList) {
      self.dataList = self.props.dataList;
    }
    self.on(migi.Event.DOM, function() {
      self.autoWidth();
    });
  }
  @bind dataList = []
  autoWidth() {
    let $list = $(this.ref.list.element);
    let $c = $list.find('.c');
    $c.css('width', '9999rem');
    let $ul = $c.find('ul');
    $c.css('width', $ul.width() + 1);
  }
  render() {
    return <div class="cp-hotmusicalbum">
      <h4>{ this.props.title }</h4>
      <div class="list" ref="list">
        <div class="c">
          {
            this.dataList && this.dataList.length
              ? <ul>
                {
                  this.dataList.map(function(item) {
                    let url = item.WorkType === 5 ? `/musicalbum/${item.WorksID}` : `/works/${item.WorksID}`;
                    return <li>
                      <b class="bg"/>
                      <a href={ url } class="pic">
                        <img src={ util.autoSsl(util.img100_100(item.cover_Pic)) || '//zhuanquan.xin/img/blank.png' }/>
                      </a>
                      <a href={ url } class="txt">{ item.Title }</a>
                    </li>;
                  })
                }
              </ul>
              : <div class="empty"/>
          }
        </div>
      </div>
    </div>;
  }
}

export default HotMusicAlbum;
