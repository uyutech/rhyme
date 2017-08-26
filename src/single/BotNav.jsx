/**
 * Created by army8735 on 2017/8/25.
 */

class BotNav extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  click(e, vd, tvd) {
    e.preventDefault();
    let li = tvd.parent;
    let $li = $(li.element);
    if(!$li.hasClass('cur')) {
      $(vd.element).find('.cur').removeClass('cur');
      $li.addClass('cur');
      this.emit('change', li.props.class);
    }
  }
  clear() {
    $(this.element).find('.cur').removeClass('cur');
  }
  render() {
    return <div class="bot-nav">
      <ul class="fn-clear" onClick={ { a: this.click } }>
        <li class="geography"><a href="#" title="世界地理">世界地理</a></li>
        <li class="history"><a href="#" title="历史故事">历史故事</a></li>
        <li class="logo"/>
        <li class="legend"><a href="#" title="异闻传记">异闻传记</a></li>
        <li class="rhyme"><a href="#" title="浮世歌谣">浮世歌谣</a></li>
        <li class="about"><a href="#" title="关于异世">关于异世</a></li>
      </ul>
      <div class="logo"/>
    </div>;
  }
}

export default BotNav;