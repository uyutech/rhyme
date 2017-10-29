/**
 * Created by army8735 on 2017/10/12.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * commentList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/tag/GetToPostMessage_List', {
        uid,
        PostID: body.postID,
        Skip: body.skip,
        Take: body.take,
        SortType: body.sortType,
        MyComment: body.myComment,
        CurrentCount: body.currentCount,
      });
      ctx.body = res.data;
    }
    * addComment(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/tag/AddComment', {
        uid,
        ParentID: body.parentID,
        RootID: body.rootID,
        Content: body.content,
        PostID: body.postID,
      });
      ctx.body = res.data;
    }
    * likeComment(ctx) {
      let uid = ctx.session.uid;
      const body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/tag/AddWorkCommentLike', {
        uid,
        CommentID: body.commentID,
      });
      ctx.body = res.data;
    }
    * delComment(ctx) {
      let uid = ctx.session.uid;
      const body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/tag/DeleteCommentByID', {
        uid,
        CommentID: body.commentID,
      });
      ctx.body = res.data;
    }
    * subCommentList(ctx) {
      let uid = ctx.session.uid;
      const body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/tag/GetTocomment_T_List', {
        uid,
        RootID: body.rootID,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
