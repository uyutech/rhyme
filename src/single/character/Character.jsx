/**
 * Created by army8735 on 2017/8/26.
 */

class Character extends migi.Component{
  constructor(...data) {
    super(...data);
  }
  @bind name;
  user(name) {
    this.name = name;
  }
  render() {
    return <div class={ 'main character ' + this.name }>
      <div class="con">
        <div class="img"/>
        <ul class="btn fn-clear">
          <li><a href="#"><span>关注</span></a></li>
          <li><a href="#" class="comment"><span>留言</span></a></li>
        </ul>
      </div>
    </div>;
  }
}

export default Character;
