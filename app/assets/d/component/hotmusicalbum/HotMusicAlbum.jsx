/**
 * Created by army8735 on 2017/9/18.
 */

'use strict';

import util from '../../common/util';

class HotMusicAlbum extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    if(self.props.dataList) {
      self.dataList = self.props.dataList;
    }
  }
  @bind dataList = []
  clickPrev(e) {
    e.preventDefault();
  }
  clickNext(e) {
    e.preventDefault();
  }
  render() {
    return <div class="cp-hotmusicalbum">
      <h4>{ this.props.title }<small>我们会邀请更多作者入驻！也诚邀你在转圈发布作品、交流创作>3&lt;</small></h4>
      {
        this.dataList && this.dataList.length
          ? <ul class="list fn-clear">
            {
              this.dataList.map(function(item) {
                return <li>
                  <b class="bg"/>
                  <a href={ `/works/${item.WorksID}` } class="pic">
                    <img src={ util.autoSsl(util.img144_144(item.cover_Pic)) || '//zhuanquan.xin/img/blank.png' }/>
                  </a>
                  <a href={ `/works/${item.WorksID}` } class="txt">{ item.Title }</a>
                </li>;
              })
            }
          </ul>
          : <div class="empty"/>
      }
    </div>;
  }
}

export default HotMusicAlbum;
