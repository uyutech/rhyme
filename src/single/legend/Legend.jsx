/**
 * Created by army8735 on 2017/8/26.
 */

class Legend extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  click(e, vd, tvd) {
    e.preventDefault();
    let li = tvd.parent;
    this.emit('choose', li.props.rel, li.props.cname);
  }
  render() {
    return <div class="main legend">
      <ul class="fn-clear" onClick={ { a: this.click } }>
        <li class="immortals" rel="muhan" cname="慕寒">
          <a href="#" class="c">
          </a>
          <a href="#" class="h">
            <span class="muhan"/>
          </a>
        </li>
        <li class="spirits" rel="hetu" cname="河图">
          <a href="#" class="c">
          </a>
          <a href="#" class="h">
            <span class="hetu"/>
          </a>
        </li>
        <li class="ethereals" rel="sixia" cname="司夏">
          <a href="#" class="c">
          </a>
          <a href="#" class="h">
            <span class="sixia"/>
          </a>
        </li>
        <li class="mutants" rel="mi" cname="弥">
          <a href="#" class="c">
          </a>
          <a href="#" class="h">
            <span class="mi"/>
          </a>
        </li>
      </ul>
    </div>;
  }
}

export default Legend;
