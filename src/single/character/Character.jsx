/**
 * Created by army8735 on 2017/8/26.
 */

import Comment from './Comment.jsx';

let Skip = 0;
let Take = 10;
let SortType = 0;
let MyComment = 0;
let CurrentCount = 0;
let commentType = 2;
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
      $wrap = $(self.ref.wrap.element);
      $cp = $wrap.find('.cp_comment');
      $wrap.on('scroll', function() {
        self.checkMore();
      });
      self.ref.comment.on('chooseSubComment', function(rid, cid, name) {
        self.rootId = rid;
        self.replayId = cid;
        self.replayName = name;
        commentType = 3;
      });
      self.ref.comment.on('noSubComment', function() {
        self.clickReplay();
      });
      self.ref.comment.on('copy', function(url) {
        migi.eventBus.emit('share', url);
      });
    });
  }
  @bind name
  @bind showComment
  @bind rootId = null
  @bind replayId = null
  @bind replayName
  @bind hasContent
  @bind loading
  user(name) {
    this.name = name;
  }
  show() {
    let self = this;
    $(self.element).removeClass('fn-hide');
    $(this.ref.left.element).removeClass('on');
    $(this.ref.right.element).removeClass('on');
    setTimeout(function() {
      $(self.ref.left.element).addClass('on');
      $(self.ref.right.element).addClass('on');
    }, 200);
  }
  hide() {
    $(this.element).addClass('fn-hide');
    $(this.ref.left.element).removeClass('on');
    $(this.ref.right.element).removeClass('on');
    this.rootId = null;
    this.replayId = null;
    this.replayName = null;
    this.showComment = false;
    this.ref.comment.abort();
    this.ref.comment.showComment();
    Skip = 0;
    CurrentCount = 0;
    commentType = 2;
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
    this.ref.comment.showComment();
    Skip = 0;
    CurrentCount = 0;
    commentType = 2;
    HASH[this.name].Skip = -1;
    HASH[this.name].end = false;
    this.rootId = null;
    this.replayId = null;
    this.replayName = null;
  }
  load() {
    let self = this;
    self.ref.comment.message = '读取中...';
    if(ajax) {
      ajax.abort();
    }
    self.loading = true;
    ajax = util.postJSON('author/GetToAuthorMessage_List', { AuthorID: HASH[self.name].authorId , Skip, Take, SortType, MyComment, CurrentCount }, function(res) {
      if(res.success) {
        let data = res.data;
        CurrentCount = data.Size;
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
        self.ref.comment.showComment();
        self.ref.comment.message = res.message || util.ERROR_MESSAGE;
      }
      self.loading = false;
    }, function(res) {
      self.ref.comment.showComment();
      self.ref.comment.message = res.message || util.ERROR_MESSAGE;
      self.loading = false;
    });
  }
  checkMore() {
    let self = this;
    if(self.showComment && !loadingMore && !HASH[self.name].end && $wrap.scrollTop() + $wrap.height() + 30 > $cp.height()) {
      loadingMore = true;
      if(ajax) {
        ajax.abort();
      }
      ajax = util.postJSON('author/GetToAuthorMessage_List', { AuthorID: HASH[self.name].authorId, Skip, Take, SortType, MyComment, CurrentCount }, function(res) {
        if(res.success) {
          let data = res.data;
          CurrentCount = data.Size;
          Skip += Take;
          if(data.data.length) {
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
    commentType = 2;
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
        self.loading = false;
      }, function(res) {
        alert(res.message || util.ERROR_MESSAGE);
        self.loading = false;
      });
    }
  }
  switchType(e, vd) {
    let $ul = $(vd.element);
    $ul.toggleClass('alt');
    $ul.find('li').toggleClass('cur');
    let rel = $ul.find('.cur').attr('rel');
    HASH[this.name].Skip = -1;
    HASH[this.name].end = false;
    CurrentCount = 0;
    SortType = rel;
    Skip = 0;
    this.ref.comment.showComment();
    this.ref.comment.abort();
    this.load();
  }
  switchType2(e, vd) {
    let $ul = $(vd.element);
    $ul.toggleClass('alt');
    $ul.find('li').toggleClass('cur');
    let rel = $ul.find('.cur').attr('rel');
    HASH[this.name].Skip = -1;
    HASH[this.name].end = false;
    CurrentCount = 0;
    MyComment = rel;
    Skip = 0;
    this.ref.comment.showComment();
    this.ref.comment.abort();
    this.load();
  }
  clickShare(e) {
    e.preventDefault();
    migi.eventBus.emit('share', location.href);
  }
  render() {
    return <div class={ 'main character ' + this.name }>
      <div class="con">
        <div class="img"/>
        <ul class="btn fn-clear">
          <li><a href="#" onClick={ this.clickFollow }><span>{ HASH[this.name] && HASH[this.name].state === '1' ? '取关' : '关注' }</span></a></li>
          <li><a href="#" class="comment" onClick={ this.clickComment }><span>{ this.name === 'jiemeng' ? '留言' : '表白' }</span></a></li>
          <li><a href="#" class="share" onClick={ this.clickShare }><span>分享</span></a></li>
        </ul>
        <div class="left" ref="left"/>
        <div class="right" ref="right"/>
      </div>
      <div class={ 'comments' + (this.showComment ? '' : ' fn-hide') } ref="comments">
        <div class="c">
          <div class="wrap" ref="wrap">
            <Comment ref="comment"/>
          </div>
          <a href="#" class="close" onClick={ this.clickClose }/>
          <ul class="type2 fn-clear" onClick={ { li: this.switchType2 } }>
            <li class="cur" rel="0"><span>全部</span></li>
            <li rel="1"><span>我的</span></li>
          </ul>
          <ul class="type fn-clear" onClick={ { li: this.switchType } }>
            <li class="cur" rel="0"><span>最新</span></li>
            <li rel="1"><span>最热</span></li>
          </ul>
          <div class="form">
            <div class={ 'reply' + (this.replayId ? '' : ' fn-hide') } onClick={ this.clickReplay }>{ this.replayName }</div>
            <div class="inputs">
              <input ref="input" maxlength="1000" type="text" placeholder="留言..." onInput={ this.input }/>
            </div>
            <button onClick={ this.click } class={ this.hasContent && !this.loading ? '' : 'dis' }>确定</button>
          </div>
        </div>
      </div>
    </div>;
  }
}

export default Character;
