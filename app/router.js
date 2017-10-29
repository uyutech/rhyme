'use strict';

module.exports = app => {
  app.get('/404.html', 'error.c404');
  app.get('/home/qr', 'error.qr');
  app.get('/oauth/weibo', 'oauth.weibo');
  app.get('/oauth/login', 'oauth.login');
  app.get('/oauth/rhymeWeibo', 'oauth.rhymeWeibo');
  app.get('/oauth/rhymeLogin', 'oauth.rhymeLogin');
  app.get('/rhymes', 'rhyme.index');
  app.get('/rhymes/rjrjs', 'rhyme.rjrjs');
  app.get('/rhymes/jrj', 'rhyme.jrj');
  app.get('/rhymes/shuomeng', 'rhyme.shuomeng');
  app.get('/rhymes/music/jrjbz', 'rhyme.jrjbz');

  app.get('/d', 'd.index.index');
  app.get('/d/find', 'd.find.index');
  app.get('/d/works/:worksID', 'd.works.index');
  app.get('/d/musicalbum/:collectionID', 'd.collection.index');
  app.get('/d/author/:authorID', 'd.author.index');
  // app.get('/d/search/:kw', 'd.search.index');
  app.get('/d/my', app.middlewares.needLogin(), 'd.my.index');
  app.get('/d/login', 'd.login.index');
  // app.get('/d/upload', 'd.upload.index');
  // app.get('/d/guide.index', 'd.guide.index');
  app.get('/d/post/:id', 'd.post.index');

  app.get('/m', 'm.index.index');
  app.get('/m/find', 'm.find.index');
  app.get('/m/works/:worksID', 'm.works.index');
  app.get('/m/author/:authorID', 'm.author.index');
  // app.get('/m/search/:kw', 'm.search.index');
  app.get('/m/my', app.middlewares.needLogin(), 'm.my.index');
  app.get('/m/login', 'm.login.index');
  app.get('/m/post/:id', 'm.post.index');

  app.post('/api/login/loginOut', 'api.login.loginOut');

  app.post('/api/find/hotWorkList', 'api.find.hotWorkList');
  app.post('/api/find/tagB', 'api.find.tagB');
  app.post('/api/find/playList', 'api.find.playList');

  app.post('/api/user/settle', app.middlewares.needLoginJson(), 'api.user.settle');
  app.post('/api/user/settleShadowName', app.middlewares.needLoginJson(), 'api.user.settleShadowName');
  app.post('/api/user/guideSuggest', app.middlewares.needLoginJson(), 'api.user.guideSuggest');
  app.post('/api/user/guideSave', app.middlewares.needLoginJson(), 'api.user.guideSave');
  // app.post('/api/user/updateNickName', app.middlewares.needLoginJson(), 'api.user.updateNickName');
  // app.post('/api/user/checkExistHead', app.middlewares.needLoginJson(), 'api.user.checkExistHead');
  // app.post('/api/user/uploadHead', app.middlewares.needLoginJson(), 'api.user.uploadHead');
  // app.post('/api/user/labelList', app.middlewares.needLoginJson(), 'api.user.labelList');
  // app.post('/api/user/addLabel', app.middlewares.needLoginJson(), 'api.user.addLabel');

  app.post('/api/works/detail', 'api.works.detail');
  app.post('/api/works/commentList', 'api.works.commentList');
  app.post('/api/works/likeWork', app.middlewares.needLoginJson(), 'api.works.likeWork');
  app.post('/api/works/favorWork', app.middlewares.needLoginJson(), 'api.works.favorWork');
  app.post('/api/works/unFavorWork', app.middlewares.needLoginJson(), 'api.works.unFavorWork');
  app.post('/api/works/addComment', app.middlewares.needLoginJson(), 'api.works.addComment');
  app.post('/api/works/likeComment', app.middlewares.needLoginJson(), 'api.works.likeComment');
  app.post('/api/works/subCommentList', 'api.works.subCommentList');
  app.post('/api/works/delComment', app.middlewares.needLoginJson(), 'api.works.delComment');
  app.post('/api/works/photoList', 'api.works.photoList');
  app.post('/api/works/addTempLink', app.middlewares.needLoginJson(), 'api.works.addTempLink');

  app.post('/api/author/tagB', 'api.author.tagB');
  app.post('/api/author/playList', 'api.author.playList');
  app.post('/api/author/commentList', 'api.author.commentList');
  app.post('/api/author/follow', app.middlewares.needLoginJson(), 'api.author.follow');
  app.post('/api/author/unFollow', app.middlewares.needLoginJson(), 'api.author.unFollow');
  app.post('/api/author/addComment', app.middlewares.needLoginJson(), 'api.author.addComment');
  app.post('/api/author/likeComment', app.middlewares.needLoginJson(), 'api.author.likeComment');
  app.post('/api/author/subCommentList', 'api.author.subCommentList');
  app.post('/api/author/delComment', app.middlewares.needLoginJson(), 'api.author.delComment');
  app.post('/api/author/singleComment', 'api.author.singleComment');
  app.post('/api/author/searchWorks', 'api.author.searchWorks');

  app.post('/api/post/commentList', 'api.post.commentList');
  app.post('/api/post/addComment', app.middlewares.needLoginJson(), 'api.post.addComment');
  app.post('/api/post/likeComment', app.middlewares.needLoginJson(), 'api.post.likeComment');
  app.post('/api/post/subCommentList', 'api.post.subCommentList');
  app.post('/api/post/delComment', app.middlewares.needLoginJson(), 'api.post.delComment');

  app.get('/h5/version', 'h5.version.index');
  app.post('/h5/version', 'h5.version.index');
};
