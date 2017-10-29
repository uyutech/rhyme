/**
 * Created by army on 2017/6/16.
 */

import Profile from './Profile.jsx';
import Link from './Link.jsx';

class Nav extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div class="nav fn-clear">
      <div class="bg"/>
      <Profile ref="profile" authorID={ this.props.authorID } authorDetail={ this.props.authorDetail } uid={ this.props.uid }/>
      <Link ref="link" authorDetail={ this.props.authorDetail }/>
    </div>;
  }
}

export default Nav;
