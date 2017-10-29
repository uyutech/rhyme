/**
 * Created by army8735 on 2017/9/21.
 */

import util from '../common/util';
import WorksTypeEnum from './WorksTypeEnum';

class Title extends migi.Component {
  constructor(...data) {
    super(...data);
    this.title = this.props.detail.Title;
    this.subTitle = this.props.detail.sub_Title;
    this.type = this.props.detail.WorkType;
    this.popular = this.props.detail.Popular;
    this.tags = this.props.detail.ReturnTagData;
  }
  @bind title
  @bind subTitle
  @bind type
  @bind tags
  @bind popular
  clickAdd() {
    if(!$CONFIG.isLogin) {
      migi.eventBus.emit('NEED_LOGIN');
      return;
    }
    migi.eventBus.emit('add-label');
  }
  render() {
    let hasCover = this.props.detail.cover_Pic;
    return <div class={ 'mod mod-title' + (hasCover ? '' : ' no-cover') }>
      {
        hasCover
          ? <div class="pic">
              <img src={ util.autoSsl(util.img100_100(this.props.detail.cover_Pic)) }/>
            </div>
          : ''
      }
      <div class="txt">
        <h3>{ WorksTypeEnum.NAME[this.type] }</h3>
        <h1>{ this.title }</h1>
        <h2 class={ this.subTitle ? '' : 'fn-hide' }>{ this.subTitle }</h2>
        {/*<small class="pop">{ this.popular }</small>*/}
        <ul class={ 'tags fn-clear' }>
          {
            (this.tags || []).map(function(item) {
              return <li rel={ item.ID }>{ item.Tag_Name }</li>;
            })
          }
          {
            // this.type === 1 ? <li class="add" onClick={ this.clickAdd }/> : ''
          }
        </ul>
      </div>
    </div>;
  }
}

export default Title;
