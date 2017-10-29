/**
 * Created by army8735 on 2017/10/1.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let hotWorkList = [];
      let hotAuthorList = [];
      let hotMusicAlbumList = [];
      let hotPhotoAlbumList = [];
      let tags = {};
      let playList = [];
      let res = yield {
        hotWorkList: ctx.curl(ctx.helper.getRemoteUrl('api/find/Hot_works_List'), {
          method: 'POST',
          dataType: 'json',
          gzip: true,
        }),
        hotAuthorList: ctx.curl(ctx.helper.getRemoteUrl('api/find/Hot_Author_List'), {
          method: 'POST',
          dataType: 'json',
          gzip: true,
        }),
        hotPhotoAlbumList: ctx.helper.postServiceJSON('api/find/Hot_PHOTO_List', {
          Skip: 0,
          Take: 10,
        }),
        hotMusicAlbumList: ctx.helper.postServiceJSON('api/find/Hot_album_List', {
          Skip: 0,
          Take: 10,
        }),
        // tags: ctx.curl(ctx.helper.getRemoteUrl('api/find/GetTag'), {
        //   method: 'POST',
        //   dataType: 'json',
        //   gzip: true,
        // }),
        // playList: ctx.curl(ctx.helper.getRemoteUrl('api/find/GetFindWorkList'), {
        //   method: 'POST',
        //   data: {
        //     Parameter: '',
        //     Skip: 0,
        //     Take: 10,
        //     SortType: 1,
        //   },
        //   dataType: 'json',
        //   gzip: true,
        // }),
      };
      if(res.hotWorkList.data.success) {
        hotWorkList = res.hotWorkList.data.data;
      }
      if(res.hotAuthorList.data.success) {
        hotAuthorList = res.hotAuthorList.data.data;
      }
      if(res.hotMusicAlbumList.data.success) {
        hotMusicAlbumList = res.hotMusicAlbumList.data.data;
      }
      if(res.hotPhotoAlbumList.data.success) {
        hotPhotoAlbumList = res.hotPhotoAlbumList.data.data;
      }
      // if(res.tags.data.success) {
      //   tags = res.tags.data.data;
      // }
      // if(res.playList.data.success) {
      //   playList = res.playList.data.data;
      // }
      // tags.FilterlevelA = [{
      //   ID: 0,
      //   TagName: '音乐',
      //   TagType: 0,
      //   TagCount: 3957,
      //   Filterlevel: "A",
      // }];

      yield ctx.render('mfind', {
        hotWorkList,
        hotAuthorList,
        hotMusicAlbumList,
        hotPhotoAlbumList,
        tags,
        playList,
      });
    }
  }
  return Controller;
};
