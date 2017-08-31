/**
 * Created by army8735 on 2017/8/25.
 */

let pause = false;

class TopNav extends migi.Component {
  constructor(...data) {
    super(...data);
    this.on(migi.Event.DOM, function() {
      let music = this.ref.music.element;
      let i = 0;
      function play() {
        if(!pause) {
          if(++i >= 50) {
            i = 0;
          }
          music.className = 'music music' + i;
        }
      }
      setInterval(play, 40);
    });
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  @bind name
  clickLogo() {
    this.emit('clickLogo');
  }
  clickMusic(e, vd) {
    pause = !pause;
    if(pause) {
      this.ref.music.element.className = 'music';
    }
    this.emit('music', !pause);
  }
  stop() {
    pause = true;
  }
  play() {
    pause = false;
  }
  render() {
    return <div class="top-nav fn-hide">
      <div class="ti">
        <b class="bg"/>
        <b class="border"/>
        <span onClick={ this.clickLogo }>{ this.name || '首页' }</span>
      </div>
      <b ref="music" class="music" onClick={ this.clickMusic }/>
    </div>;
  }
}

export default TopNav;
