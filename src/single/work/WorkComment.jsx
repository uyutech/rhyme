/**
 * Created by army8735 on 2017/9/1.
 */

import Comment from '../character/Comment.jsx';

let init;
let Skip = -1;
let Take = 10;
let Size = 0;

class WorkComment extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  show() {
    let self = this;
    $(self.element).removeClass('fn-hide');
    if(!init) {
      init = true;
      self.load();
      self.ref.comment.on('chooseSubComment', function(rid, cid, name) {
        self.rootId = rid;
        self.replayId = cid;
        self.replayName = name;
      });
    }
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  @bind rootId = null
  @bind replayId = null
  @bind replayName
  @bind hasContent
  @bind loading
  @bind id
  load() {
    let self = this;
    util.postJSON('work/GetToWorkMessage_List', { WorkID: self.id , Skip, Take }, function(res) {
      if(res.success) {
        let data = res.data;
        Size = data.Size;
        Skip += Take;
        if(data.Size) {
          self.ref.comment.message = '';
          self.ref.comment.showComment(res.data.data);
        }
        else {
          self.ref.comment.showComment(res.data.data);
          self.ref.comment.message = '暂无评论';
        }
      }
      else {
        self.ref.comment.message = res.message || util.ERROR_MESSAGE;
      }
    }, function(res) {
      self.ref.comment.message = res.message || util.ERROR_MESSAGE;
    });
  }
  clickReplay() {
    this.replayId = null;
    this.replayName = null;
  }
  input(e, vd) {
    let v = $(vd.element).val().trim();
    this.hasContent = v.length > 0;
  }
  click(e) {
    e.preventDefault();
  }
  render() {
    return <div class="comments fn-hide">
      <Comment ref="comment"/>
      <div class="form">
        <div class={ 'reply' + (this.replayId ? '' : ' fn-hide') } onClick={ this.clickReplay }>{ this.replayName }</div>
        <div class="inputs">
          <input ref="input" type="text" placeholder="回复..." onInput={ this.input }/>
        </div>
        <button onClick={ this.click } class={ this.hasContent && !this.loading ? '' : 'dis' }>确定</button>
      </div>
    </div>;
  }
}

export default WorkComment;
