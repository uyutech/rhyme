/**
 * Created by army8735 on 2017/8/27.
 */

class Rhyme extends migi.Component {
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
    e.preventDefault();
  }
  render() {
    return <div class="main rhyme">
      <div class="c">
        <a href="#work2757" class="rjrjs"/>
        <a href="#work2758" onClick={ this.click } class="jrj"/>
      </div>
    </div>;
  }
}

export default Rhyme;
