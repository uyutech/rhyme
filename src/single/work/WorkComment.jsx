/**
 * Created by army8735 on 2017/9/1.
 */

import Comment from '../character/Comment.jsx';

let init;
let Skip = -1;
let Take = 10;
let Size = 0;
let ajax;
let commentType = 1;

class WorkComment extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  show() {
    let self = this;
    $(self.element).removeClass('fn-hide');
    if(!init) {
      init = true;
      // self.load();
      self.ref.comment.on('chooseSubComment', function(rid, cid, name) {
        self.rootId = rid;
        self.replayId = cid;
        self.replayName = name;
        commentType = 3;
      });
      self.ref.comment.on('noSubComment', function() {
        self.clickReplay();
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
    self.loading = true;
    util.postJSON('works/GetToWorkMessage_List', { WorkID: self.id , Skip, Take }, function(res) {
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
      self.loading = false;
    }, function(res) {
      self.ref.comment.message = res.message || util.ERROR_MESSAGE;
      self.loading = false;
    });
  }
  clickReplay() {
    this.replayId = null;
    this.replayName = null;
    this.rootId = null;
    commentType = 1;
  }
  input(e, vd) {
    let v = $(vd.element).val().trim();
    this.hasContent = v.length > 0;
  }
  click(e) {
    e.preventDefault();
    let self = this;
    if(self.hasContent) {
      let $input = $(this.ref.input.element);
      let Content = $input.val();
      let ParentID = self.replayId !== null ? self.replayId : -1;
      let RootID = self.rootId !== null ? self.rootId : -1;
      self.loading = true;
      if(ajax) {
        ajax.abort();
      }
      ajax = util.postJSON('author/AddComment', {
        ParentID,
        RootID,
        Content,
        commentType,
        commentTypeID: self.id,
      }, function(res) {
        if(res.success) {
          $input.val('');
          self.hasContent = false;
          if(RootID === -1) {
            self.ref.comment.addNew(res.data);
            self.ref.comment.message = '';
          }
          else {
            self.ref.comment.addChild(res.data);
          }
        }
        else {
          alert(res.message || util.ERROR_MESSAGE);
        }
        self.loading = false;
      }, function(res) {
        alert(res.message || util.ERROR_MESSAGE);
        self.loading = false;
      });
    }
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
