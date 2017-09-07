/**
 * Created by army8735 on 2017/9/7.
 */

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
  render() {
    return <div class="video">
      <video ref="video"
             onTimeupdate={ this.timeupdate }
             onLoadedmetadata={ this.loadedmetadata }
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
        <li class="barrage"/>
      </ul>
    </div>;
  }
}

export default Video;
