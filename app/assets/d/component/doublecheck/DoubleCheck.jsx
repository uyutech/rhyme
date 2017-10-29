/**
 * Created by army8735 on 2017/9/19.
 */

import authorTemplate from '../author/authorTemplate';

let choosedL2 = {};
let all;
let cacheL2 = {};

class DoubleCheck extends migi.Component {
  constructor(...data) {
    super(...data);
    this.tagList = this.props.tags.FilterlevelA;
    this.tagList2 = this.props.tags.FilterlevelB;
    all = this.tagList2;
    this.on(migi.Event.DOM, function() {
      // this.autoWidth();
      // this.autoWidth2();
    });
  }
  get tagList() {
    return this._tagList || [];
  }
  @bind
  set tagList(v) {
    this._tagList = v;
  }
  get tagList2() {
    return this._tagList2 || [];
  }
  @bind
  set tagList2(v) {
    this._tagList2 = v;
  }
  @bind isLoadindL2
  setData(v) {
    this.tagList = v.FilterlevelA;
    // this.autoWidth();
    this.tagList2 = v.FilterlevelB;
    // this.autoWidth2();
    all = this.tagList2;
  }
  setCacheL2(k, v) {
    cacheL2[k] = v;
  }
  clickL1(e, vd, tvd) {
    e.preventDefault();
    let $ul = $(vd.element);
    let $li = $(tvd.element);
    $li.toggleClass('on');
    let $allLis = $ul.find('li');
    let $lis = $ul.find('.on');
    // 只有1个和都没选为全部
    if($allLis.length === 1 || !$lis[0]) {
      this.tagList2 = all;
    }
    else {
      let param = [];
      $lis.each(function(index, li) {
        let $li = $(li);
        param.push({
          Filterlevel: $li.attr('tagName')
        });
      });
      param = JSON.stringify(param);
      if(cacheL2[param]) {
        this.checkL2();
        this.tagList2 = cacheL2[param];
        this.change();
      }
      else {
        this.emit('changeL1', param);
      }
    }
  }
  clickL2(e, vd, tvd) {
    e.preventDefault();
    if($(vd.element).hasClass('loading')) {
      return;
    }
    let $li = $(tvd.element);
    $li.toggleClass('on');
    let name = $li.text();
    choosedL2[name] = $li.hasClass('on');
    this.change();
  }
  checkL2() {
    // 遍历l2标签，chossed中没有的删除
    let hash = {};
    $(this.ref.l2.element).find('li.on').each(function(i, li) {
      let $li = $(li);
      hash[$li.text()] = true;
    });
    Object.keys(choosedL2).forEach(function(key) {
      if(!hash[key]) {
        choosedL2[key] = false;
      }
    });
  }
  change() {
    let self = this;
    let $lis = $(self.ref.l1.element).find('li.on');
    let lA = [];
    $lis.each(function(i, li) {
      let index = $(li).attr('rel');
      let item = self.tagList[index];
      lA.push({
        ID: item.ID,
        TagType: 0,
        Filterlevel: 'A',
        ParameterName: item.TagName,
      });
    });
    let lB = [];
    this.tagList2.forEach(function(item) {
      let key = item.TagName;
      if(choosedL2[key]) {
        lB.push({
          ID: item.ID,
          TagType: item.TagType,
          Filterlevel: item.Filterlevel,
          ParameterName: item.TagName,
        });
      }
    });
    this.emit('change', lA, lB);
  }
  autoWidth() {
    let $li = $(this.ref.l1.element);
    let $c = $li.find('.c');
    $c.css('width', '999rem');
    let $ul = $c.find('ul');
    $c.css('width', $ul.width() + 1);
  }
  autoWidth2() {
    let $li = $(this.ref.l2.element);
    let $c = $li.find('.c');
    $c.css('width', '999rem');
    let $ul = $c.find('ul');
    $c.css('width', $ul.width() + 1);
  }
  render() {
    return <div class="cp-doublecheck">
      <div class="l1" ref="l1" onClick={ { li: this.clickL1 } }>
        <div class="c">
          <ul class="fn-clear">
            {
              this.tagList.map(function(item, i) {
                let type = authorTemplate.code2Data[item.TagName];
                return <li class={ this.tagList.length === 1 ? 'on' : '' } rel={ i } tagType={ item.TagType } tagID={ item.ID } tagName={ item.TagName }><span>{ type ? type.name : item.TagName }</span></li>;
              }.bind(this))
            }
          </ul>
        </div>
      </div>
      <div class={ 'l2' + (this.isLoadindL2 ? ' loading' : '') } ref="l2" onClick={ { li: this.clickL2 } }>
        <div class="c">
          <ul class="fn-clear">
            {
              this.tagList2.map(function(item, i) {
                let key = 'id' + item.ID + ',type' + item.TagType;
                return <li rel={ i } tagType={ item.TagType } tagID={ item.ID } class={ choosedL2[key] ? 'on' : '' }><span>{ item.TagName }</span></li>;
              })
            }
          </ul>
        </div>
      </div>
    </div>;
  }
}

export default DoubleCheck;
