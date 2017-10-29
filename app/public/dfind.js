/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 148);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by army on 2017/5/20.
 */

var util = {
  goto: function goto(url) {
    location.href = url;
  },
  autoSsl: function autoSsl(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return (url || '').replace(/^https?:\/\//i, '//');
  },
  img: function img(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url.replace(/\.(\w+)-\d+_\d*/, '.$1') : url;
  },
  img192_192: function img192_192(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-192_192' : url;
  },
  img144_: function img144_(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-144_' : url;
  },
  img144_144: function img144_144(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-144_144' : url;
  },
  img100_100: function img100_100(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-100_100' : url;
  },
  img90_90: function img90_90(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-90_90' : url;
  },
  img__60: function img__60(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-__60' : url;
  },
  formatTime: function formatTime(time) {
    if (!time) {
      return '00:00';
    }
    var res = '';
    if (time >= 1000 * 60 * 60) {
      var hour = Math.floor(time / (1000 * 60 * 60));
      time -= 1000 * 60 * 60 * hour;
      res += hour + ':';
    }
    if (time >= 1000 * 60) {
      var minute = Math.floor(time / (1000 * 60));
      time -= 1000 * 60 * minute;
      if (minute < 10) {
        minute = '0' + minute;
      }
      res += minute + ':';
    } else {
      res += '00:';
    }
    var second = Math.floor(time / 1000);
    if (second < 10) {
      second = '0' + second;
    }
    res += second;
    return res;
  },
  formatDate: function formatDate(time) {
    time = new Date(time);
    var now = Date.now();
    var diff = now - time;
    if (diff >= 1000 * 60 * 60 * 24 * 365) {
      return Math.floor(diff / (1000 * 60 * 60 * 24 * 365)) + '年前';
    }
    if (diff >= 1000 * 60 * 60 * 24 * 30) {
      return Math.floor(diff / (1000 * 60 * 60 * 24 * 30)) + '月前';
    }
    if (diff >= 1000 * 60 * 60 * 24) {
      return Math.floor(diff / (1000 * 60 * 60 * 24)) + '天前';
    }
    if (diff >= 1000 * 60 * 60) {
      return Math.floor(diff / (1000 * 60 * 60)) + '小时前';
    }
    if (diff >= 1000 * 60) {
      return Math.floor(diff / (1000 * 60)) + '分钟前';
    }
    return '刚刚';
  },
  ERROR_MESSAGE: '人气大爆发，请稍后再试。'
};

exports.default = util;

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by army8735 on 2017/10/6.
 */



Object.defineProperty(exports, "__esModule", {
  value: true
});
var net = {
  ajax: function ajax(url, data, _success, _error, type) {
    var csrfToken = $.cookie('csrfToken');
    Object.keys(data).forEach(function (k) {
      if (data[k] === undefined || data[k] === null) {
        delete data[k];
      }
    });
    if (url.indexOf('?') === -1) {
      url += '?_=' + Date.now();
    } else {
      url += '&_=' + Date.now();
    }
    function load() {
      return $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        crossDomain: true,
        timeout: 6000,
        type: type || 'get',
        headers: {
          'x-csrf-token': csrfToken
        },
        // ajax 跨域设置必须加上
        beforeSend: function beforeSend(xhr) {
          xhr.withCredentials = true;
        },
        success: function success(data, state, xhr) {
          _success(data, state, xhr);
        },
        error: function error(data) {
          if (!_error.__hasExec) {
            _error.__hasExec = true;
            _error(data || {});
          }
        }
      });
    }
    return load();
  },
  getJSON: function getJSON(url, data, success, error) {
    if (typeof data === 'function') {
      error = success;
      success = data;
      data = {};
    }
    error = error || function () {};
    return net.ajax(url, data, success, error);
  },
  postJSON: function postJSON(url, data, success, error) {
    if (typeof data === 'function') {
      error = success;
      success = data;
      data = {};
    }
    success = success || function () {};
    error = error || function () {};
    return net.ajax(url, data, success, error, 'post');
  }
};

exports.default = net;

/***/ }),

/***/ 148:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(149);

var _Find = __webpack_require__(150);

