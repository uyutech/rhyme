/**
 * Created by army8735 on 2017/9/1.
 */

import './index.less';
import Media from './Media.jsx';
import Intro from './Intro.jsx';
import WorkComment from './WorkComment.jsx';

class Work extends migi.Component {
  constructor(...data) {
    super(...data);
    this.on(migi.Event.DOM, function() {
      let media = this.ref.media;
      let intro = this.ref.intro;
      let workComment = this.ref.workComment;
      media.on('tagChange', function(type) {
        switch (type) {
          case '0':
            workComment.hide();
            intro.show();
            break;
          case '1':
            intro.hide();
            workComment.show();
            workComment.load();
            break;
        }
      });
    });
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  id(id) {
    let self = this;
    let media = self.ref.media;
    let intro = self.ref.intro;
    util.postJSON('works/GetWorkDetails', { WorksID: id }, function(res) {
      if(res.success) {
        let data = res.data;
        media.setCover(data.cover_Pic);
        media.setWorks(data.Works_Items);
        media.popular = data.Popular;
        intro.tags = data.ReturnTagData || [];
        migi.eventBus.emit('changeTitle', data.Title);
      }
      else {}
    });
    self.ref.workComment.id = id;
  }
  render() {
    return <div class="main work">
      <Media ref="media"/>
      <Intro ref="intro"/>
      <WorkComment ref="workComment"/>
    </div>;
  }
}

export default Work;
