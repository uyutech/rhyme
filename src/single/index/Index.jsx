/**
 * Created by army8735 on 2017/8/26.
 */

class Index extends migi.Component{
  constructor(...data) {
    super(...data);
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  render() {
    return <div class="main index">
      <div class="logo"/>
    </div>;
  }
}

export default Index;