var _Find2 = _interopRequireDefault(_Find);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var find = migi.preExist(migi.createCp(_Find2.default, [["hotWorkList", $CONFIG.hotWorkList], ["hotAuthorList", $CONFIG.hotAuthorList], ["hotMusicAlbumList", $CONFIG.hotMusicAlbumList], ["hotPhotoAlbumList", $CONFIG.hotPhotoAlbumList]]));

/***/ }),

/***/ 149:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _net = __webpack_require__(1);

var _net2 = _interopRequireDefault(_net);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _Banner = __webpack_require__(151);

var _Banner2 = _interopRequireDefault(_Banner);

var _HotWork = __webpack_require__(63);

var _HotWork2 = _interopRequireDefault(_HotWork);

var _HotPhotoAlbum = __webpack_require__(152);

var _HotPhotoAlbum2 = _interopRequireDefault(_HotPhotoAlbum);

var _HotAuthor = __webpack_require__(64);

var _HotAuthor2 = _interopRequireDefault(_HotAuthor);

var _HotMusicAlbum = __webpack_require__(65);

var _HotMusicAlbum2 = _interopRequireDefault(_HotMusicAlbum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import DoubleCheck from '../component/doublecheck/DoubleCheck.jsx';
// import PlayList from '../component/playlist/PlayList.jsx';

var ajax = void 0;
var SortType = '1';
var Parameter = '';
var ajaxL2 = void 0;

var Find = function (_migi$Component) {
  _inherits(Find, _migi$Component);

  function Find() {
    var _ref;

    _classCallCheck(this, Find);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Find.__proto__ || Object.getPrototypeOf(Find)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    self.on(migi.Event.DOM, function () {
      // let doubleCheck = self.ref.doubleCheck;
      // doubleCheck.on('changeL1', function(param) {
      //   if(param) {
      //     if(ajaxL2) {
      //       ajaxL2.abort();
      //     }
      //     doubleCheck.isLoadindL2 = true;
      //     net.postJSON('api/find/GetAuthorFilterlevelB', { FilterlevelA: param }, function (res) {
      //       if(res.success) {
      //         let data = res.data;
      //         doubleCheck.tagList2 = data;
      //         // doubleCheck.autoWidth2();
      //         doubleCheck.setCacheL2(param, data);
      //         doubleCheck.checkL2();
      //       }
      //       doubleCheck.isLoadindL2 = false;
      //     }, function() {
      //       doubleCheck.isLoadindL2 = false;
      //     });
      //   }
      // });
      // doubleCheck.on('change', function(lA, lB) {
      //   let temp = lA.concat(lB);
      //   temp = temp.length ? JSON.stringify(temp) : '';
      //   if(temp !== Parameter) {
      //     Parameter = temp;
      //     self.loadPlayList();
      //   }
      // });
      // let hotWork = self.ref.hotWork;
      // hotWork.on('change', function() {
      //   net.postJSON('/api/find/hotWorkList', function(res) {
      //     if(res.success) {
      //       let data = res.data;
      //       hotWork.dataList = data;
      //     }
      //   });
      // });
    });
    return _this;
  }
  // loadPlayList() {
  //   let self = this;
  //   if(ajax) {
  //     ajax.abort();
  //   }
  //   ajax = net.postJSON('/api/find/playList', { Parameter, Skip: 0, Take: 10, SortType }, function(res) {
  //     if(res.success) {
  //       let data = res.data;
  //       self.ref.playList.dataList = data.playList;
  //       self.ref.playList.dataList2 = data.playList2;
  //     }
  //     else {
  //       alert(res.message || util.ERROR_MESSAGE);
  //     }
  //   }, function(res) {
  //     alert(res.message || util.ERROR_MESSAGE);
  //   });
  // }


  _createClass(Find, [{
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "find"]], [migi.createCp(_Banner2.default, []), migi.createVd("div", [["class", "hot"]], [migi.createCp(_HotWork2.default, [["ref", "hotWork"], ["title", "推荐作品"], ["dataList", this.props.hotWorkList]]), migi.createCp(_HotMusicAlbum2.default, [["ref", "hotMusicAlbum"], ["title", "推荐专辑"], ["dataList", this.props.hotMusicAlbumList]]), migi.createCp(_HotAuthor2.default, [["ref", "hotAuthor"], ["title", "推荐作者"], ["dataList", this.props.hotAuthorList]]), migi.createCp(_HotPhotoAlbum2.default, [["ref", "hotPhotoAlbum"], ["title", "推荐相册"], ["dataList", this.props.hotPhotoAlbumList]])])]);
    }
  }]);

  return Find;
}(migi.Component);

