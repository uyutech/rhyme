/**
 * Created by army8735 on 2017/8/26.
 */

class Loading extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  click(e) {
    if(window.IS_LOGIN === 'True') {
      e.preventDefault();
      this.emit('fin');
    }
  }
  render() {
    return <div class="main loading">
      <div class="con">
        <div class="start-line"/>
        <div class="end-line"/>
        <a href={ window.LOGIN_URL || '#' } class="enter" onClick={ this.click }/>
      </div>
    </div>;
  }
}

export default Loading;
