/**
 * Created by army8735 on 2017/9/22.
 */

import authorTemplate from '../component/author/authorTemplate';

class Search extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.kw = self.props.kw;
    {
      let data = self.props.datas.data;
      let list = [];
      data.Author.forEach(function (item) {
        list.push({
          key: 'author',
          value: item
        });
      });
      data.Audio.forEach(function (item) {
        list.push({
          key: 'audio',
          value: item
        });
      });
      if(list.length) {
        self.list = list;
        self.on(migi.Event.DOM, function () {
          self.autoWidth();
        });
      }
      else {
        self.message = '暂无搜索结果';
      }
    }
  }
  @bind list = []
  @bind message
  @bind kw
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
    this.list = [];
  }
  load(kw) {
    let self = this;
    self.kw = kw;
    util.postJSON('api/search/Homesearch', { Parameter: kw }, function(res) {
      if(res.success) {
        let data = res.data;
        let list = [];
        data.Author.forEach(function(item) {
          list.push({
            key: 'author',
            value: item
          });
        });
        data.Audio.forEach(function(item) {
          list.push({
            key: 'audio',
            value: item
          });
        });
        if(list.length) {
          self.list = list;
          self.autoWidth();
        }
        else {
          self.message = '暂无搜索结果';
        }
      }
    });
  }
  autoWidth() {
    $(this.element).find('li.author .list').each(function(i, o) {
      let $o = $(o);
      let $c = $o.find('.c');
      $c.css('width', '9999rem');
      let $ul = $c.find('ul');
      $c.css('width', $ul.width() + 1);
    });
  }
  render() {
    let self = this;
    return <div class="search">
      <ul class={ this.list.length ? '' : 'fn-hide' }>
        {
          this.list.map(function(item) {
            let key = item.key;
            let value = item.value;
            if(key === 'author') {
              let name = value.AuthorName || '';
              let i = name.indexOf(self.kw);
              if(i > -1) {
                name = migi.util.encodeHtml(name.slice(0, i))
                  + '<strong>' + name.slice(i, i + self.kw.length) + '</strong>'
                  + migi.util.encodeHtml(name.slice(i + self.kw.length));
              }
              else {
                name = migi.util.encodeHtml(name);
              }
              let hash = {};
              value.Authortype.forEach(function(item) {
                let css = authorTemplate.code2Data[item.AuthorTypeID].css;
                hash[css] = true;
              });
              let authorType = Object.keys(hash);
              return <li class="author fn-clear">
                <a href={ `/author/${value.AuthorID}` } class="pic" >
                  <img src={ value.Head_url || '//zhuanquan.xin/img/f59284bd66f39bcfc70ef62eee10e186.png' }/>
                </a>
                <div class="info">
                  <a href={ `/author/${value.AuthorID}` } class="name">
                    <h4 dangerouslySetInnerHTML={ name }/>
                    {
                      authorType.map(function(item) {
                        return <span class={ `cp-author-type-${item}` }/>;
                      })
                    }
                  </a>
                  <p>粉丝：{ value.FansNumber }</p>
                </div>
              </li>;
            }
            else if(key === 'audio') {
              let name = value.workName || '';
              let i = name.indexOf(self.kw);
              if(i > -1) {
                name = migi.util.encodeHtml(name.slice(0, i))
                  + '<strong>' + name.slice(i, i + self.kw.length) + '</strong>'
                  + migi.util.encodeHtml(name.slice(i + self.kw.length));
              }
              else {
                name = migi.util.encodeHtml(name);
              }
              return <li class="audio fn-clear">
                <a href={ `/works/${value.workID}` } class="pic" >
                  <img src={ value.CoverPic || '//zhuanquan.xin/img/blank.png' }/>
                </a>
                <div class="info">
                  <a href={ `/works/${value.workID}` } class="name" dangerouslySetInnerHTML={ name }/>
                </div>
              </li>;
            }
          })
        }
      </ul>
      <div class={ 'message' + (this.list.length ? ' fn-hide' : '') }>{ this.message }</div>
    </div>;
  }
}

export default Search;
