/**
 * Created by army on 2017/6/11.
 */

import util from '../../d/common/util';
import net from '../../d/common/net';
import LyricsParser from '../../d/works/LyricsParser.jsx';

let isStart;
let offsetX;

class Audio extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    if(self.props.datas) {
      self.setData(self.props.datas);
      if(self.props.show) {
        self.on(migi.Event.DOM, function() {
          self.addMedia();
        });
      }
    }
  }
  @bind datas = []
  @bind index = 0
  @bind isPlaying
  @bind hasStart
  @bind showLyricsMode
  @bind lyricsIndex = 0
  @bind duration
  @bind canControl
  @bind fnFavor
  @bind fnLike
  get currentTime() {
    return this._currentTime || 0;
  }
  @bind
  set currentTime(v) {
    this._currentTime = v;
  }
  setData(datas) {
    let self = this;
    self.datas = datas;
    datas.forEach(function(item) {
      let l = {};
      if(LyricsParser.isLyrics(item.lrc)) {
        l.is = true;
        l.txt = LyricsParser.getTxt(item.lrc);
        l.data = LyricsParser.parse(item.lrc);
      }
      else {
        l.is = false;
        l.txt = item.lrc;
      }
      item.formatLyrics = l;
    });
    return this;
  }
  addMedia() {
    let audio = <audio src={ this.datas[0].FileUrl }
                       onTimeupdate={ this.onTimeupdate.bind(this) }
                       onLoadedmetadata={ this.onLoadedmetadata.bind(this) }
                       onPlaying={ this.onPlaying.bind(this) }
                       onPause={ this.onPause.bind(this) }
                       onProgress={ this.onProgress.bind(this) }
                       preload="meta">
      your browser does not support the audio tag
    </audio>;
    this.audio = audio;
    audio.appendTo(this.element);
  }
  switchTo(index) {
    this.index = index;
    if(!this.audio) {
      this.addMedia();
    }
    this.audio.element.src = this.datas[this.index].FileUrl;
    this.pause();
    this.emit('switchTo', this.datas[this.index]);
  }
  show() {
    $(this.element).removeClass('fn-hide');
    if(!this.audio) {
      this.addMedia();
    }
    $(this.ref.fn.element).removeClass('fn-hidden');
    return this;
  }
  hide() {
    $(this.element).addClass('fn-hide');
    return this;
  }
  onTimeupdate(e) {
    let currentTime = this.currentTime = e.target.currentTime;
    let item = this.datas[this.index];
    let formatLyrics = item.formatLyrics;
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
    this.audio.element.play();
    this.isPlaying = true;
    this.hasStart = true;
    return this;
  }
  pause() {
    this.audio && this.audio.element.pause();
    this.isPlaying = false;
    return this;
  }
  altLyrics() {
    this.showLyricsMode = !this.showLyricsMode;
  }
  clickStart(e) {
    this.play();
  }
  touchStart(e) {
    e.preventDefault();console.log(this.canControl, e.touches.length)
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
      this.audio.element.currentTime = this.currentTime = Math.floor(this.duration * percent);
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
      this.audio.element.currentTime = this.currentTime = currentTime;
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
      let data = self.datas[self.index];
      net.postJSON('/api/works/likeWork', { workID: data.ItemID }, function (res) {
        if(res.success) {
          data.ISLike = res.data === 211;
          self.fnLike = null;
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
    let data = self.datas[self.index];
    if($vd.hasClass('loading')) {
      //
    }
    else if($vd.hasClass('has')) {
      net.postJSON('/api/works/unFavorWork', { workID: data.ItemID }, function (res) {
        if(res.success) {
          data.ISFavor = false;
          self.fnFavor = null;
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
      net.postJSON('/api/works/favorWork', { workID: data.ItemID }, function (res) {
        if(res.success) {
          data.ISFavor = true;
          self.fnFavor = null;
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
    return <div class={ 'audio' + (this.props.show ? '' : ' fn-hide') }>
      <div class="c">
        <div class={ 'lyrics' + (this.hasStart ? '' : ' fn-hidden') } ref="lyrics">
          <div class={ 'roll' + (!this.showLyricsMode && this.datas[this.index].formatLyrics.data ? '' : ' fn-hide') }>
            <div class="c" ref="lyricsRoll" style={ '-webkit-transform:translateY(-' + this.lyricsIndex * 20 + 'px);transform:translateY(-' + this.lyricsIndex * 20 + 'px)' }>
              {
                (this.datas[this.index].formatLyrics.data || []).map(function(item) {
                  return <pre>{ item.txt || '&nbsp;' }</pre>
                })
              }
            </div>
          </div>
          <div class={ 'line' + (this.showLyricsMode && this.datas[this.index].formatLyrics.txt ? '' : ' fn-hide') }>
            <pre style={ '-webkit-transform:translateY(-' + this.lyricsIndex * 20 + 'px);transform:translateY(-' + this.lyricsIndex * 20 + 'px)' }>{ this.datas[this.index].formatLyrics.txt }</pre>
          </div>
        </div>
        <b class={ 'start' + (this.isPlaying ? ' fn-hide' : '') } onClick={ this.clickStart }/>
      </div>
      <div class="fn" ref="fn">
        <div class="control">
          <b class={ 'lyrics' + (this.showLyricsMode ? '' : ' roll') } onClick={ this.altLyrics }/>
          <small class="time">{ util.formatTime(this.currentTime * 1000) } / { util.formatTime(this.duration * 1000) }</small>
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
          <li class={ 'like' + (this.datas[this.index].ISLike || this.fnLike ? ' has' : '') } onClick={ this.clickLike }/>
          <li class={ 'favor' + (this.datas[this.index].ISFavor || this.fnFavor ? ' has' : '') } onClick={ this.clickFavor }/>
          <li class="download">
            <a href={ this.datas[this.index].FileUrl }
               download={ this.datas[this.index].ItemName + this.datas[this.index].FileUrl ? (/\.\w+$/.exec(this.datas[this.index].FileUrl)[0] || '') : '' }
               onClick={ this.clickDownload }/>
          </li>
          <li class="share" onClick={ this.clickShare }/>
        </ul>
      </div>
    </div>;
  }
}

export default Audio;
