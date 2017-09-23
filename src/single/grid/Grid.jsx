/**
 * Created by army8735 on 2017/9/23.
 */

class Grid extends migi.Component {
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
    return <div class="main grid">
      <div class="con">
        <ul class="fn-clear">
          <li>
            <a href="#work2015000000000001">
              <img src="http://zhuanquan.xyz/rhymesland/src/single/grid/1.jpg"/>
              <span>《皎然记》</span>
            </a>
          </li>
          <li>
            <a href="#work2015000000000002">
              <img src="http://zhuanquan.xyz/rhymesland/src/single/grid/2.jpg"/>
              <span>《说梦》</span>
            </a>
          </li>
        </ul>
      </div>
    </div>;
  }
}

export default Grid;
