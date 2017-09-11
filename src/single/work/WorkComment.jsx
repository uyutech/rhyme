/**
 * Created by army8735 on 2017/9/1.
 */

import Comment from '../character/Comment.jsx';

let init;
let Skip = -1;
let Take = 10;
let SortType = 0;
let MyComment = 0;
let CurrentCount = 0;
let ajax;
let commentType = 1;
let loadingMore;
let loadEnd;
let $window = $(window);
let $page = $('#page');
let $main;
let $body = $(document.body);

class WorkComment extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      $main = $('.main.work');
      // self.ref.comment.on('chooseSubComment', function(rid, cid, name) {
      //   self.rootId = rid;
      //   self.replayId = cid;
      //   self.replayName = name;
      //   commentType = 4;
      // });
      // self.ref.comment.on('noSubComment', function() {
      //   self.clickReplay();
      // });
      $window.on('scroll', function() {
        self.checkMore();
      });
      $page.on('scroll', function() {
        self.checkMore();
      });
    });
  }
  show() {
    let self = this;
    $(self.element).removeClass('fn-hide');
    self.showComment = true;
  }
  hide() {
    let self = this;
    $(self.element).addClass('fn-hide');
    self.showComment = false;
    Skip = -1;
  }
  @bind showComment
  @bind rootId = null
  @bind replayId = null
  @bind replayName
  @bind hasContent
  @bind loading
  @bind id
  load() {
    let self = this;
    // self.ref.comment.showComment();
    self.ref.comment.message = '读取中...';
    if(ajax) {
      ajax.abort();
    }
    self.loading = true;
    ajax = util.postJSON('works/GetToWorkMessage_List', { WorkID: self.id , Skip, Take }, function(res) {
      if(res.success) {
        let data = res.data;
        Skip += Take;
        if(data.data.length) {
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
    let WIN_HEIGHT = $window.height();
    let bool;
    if(window.IS_MOBILE) {
      bool = $page.scrollTop() + WIN_HEIGHT + 30 > $main.outerHeight();
    }
    else {
      bool = $window.scrollTop() + WIN_HEIGHT + 30 > $page.height();
    }
    if(self.showComment && !self.loading && !loadingMore && !loadEnd && bool) {
      loadingMore = true;
      ajax = util.postJSON('works/GetToWorkMessage_List', { WorkID: self.id , Skip, Take }, function(res) {
        if(res.success) {
          let data = res.data;
          Skip += Take;
          if(data.data.length) {
            self.ref.comment.addMore(data.data);
            if(data.data.length < Take) {
              self.ref.comment.message = '';
              loadEnd = true;
            }
          }
          else {
            loadEnd = true;
            self.ref.comment.message = '';
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
  }
  render() {
    return <div class="comments fn-hide">
      <Comment ref="comment"/>
    </div>;
  }
}

export default WorkComment;
