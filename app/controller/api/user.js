/**
 * Created by army8735 on 2017/10/17.
 */

'use strict';

const OSS = require('ali-oss');
const Spark = require('spark-md5');

module.exports = app => {
  class Controller extends app.Controller {
    * updateNickName(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let length = (body.nickName || '').length;
      if(length < 4 || length > 8) {
        return ctx.body = {
          success: false,
          message: '昵称长度需要在4~8个字之间哦！',
        };
      }
      let res = yield ctx.helper.postServiceJSON('api/users/UpdateNickName', {
        uid,
        NickName: body.nickName,
      });
      ctx.body = res.data;
    }
    * checkExistHead(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let file = /^data:image\/(\w+);base64,(.*)$/.exec(body.img);
      let img = file[2];
      let suffix = file[1];
      let client = new OSS({
        region: 'oss-cn-shanghai',
        accessKeyId: 'LTAIbZSVA2e931EB',
        accessKeySecret: '5v756TGc1Gv3gkg4rhzoe0OYyLe8Xc',
        bucket: 'circling-assets',
      });
      let res = yield client.list('head/' + md5 + '.' + suffix, b);
      ctx.body = res;
    }
    * uploadHead(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let file = /^data:image\/(\w+);base64,(.*)$/.exec(body.img);
      let img = file[2];
      let suffix = file[1];

      // 超过100k
      let equalIndex =  img.indexOf('=');
      if(equalIndex > 0) {
        let temp = img.slice(0, equalIndex);
        let strLen = temp.length;
        let fileLen = Math.ceil(strLen - (strLen / 8) * 2);
        if(fileLen > 1024 * 100) {
          return ctx.body = {
            success: false,
            message: '图片体积太大啦，不能超过100k！',
          };
        }
      }

      // md5
      let spark = new Spark();
      spark.append(img);
      let md5 = spark.end();

      let name = 'head/' + md5 + '.' + suffix;
      let url = '//zhuanquan.xin/' + name;
      let b = new Buffer(img, 'base64');
      let client = new OSS({
        region: 'oss-cn-shanghai',
        accessKeyId: 'LTAIbZSVA2e931EB',
        accessKeySecret: '5v756TGc1Gv3gkg4rhzoe0OYyLe8Xc',
        bucket: 'circling-assets',
      });
      let check = yield client.list({
        prefix: name,
      });
      if(check.res && check.res.status === 200) {
        let objects = check.objects;
        if(!objects || objects.length) {
          let upload = yield client.put(name, b);
          if(upload.res && upload.res.status === 200) {
            let res = yield ctx.helper.postServiceJSON('api/users/UpdateHead_Url', {
              uid,
              Head_Url: url,
            });
            if(res.data && res.data.success) {
              return ctx.body = {
                success: true,
                url,
              };
            }
          }
        }
      }
      ctx.body = {
        success: false,
      };
    }
    * labelList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/GetLabelList', {
        uid,
        workid: body.worksID,
      });
      ctx.body = res.data;
    }
    * addLabel(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/UserAddWorkLabel', {
        uid,
        workid: body.worksID,
        labelID: body.labelID || '',
      });
      ctx.body = res.data;
    }
    * settle(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      // 不入驻，设置状态为10走普通用户流程
      if(body.settle === 'false') {
        let res = yield ctx.helper.postServiceJSON('api/users/SaveUser_Reg_Stat', {
          uid,
          User_Reg_Stat: 10,
        });
        return ctx.body = res.data;
      }
      // 入驻，设置状态为1，走设置马甲昵称流程
      else if(body.settle === 'true') {
        let res = yield ctx.helper.postServiceJSON('api/users/SaveAuthorSettled', {
          uid,
          AuthorID: body.authorID,
          SettledType: 0,
        });
        if(res.data.success) {
          let res2 = yield ctx.helper.postServiceJSON('api/users/SaveUser_Reg_Stat', {
            uid,
            User_Reg_Stat: 1,
          });
          return ctx.body = res2.data;
        }
      }
      ctx.body = {
        success: false,
      };
    }
    * settleShadowName(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let length = (body.nickName || '').length;
      if(length < 4 || length > 8) {
        return ctx.body = {
          success: false,
          message: '昵称长度需要在4~8个字之间哦！',
        };
      }
      let scan = yield ctx.service.green.textScan(body.nickName);
      if(scan.data.code === 200 && scan.data.data[0].code === 200) {
        let suggestion = scan.data.data[0].results[0].suggestion;
        if(suggestion !== 'pass') {
          return ctx.body = {
            success: false,
            message: '昵称中可能含有违规信息，请尝试换一个哦~',
          };
        }
        let res = yield ctx.helper.postServiceJSON('api/users/UpdateNickName', {
          uid,
          NickName: body.nickName,
        });
        if(res.data.success) {
          let res2 = yield ctx.helper.postServiceJSON('api/users/SaveUser_Reg_Stat', {
            uid,
            User_Reg_Stat: 10,
          });
          return ctx.body = res2.data;
        }
      }
      ctx.body = {
        success: false,
      };
    }
    * guideSuggest(ctx) {
      let uid = ctx.session.uid;
      let res = yield {
        tags: ctx.helper.postServiceJSON('api/users/GetTag', {
          uid,
          Skip: 0,
          Take: 99,
        }),
        authors: ctx.helper.postServiceJSON('api/users/GetAuthor', {
          uid,
          Skip: 0,
          Take: 10,
        }),
      };
      ctx.body = {
        success: true,
        data: {
          tags: res.tags.data.data || {},
          authors: res.authors.data.data || {},
        },
      };
    }
    * guideSave(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let tags = body.tags || [];
      let authors = body.authors || [];
      // 关注接口降级
      if(tags.length) {
        yield ctx.helper.postServiceJSON('api/users/SaveTagToUser', {
          uid,
          TaglID: tags.join(',')
        });
      }
      if(authors.length) {
        yield ctx.helper.postServiceJSON('api/users/SaveAuthorToUser', {
          uid,
          AuthorID: authors.join(',')
        });
      }
      let res = yield ctx.helper.postServiceJSON('api/users/SaveUser_Reg_Stat', {
        uid,
        User_Reg_Stat: body.isAuthor ? 100 : 99,
      });
      return ctx.body = res.data;
    }
  }
  return Controller;
};
