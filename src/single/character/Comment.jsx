/**
 * Created by army8735 on 2017/8/26.
 */

const NOT_LOADED = 0;
const IS_LOADING = 1;
const HAS_LOADED = 2;
let subLoadHash = {};
let subSkipHash = {};
let Take = 10;
let ajax;

class Comment extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let $root = $(self.element);
      $root.on('click', '.zan', function() {
        let $span = $(this);
        let CommentID = $span.attr('cid');
        util.postJSON('author/AddWorkCommentLike', { CommentID }, function(res) {
          if(res.success) {
            let data = res.data;
            if(data.State === 211) {
              $span.addClass('has');
            }
            else {
              $span.removeClass('has');
            }
            $span.find('small').text(data.LikeCount);
          }
        });
      });
      $root.on('click', '.slide', function() {
        self.slide($(this));
      });
      $root.on('click', '.more', function() {
        let $message = $(this);
        let rid = $message.attr('rid');
        $message.removeClass('more').text('读取中...');
        ajax = util.postJSON('author/GetTocomment_T_List', { RootID: rid, Skip: subSkipHash[rid], Take }, function(res) {
          if(res.success) {
            let data = res.data;
            if(data.data.length) {
              subSkipHash[rid] = data.data[data.data.length - 1].Send_ID;
              let s = '';
              data.data.forEach(function (item) {
                s += self.genChildComment(item);
              });
              let $ul = $message.prev();
              $ul.append(s);
              if(data.data.length < Take) {
                $message.addClass('fn-hide');
              }
              else {
                $message.addClass('more').text('点击加载更多');
              }
            }
            else {
              $message.addClass('fn-hide');
            }
          }
          else {
            $message.addClass('more').text(res.message || util.ERROR_MESSAGE);
          }
        }, function(res) {
          $message.addClass('more').text(res.message || util.ERROR_MESSAGE);
        });
      });
      $root.on('click', '.profile,pre', function() {
        let $profile = $(this);
        self.emit('chooseSubComment', $profile.attr('rid'), $profile.attr('cid'), $profile.attr('name'));
      });
    });
  }
  @bind message
  abort() {
    if(ajax) {
      ajax.abort();
    }
    subLoadHash = {};
    subSkipHash = {};
  }
  slide($slide) {
    let self = this;
    let $li = $slide.closest('li');
    let $list2 = $li.find('.list2');
    let $ul = $list2.find('ul');
    let $message = $list2.find('.message');
    let rid = $slide.attr('rid');
    if($slide.hasClass('on')) {
      $slide.removeClass('on');
      $list2.css('height', 0);
    }
    else {
      $slide.addClass('on');
      let state = subLoadHash[rid];
      if(state === HAS_LOADED || state === IS_LOADING) {
        $list2.css('height', 'auto');
      }
      else {
        $list2.css('height', 'auto');
        subLoadHash[rid] = IS_LOADING;
        util.postJSON('author/GetTocomment_T_List', { RootID: rid, Skip: -1, Take }, function(res) {
          if(res.success) {
            subLoadHash[rid] = HAS_LOADED;
            let s = '';
            let data = res.data;
            data.data.forEach(function(item) {
              s += self.genChildComment(item);
            });
            $ul.html(s);
            if(data.data.length >= data.Size) {
              $message.addClass('fn-hide');
            }
            else {
              $message.addClass('more').text('点击加载更多');
              subSkipHash[rid] = data.data[data.data.length - 1].Send_ID;
            }
            $ul.removeClass('fn-hide');
            $list2.css('height', 'auto');
          }
          else {
            subLoadHash[rid] = NOT_LOADED;
            $message.text(res.message || util.ERROR_MESSAGE);
          }
        }, function(res) {
          subLoadHash[rid] = NOT_LOADED;
          $message.text(res.message || util.ERROR_MESSAGE);
        });
      }
    }
  }
  showComment(data) {
    let self = this;
    let s = '';
    (data || []).forEach(function(item) {
      s += self.genComment(item);
    });
    $(self.ref.list.element).html(s);
  }
  addMore(data) {
    let self = this;
    let s = '';
    (data || []).forEach(function(item) {
      s += self.genComment(item);
    });
    $(self.ref.list.element).append(s);
  }
  addNew(item) {
    this.genComment(item).prependTo(this.ref.list.element);
  }
  addChild(item) {
    let li = this.genChildComment(item);
    let $comment = $('#comment_' + item.RootID);
    let $list2 = $comment.find('.list2');
    let $ul = $list2.find('ul');
    li.prependTo($ul[0]);
    $list2.css('height', $ul.height());
    let $num = $comment.find('.slide small');
    $num.text((parseInt($num.text()) || 0) + 1);
  }
  genComment(item) {
    return <li id={ 'comment_' + item.Send_ID }>
      <div class="t">
        <div class="profile fn-clear" cid={ item.Send_ID } rid={ item.Send_ID } name={ item.Send_UserName }>
          <img class="pic" src={ item.Send_UserHeadUrl || 'http://rhymesland.oss-cn-shanghai.aliyuncs.com/blank.png' }/>
          <div class="txt">
            <div><span class="name">{ item.Send_UserName }</span>
              <small class="time">{ item.Send_Time }</small>
            </div>
            <p>{ item.sign }</p>
          </div>
        </div>
        <div class="fn">
          <span cid={ item.Send_ID } class={ 'zan' + (item.IsLike ? ' has' : '') }><small>{ item.LikeCount }</small></span>
        </div>
      </div>
      <div class="c">
          <pre cid={ item.Send_ID } rid={ item.Send_ID } name={ item.Send_UserName }>{ item.Send_Content }<span
            class="placeholder"/></pre>
        <div class="slide" cid={ item.Send_ID } rid={ item.Send_ID }>
          <small>{ item.sub_Count }</small>
          <span>收起</span></div>
      </div>
      <div class="list2">
        <ul class="fn-hide"/>
        <p class="message" cid={ item.Send_ID } rid={ item.Send_ID }>读取中...</p>
      </div>
    </li>;
  }
  genChildComment(item) {
    return <li>
      <div class="t">
        <div class="fn">
          <span cid={ item.Send_ID } class={ 'zan' + (item.IsLike ? ' has' : '') }><small>{ item.LikeCount }</small></span>
        </div>
        <div class="profile fn-clear" cid={ item.Send_ID } rid={ item.RootID } name={ item.Send_UserName }>
          <img class="pic" src={ item.Send_UserHeadUrl || 'http://rhymesland.oss-cn-shanghai.aliyuncs.com/blank.png' }/>
          <div class="txt">
            <div><span class="name2">{ item.Send_ToUserName }</span><b class="arrow"/><small class="time">{ item.Send_Time }</small><span class="name">{ item.Send_UserName }</span></div>
            <p>{ item.sign }</p>
          </div>
        </div>
      </div>
      <div class="c">
        <pre cid={ item.Send_ID } rid={ item.RootID } name={ item.Send_UserName }>{ item.Send_Content }</pre>
      </div>
    </li>;
  }
  switchType(e, vd, tvd) {
    let $ul = $(vd.element);
    $ul.toggleClass('alt');
    $ul.find('li').toggleClass('cur');
    this.emit('switchType', $ul.find('.cur').attr('rel'));
  }
  render() {
    let self = this;
    return <div class="cp_comment">
      <div class="bar fn-clear">
        <ul class="type fn-clear" onClick={ { li: this.switchType } }>
          <li class="cur" rel="0"><span>最新</span></li>
          <li rel="1"><span>最热</span></li>
        </ul>
      </div>
      <ul class="list" ref="list"/>
      <p class={ 'message' + (this.message ? '' : ' fn-hide') }>{ this.message }</p>
    </div>;
  }
}

export default Comment;
