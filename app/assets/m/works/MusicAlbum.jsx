/**
 * Created by army8735 on 2017/10/28.
 */

'use strict';

import net from '../../d/common/net';
import util from '../../d/common/util';

let isStart;
let offsetX;

class MusicAlbum extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    if(self.props.workList && self.props.workList.length) {
      self.setItem(self.props.workList[0]);
      self.on(migi.Event.DOM, function() {
        self.addOrAltMedia();
      });
      migi.eventBus.on('chooseMusic', function(item) {
        self.av.element.currentTime = self.currentTime = 0;
        self.setItem(item);
        self.addOrAltMedia();
      });
    }
  }
  @bind item
  @bind type
  @bind workID
  @bind name
  @bind url
  @bind playNum
  @bind isPlaying
  @bind hasStart
  @bind formatLyrics = {}
  @bind showLyricsMode
  @bind lyricsIndex = 0
  @bind duration
  @bind canControl
  @bind muted
  @bind like
  @bind favor
  @bind cover
  get currentTime() {
    return this._currentTime || 0;
  }
  @bind
  set currentTime(v) {
    this._currentTime = v;
  }
  show() {
    $(this.element).removeClass('fn-hide hidden');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  setItem(item) {
    let self = this;
    self.item = item;
    self.type = item.ItemType;
    self.workID = item.ItemID;
    self.name = item.ItemName;
    self.url = item.FileUrl;
    self.playNum = item.PlayHis;
    self.formatLyrics = item.formatLyrics || {};
    self.like = item.ISLike;
    self.favor = item.ISFavor;
    self.cover = item.ItemCoverPic;
  }
  addOrAltMedia() {
    let self = this;
    let isPlaying = self.isPlaying;
    self.pause();
    switch(self.type) {
      case 1111:
      case 1113:
        if(!self.audio) {
          self.audio = <audio src={ self.url }
                              onTimeupdate={ self.onTimeupdate.bind(self) }
                              onLoadedmetadata={ self.onLoadedmetadata.bind(self) }
                              onPlaying={ self.onPlaying.bind(self) }
                              onPause={ self.onPause.bind(self) }
                              onProgress={ self.onProgress.bind(self) }
                              preload="meta">
            your browser does not support the audio tag
          </audio>;
          self.audio.appendTo(self.ref.c.element);
        }
        else {
          self.audio.element.src = self.url;
        }
        self.av = self.audio;
        break;
      case 2110:
        if(!self.video) {
          self.video = <video ref="video"
                              src={ self.url }
                              onClick={ self.clickPlay.bind(self) }
                              onTimeupdate={ self.onTimeupdate.bind(self) }
                              onLoadedmetadata={ self.onLoadedmetadata.bind(self) }
                              onPause={ self.onPause.bind(self) }
                              onPlaying={ self.onPlaying.bind(self) }
                              preload="meta"
                              playsinline="true"
                              webkit-playsinline="true">
            your browser does not support the video tag
          </video>;
          self.video.appendTo(self.ref.c.element);
        }
        else {
          self.video.element.src = self.url;
        }
        self.av = self.video;
        break;
    }
    self.volume = self.volume;
    self.av.element.currentTime = self.currentTime = 0;
    if(isPlaying) {
      self.play();
    }
  }
  onTimeupdate(e) {
    let self = this;
    let currentTime = self.currentTime = e.target.currentTime;
    let formatLyrics = self.formatLyrics || {};
    let formatLyricsData = formatLyrics.data;
    if(formatLyrics.is && formatLyricsData.length) {
      let tempIndex = this.lyricsIndex;
      for (let i = 0, len = formatLyricsData.length; i < len; i++) {
        if(currentTime * 1000 >= formatLyricsData[i].timestamp) {
          tempIndex = i;
        }
        else {
          break;
        }
      }
      if(tempIndex !== this.lyricsIndex) {
        this.lyricsIndex = tempIndex;
      }
    }
    let percent = currentTime / this.duration;
    this.setBarPercent(percent);
  }
  onProgress(e) {
  }
  onLoadedmetadata(e) {
    this.duration = e.target.duration;
    this.canControl = true;
  }
  onPlaying(e) {
    this.duration = e.target.duration;
  }
  onPause(e) {
  }
  play() {
    this.av && this.av.element.play();
    this.isPlaying = true;
    this.hasStart = true;
    migi.eventBus.emit('play');
    return this;
  }
  pause() {
    this.av && this.av.element.pause();
    this.isPlaying = false;
    migi.eventBus.emit('pause');
    return this;
  }
  altLyrics() {
    this.showLyricsMode = !this.showLyricsMode;
  }
  clickStart(e) {
    this.play();
  }
  touchStart(e) {
    e.preventDefault();
    if(this.canControl && e.touches.length === 1) {
      isStart = true;
      offsetX = $(this.ref.progress.element).offset().left;
      this.pause();
    }
  }
  touchMove(e) {
    if(isStart && e.touches.length === 1) {
      e.preventDefault();
      let x = e.touches[0].pageX;
      let diff = x - offsetX;
      let width = $(this.ref.progress.element).width();
      diff = Math.max(0, diff);
      diff = Math.min(width, diff);
      let percent = diff / width;
      this.setBarPercent(percent);
      this.video.element.currentTime = this.currentTime = Math.floor(this.duration * percent);
    }
  }
  touchEnd(e) {
    isStart = false;
  }
  clickProgress(e) {
    if(this.canControl && e.target.className !== 'p') {
      let $progress = $(this.ref.progress.element);
      let left = $progress.offset().left;
      let x = e.pageX - left;
      let percent = x / $progress.width();
      let currentTime = Math.floor(this.duration * percent);
      this.av.element.currentTime = this.currentTime = currentTime;
    }
  }
  setBarPercent(percent) {
    percent *= 100;
    $(this.ref.vol.element).css('width', percent + '%');
    $(this.ref.p.element).css('-moz-transform', `translateX(${percent}%)`);
    $(this.ref.p.element).css('-webkit-transform', `translateX(${percent}%)`);
    $(this.ref.p.element).css('transform', `translateX(${percent}%)`);
  }
  clickPlay(e) {
    this.isPlaying ? this.pause() : this.play();
  }
  clickLike(e, vd) {
    if(!$CONFIG.isLogin) {
      migi.eventBus.emit('NEED_LOGIN');
      return;
    }
    let self = this;
    let $vd = $(vd.element);
    if(!$vd.hasClass('loading')) {
      $vd.addClass('loading');
      let data = self.item;
      net.postJSON('/api/works/likeWork', { workID: self.workID }, function (res) {
        if(res.success) {
          data.ISLike = self.like = res.data === 211;
        }
        else if(res.code === 1000) {
          migi.eventBus.emit('NEED_LOGIN');
        }
        else {
          alert(res.message || util.ERROR_MESSAGE);
        }
        $vd.removeClass('loading');
      }, function () {
        alert(res.message || util.ERROR_MESSAGE);
        $vd.removeClass('loading');
      });
    }
  }
  clickFavor(e, vd) {
    if(!$CONFIG.isLogin) {
      migi.eventBus.emit('NEED_LOGIN');
      return;
    }
    let self = this;
    let $vd = $(vd.element);
    let data = self.item;
    if($vd.hasClass('loading')) {
      //
    }
    else if($vd.hasClass('has')) {
      net.postJSON('/api/works/unFavorWork', { workID: self.workID }, function (res) {
        if(res.success) {
          data.ISFavor = self.favor = false;
        }
        else if(res.code === 1000) {
          migi.eventBus.emit('NEED_LOGIN');
        }
        else {
          alert(res.message || util.ERROR_MESSAGE);
        }
        $vd.removeClass('loading');
      }, function () {
        alert(res.message || util.ERROR_MESSAGE);
        $vd.removeClass('loading');
      });
    }
    else {
      net.postJSON('/api/works/favorWork', { workID: self.workID }, function (res) {
        if(res.success) {
          data.ISFavor = self.favor = true;
        }
        else if(res.code === 1000) {
          migi.eventBus.emit('NEED_LOGIN');
        }
        else {
          alert(res.message || util.ERROR_MESSAGE);
        }
        $vd.removeClass('loading');
      }, function () {
        alert(res.message || util.ERROR_MESSAGE);
        $vd.removeClass('loading');
      });
    }
  }
  clickDownload(e) {
    if(!$CONFIG.isLogin) {
      e.preventDefault();
      migi.eventBus.emit('NEED_LOGIN');
    }
  }
  clickShare() {
    migi.eventBus.emit('SHARE', location.href);
  }
  render() {
    return <div class="mod mod-musicalbum" style={ 'background-image:url("' + (this.props.cover || '//zhuanquan.xin/img/blank.png') + '")'}>
      <div class="cover" ref="cover" style={ this.cover ? 'background-image:url("' + this.cover + '")' : '' }/>
      <div class={ 'c' + (this.isPlaying ? ' playing' : '') + (this.type === 2110 ? ' tvideo' : '') } ref="c">
        <div class={ 'lyrics' + (this.hasStart ? '' : ' fn-hide') } ref="lyrics">
          <div class={ 'roll' + (!this.showLyricsMode && this.formatLyrics.data ? '' : ' fn-hide') }>
            <div class="c" ref="lyricsRoll" style={ '-moz-transform:translateX(' + this.lyricsIndex * 20 + 'px);-webkit-transform:translateY(-' + this.lyricsIndex * 20 + 'px);transform:translateY(-' + this.lyricsIndex * 20 + 'px)' }>
              {
                (this.formatLyrics.data || []).map(function(item) {
                  return <pre>{ item.txt || '&nbsp;' }</pre>
                })
              }
            </div>
          </div>
          <div class={ 'line' + (this.showLyricsMode && this.formatLyrics.txt ? '' : ' fn-hide') }>
            <pre style={ '-moz-transform:translateX(' + this.lyricsIndex * 20 + 'px);-webkit-transform:translateY(-' + this.lyricsIndex * 20 + 'px);transform:translateY(-' + this.lyricsIndex * 20 + 'px)' }>{ this.formatLyrics.txt }</pre>
          </div>
        </div>
        <b class={ 'start' + (this.isPlaying ? ' fn-hide' : '') } onClick={ this.clickStart }/>
      </div>
      <div class="fn" ref="fn">
        <div class="control">
          <small class="time">{ util.formatTime(this.currentTime * 1000) } / { util.formatTime(this.duration * 1000) }</small>
          <b class="full" onClick={ this.clickScreen }/>
        </div>
        <div class="bar">
          <b class={ 'play' + (this.isPlaying ? ' pause' : '') } onClick={ this.clickPlay }/>
          <div class="progress" ref="progress" onClick={ this.clickProgress }>
            <b class="load"/>
            <b class="vol" ref="vol"/>
            <b class="p" ref="p" onTouchStart={ this.touchStart } onTouchMove={ this.touchMove } onTouchEnd={ this.touchEnd }/>
          </div>
        </div>
        <ul class="btn">
          <li class={ 'like' + (this.like ? ' has' : '') } onClick={ this.clickLike }/>
          <li class={ 'favor' + (this.favor ? ' has' : '') } onClick={ this.clickFavor }/>
          <li class="download">
            <a href={ this.url }
               download={ this.name + this.url ? (/\.\w+$/.exec(this.url)[0] || '') : '' }
               onClick={ this.clickDownload }/>
          </li>
          <li class="share" onClick={ this.clickShare }/>
        </ul>
      </div>
    </div>;
  }
}

export default MusicAlbum;
