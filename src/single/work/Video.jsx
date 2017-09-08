/**
 * Created by army8735 on 2017/9/7.
 */

let de = document.documentElement;

class Video extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  setData(data) {
    let self = this;
    self.data = data;
    self.isLike = data[0].ISLike;
    self.isFavor = data[0].ISFavor;
    self.fileUrl = data[0].FileUrl;
    return this;
  }
  show() {
    $(this.element).removeClass('fn-hide');
    return this;
  }
  hide() {
    $(this.element).addClass('fn-hide');
    return this;
  }
  timeupdate(e) {
    let currentTime = e.target.currentTime;
    this.emit('timeupdate', currentTime);
  }
  loadedmetadata(e) {
    let duration = this.duration = e.target.duration;
    this.emit('loadedmetadata', {
      duration,
    });
  }
  playing(e) {
    let duration = this.duration = e.target.duration;
    this.emit('loadedmetadata', {
      duration,
    });
    this.emit('playing');
  }
  onpause() {
    this.emit('pause');
  }
  play() {
    this.ref.video.element.play();
    return this;
  }
  pause() {
    this.ref.video.element.pause();
    return this;
  }
  currentTime(t) {
    this.ref.video.element.currentTime = t;
    return this;
  }
  @bind fileUrl
  @bind isLike
  @bind isFavor
  @bind workIndex = 0
  @bind duration
  clear() {
    this.fileUrl = '';
    this.workIndex = 0;
    this.duration = 0;
    return this;
  }
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
  clickShare() {
    migi.eventBus.emit('share', location.href);
  }
  clickScreen() {
    let video = this.ref.video.element;
    if(de.requestFullscreen) {
      video.requestFullscreen();
    }
    else if(de.mozRequestFullscreen) {
      video.mozRequestFullscreen();
    }
    else if(de.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
    else if(de.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  }
  render() {
    return <div class="video fn-hide">
      <video ref="video"
             onTimeupdate={ this.timeupdate }
             onLoadedmetadata={ this.loadedmetadata }
             onPause={ this.onpause }
             onPlaying={ this.playing }
             preload="meta"
             playsinline="true"
             webkit-playsinline="true"
             src={ this.fileUrl }>
        your browser does not support the audio tag
      </video>
      <ul class="btn">
        <li class={ 'like' + (this.isLike ? ' has' : '') } onClick={ this.clickLike }/>
        <li class={ 'favor' + (this.isFavor ? ' has' : '') } onClick={ this.clickFavor }/>
        <li class="download"><a href={ this.fileUrl } download={ this.fileUrl }/></li>
        <li class="share" onClick={ this.clickShare }/>
        <li class="screen" onClick={ this.clickScreen }/>
      </ul>
    </div>;
  }
}

export default Video;
