/**
 * Created by army8735 on 2017/10/11.
 */

'use strict';

import net from '../../d/common/net';
import util from '../../d/common/util';
import Comment from '../../d/component/comment/Comment.jsx';
import SubCmt from '../../d/component/subcmt/SubCmt.jsx';

let skip = 0;
let take = 10;
let sortType = 0;
let myComment = 0;
let currentCount = 0;
let ajax;
let loadEnd;

class PostComment extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let subCmt = self.ref.subCmt;
      let comment = self.ref.comment;
      let $window = $(window);
      $window.on('scroll', function() {
        self.checkMore($window);
      });
      comment.on('chooseSubComment', function(rid, cid, name) {
        self.rootID = rid;
        self.parentID = cid;
        subCmt.to = name;
      });
      comment.on('closeSubComment', function() {
        self.rootID = -1;
        self.parentID = -1;
        subCmt.to = null;
      });
      subCmt.on('submit', function(content) {
        subCmt.isCommentSending = true;
        let rootID = self.rootID;
        let parentID = self.parentID;
        net.postJSON('/api/post/addComment', {
          parentID,
          rootID,
          postID: self.props.id,
          content,
        }, function(res) {
          if(res.success) {
            subCmt.value = '';
            subCmt.hasCommentContent = false;
            if(rootID === -1) {
              comment.prependData(res.data);
              comment.message = '';
            }
            else {
              comment.prependChild(res.data);
            }
          }
          else if(res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          }
          else {
            alert(res.message || util.ERROR_MESSAGE);
          }
          subCmt.isCommentSending = false;
        }, function(res) {
          alert(res.message || util.ERROR_MESSAGE);
          subCmt.isCommentSending = false;
        });
      });
    });
  }
  @bind loading
  @bind loadEnd
  @bind rootID = -1
  @bind parentID = -1
  load() {
    let self = this;
    let comment = self.ref.comment;
    if(ajax) {
      ajax.abort();
    }
    self.loading = true;
    ajax = net.postJSON('/api/post/commentList', { postID: self.props.id , skip, take, sortType, myComment, currentCount }, function(res) {
      if(res.success) {
        let data = res.data;
        // currentCount = data.Size;
        if(data.data.length) {
          comment.message = '';
          comment.appendData(res.data.data);
        }
        else {
          comment.appendData(res.data.data);
          comment.message = '暂无评论';
          comment.message = skip === 0 ? '暂无评论' : '已经到底了';
          self.loadEnd = true;
        }
        skip += take;
      }
      else {
        if(res.code === 1000) {
          migi.eventBus.emit('NEED_LOGIN');
        }
        comment.message = res.message || util.ERROR_MESSAGE;
      }
      self.loading = false;
    }, function(res) {
      comment.message = res.message || util.ERROR_MESSAGE;
      self.loading = false;
    });
  }
  checkMore($window) {
    let self = this;
    let WIN_HEIGHT = $window.height();
    let HEIGHT = $(document.body).height();
    let bool;
    bool = !$(self.element).hasClass('fn-hide') && $window.scrollTop() + WIN_HEIGHT + 30 > HEIGHT;
    if(!self.loading && !self.loadEnd && bool) {
      self.load();
    }
  }
  switchType(e, vd) {
    let $ul = $(vd.element);
    $ul.toggleClass('alt');
    $ul.find('li').toggleClass('cur');
    let rel = $ul.find('.cur').attr('rel');
    currentCount = 0;
    sortType = rel;
    skip = 0;
    if(ajax) {
      ajax.abort();
    }
    loadEnd = false;
    this.loading = false;
    this.ref.comment.clearData();
    this.load();
  }
  switchType2(e, vd, tvd) {
    let $li = $(tvd.element);
    if(!$li.hasClass('cur')) {
      let $ul = $(vd.element);
      $ul.toggleClass('alt');
      $ul.find('li').toggleClass('cur');
      let rel = $ul.find('.cur').attr('rel');
      currentCount = 0;
      myComment = rel;
      skip = 0;
      if(ajax) {
        ajax.abort();
      }
      loadEnd = false;
      this.loading = false;
      this.ref.comment.clearData();
      this.load();
    }
  }
  render() {
    return <div class="comments">
      <h4>评论</h4>
      <div class="fn">
        <ul class="type fn-clear" onClick={ { li: this.switchType2 } }>
          <li class="cur" rel="0">全部评论</li>
          {
            this.props.isLogin
              ? <li rel="1">我的</li>
              : ''
          }
        </ul>
        <ul class="type2 fn-clear" onClick={ { li: this.switchType } }>
          <li class="cur" rel="0">最新</li>
          <li rel="1">最热</li>
        </ul>
      </div>
      <Comment ref="comment"
               zanUrl="/api/post/likeComment"
               subUrl="/api/post/subCommentList"
               delUrl="/api/post/delComment"
               data={ this.props.commentData.data }/>
      <SubCmt ref="subCmt"
              subText="发送"
              tipText="-${n}"
              placeholder="夸夸这个帖子吧"/>
    </div>;
  }
}

export default PostComment;
