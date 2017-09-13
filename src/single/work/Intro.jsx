/**
 * Created by army on 2017/6/10.
 */
 
class Intro extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  @bind tags = []
  render() {
    return <div class="intro">
      <div class="tag">
        <ul class="fn-clear">
          {
            (this.tags || []).map(function(item) {
              return <li><a href={ `#${item.Tag_ID}` }>{ item.Tag_Name }</a></li>;
            })
          }
        </ul>
      </div>
      <div class="inspiration" ref="inspiration">
        <p>出品：<a href="http://weibo.com/u/6276065571" target="_blank">结梦原创音乐团队</a></p>
        <p>演唱：<a href="http://weibo.com/740120222" target="_blank">慕寒</a>&nbsp;
          <a href="http://weibo.com/arielmelody" target="_blank">司夏</a>&nbsp;
          <a href="http://weibo.com/u/1750157883" target="_blank">河图</a>&nbsp;
          <a href="http://weibo.com/ichigolily" target="_blank">Midaho</a></p>
        <p>作曲：<a href="http://weibo.com/u/2423021884" target="_blank">月千宸</a>&nbsp;
        编曲：<a href="http://weibo.com/litterzy" target="_blank">Litterzy</a>&nbsp;
        作词：<a href="http://weibo.com/tingyugelouyinyueshe" target="_blank">沈行之</a></p>
        <p>笛萧：<a href="http://weibo.com/ellen0411" target="_blank">水玥儿</a>&nbsp;
        古筝：<a href="http://weibo.com/u/2616755905" target="_blank">墨韵随步摇</a>&nbsp;
        琵琶：<a href="http://weibo.com/zycq" target="_blank">乍雨初晴</a>&nbsp;
        电吉他：<a href="http://weibo.com/litterzy" target="_blank">Litterzy</a></p>
        <p>修音：<a href="http://weibo.com/yaolaoso" target="_blank">幺唠</a>&nbsp;
        混音：<a href="http://weibo.com/princesscuttlefish" target="_blank">CuTTleFish</a>&nbsp;
        <a href="http://weibo.com/u/3222735190" target="_blank">少年E</a></p>
        <p>PV：<a href="http://weibo.com/moirajia" target="_blank">冰镇甜豆浆</a></p>
        <p>立绘：<a href="http://weibo.com/yukiart" target="_blank">木美人</a>&nbsp;
        场景：<a href="http://weibo.com/u/5190275328" target="_blank">_LEOX</a>&nbsp;
        CG：<a href="http://weibo.com/muweiervv" target="_blank">VV丶SAMA</a></p>
        <p>海报：<a href="http://weibo.com/seoyutsuki" target="_blank">青凌</a>&nbsp;
        美术设计：<a href="http://weibo.com/520snc" target="_blank">念慈</a></p>
        <pre>

文案：当面纱揭开，当光芒闪现，从异世到现世，从我到你，这是一场命中注定的相遇，故事由此而生。

慕寒：世间浮生苦岁暮 日月化我梦浮生
闻长歌 飒沓穿林过 忽现蜃楼沧海
司夏：我歌水天接一色 万象枯荣弹指间
天地为宴 河酒海窖 恰是此时开

河图：杯酒赐人间 笑众生 不曾识蓬莱
余下入我袖 披素晖 邀友天际来
midaho：鬓边沾云色 畅快饮罢 月华满杯盏
此日却烦忧 酩酊一醉 天地也快哉

合：快哉意 快哉意 流光照彻乾坤来
浩然气 浩然气 乘风破浪天地开
此时生 彼时灭 川消山长有时衰
点心火 燃尽人间色 不夜星天外

midaho：是何人谓我 如蜉蝣 未敢越东岱
司夏：笑我沧海中 似一粟 无力排云开
河图：怎知他不过 小卒尔尔 恰入我梦来
慕寒：漏夜一照面 寥寥慰我 孤身在高台

慕寒河图：且行乐 且行乐 万千风物入我怀
司夏Midaho:花堪折 花堪折 簪花对镜知己拜
合：北闻笑 南传哭 我自逍遥身自在
君可知 风月争相来 人间我梦裁

河图：快哉意 快哉意 流光照彻乾坤来
慕寒：浩然气 浩然气 乘风破浪天地开
合：此时生 彼时灭 川消山长有时衰
点心火 燃尽人间色 不夜星天外

且行乐 且行乐 万千风物入我怀
花堪折 花堪折 簪花对镜知己拜
北闻笑 南传哭 我自逍遥身自在
君可知 风月争相来 人间我梦裁

司夏：却不知 人间梦我 我梦人间裁</pre>
      </div>
    </div>;
  }
}

export default Intro;