migi.name(Find, "Find");exports.default = Find;

/***/ }),

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var interval = void 0;

var Banner = function (_migi$Component) {
  _inherits(Banner, _migi$Component);

  function Banner() {
    var _ref;

    _classCallCheck(this, Banner);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Banner.__proto__ || Object.getPrototypeOf(Banner)).call.apply(_ref, [this].concat(data)));

    _this.on(migi.Event.DOM, function () {
      this.addInterval();
    });
    return _this;
  }

  _createClass(Banner, [{
    key: "clickTag",
    value: function clickTag(e, vd, tvd) {
      this.index = tvd.props.rel;
      this.setOffset(Math.floor(this.index * 1000));
      this.addInterval();
    }
  }, {
    key: "setOffset",
    value: function setOffset(x) {
      var $list = $(this.ref.list.element);
      $list.css('-moz-transform', 'translateX(-' + x + 'px)');
      $list.css('-webkit-transform', 'translateX(-' + x + 'px)');
      $list.css('transform', 'translateX(-' + x + 'px)');
    }
  }, {
    key: "addInterval",
    value: function addInterval() {
      if (interval) {
        clearInterval(interval);
      }
      var self = this;
      interval = setInterval(function () {
        self.index++;
        if (self.index >= 3) {
          self.index = 0;
        }
        self.setOffset(self.index * 1000);
      }, 5000);
    }
  }, {
    key: "render",
    value: function render() {
      var datas = [{
        url: '/works/2015000000000001',
        pic: '//zhuanquan.xin/pic/e34cc1fb3102e63b507293f6e5a20515.jpg'
      }, {
        url: '/works/2015000000000002',
        pic: '//zhuanquan.xin/pic/b1284084f38e8cac0c35eddd60948af1.jpg'
      }, {
        url: 'http://weibo.com/6284548625/FrrsUbDyo',
        pic: '//zhuanquan.xin/pic/7dc30aca98d4975fd6c3a5b23d1abf8d.jpg'
      }];
      return migi.createVd("div", [["class", "banner"]], [migi.createVd("ul", [["class", "list fn-clear"], ["ref", "list"]], [datas.map(function (item) {
        return migi.createVd("li", [], [migi.createVd("a", [["href", item.url], ["target", "_blank"]], [migi.createVd("img", [["src", item.pic]])])]);
      })]), migi.createVd("ul", [["class", "tags"], ["ref", "tags"], ["onClick", new migi.Cb(this, this.clickTag)]], [new migi.Obj("index", this, function () {
        return (this.index, datas).map(function (item, index) {
          return migi.createVd("li", [["class", index === this.index ? 'cur' : ''], ["rel", index]], [index + 1]);
        }.bind(this));
      })])]);
    }
  }, {
    key: "index",
    set: function set(v) {
      this.__setBind("index", v);this.__data("index");
    },
    get: function get() {
      if (this.__initBind("index")) this.__setBind("index", 0);return this.__getBind("index");
    }
  }]);

  return Banner;
}(migi.Component);

migi.name(Banner, "Banner");exports.default = Banner;

