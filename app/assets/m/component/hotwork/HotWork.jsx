/**
 * Created by army8735 on 2017/8/8.
 */

import util from '../../../d/common/util';
import AuthorType from '../../../d/component/author/AuthorType.jsx';

class HotWork extends migi.Component {
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
    return <div class="cp-hotwork">
      <h4>{ this.props.title }</h4>
      <div class="list" ref="list">
        <div class="c">
          {
            this.dataList && this.dataList.length
              ? <ul>
                {
                  this.dataList.map(function(item) {
                    return <li>
                      <a href={ `/works/${item.WorksID}` } class="pic">
                        <img src={ util.autoSsl(util.img100_100(item.cover_Pic)) || '//zhuanquan.xin/img/blank.png' }/>
                      </a>
                      <a href={ `/works/${item.WorksID}` } class="txt">{ item.Title }</a>
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

export default HotWork;
