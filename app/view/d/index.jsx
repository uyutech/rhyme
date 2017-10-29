/**
 * Created by army8735 on 2017/10/6.
 */

'use strict';

import TopNav from '../../assets/d/component/topnav/TopNav.jsx';

export default function(data) {
  let userInfo = data.userInfo;
  let authorInfo = data.authorInfo;

  let topNav = migi.preRender(<TopNav userInfo={ userInfo } authorInfo={ authorInfo }/>);

  return `<!DOCTYPE html>
<html>
<head>
  ${data.helper.getDHead()}
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dcommon.css')}"/>
  <link rel="stylesheet" href="${data.helper.getAssetUrl('/dindex.css')}"/>
</head>
<body>
${topNav}
<script>
  ${data.helper.$CONFIG}
  $CONFIG.userInfo = ${JSON.stringify(userInfo)};
  $CONFIG.authorInfo = ${JSON.stringify(authorInfo)};
</script>
<script src="${data.helper.getAssetUrl('/dcommon.js')}"></script>
<script src="${data.helper.getAssetUrl('/dindex.js')}"></script>
${data.helper.getStat()}
</body>
</html>`;
};
