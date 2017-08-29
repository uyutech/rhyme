/**
 * Created by army8735 on 2017/8/26.
 */

import Comment from './Comment.jsx';

let Take = 10;
let loadingMore;
let ajax;
let HASH = {
  'hetu': {
    Skip: -1,
    authorId: window.HETU_ID,
    state: window.FOLLOW_HETU,
  },
  'sixia': {
    Skip: -1,
    authorId: window.SIXIA_ID,
    state: window.FOLLOW_SIXIA,
  },
  'muhan': {
    Skip: -1,
    authorId: window.MUHAN_ID,
    state: window.FOLLOW_MUHAN,
  },
  'mi': {
    Skip: -1,
    authorId: window.MI_ID,
    state: window.FOLLOW_MI,
  },
  'jiemeng': {
    Skip: -1,
    authorId: window.JIEMENG_ID,
    state: window.FOLLOW_JIEMENG,
  }
};
let $wrap;
let $cp;

class Character extends migi.Component{
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      // self.load();
      $wrap = $(self.ref.wrap.element);
      $cp = $wrap.find('.cp_comment');
      $wrap.on('scroll', function() {
        self.checkMore();
      });
      self.ref.comment.on('chooseSubComment', function(rid, cid, name) {
        self.rootId = rid;
        self.replayId = cid;
        self.replayName = name;
      });
    });
  }
  @bind name
  @bind showComment
  @bind rootId = null
  @bind replayId = null
  @bind replayName
  @bind hasContent
  @bind sending
  user(name) {
    this.name = name;
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
    this.rootId = null;
    this.replayId = null;
    this.replayName = null;
    this.showComment = false;
    this.ref.comment.abort();
    Object.keys(HASH).forEach(function(key) {
      HASH[key].Skip = -1;
      HASH[key].end = false;
    });
  }
  clickFollow(e, vd) {
    e.preventDefault();
    let self = this;
    if(HASH[self.name].state === '1') {
      util.postJSON('/author/RemoveAuthorToUser', { Author: HASH[self.name].authorId }, function(res) {
        if(res.success) {
          HASH[self.name].state = '0';
          self.name = self.name;
          alert('取关成功');
        }
        else {
          alert(res.message || util.ERROR_MESSAGE);
        }
      }, function(res) {
        alert(res.message || util.ERROR_MESSAGE);
      });
    }
    else {
      util.postJSON('/author/SaveAuthorToUser', { Author: HASH[self.name].authorId }, function(res) {
        if(res.success) {
          HASH[self.name].state = '1';
          self.name = self.name;
          alert('关注成功');
        }
        else {
          alert(res.message || util.ERROR_MESSAGE);
        }
      }, function(res) {
        alert(res.message || util.ERROR_MESSAGE);
      });
    }
  }
  clickComment(e) {
    e.preventDefault();
    this.showComment = true;
    this.load();
  }
  clickClose(e) {
    e.preventDefault();
    $wrap.scrollTop(0);
    this.showComment = false;
    if(ajax) {
      ajax.abort();
    }
    this.ref.comment.abort();
    HASH[this.name].Skip = -1;
    HASH[this.name].end = false;
    this.rootId = null;
    this.replayId = null;
    this.replayName = null;
  }
  load() {
    let self = this;
    self.ref.comment.message = '读取中...';
    ajax = util.postJSON('author/GetToAuthorMessage_List', { AuthorID: HASH[self.name].authorId , Skip: HASH[self.name].Skip, Take }, function(res) {
      if(res.success) {
        let data = res.data;
        if(data.Size) {
          self.ref.comment.message = '';
          self.ref.comment.showComment(res.data.data);
          HASH[self.name].Skip = data.data[data.data.length - 1].Send_ID;
        }
        else {
          self.ref.comment.showComment(res.data.data);
          self.ref.comment.message = '暂无评论';
        }
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
  checkMore() {
    let self = this;
    if(this.showComment && !loadingMore && !HASH[self.name].end && $wrap.scrollTop() + $wrap.height() + 30 > $cp.height()) {
      loadingMore = true;
      ajax = util.postJSON('author/GetToAuthorMessage_List', { AuthorID: HASH[self.name].authorId, Skip: HASH[self.name].Skip, Take }, function(res) {
        if(res.success) {
          let data = res.data;
          if(data.data.length) {
            HASH[self.name].Skip = data.data[data.data.length - 1].Send_ID;
            self.ref.comment.addMore(data.data);
            if(data.data.length < Take) {
              self.ref.comment.message = '';
              HASH[self.name].end = true;
            }
          }
          else {
            self.ref.comment.message = '';
            HASH[self.name].end = true;
          }
        }
        else {
          self.ref.comment.message = res.message || util.ERROR_MESSAGE;
        }
        loadingMore = false;
      }, function(res) {
        self.ref.comment.message = res.message || util.ERROR_MESSAGE;
        loadingMore = false;
      });
    }
  }
  clickReplay() {
    this.replayId = null;
    this.replayName = null;
    this.rootId = null;
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
      self.sending = true;
      util.postJSON('author/AddComment', {
        ParentID,
        RootID,
        Content,
        commentType: 2,
        commentTypeID: HASH[self.name].authorId,
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
        self.sending = false;
      }, function(res) {
        alert(res.message || util.ERROR_MESSAGE);
        self.sending = false;
      });
    }
  }
  render() {
    return <div class={ 'main character ' + this.name }>
      <div class="con">
        <div class="img"/>
        <ul class="btn fn-clear">
          <li><a href="#" onClick={ this.clickFollow }><span>{ HASH[this.name] && HASH[this.name].state === '1' ? '取关' : '关注' }</span></a></li>
          <li><a href="#" class="comment" onClick={ this.clickComment }><span>{ this.name === 'jiemeng' ? '留言' : '表白' }</span></a></li>
        </ul>
      </div>
      <div class={ 'comments' + (this.showComment ? '' : ' fn-hide') } ref="comments">
        <div class="c">
          <div class="wrap" ref="wrap">
            <Comment ref="comment"/>
          </div>
          <a href="#" class="close" onClick={ this.clickClose }/>
          <div class="form">
            <div class={ 'reply' + (this.replayId ? '' : ' fn-hide') } onClick={ this.clickReplay }>{ this.replayName }</div>
            <div class="inputs">
              <input ref="input" maxlength="120" type="text" placeholder="留言..." onInput={ this.input }/>
            </div>
            <button onClick={ this.click } class={ this.hasContent && !this.sending ? '' : 'dis' }>确定</button>
          </div>
        </div>
      </div>
    </div>;
  }
}

export default Character;
