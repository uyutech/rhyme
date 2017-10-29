(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 57);
/******/ })
/************************************************************************/
/******/ ({

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  var userInfo = data.userInfo;
  var authorInfo = data.authorInfo;

  var topNav = migi.preRender(migi.createCp(_TopNav2.default, [["userInfo", userInfo], ["authorInfo", authorInfo]]));

  return '<!DOCTYPE html>\n<html>\n<head>\n  ' + data.helper.getDHead() + '\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/dcommon.css') + '"/>\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/dindex.css') + '"/>\n</head>\n<body>\n' + topNav + '\n<script>\n  ' + data.helper.$CONFIG + '\n  $CONFIG.userInfo = ' + JSON.stringify(userInfo) + ';\n  $CONFIG.authorInfo = ' + JSON.stringify(authorInfo) + ';\n</script>\n<script src="' + data.helper.getAssetUrl('/dcommon.js') + '"></script>\n<script src="' + data.helper.getAssetUrl('/dindex.js') + '"></script>\n' + data.helper.getStat() + '\n</body>\n</html>';
};

var _TopNav = __webpack_require__(58);

var _TopNav2 = _interopRequireDefault(_TopNav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TopNav = function (_migi$Component) {
  _inherits(TopNav, _migi$Component);

  function TopNav() {
    var _ref;

    _classCallCheck(this, TopNav);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = TopNav.__proto__ || Object.getPrototypeOf(TopNav)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(TopNav, [{
    key: 'setMarginRight',
    value: function setMarginRight(right) {
      $(this.element).css('margin-right', right);
    }
  }, {
    key: 'submit',
    value: function submit(e) {
      e.preventDefault();
      var v = this.ref.input.element.value.trim();
      if (v) {
        this.emit('search', v);
      }
    }
  }, {
    key: 'click',
    value: function click(e) {
      if (!window.$CONFIG.isLogin) {
        e.preventDefault();
        migi.eventBus.emit('NEED_LOGIN');
      } else {
        location.hash = '/my';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var userInfo = this.props.userInfo || {};
      return migi.createVd("div", [["class", "cp-topnav"]], [migi.createVd("div", [["class", "c"]], [migi.createVd("a", [["class", "logo"], ["href", "#/"]], ["转圈还在测试中，感谢您的关注和包涵！我们会努力做得更好！"]),,,, /*<form class="search" onSubmit={ this.submit }>*/
      /*<input type="text" ref="input" maxlength="16" placeholder="弱弱的初级搜索功能QAQ"/>*/
      /*</form>*/
      migi.createVd("div", [["class", "user"], ["onClick", new migi.Cb(this, this.click)]], [migi.createVd("span", [], [userInfo.NickName || '登陆/注册']), migi.createVd("img", [["src", userInfo.Head_Url || '//zhuanquan.xin/head/35e21cf59874d33e48c1bee7678d4d95.png']])])])]);
    }
  }]);

  return TopNav;
}(migi.Component);

migi.name(TopNav, "TopNav");exports.default = TopNav;

/***/ })

/******/ })));