/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HotPhotoAlbum = function (_migi$Component) {
  _inherits(HotPhotoAlbum, _migi$Component);

  function HotPhotoAlbum() {
    var _ref;

    _classCallCheck(this, HotPhotoAlbum);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = HotPhotoAlbum.__proto__ || Object.getPrototypeOf(HotPhotoAlbum)).call.apply(_ref, [this].concat(data)));

    _this.dataList = _this.props.dataList;
    return _this;
  }

  _createClass(HotPhotoAlbum, [{
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "cp-hotphotoalbum"]], [migi.createVd("h4", [], [this.props.title, migi.createVd("small", [], ["我们会邀请更多作者入驻！也诚邀你在转圈发布作品、交流创作>3&lt;"])]), new migi.Obj("dataList", this, function () {
        return this.dataList && this.dataList.length ? migi.createVd("ul", [["class", "list fn-clear"]], [this.dataList.map(function (item) {
          return migi.createVd("li", [], [migi.createVd("b", [["class", "bg"]]), migi.createVd("a", [["href", "/works/" + item.WorksID], ["class", "pic"]], [migi.createVd("img", [["src", item.cover_Pic || '//zhuanquan.xin/img/blank.png']])]), migi.createVd("a", [["href", "#"], ["class", "txt"]], [item.Title])]);
        })]) : migi.createVd("div", [["class", "empty"]], ["暂无数据"]);
      })]);
    }
  }, {
    key: "dataList",
    set: function set(v) {
      this.__setBind("dataList", v);this.__data("dataList");
    },
    get: function get() {
      return this.__getBind("dataList");
    }
  }]);

  return HotPhotoAlbum;
}(migi.Component);

migi.name(HotPhotoAlbum, "HotPhotoAlbum");exports.default = HotPhotoAlbum;

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var TYPE = {
  111: '演唱',
  112: '和声',
  113: '伴唱',
  114: '戏腔',
  121: '作曲',
  122: '编曲',
  123: '和声编写',
  131: '混音',
  132: '母带',
  133: '录音',
  134: '修音',
  135: '剧情混音',
  141: '乐器实录',
  151: '配音',
  211: '视频',
  212: '合成',
  213: '压制',
  311: '立绘',
  312: 'CG',
  313: '场景',
  314: 'logo设计',
  315: '线稿',
  316: '上色',
  317: '手绘',
  321: '3D建模',
  322: '打光',
  323: '动画',
  324: '骨骼绑定',
  331: '设计',
  332: '海报',
  333: 'logo',
  334: '分镜',
  341: '漫画',
  411: '作词',
  421: '文案',
  422: '剧本',
  423: '小说'
};

var CODE = {
  '演唱': 111
};

exports.default = {
  TYPE: TYPE,
  CODE: CODE
};

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _AuthorType = __webpack_require__(30);

var _AuthorType2 = _interopRequireDefault(_AuthorType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HotWork = function (_migi$Component) {
  _inherits(HotWork, _migi$Component);

  function HotWork() {
    var _ref;

    _classCallCheck(this, HotWork);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = HotWork.__proto__ || Object.getPrototypeOf(HotWork)).call.apply(_ref, [this].concat(data)));

    _this.dataList = _this.props.dataList || [];
    return _this;
  }

  _createClass(HotWork, [{
    key: 'clickPrev',
    value: function clickPrev(e) {
      e.preventDefault();
    }
  }, {
    key: 'clickNext',
    value: function clickNext(e) {
      e.preventDefault();
    }
  }, {
    key: 'clickChange',
    value: function clickChange(e) {
      e.preventDefault();
      this.emit('change');
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "cp-hotwork"]], [migi.createVd("h4", [], [this.props.title, migi.createVd("small", [], ["未来会根据你的口味进行精准智能的推送！>3&lt;"])]), new migi.Obj("dataList", this, function () {
        return this.dataList && this.dataList.length ? migi.createVd("ul", [["class", "list fn-clear"]], [this.dataList.map(function (item) {
          return migi.createVd("li", [], [migi.createVd("a", [["href", '/works/' + item.WorksID], ["class", "pic"]], [migi.createVd("img", [["src", _util2.default.autoSsl(_util2.default.img144_144(item.cover_Pic)) || '//zhuanquan.xin/img/blank.png']])]), migi.createVd("a", [["href", '/works/' + item.WorksID], ["class", "txt"]], [item.Title])]);
        })]) : migi.createVd("div", [["class", "empty"]]);
      })]);
    }
  }, {
    key: 'dataList',
    set: function set(v) {
      this.__setBind("dataList", v);this.__data("dataList");
    },
    get: function get() {
      if (this.__initBind("dataList")) this.__setBind("dataList", []);return this.__getBind("dataList");
    }
  }]);

  return HotWork;
}(migi.Component);

