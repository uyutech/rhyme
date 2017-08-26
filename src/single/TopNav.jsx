/**
 * Created by army8735 on 2017/8/25.
 */

class TopNav extends migi.Component {
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
    return <div class="top-nav fn-hide">
      <div class="ti">
        <b class="bg"/>
        <b class="border"/>
        <span>首页</span>
      </div>
    </div>;
  }
}

export default TopNav;
