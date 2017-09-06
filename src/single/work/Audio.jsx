/**
 * Created by army on 2017/6/11.
 */

import LyricsParser from './LyricsParser.jsx';

let lyricsIndex = -1;
let lyricsHeight = [];
let $lyricsRoll;

class Audio extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  setData(data) {
    let self = this;
    self.data = data;
    self.isLike = data[0].ISLike;
    self.isFavor = data[0].ISFavor;
    self.fileUrl = data[0].FileUrl;
    data.forEach(function(item) {
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
    self.rollLyrics = data[0].formatLyrics.data;
    let count = 0;
    $lyricsRoll = $(self.ref.lyricsRoll.element);
    $lyricsRoll.find('pre').each(function(i, o) {
      let $o = $(o);
      lyricsHeight.push(count);
      count += $o.height();
    });
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  timeupdate(e) {
    let currentTime = e.target.currentTime;
    // console.log(currentTime);
    let item = this.data[this.workIndex];
    let formatLyrics = item.formatLyrics;
    let formatLyricsData = formatLyrics.data;
    if(formatLyrics.is && formatLyricsData.length) {
      let tempIndex = lyricsIndex;
      for (let i = 0, len = formatLyricsData.length; i < len; i++) {
        if(currentTime * 1000 >= formatLyricsData[i].timestamp) {
          tempIndex = i;
        }
        else {
          break;
        }
      }
      if(tempIndex !== lyricsIndex) {
        // console.log(lyricsIndex, tempIndex);
        lyricsIndex = tempIndex;
        this.lineLyrics = formatLyricsData[lyricsIndex].txt;
        $lyricsRoll.find('.cur').removeClass('cur');
        $lyricsRoll.find('pre').eq(lyricsIndex).addClass('cur');
        $lyricsRoll.css('-webkit-transform', `translate3d(0,${-lyricsHeight[lyricsIndex]}px,0)`);
        $lyricsRoll.css('transform', `translate3d(0,${-lyricsHeight[lyricsIndex]}px,0)`);
      }
      // let start = 0;
      // if(lyricsIndex > 0) {
      //   start = lyricsHeight[lyricsIndex];
      // }
      // let end = lyricsHeight[lyricsIndex + 1] || start;
      // let percent;
      // if(lyricsIndex && formatLyricsData[lyricsIndex + 1]) {
      //   percent = (currentTime * 1000 - formatLyricsData[lyricsIndex].timestamp)
      //     / (formatLyricsData[lyricsIndex + 1].timestamp - formatLyricsData[lyricsIndex].timestamp);
      // }
      // else if(formatLyricsData[lyricsIndex + 1]) {
      //   percent = currentTime * 1000 / formatLyricsData[lyricsIndex + 1].timestamp;
      // }
      // let top = start + (end - start) * percent;
      // // console.log(lyricsIndex, percent, start, end, top);
      // $lyricsRoll.css('-webkit-transform', `translate3d(0,${-top}px,0)`);
      // $lyricsRoll.css('transform', `translate3d(0,${-top}px,0)`);
    }
    this.emit('timeupdate', currentTime);
  }
  loadedmetadata(e) {
    let duration = e.target.duration;
    this.emit('loadedmetadata', {
      duration,
    });
  }
  playing(e) {
    let duration = e.target.duration;
    this.emit('loadedmetadata', {
      duration,
    });
  }
  play() {
    this.ref.audio.element.play();
  }
  pause() {
    this.ref.audio.element.pause();
  }
  currentTime(t) {
    this.ref.audio.element.currentTime = t;
  }
  @bind fileUrl
  @bind isLike
  @bind isFavor
  @bind workIndex = 0
  @bind hasLyrics
  @bind lineLyrics
  @bind rollLyrics = []
  @bind showLyricsMode
  clickLike(e, vd) {
    let self = this;
    let $vd = $(vd.element);
    if(!$vd.hasClass('loading')) {
      $vd.addClass('loading');
      util.postJSON('works/AddLikeBehavior', {WorkItemsID: self.data[self.workIndex].ItemID}, function (res) {
        if(res.success) {
          self.isLike = res.data === 211;
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
    let self = this;
    let $vd = $(vd.element);
    if($vd.hasClass('loading')) {
      //
    }
    else if($vd.hasClass('has')) {
      util.postJSON('works/RemoveCollection', { WorkItemsID: self.data[self.workIndex].ItemID }, function (res) {
        if(res.success) {
          self.isFavor = false;
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
      util.postJSON('works/AddCollection', { WorkItemsID: self.data[self.workIndex].ItemID }, function (res) {
        if(res.success) {
          self.isFavor = true;
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
  altLyrics() {
    this.showLyricsMode = !this.showLyricsMode;
  }
  render() {
    return <div class="audio">
      <audio ref="audio"
        onTimeupdate={ this.timeupdate }
        onLoadedmetadata={ this.loadedmetadata }
        onPlaying={ this.playing }
        preload="meta"
        src={ this.fileUrl }>
        your browser does not support the audio tag
      </audio>
      <ul class="btn">
        <li class={ 'like' + (this.isLike ? ' has' : '') } onClick={ this.clickLike }/>
        <li class={ 'favor' + (this.isFavor ? ' has' : '') } onClick={ this.clickFavor }/>
        <li class="download"><a href={ this.fileUrl } download={ this.fileUrl }/></li>
        <li class="share"/>
        <li class="barrage"/>
      </ul>
      <div class="lyrics-con">
        <div class={ 'lyrics-roll' + (!this.showLyricsMode ? '' : ' fn-hide') }>
          <div class="c" ref="lyricsRoll">
            {
              (this.rollLyrics || []).map(function(item) {
                return <pre>{ item.txt || '&nbsp;' }</pre>
              })
            }
          </div>
        </div>
        <pre class={ 'lyrics-line' + (this.showLyricsMode ? '' : ' fn-hide') }>{ this.lineLyrics }</pre>
        <span class={ 'lyrics' + (this.showLyricsMode ? '' : ' alt') } onClick={ this.altLyrics }/>
      </div>
    </div>;
  }
}

export default Audio;
