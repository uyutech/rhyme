/**
 * Created by army8735 on 2017/8/31.
 */

import Comment from '../character/Comment.jsx';

let ajax;

class SComment extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  show() {
    $(this.element).removeClass('fn-hide');
    this.load();
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  load() {
    let self = this;
    self.ref.comment.message = '读取中...';
    if(ajax) {
      ajax.abort();
    }
    ajax = util.postJSON('author/GetCommentByID', { CommentID: window.cid }, function(res) {
      if(res.success) {
        let data = res.data;
        self.ref.comment.message = '';
        self.ref.comment.showComment([data]);
      }
      else {
        self.ref.comment.showComment();
        self.ref.comment.message = res.message || util.ERROR_MESSAGE;
      }
    }, function(res) {
      self.ref.comment.showComment();
      self.ref.comment.message = res.message || util.ERROR_MESSAGE;
    });
  }
  render() {
    return <div class="main scomment">
      <div class="con">
        <div class="c">
          <div class="wrap">
            <Comment ref="comment"/>
          </div>
        </div>
      </div>
    </div>;
  }
}

export default SComment;
