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
/******/ 	return __webpack_require__(__webpack_require__.s = 121);
/******/ })
/************************************************************************/
/******/ ({

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(122);

var _Search = __webpack_require__(123);

var _Search2 = _interopRequireDefault(_Search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var search = migi.preExist(migi.createCp(_Search2.default, [["kw", $CONFIG.kw], ["datas", $CONFIG.datas]]));

/***/ }),

/***/ 122:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Can't resolve '../component/author/index.less' in '/Users/army8735/Sites/github/zhuanq/nodejs/app/assets/m/search'\n @ /Users/army8735/Sites/github/zhuanq/nodejs/app/assets/m/search/index.less (line 6, column 0)\n near lines:\n   @import '../common/var.less';\n   @import '../component/author/index.less';\n   \n    at runLoaders (/Users/army8735/Sites/github/zhuanq/nodejs/node_modules/_webpack@3.7.1@webpack/lib/NormalModule.js:195:19)\n    at /Users/army8735/Sites/github/zhuanq/nodejs/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:364:11\n    at /Users/army8735/Sites/github/zhuanq/nodejs/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:230:18\n    at context.callback (/Users/army8735/Sites/github/zhuanq/nodejs/node_modules/_loader-runner@2.3.0@loader-runner/lib/LoaderRunner.js:111:13)\n    at less.render (/Users/army8735/Sites/github/zhuanq/nodejs/node_modules/_less-loader@3.0.0@less-loader/lib/loader.js:55:13)\n    at /Users/army8735/Sites/github/zhuanq/nodejs/node_modules/_less@2.7.2@less/lib/less/render.js:26:35\n    at /Users/army8735/Sites/github/zhuanq/nodejs/node_modules/_less@2.7.2@less/lib/less/parse.js:62:33\n    at ImportVisitor.finish [as _finish] (/Users/army8735/Sites/github/zhuanq/nodejs/node_modules/_less@2.7.2@less/lib/less/parser/parser.js:180:28)\n    at ImportVisitor._onSequencerEmpty (/Users/army8735/Sites/github/zhuanq/nodejs/node_modules/_less@2.7.2@less/lib/less/visitors/import-visitor.js:35:14)\n    at ImportSequencer.tryRun (/Users/army8735/Sites/github/zhuanq/nodejs/node_modules/_less@2.7.2@less/lib/less/visitors/import-sequencer.js:50:14)");

/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _net = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../common/net\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _net2 = _interopRequireDefault(_net);

var _util = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../common/util\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _util2 = _interopRequireDefault(_util);

var _authorTemplate = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../component/author/authorTemplate\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _authorTemplate2 = _interopRequireDefault(_authorTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = function (_migi$Component) {
  _inherits(Search, _migi$Component);

  function Search() {
    var _ref;

    _classCallCheck(this, Search);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Search.__proto__ || Object.getPrototypeOf(Search)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    self.kw = self.props.kw;
    {
      var _data = self.props.datas.data;
      var list = [];
      _data.Author.forEach(function (item) {
        list.push({
          key: 'author',
          value: item
        });
      });
      _data.Audio.forEach(function (item) {
        list.push({
          key: 'audio',
          value: item
        });
      });
      if (list.length) {
        self.list = list;
        self.on(migi.Event.DOM, function () {
          self.autoWidth();
        });
      } else {
        self.message = '暂无搜索结果';
      }
    }
    return _this;
  }

  _createClass(Search, [{
    key: 'show',
    value: function show() {
      $(this.element).removeClass('fn-hide');
    }
  }, {
    key: 'hide',
    value: function hide() {
      $(this.element).addClass('fn-hide');
      this.list = [];
    }
  }, {
    key: 'load',
    value: function load(kw) {
      var self = this;
      self.kw = kw;
      _net2.default.postJSON('api/search/Homesearch', { Parameter: kw }, function (res) {
        if (res.success) {
          var data = res.data;
          var list = [];
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
          if (list.length) {
            self.list = list;
            self.autoWidth();
          } else {
            self.message = '暂无搜索结果';
          }
        }
      });
    }
  }, {
    key: 'autoWidth',
    value: function autoWidth() {
      $(this.element).find('li.author .list').each(function (i, o) {
        var $o = $(o);
        var $c = $o.find('.c');
        $c.css('width', '9999rem');
        var $ul = $c.find('ul');
        $c.css('width', $ul.width() + 1);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var self = this;
      return migi.createVd("div", [["class", "search"]], [migi.createVd("ul", [["class", new migi.Obj("list", this, function () {
        return this.list.length ? '' : 'fn-hide';
      })]], [new migi.Obj("list", this, function () {
        return this.list.map(function (item) {
          var key = item.key;
          var value = item.value;
          if (key === 'author') {
            var name = value.AuthorName || '';
            var i = name.indexOf(self.kw);
            if (i > -1) {
              name = migi.util.encodeHtml(name.slice(0, i)) + '<strong>' + name.slice(i, i + self.kw.length) + '</strong>' + migi.util.encodeHtml(name.slice(i + self.kw.length));
            } else {
              name = migi.util.encodeHtml(name);
            }
            var hash = {};
            value.Authortype.forEach(function (item) {
              var css = _authorTemplate2.default.code2Data[item.AuthorTypeID].css;
              hash[css] = true;
            });
            var authorType = Object.keys(hash);
            return migi.createVd("li", [["class", "author"]], [migi.createVd("a", [["href", '/author/' + value.AuthorID], ["class", "pic"]], [migi.createVd("img", [["src", value.Head_url || '//zhuanquan.xin/img/f59284bd66f39bcfc70ef62eee10e186.png']])]), migi.createVd("div", [["class", "info"]], [migi.createVd("a", [["href", '/author/' + value.AuthorID], ["class", "name"]], [migi.createVd("h4", [["dangerouslySetInnerHTML", name]]), authorType.map(function (item) {
              return migi.createVd("span", [["class", 'cp-author-type-' + item]]);
            })]), migi.createVd("p", [], ["粉丝：", value.FansNumber])])]);
          } else if (key === 'audio') {
            var _name = value.workName || '';
            var _i = _name.indexOf(self.kw);
            if (_i > -1) {
              _name = migi.util.encodeHtml(_name.slice(0, _i)) + '<strong>' + _name.slice(_i, _i + self.kw.length) + '</strong>' + migi.util.encodeHtml(_name.slice(_i + self.kw.length));
            } else {
              _name = migi.util.encodeHtml(_name);
            }
            return migi.createVd("li", [["class", "audio"]], [migi.createVd("a", [["href", '/works/' + value.workID], ["class", "pic"]], [migi.createVd("img", [["src", value.CoverPic || '//zhuanquan.xin/img/blank.png']])]), migi.createVd("div", [["class", "info"]], [migi.createVd("a", [["href", '/works/' + value.workID], ["class", "name"], ["dangerouslySetInnerHTML", _name]])])]);
          }
        });
      })]), migi.createVd("div", [["class", new migi.Obj("list", this, function () {
        return 'message' + (this.list.length ? ' fn-hide' : '');
      })]], [new migi.Obj("message", this, function () {
        return this.message;
      })])]);
    }
  }, {
    key: 'list',
    set: function set(v) {
      this.__setBind("list", v);this.__data("list");
    },
    get: function get() {
      if (this.__initBind("list")) this.__setBind("list", []);return this.__getBind("list");
    }
  }, {
    key: 'message',
    set: function set(v) {
      this.__setBind("message", v);this.__data("message");
    },
    get: function get() {
      return this.__getBind("message");
    }
  }, {
    key: 'kw',
    set: function set(v) {
      this.__setBind("kw", v);this.__data("kw");
    },
    get: function get() {
      return this.__getBind("kw");
    }
  }]);

  return Search;
}(migi.Component);

migi.name(Search, "Search");exports.default = Search;

/***/ })

/******/ });