migi.name(HotWork, "HotWork");exports.default = HotWork;

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HotAuthor = function (_migi$Component) {
  _inherits(HotAuthor, _migi$Component);

  function HotAuthor() {
    var _ref;

    _classCallCheck(this, HotAuthor);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = HotAuthor.__proto__ || Object.getPrototypeOf(HotAuthor)).call.apply(_ref, [this].concat(data)));

    _this.dataList = _this.props.dataList;
    return _this;
  }

  _createClass(HotAuthor, [{
    key: "clickPrev",
    value: function clickPrev(e) {
      e.preventDefault();
    }
  }, {
    key: "clickNext",
    value: function clickNext(e) {
      e.preventDefault();
    }
  }, {
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "cp-hotauthor"]], [migi.createVd("h4", [], [this.props.title, migi.createVd("small", [], ["我们会邀请更多作者入驻！也诚邀你在转圈发布作品、交流创作>3&lt;"])]), new migi.Obj("dataList", this, function () {
        return this.dataList && this.dataList.length ? migi.createVd("ul", [["class", "list fn-clear"]], [this.dataList.map(function (item) {
          var types = item.WorksType || [];
          return migi.createVd("li", [["authorID", item.AuthorID]], [migi.createVd("a", [["href", "/author/" + item.AuthorID], ["class", "pic"]], [migi.createVd("img", [["src", _util2.default.autoSsl(_util2.default.img144_144(item.Head_url)) || '//zhuanquan.xin/img/f59284bd66f39bcfc70ef62eee10e186.png']]), types.slice(0, 2).map(function (item) {
            return migi.createVd("b", [["class", "cp-author_type" + item]]);
          })]), migi.createVd("a", [["href", "/author/" + item.AuthorID], ["class", "txt"]], [item.AuthorName]), migi.createVd("div", [["class", "info"]], ["合作", item.CooperationTimes, "次"])]);
        })]) : migi.createVd("div", [["class", "empty"]]);
      })]);
    }
  }, {
    key: "dataList",
    set: function set(v) {
      this.__setBind("dataList", v);this.__data("dataList");
    },
    get: function get() {
      return this.__getBind("dataList");
    }
  }]);

  return HotAuthor;
}(migi.Component);

migi.name(HotAuthor, "HotAuthor");exports.default = HotAuthor;

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HotMusicAlbum = function (_migi$Component) {
  _inherits(HotMusicAlbum, _migi$Component);

  function HotMusicAlbum() {
    var _ref;

    _classCallCheck(this, HotMusicAlbum);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = HotMusicAlbum.__proto__ || Object.getPrototypeOf(HotMusicAlbum)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    if (self.props.dataList) {
      self.dataList = self.props.dataList;
    }
    return _this;
  }

  _createClass(HotMusicAlbum, [{
    key: 'clickPrev',
    value: function clickPrev(e) {
      e.preventDefault();
    }
  }, {
    key: 'clickNext',
    value: function clickNext(e) {
      e.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "cp-hotmusicalbum"]], [migi.createVd("h4", [], [this.props.title, migi.createVd("small", [], ["我们会邀请更多作者入驻！也诚邀你在转圈发布作品、交流创作>3&lt;"])]), new migi.Obj("dataList", this, function () {
        return this.dataList && this.dataList.length ? migi.createVd("ul", [["class", "list fn-clear"]], [this.dataList.map(function (item) {
          return migi.createVd("li", [], [migi.createVd("b", [["class", "bg"]]), migi.createVd("a", [["href", '/works/' + item.WorksID], ["class", "pic"]], [migi.createVd("img", [["src", _util2.default.autoSsl(_util2.default.img144_144(item.cover_Pic)) || '//zhuanquan.xin/img/blank.png']])]), migi.createVd("a", [["href", '/works/' + item.WorksID], ["class", "txt"]], [item.Title])]);
        })]) : migi.createVd("div", [["class", "empty"]]);
      })]);
    }
  }, {
    key: 'dataList',
    set: function set(v) {
      this.__setBind("dataList", v);this.__data("dataList");
    },
    get: function get() {
      if (this.__initBind("dataList")) this.__setBind("dataList", []);return this.__getBind("dataList");
    }
  }]);

  return HotMusicAlbum;
}(migi.Component);

migi.name(HotMusicAlbum, "HotMusicAlbum");exports.default = HotMusicAlbum;

/***/ })

/******/ });