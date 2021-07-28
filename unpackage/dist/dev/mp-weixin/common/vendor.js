(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"digitWallet_icbc","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueId = this.$options.propsData.vueId;
    var object = center[vueId] = center[vueId] || {};
    object[name] = value;
    if (parents[vueId]) {
      parents[vueId].$forceUpdate();
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"digitWallet_icbc","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"digitWallet_icbc","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"digitWallet_icbc","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"digitWallet_icbc","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!***********************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/pages.json ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 11 */
/*!******************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/common/service.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _baseService = _interopRequireDefault(__webpack_require__(/*! ./baseService.js */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var

Service = /*#__PURE__*/function (_BaseService) {_inherits(Service, _BaseService);var _super = _createSuper(Service);function Service() {_classCallCheck(this, Service);return _super.apply(this, arguments);}return Service;}(_baseService.default);_defineProperty(Service, "getWallet",
function (token, data) {
  var url = 'digitalWallet/getUserInfo';

  return Service.get(url, token, data);
});_defineProperty(Service, "getCardIdentification",

function (token, cardId, data) {
  var url = 'card/openCard?cardId=' + cardId;
  console.log(url);

  return Service.post(url, token, data);
});var _default =


Service;exports.default = _default;

/***/ }),
/* 12 */
/*!**********************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/common/baseService.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var baseUrl = 'http://10.2.1.157:8888/';var

BaseService = /*#__PURE__*/function () {function BaseService() {_classCallCheck(this, BaseService);}_createClass(BaseService, null, [{ key: "post", value: function post(
    url, token) {var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request({
        method: 'post',
        url: url,
        token: token },
      data);
    } }, { key: "get", value: function get(

    url, token) {var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request({
        method: 'get',
        url: url,
        token: token },
      data);
    } }]);return BaseService;}();_defineProperty(BaseService, "request",

function (opts) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise(function (resolve, reject) {
    console.log('request');
    // console.log(opts)
    // console.log(opts.token)

    uni.request({
      method: opts.method,
      url: baseUrl + opts.url,
      dataType: 'json',
      data: data,
      header: {
        token: opts.token } }).

    then(function (response) {
      setTimeout(function () {
        uni.hideLoading();
      }, 200);
      console.log('response:', response);var _response = _slicedToArray(
      response, 2),error = _response[0],res = _response[1];
      resolve(res.data.data);

    }).catch(function (error) {
      console.log('err:' + err);
      uni.showToast({
        title: '请求出错',
        duration: 2000 });var _error = _slicedToArray(

      error, 2),err = _error[0],res = _error[1];
      reject(err);
    });
  });
});var _default =


BaseService;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/*!*************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static/2.png ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJwAAACcCAMAAAC9ZjJ/AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABFUExURUxpcdgmMNgnMNgmMOI1PN0rNfo9Q9cmMNcmMNwpM9gmMNgmMNgmMdgnMdgmMNgmMNknMdcmMNknMdcmMNcmMNkoMtcmMKwT/1wAAAAWdFJOUwCJfagKFQTu+iTUYG5TnbRI3zrIvjLYrHUIAAACNUlEQVR42u3YCW7jMAwFUNra5UVeef+jTlF4GahpEkeEBxj8dwBCzpcoMQQAAAAAAAAAAAAAAAAAAAD/hyk5pwIJC8qN5VU7z1/cSqIG9111oiLG8bdIkuy4VdVUouVNRxmRqgOV6HmTSFDkTS2zOG9IzMq7ViYArkhMzzKxGs8bZ0hIOGtaKqJ4V5OQXiyNgXc+kIiJD8UVR94tJEFHwYINH1oSUPFhkOjmZ7Cioc5Ekj/dIhkqD1TORpZrdooPSfp4cSu24XyQa0wiD4CWsxCEF+eHst0r3dNr/ptvZOpwQ1Kntfybbc+7MwOBd3pOabrMJM75iQpNnn8ap4+GhpwLIk0u5ytLF+gsUqGm3vEv4kBva0b+xSTVNTkLeHmz8hCzMPnUSrW4as33TRroFdsteZRaSTW7lnc9URg5M9aGngiV44yyZBPvOpn3frJEZCL/EKuVHrFTPfMmu7T0LDSXVHsYT46dU3UXLB1s6Grl+JTHaKLQJVF7Zu41bRrHj/kxLkmptMTR82PuSFGr7SIsZbou0CnM/KFk6BSawZA82zr+gGvoFqbnq3xl6C5r8nxJR3cK9cgXKLpXdylWQ7da+DWXdbi7BH7BpXY1njejpRvVvGvWtlKz44OPqmrW7OEw0Y0Sb5ymbzqYL1prW/AnphD13gA6Z4u7OdZAzzT/JFbj3prc7SwyLnw2UCVNz+wv1BjoXqZOfUMv6Vap1hIAAAAAAAAAAAAAAAAAAAAAAMATfwA6Qnz2j1fKdAAAAABJRU5ErkJggg=="

/***/ }),
/* 20 */
/*!*****************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/common/config.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var bankCode = {
  '102': 'icbc',
  '103': 'abc',
  '104': 'boc',
  '105': 'ccb' };var


Config = /*#__PURE__*/function () {function Config() {_classCallCheck(this, Config);}_createClass(Config, null, [{ key: "getToken", value: function getToken()
    {
      return 'eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJS8nR2ctYNDXYNUtJRSq0oULIyNDMyNzE1NjUz1VEqLU4t8kwBqjIwMDIEYUtjAwMLIFCCyPkl5qYCZZ8u2QFEz_ctebJj9_NZLc-mbni6dvrLSRuf9rQq1QIAurJLSmkAAAA.TEulzdgq5gCQe3N1WFg7ra7ZRXc2Bx-wM68NgHoL5fySrp7vxbAKPGMVQUTufzlqIKRuDYEvCMSpjE6lYByxcQ';
    } }, { key: "getMAXMoney", value: function getMAXMoney()

    {
      return 99999999.99;
    } }, { key: "getBankCode", value: function getBankCode()

    {
      return bankCode;
    } }]);return Config;}();var _default =


Config;exports.default = _default;

/***/ }),
/* 21 */
/*!*************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static/1.png ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJwAAACcCAMAAAC9ZjJ/AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABRUExURUxpcdcmMNcmMOAuPN0qNtcmMNcmMPNCStknMNgmMNknMdgmMNcmMNkpM9gnMdkoMtgmMNgmMdgmMNopNNcmMNgmMNgmMNknMNknMNcmMNcmMHnHJNQAAAAadFJOUwDn+AwV8PwETrI+id4zYyu9bJggynnVRVmjleh9mAAAAsxJREFUeNrt2sm2oyAQBmDFCUFBjaKp93/QXvQimGO1MYjX0/f/1sYUU8mUAAAAAAAAAAAAAAAAAAD8CtmjVbOUs2ptntxGZRddu4I8oukGo7KfDqyd6oIY5ahl9mORyaGgHaIzeXK9dh0Zr+xkdW2lLSMdkOoLq086OqiYLup980hfSPsLGrft6EuNiRxe9qQAzkattoa2pN0wmUXOrbWtmhfT69oJ2iD6JJpJ0LtmWNpsc0A/5DSW9K6ONG7zjtZE3dudnyxDSmvpHGWQprSSTp9VguxoTUfIbYJ84/L50LODIN+QnGwpydMcbJv8Sb5nFS+2Uh9/+dxEi874sY32qwyp/XfU50XXk2fg3vuQZjLykXBUESM6SZ6JiUw7+stpLj7b+C2bnMJ6JRbLdputxqMYMmZcjOtShsu98or5s69a0zIdr/OGlUzC1fSyXW9K0DuhmOicl8XzJJShF803+7vCMn3Te7hOAu2/rHK0xTHDUXkZpT+vUV3G5Jlt/X5eKvKzskjJNFRK21K2vCflk6rZnUwo4iiupwjvmXM+DSmTuzRxdMKYXs90ARXnNZlkG4lTs691Z1Rd/8E/jcQZE47yqu52wdmSD+76ZuULpO42IIzXqndLJXnhPXO3JPz0kvDdPl+L//m62Ye/FUz8oVOmKXzK5E9d63MnmzJ0slmNoZNNvqyFCpumV95gKOfTFzgyZIGTdUwfCSBLr7zm0NKQX3w9oyyqp+TLRfWjibPkN2X4/p9ZL/hjbeQU5ot82V21zUTd42jHEExsMTYPxWCTj2V9Q74h/rZrrT7Mk7qgFX3JhvU4tbu/WZ6C2bCOv9WfDjL7x2HsyGz1X3dIknZDPz/y6tXH8tbo2pX8Icn1x0uiaJxrUkEsZ3/lwVz4keavPwz+6hgdFxBud3WDV6m9Sy+4LnTsohUAAAAAAAAAAAAAAAAAwP/uD3Cb+H/91Wi6AAAAAElFTkSuQmCC"

/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 31);

/***/ }),
/* 31 */
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 32);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 32 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 33 */
/*!**********************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/common/NFCidentify.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuePropertyDecorator = __webpack_require__(/*! vue-property-decorator */ 34);
var _service = _interopRequireDefault(__webpack_require__(/*! @/common/service.js */ 11));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

// 字节转字符串
var byteToString = function byteToString(arr) {
  if (typeof arr == 'string') {
    return arr;
  }

  var str = '',
  _arr = arr;

  for (var i = 0; i < _arr.length; i++) {
    var one = _arr[i].toString(2),
    v = one.match(/^1+?(?=0)/);

    if (v && one.length == 8) {
      var byteLength = v[0].length;

      var store = _arr[i].toString(2).slice(7 - byteLength);

      for (var st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2);
      }

      str += String.fromCharCode(parseInt(store, 2));

      i += bytesLength - 1;
    } else {
      str += String.fromCharCode(_arr[i]);
    }
  }
  return str;
};

// 字符串转字节
var string2ArrayBuffer = function string2ArrayBuffer(str) {
  // 首先将字符串转为16进制
  var val = '';
  for (var i = 0; i < str.length; i++) {
    if (val === '') {
      val = str.charCodeAt(i).toString(16);
    } else {
      val += ',' + str.charCodeAt(i).toString(16);
    }
  }
  // 将16进制转化为ArrayBuffer
  return new Uint8Array(
  val.match(/[\da-f]{2}/gi).map(function (h) {
    return parseInt(h, 16);
  })).
  buffer;
};

// 格式化得到AID值
var ab2hex = function ab2hex(buffer) {
  var hexArr = Array.prototype.map.call(
  new Uint8Array(buffer),

  function (bit) {
    return ('00' + bit.toString(16)).slice(-2);
  });

  return hexArr.join('');
};

var HCECode = {
  CODE_0: 'OK',
  CODE_13000: '当前设备不支持NFC',
  CODE_13001: '当前设备支持NFC，但系统NFC开关未开启',
  CODE_13002: '当前设备支持NFC，但不支持HCE',
  CODE_13003: 'AID列表参数格式错误',
  CODE_13004: '未设置微信为默认NFC支付应用',
  CODE_13005: '返回的指令不合法',
  CODE_13006: '注册AID失败' };


// let tab = {};
var aid = '';
var NFCAdapter = null; // NFC instance object
var NFCTab = null; // NFC label object
var
NFCIdentify = /*#__PURE__*/function () {function NFCIdentify() {_classCallCheck(this, NFCIdentify);_defineProperty(this, "isWrite",
    false);_defineProperty(this, "NfcA",
    null);_defineProperty(this, "Ndef",
    null);}_createClass(NFCIdentify, null, [{ key: "initDevice",

    // init NFC device
    value: function initDevice() {
      NFCAdapter = wx.getNFCAdapter();
      console.log(NFCAdapter);

      /*tab = {
                               	'ISO-DEP': NFCAdapter.getIsoDep(),
                               	'MIFARE Classic': NFCAdapter.getMifareClassic(),
                               	'MIFARE Ultraligh': NFCAdapter.getMifareUltralight(),
                               	NDEF: NFCAdapter.getNdef(),
                               	'NFC-A': NFCAdapter.getNfcA(),
                               	'NFC-B': NFCAdapter.getNfcB(),
                               	'NFC-F': NFCAdapter.getNfcF(),
                               	'NFC-V': NFCAdapter.getNfcV(),
                               }*/

      // this.Ndef = NFCAdapter.getNdef();
      this.NfcA = NFCAdapter.getNfcA();

      this.NFCListener();
    }

    // call listener
  }, { key: "NFCListener", value: function NFCListener() {var _this = this;
      // onDiscover
      NFCAdapter.onDiscovered(function (callback) {
        console.log('onDiscovered callback => ', callback);
        var aid = ab2hex(callback.id);
        console.log('aid:', aid);

        _service.default.getCardIdentification(_this.token, aid).then(function (res) {
          console.log('getCardIdentification: ', res);
        });

        if (callback.techs.length != 0) {
          // console.log('识别成功');
        } else {
          console.log('无效设备');
        }
      });

      NFCAdapter.startDiscovery({
        success: function success(res) {
          console.log('startDiscovery: ', res);
        },
        fail: function fail(err) {
          console.log('startDiscovery: ', err);
        },
        complete: function complete(res) {
          console.log('startDiscovery: ', res);
        } });

    } }, { key: "closeNFC", value: function closeNFC()

    {
      NFCAdapter.stopDiscovery();
    } }]);return NFCIdentify;}();var _default =


NFCIdentify;exports.default = _default;

/***/ }),
/* 34 */
/*!***************************************************************************!*\
  !*** ./node_modules/vue-property-decorator/lib/vue-property-decorator.js ***!
  \***************************************************************************/
/*! exports provided: Component, Vue, Mixins, Inject, Provide, Model, Prop, Watch, Emit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Inject", function() { return Inject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Provide", function() { return Provide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Model", function() { return Model; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Prop", function() { return Prop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Watch", function() { return Watch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Emit", function() { return Emit; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ 2);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vue", function() { return vue__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var vue_class_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-class-component */ 35);
/* harmony import */ var vue_class_component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_class_component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return vue_class_component__WEBPACK_IMPORTED_MODULE_1___default.a; });
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Mixins", function() { return vue_class_component__WEBPACK_IMPORTED_MODULE_1__["mixins"]; });

/** vue-property-decorator verson 7.3.0 MIT LICENSE copyright 2018 kaorun343 */




/**
 * decorator of an inject
 * @param from key
 * @return PropertyDecorator
 */
function Inject(options) {
    return Object(vue_class_component__WEBPACK_IMPORTED_MODULE_1__["createDecorator"])(function (componentOptions, key) {
        if (typeof componentOptions.inject === 'undefined') {
            componentOptions.inject = {};
        }
        if (!Array.isArray(componentOptions.inject)) {
            componentOptions.inject[key] = options || key;
        }
    });
}
/**
 * decorator of a provide
 * @param key key
 * @return PropertyDecorator | void
 */
function Provide(key) {
    return Object(vue_class_component__WEBPACK_IMPORTED_MODULE_1__["createDecorator"])(function (componentOptions, k) {
        var provide = componentOptions.provide;
        if (typeof provide !== 'function' || !provide.managed) {
            var original_1 = componentOptions.provide;
            provide = componentOptions.provide = function () {
                var rv = Object.create((typeof original_1 === 'function' ? original_1.call(this) : original_1) || null);
                for (var i in provide.managed)
                    rv[provide.managed[i]] = this[i];
                return rv;
            };
            provide.managed = {};
        }
        provide.managed[k] = key || k;
    });
}
/**
 * decorator of model
 * @param  event event name
 * @param options options
 * @return PropertyDecorator
 */
function Model(event, options) {
    if (options === void 0) { options = {}; }
    return Object(vue_class_component__WEBPACK_IMPORTED_MODULE_1__["createDecorator"])(function (componentOptions, k) {
        (componentOptions.props || (componentOptions.props = {}))[k] = options;
        componentOptions.model = { prop: k, event: event || k };
    });
}
/**
 * decorator of a prop
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */
function Prop(options) {
    if (options === void 0) { options = {}; }
    return Object(vue_class_component__WEBPACK_IMPORTED_MODULE_1__["createDecorator"])(function (componentOptions, k) {
        (componentOptions.props || (componentOptions.props = {}))[k] = options;
    });
}
/**
 * decorator of a watch function
 * @param  path the path or the expression to observe
 * @param  WatchOption
 * @return MethodDecorator
 */
function Watch(path, options) {
    if (options === void 0) { options = {}; }
    var _a = options.deep, deep = _a === void 0 ? false : _a, _b = options.immediate, immediate = _b === void 0 ? false : _b;
    return Object(vue_class_component__WEBPACK_IMPORTED_MODULE_1__["createDecorator"])(function (componentOptions, handler) {
        if (typeof componentOptions.watch !== 'object') {
            componentOptions.watch = Object.create(null);
        }
        var watch = componentOptions.watch;
        if (typeof watch[path] === 'object' && !Array.isArray(watch[path])) {
            watch[path] = [watch[path]];
        }
        else if (typeof watch[path] === 'undefined') {
            watch[path] = [];
        }
        watch[path].push({ handler: handler, deep: deep, immediate: immediate });
    });
}
// Code copied from Vue/src/shared/util.js
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = function (str) { return str.replace(hyphenateRE, '-$1').toLowerCase(); };
/**
 * decorator of an event-emitter function
 * @param  event The name of the event
 * @return MethodDecorator
 */
function Emit(event) {
    return function (_target, key, descriptor) {
        key = hyphenate(key);
        var original = descriptor.value;
        descriptor.value = function emitter() {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var emit = function (returnValue) {
                if (returnValue !== undefined)
                    args.unshift(returnValue);
                _this.$emit.apply(_this, [event || key].concat(args));
            };
            var returnValue = original.apply(this, args);
            if (isPromise(returnValue)) {
                returnValue.then(function (returnValue) {
                    emit(returnValue);
                });
            }
            else {
                emit(returnValue);
            }
        };
    };
}
function isPromise(obj) {
    return obj instanceof Promise || (obj && typeof obj.then === 'function');
}


/***/ }),
/* 35 */
/*!*****************************************************************************!*\
  !*** ./node_modules/vue-class-component/dist/vue-class-component.common.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
  * vue-class-component v6.3.2
  * (c) 2015-present Evan You
  * @license MIT
  */


Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(__webpack_require__(/*! vue */ 2));

var reflectionIsSupported = typeof Reflect !== 'undefined' && Reflect.defineMetadata;
function copyReflectionMetadata(to, from) {
    forwardMetadata(to, from);
    Object.getOwnPropertyNames(from.prototype).forEach(function (key) {
        forwardMetadata(to.prototype, from.prototype, key);
    });
    Object.getOwnPropertyNames(from).forEach(function (key) {
        forwardMetadata(to, from, key);
    });
}
function forwardMetadata(to, from, propertyKey) {
    var metaKeys = propertyKey
        ? Reflect.getOwnMetadataKeys(from, propertyKey)
        : Reflect.getOwnMetadataKeys(from);
    metaKeys.forEach(function (metaKey) {
        var metadata = propertyKey
            ? Reflect.getOwnMetadata(metaKey, from, propertyKey)
            : Reflect.getOwnMetadata(metaKey, from);
        if (propertyKey) {
            Reflect.defineMetadata(metaKey, metadata, to, propertyKey);
        }
        else {
            Reflect.defineMetadata(metaKey, metadata, to);
        }
    });
}

var fakeArray = { __proto__: [] };
var hasProto = fakeArray instanceof Array;
function createDecorator(factory) {
    return function (target, key, index) {
        var Ctor = typeof target === 'function'
            ? target
            : target.constructor;
        if (!Ctor.__decorators__) {
            Ctor.__decorators__ = [];
        }
        if (typeof index !== 'number') {
            index = undefined;
        }
        Ctor.__decorators__.push(function (options) { return factory(options, key, index); });
    };
}
function mixins() {
    var Ctors = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        Ctors[_i] = arguments[_i];
    }
    return Vue.extend({ mixins: Ctors });
}
function isPrimitive(value) {
    var type = typeof value;
    return value == null || (type !== 'object' && type !== 'function');
}
function warn(message) {
    if (typeof console !== 'undefined') {
        console.warn('[vue-class-component] ' + message);
    }
}

function collectDataFromConstructor(vm, Component) {
    // override _init to prevent to init as Vue instance
    var originalInit = Component.prototype._init;
    Component.prototype._init = function () {
        var _this = this;
        // proxy to actual vm
        var keys = Object.getOwnPropertyNames(vm);
        // 2.2.0 compat (props are no longer exposed as self properties)
        if (vm.$options.props) {
            for (var key in vm.$options.props) {
                if (!vm.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
        }
        keys.forEach(function (key) {
            if (key.charAt(0) !== '_') {
                Object.defineProperty(_this, key, {
                    get: function () { return vm[key]; },
                    set: function (value) { vm[key] = value; },
                    configurable: true
                });
            }
        });
    };
    // should be acquired class property values
    var data = new Component();
    // restore original _init to avoid memory leak (#209)
    Component.prototype._init = originalInit;
    // create plain data object
    var plainData = {};
    Object.keys(data).forEach(function (key) {
        if (data[key] !== undefined) {
            plainData[key] = data[key];
        }
    });
    if (true) {
        if (!(Component.prototype instanceof Vue) && Object.keys(plainData).length > 0) {
            warn('Component class must inherit Vue or its descendant class ' +
                'when class property is used.');
        }
    }
    return plainData;
}

var $internalHooks = [
    'data',
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeDestroy',
    'destroyed',
    'beforeUpdate',
    'updated',
    'activated',
    'deactivated',
    'render',
    'errorCaptured' // 2.5
];
function componentFactory(Component, options) {
    if (options === void 0) { options = {}; }
    options.name = options.name || Component._componentTag || Component.name;
    // prototype props.
    var proto = Component.prototype;
    Object.getOwnPropertyNames(proto).forEach(function (key) {
        if (key === 'constructor') {
            return;
        }
        // hooks
        if ($internalHooks.indexOf(key) > -1) {
            options[key] = proto[key];
            return;
        }
        var descriptor = Object.getOwnPropertyDescriptor(proto, key);
        if (descriptor.value !== void 0) {
            // methods
            if (typeof descriptor.value === 'function') {
                (options.methods || (options.methods = {}))[key] = descriptor.value;
            }
            else {
                // typescript decorated data
                (options.mixins || (options.mixins = [])).push({
                    data: function () {
                        var _a;
                        return _a = {}, _a[key] = descriptor.value, _a;
                    }
                });
            }
        }
        else if (descriptor.get || descriptor.set) {
            // computed properties
            (options.computed || (options.computed = {}))[key] = {
                get: descriptor.get,
                set: descriptor.set
            };
        }
    });
    (options.mixins || (options.mixins = [])).push({
        data: function () {
            return collectDataFromConstructor(this, Component);
        }
    });
    // decorate options
    var decorators = Component.__decorators__;
    if (decorators) {
        decorators.forEach(function (fn) { return fn(options); });
        delete Component.__decorators__;
    }
    // find super
    var superProto = Object.getPrototypeOf(Component.prototype);
    var Super = superProto instanceof Vue
        ? superProto.constructor
        : Vue;
    var Extended = Super.extend(options);
    forwardStaticMembers(Extended, Component, Super);
    if (reflectionIsSupported) {
        copyReflectionMetadata(Extended, Component);
    }
    return Extended;
}
var reservedPropertyNames = [
    // Unique id
    'cid',
    // Super Vue constructor
    'super',
    // Component options that will be used by the component
    'options',
    'superOptions',
    'extendOptions',
    'sealedOptions',
    // Private assets
    'component',
    'directive',
    'filter'
];
function forwardStaticMembers(Extended, Original, Super) {
    // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
    Object.getOwnPropertyNames(Original).forEach(function (key) {
        // `prototype` should not be overwritten
        if (key === 'prototype') {
            return;
        }
        // Some browsers does not allow reconfigure built-in properties
        var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);
        if (extendedDescriptor && !extendedDescriptor.configurable) {
            return;
        }
        var descriptor = Object.getOwnPropertyDescriptor(Original, key);
        // If the user agent does not support `__proto__` or its family (IE <= 10),
        // the sub class properties may be inherited properties from the super class in TypeScript.
        // We need to exclude such properties to prevent to overwrite
        // the component options object which stored on the extended constructor (See #192).
        // If the value is a referenced value (object or function),
        // we can check equality of them and exclude it if they have the same reference.
        // If it is a primitive value, it will be forwarded for safety.
        if (!hasProto) {
            // Only `cid` is explicitly exluded from property forwarding
            // because we cannot detect whether it is a inherited property or not
            // on the no `__proto__` environment even though the property is reserved.
            if (key === 'cid') {
                return;
            }
            var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);
            if (!isPrimitive(descriptor.value) &&
                superDescriptor &&
                superDescriptor.value === descriptor.value) {
                return;
            }
        }
        // Warn if the users manually declare reserved properties
        if ( true &&
            reservedPropertyNames.indexOf(key) >= 0) {
            warn("Static property name '" + key + "' declared on class '" + Original.name + "' " +
                'conflicts with reserved property name of Vue internal. ' +
                'It may cause unexpected behavior of the component. Consider renaming the property.');
        }
        Object.defineProperty(Extended, key, descriptor);
    });
}

function Component(options) {
    if (typeof options === 'function') {
        return componentFactory(options);
    }
    return function (Component) {
        return componentFactory(Component, options);
    };
}
Component.registerHooks = function registerHooks(keys) {
    $internalHooks.push.apply($internalHooks, keys);
};

exports.default = Component;
exports.createDecorator = createDecorator;
exports.mixins = mixins;


/***/ }),
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */
/*!**************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static/up.png ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 45 */
/*!****************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static/down.png ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 46 */
/*!**************************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static sync ^\.\/.*\.png$ ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./1.png": 21,
	"./2.png": 19,
	"./RMB_v3.png": 47,
	"./RMBcard@2x.5f115908.png": 48,
	"./abc.png": 49,
	"./arrow.png": 50,
	"./bank_v2.png": 51,
	"./boc.png": 56,
	"./card.png": 52,
	"./ccb.png": 53,
	"./checked.png": 54,
	"./delete.png": 55,
	"./down.png": 45,
	"./icbc.png": 57,
	"./logo.png": 58,
	"./logo1.png": 59,
	"./logo2.png": 60,
	"./rmb_logo_black.png": 61,
	"./rmb_logo_white.png": 62,
	"./select_cards.png": 63,
	"./topup_v2.png": 64,
	"./trans.png": 65,
	"./trans_v2.png": 66,
	"./up.png": 44,
	"./wallet.png": 67,
	"./下载 (6).png": 68,
	"./下载 (7).png": 69
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 46;

/***/ }),
/* 47 */
/*!******************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static/RMB_v3.png ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/RMB_v3.png";

/***/ }),
/* 48 */
/*!*******************************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static/RMBcard@2x.5f115908.png ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/RMBcard@2x.5f115908.png";

/***/ }),
/* 49 */
/*!***************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static/abc.png ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIEAYAAAD9yHLdAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAALQRJREFUeNrt3WdgVNW2AOA16SG9kkIghRQwkFCkd0PvIE2RIoj6nhXrvYJcsTzvw4I85QqCCEovCoQOQuglhIQQkkBICKmk956c92OxHQmEtJm9z5lZ35/jDJizz5A56+y2lgr0nFQn1Ul1bdviq65d8ejpCSpQgcrdHSSQQHJ3x9eurvjn7drh+1ZW+L6hIb5vbY1HlQqPtrair48QwhQU4FGS8FhUhN/j2tq/XqtABaq0NHw/PR1fp6fj67Q0/Ht37+IxKkploDJQGWRlib4yUVSiG6AtkiRJktSmDb4aMgSPgwfjMSjo4aOLi+j2EkKUKiMDj9ev4zEyEo9hYeyoUqlUKlVZmeiWapriAwgGCi8vfDVlCj4pjByJTw4DB+L7Zmai20kI0VcVFXhfOnMG70uHD+P7v/+OgSUpSXQLW0oxAQSHmkxN8dWECfgPMWcOvh49Go9sKIkQQuSurg6PFy7gcdMmPP72m1J6LLINIBgwrK0xUCxejO++/joe7e1Ft48QQrQjNxePq1Zhz+Xbb3GupbhYdMvqk00AwYBhYoIBY948fHf5cjyySW5CCNE3LKCsWIHHVauwh1JeLrplwgMIzmE88wy+Wr8ejx06iG4XIYTIE1sFtmABBpI//xTVEgPeJ8SAYW6Oxy+/xHePHsUjBQ5CCHkyT088Hj+O99E1a/BoYcG7Jdx6IDhE5eeHQ1T79+O7fn68L5gQQnSOBBJIcXH4YsIEnDO5fVvbp9V6AMHA0bv3w4HDyUnb5yWEEP2Ul4cBZeJEDCRnz2rrTFobwsIu1aRJGDhOnsR3KXAQQoh22dvjfffIEbwPT5yorTNpvAeCDR42DF8dOoRHExNtXQAhhJAnqa7GHsn48dgjOXJEUz9ZYwEEh6q6dMHId+YMvmtjw//DIoQQ8ii2j2TwYFy9de1aa39iqwMIBo4OHTBwsB2VLOkgIYQQeWHJIfv0wR5JSkpLf1KL50BwqMrAAAPHxo34LgUOQgiRNzc3vG9v2fLXfbyFWj6JLoEEEksxwrLcEkIIUYYBA/DIUkQ1X7OHsDBideqEr65exaO5ueiPghBCSEtUVOCxZ0+cG4mJaer/2fweiAQSSN9/jy8ocBBCiLKxchdff93c/7PJPRCcLA8JwbGzY8dEXzIhhBBtGDYMeyJs/17DmhlALlzAANKnj+hLJIQQog3nzmEAYXMkDWt0CAvnPFgBJwochBCi2/r3x/s+K9TXsCbOgbz6quhLIoQQwlPj9/0Gh7BwyKpdO+x5sPzzVDKWEEL0Q20tLpry8mpow2HDPRAVqEC1cCG+oMBBCCH6hd33585t6G803AORJEmSkpLwFStgQgghRG9IIIGUmIg9EB+f+n/8SA8Eh64CA/EVBQ5CCNFbKlCBytsbOxQBAfX/2ODx/8PIkaLbTQghRE5Gjar/zqMBRAIJJAoghBBC/u7RuPDXHAh2UVhqkrw8PLIt7oQQQvRbeTke7e1xo2FFRb0eSHAwHilwEEII+Ttzcxyh6tKFvVMvgAQFiW4iIYQQOVPHCQoghBBCmkYFKlBRACGEENIibKrjkUn0/Hx8ZWsruomEaEJBQVVVRQXAl19eu3buHL/z/vOf3boNGABgbW1iYmoq+lMgRJPy8nAS3cHBCDcOWlnhH1DgIGJVVNTW1tQAnD2bmZmSAhAS4u7u5dXyn1dUVFVVWQnw739HRp4/z+863ngjMLBXr9YHkKys8vLSUgBnZ3NzCwt+7SekYfb22OGwsDDCMS13d9FNIvolJ6eioqwM4ODBe/cSEgBCQ5OTb98GOHIkNfXOHYC6OkmSJIDi4hdf/OCDlp+H/RylGjx4375NmwCqqurqamsBxo1r397XF2D8eE9PPz+AIUNcXTt0ADAyMjAwaH59UUJaRgIJJDc3I3zl5ia6PUQ3lZRUV1dVAWzZkpBw4wbAhg3x8ZGRAJcvZ2Wlpzd8g7e0NDY2MWn9+UUFD02fNzGxqCg/H2DVqhs3Ll9WH1nPZPJkLy9/f4AFCwICunUDePppJyf6VhOtUYEKVG5uRhhJ3N3xDdGtIkoXG5ufn5MDsHHjrVtRUQBr18bGRkQA5OdXVlZU8G8PdrVFfyqtaf+TgxEb4lqz5ubNiAj1sXNnOzsnJ4A5c/z8unYFWLgQA4uDg5kZ2y5MSOu4uz8YwnJ0FN0Uoiys57BrV2JibCzAN99cv37xIsClS1lZaWmiW6cmsgciMnDdvJmfn50N8OGHly6dOAHwySdXr4aFqQPKhx8GB/fvD+DpaWVFM5+kZZydHwxhtWkjuilEGY4fT0tLSgL44IOLF0+cAIiIyMnJyBDdqoYpvQeiqTmc8vKampoadQ/l55/j4iIjAWbO7NgxMBBgyZLu3QcMAPDzs7FxcBB91UQZzMyM2H+IbgqRp0OHUlISEgA+/vjKlVOnAMLDs7PlHDDqE9cDkXfYqq6uq6urA/j111u3rl8H2LoV56hmzcKA8tlnTz89ZAhA+/aWljY2oltL5Mnc/MEciJkZzYEQAIDbtwsL8/IAXnnlzJkDBwD+/DMtjRU0ViKlr8Li1faamocDyu7dODT5j39069a/P8C77wYF9e0LYGZmaGhkJPpTIfJgZmaAgYN6IPqKPYmyfRJdu+7cuWaN8gMHI3ouovXtFxMAy8pqaqqrAZYuxZ5nYOCOHT/+qF5uTcjfeiCmptQD0S/nzuFGvZdfPn36wAGAmBicdNU1ovofSg9c9d25g8uIx48/fHjbNoApU7y8AgIA1qwZNGjsWABHRzMzmknVIw9Grh5sPVJR6NBxbIjivfcuXjx+HGDQoH37Nm7U3cDBKP1GLte279mTlBQXp+6xHjmSknLnjuhWEb5UKtq7quNSU0tLi4oAhg7dv3/TJoCvvoqKunBB+XMDTaX065R7+zMyyspKSgBGjz54cMsWdY+WDYER3UYBREexJ8Lu3Xft+ukndW4pfUOrsHhdLx7ZxtG+ff/4Y8MGgKSk4uKCAtGtI9pCAURHsC8wW247ZsyhQ1u3AmRnY84pfaX0fSBKHYK7fj039/59gN699+xZvx7gzJmMjHv3RLeKaBoFEIVjcxsvvRQWFhoK8OmnERFnzsh/6IOXujpl3oAZpf8rsgeYYcNCQ3/9FeCHH2JiwsNFt4poCgUQhSotxTFmtipm/fq4uGvXRLeKMErtOWgLe9B57bWzZw8dAnjnnQsXjh2jz0jpaEuQwuTlVVaWlwOMH3/o0LZtAOfP37+fmiq6VfKl9J6Y0tvfEJY7jdVrYcuBDQxUKloTqhzUA1GI9PTS0uJigH79cHJSKYHD2BjrVMye7evbpQv/84vcByLC4MFYH0Qp1q3DnvO8eadO7dsHUFurmwFTV1EAkTlWknXsWOxxxMcXFOTmim5Vw9gT5LRp3t6dOwPExEyf/uqrAP/5z8CBY8bwb4/Sb0bNHQo7fHjs2OeeAzh7duLEefMABg1ydW3fXvRVNI6lUJk16/jxPXvUGRKIvNEQlkwVF2MhppEjDxzYvBkgMjI3NzNTdKsaNnSom5unJ8APPwwYMHo0QKdOdnZ/LxLACkvxJmouQvTqr/79XVw8PADCwiZMmDsXYO/eu3fj49VzD2xnudzs3JmYePMmgKGhgYFKBbB587BhkyfT0JZcUQ9EZljp0mnTjh3btUtduU9uXFzatLG0BNi4cejQiRMBTpwYP/6FFx4NHKIpfQ5BU+2fONHT098fIDp62rRXXgFYtqxHj0GDAExNDQ0NDUVf5aO2bUtIiIlRZ04g8kQBRCbYjWL69GPHdu+Wb2qImTM7dnzqKYDY2BkzXn1VXaBIrk+H+jYH0hhzcyMjIyOAf/2rZ8/BgwHCw6dMWbgQoHt3R0dXV9GtexSbbF+5Mjr60iXRrSH1UQCRiY8/Dg8/dUo91CAXVlZYm5ytktm69ZlnpkwBsLU1MVFCDmdRQ1hyDaj1BQba2zs7A1y8OHnyiy+qeyZyGzJavPj8+aNHAX777fbt6GjRrSEMBRDBWMD44ouIiLNnRbdG7amnsKZ2RMTUqS+9BLBoUadO3buLblXziSxpqwkqFZ9gxFbLsZ7Jvn2jRs2YAWBvb2oqhxrq7PNkG2avXcvJkfOcoL6gACIIK9w0d+7Jk3v3ymfIY9QoDw8fH4Bz5yZNmj8foGNHGxt7e9Gtajmlz4GI6kGNHdu+va8vwOXLU6YsWAAQEGBrK4e5rYqK2tqaGvUcYWEh7iMhYlAA4YytRpo8+ciRHTvk8wV4660uXXr3BggNHT161iwAGxsTE1NT0a1qPVGroTR1XtFDST4+1tZ2dvhAMW8ewJAhbm5y2GfCVpG9+CLuH1HyQ4KSUQDh7I03zp07ckQ+dTiWL8fa199+26/fiBEAhobyGvtuLaUPYckFG8o6cmTs2OefB5g8GQtKicbqkqxcef06TbLzRwGEk8OHcVXVhg3x8ZGR4trBggMLGEuXdu8+cKDoT0d7KCeVZpmYGBgYGgJs3x4SMnUqwPTpPj6dO4tuFcAHH1y6dPw4QFQUZgEmfFAA0TKW62fRotOnQ0NFtwZg5cr+/UeOVA9Z6Tplz4Dwm0RvLjbpvmULrsqbNatjx8BAce1hO9cXLAgL279fnbyRaBcFEC1jO39TUkpKiorEtWPJEuxpvPFGYGCvXqI/FX6UPokud2zIk20oZYswRLl6NTs7IwPg229p3wgPFEC05Nix1NTERPFp1hcuDAjo1k0916FvxKUy0cx5lTIjxXokO3cOH/7sswA9ejg5idyYuGwZ7qtKSMDVjkQ7KIBoGOs6s8lyUU+/bLUMS2KojNuQ5lHvgy9LS9x4euAArubz8LC0tLbm347y8pqamhqAV145c+bgQdGfiu6iAKJhP/2EPY64uIKCnBz+52dfWDbJaWSET4b6SulDWLW1dXVKbH/btubmFhYAu3YNHz5tmricWydOpKUlJQGEhiYn374t+lPRPXp8a9Estr9j+fKrV0+f5n9+9gVlX1hnZ/wCEzE0FbaUvoqsVy9nZzc3XPU3cqS4dnz44aVLJ05QvRFNowCiIV9/jUnfMjPLykpK+J9/+fKePYcMUX9hCRLVA9HUjV9Xbnivvtq5c48e4pb9sn1XGzfGx0dFif40dAcFkFa6f7+8vLQU4KuvoqIuXOB/flb34Z13goL69hX9aciP0p/glT4EV9/q1QMGjBmjHuLibdmy8PCwMPUcCWkdCiCtxHbA8i6YZGFhZGRsDPDLL0OGTJigezvINUXpt19dCyAODmZm5uYAP/6I2Z15S00tLS0qwrnKiAjRn4byUQBpobKymprqaoC1a2NjRfwiLlnSo8fAgcpPdqhtIisSauLn6FoAYSZNwgJXM2b4+Dz1FP/zswc/XRkiFIUCSAtt3Ig1nPPyKivLy/md19cXA8bixV279ukj+lPQntpaSdLETmKl3x7q6pQ9BNeYFSv69AkJAWjTBnvUvCQlFRcXFAD8/jvm0iItQwGkmdiXedWq6OjLl/mff+VKXM3CchLpKjZGzVJUtJTSn+Bra3U7JQdbdv7ee2Lm8P73fyMjz58X/Skol5HoBijNwYP37t2+zX+fR0iIu7uXF8CYMe3bd+wo+lPgJzsbFym4uVlYWFk1///v2RN3RO/YMXz41Kn82u3u3rL21qfk4Ncc778fHNyvH8C6dbiPKi2ttLS4WPvnvXIlOzs9HeD8+fv3U1MB+vVr27ZdO9GfhnJQAGmmH3+8efPqVf7nXbYMK8Xpm4MHU1ISEtQpWZqLBZ5p07y95ZA1tqnYogxWQEnXsSGsDz4IDu7fHzM5HD7M7/ws5RAFkOahIawmys+vrKyoADh6NCUlMZHfeZ95BnseAwbgcl198+67mIxy27aEhJgY3b+hsqG7xYvxupU+BNdc7EHB1bVNG0tLfufdvTsxMTZW93+/NI16IE20Z09SUmwsQFVVXV1tLb/zLl2Kq630FavYOGvWiRN79qjnfljPgqVqae6N1snJzKxNG4A+fdq2dXcHePddHINv187C4km5m1avjokJDwdYsQL3/RQWVlVVVACYmxsaGhsD2NiYmpqaAjg4YAEme3tcturgYGrapg0WZjIzU0+OFxVVVVVV4aRufj5ARER2dmYmQEEB/lx9Y25uZGRkpP73YNmstY39nrGUJ88+6+3dqZPoT0P+KIA00fbtd+7cvMnvfF27Oji0bQsweLCrqxxKiMoFC+B37+IqmpZKTMSSqJcuZWWlpeFqnPh4gBs3pk9/5RUAKytMCsiwncyvv45DK/UDVn4+QEUFQHp6WRmPsXtdx3oibOMfr31Wv/12+3Z0NAWQpqIhrEZkZeEk7smT6el37/I7L0v9QPi4d6+kpLAQYNeuxMTHPSiwoUt9G1ISxdraxMTUFOC55/gWqjp06N69hAT1kDV5MgogjWA1l3lVOGNfnNmzfX27dBF99fonJiYv73G16jMyqGchwiuv8H2QYj3co0dTU+/cEX318kcBpBEsHTQvU6d6eXXqpK6rQPgqKampedxQSU2NZjY2kubp1s3R0cUFoHt3R0eeBaqOHUtN5fm9VyoKIA1gwxRhYenpycn8zjttmo8Pjb2KY2SkUj2ufgoNXInF+3vBKoqSJ6MA0oCYmLy8rCyA7OyKirIy7Z/P3h5X7YSEuLt7e4u+ev3VUAEuMzNDQyNaciLMs89iz5wXNicWH19QkJsr+urliwJIA8LCMjLu3eN3vvHjO3Tw81PXliZiGBg8Pqsx/buIxZKGBgc7OLi48Dsv9USejL4SDTh1iu+qq+HD27Xz8hJ91aQhKhWly5eDESM8PHj20Nkyb/J4FEAacPHi/fs8fnHYTWnoUDc3T0/RV02IvPH+nkRG5ubevy/6quWLAkg9xcW4YSktDQvPaFunTnZ2Tk4tTxZIiD5hKX14DSmypKmU4uTxKIDUwybNeK25oeRthDQdW97OlvdqG9v/1dD+IH1HAaSe2FhMWcFLcDCfLwIhuoT3ZHpkZG5uZqboq5YfCiD1xMcXFvJctte1q729s7PoqyZEWYKCMFccL7duFRbm5Ym+avmhAFJPXByfdd9s8pwlTSSENB3v7016Op8CV0pDAaQeXpPnDg6YTtzGBnNfEUKazs8P94XwwqtCotJQAKknL6+igkcWTlYLmhDSfE5O5uYWFvwyBFAAeTwKIPXwKuSjqZrZStHQDm+iWSqVenhUl7Fr5LX8neq8PB4FkHry8ysry8u1fx59CyCs5rWPj7W1nZ3o1ugelkvN1NTQ0NBQdGv4adeOz/eIFbQqLa2pqa4WfdXyQQHkAbaBsLqaT90PKytjY32c+1iypHv3gQP14ymZpxde8PPTx/oxNjYmJmZm/M5XXk4B5O8ov+gDBQV8K5CZm+tndtd58/z9g4IA/PxsbR0cALZvT0iIicGa4AUFALm5mP04Nxd7gjk57HVFxeN6hqy2edu2bdpYWgL4+uLkKjuynh5brMB6QuyJ8sIFTFmzZQuWMm0MC3y9e2MtdQ8PCwsbGwArKxMTExN1O1m7s7PLy8vK1K9ZDfXa2pYliGcb6by9sSc3ebKnp78/wEcfYWDWN6yGOi+0I/1hengLezxJ4rf7HAB/8Y2NRV81f+zGyXbgi96JP3++v39wMMD77wcF9e0LsGtXUlJs7KN/j03WHjs2btzs2QDPPOPu3prkl5WVtbW1tQBlZfhEy4ZO2Wt2PjZ3xCpVOjpiwGzocy0vr6mpqeF/YxWFPRDwwv7dCNKDX7GmMTExMOA5dmxiol9j1cyVK1lZ6ekAffrgE7xcsHThb7/dpUufPo/+OSutamdnaqqJIRM2V8GOrf2527ffuRMTo042aG5uZGRpKezj5Ib3nA8tBnkYBZAHeN/Q2ZOmvpk//9SpffsAVq3q33/kSID+/TE5nqaeJNkqOrbsMjOzrKykBCAv7+En/LZtzc0tLQG6dMFMAGyoq6EbUv0bfFFRVVVlpTrd9927OATH5tJsbXFsnvUYHBzMzMzN1edxd7ewsLZueVLAW7cwY8L69XFxkZEA3357/frFiwDJyc8//+abov51+WM9Ll4aqlipryiAPGBqyndOgo3B65s7d4qK8vIARow4cGDzZvX7bF+Mt7eVlZ2d+sbK/l1qa7EmeX4+zlX9/VheDpCfj4GDJb9rKvZE+d///dRTPXtiYBs16tG/x4Y3P/jg4sXjxwH+7/9u3LhypfVj4izAtG2L+xqcnMzN27R59EbF5oSSk4uLCwvVAVHf8f4eUWGxh1EAeYD3EJa+BpCGpKSUlBQVqY+81NXh3AELCKNHt2/fsSPA6NEeHh07qv9eaGhy8q1bACtWREVduKC587PJdXYEyM/nd/XKx3p8vLC5KIIolj7Anix4jXGWllZX6+MQltyxOZr67twpKqJbu/zwehBjD5i8J+3ljgJIPQ4OuCFL29RPnEROGlqJ17JFt0Tb2FCmtmlq8YSuoQBSj4sL7ifQtsTE4mJ6oiWkZdjQI1u8oG2urm3a6FPmiKaiAFKPqyuvAIJDIi3dUEa0Q5Lo30MJ2FwZr419lPz08SiA1MOWV2ob25CUmsp30pg8GXuyJfLGe06KV84tpaEAUo+fn60tzzoDNDlLSPMlJOBycF78/W1tHR1FX7X8UACpx9/fxsbBgd/5rl7NycnIEH3VhKHehzJER+flZWXxO19wsKMjVQ59FAWQevz9MckfL+fOZWampIi+asLwzolGWubMmYyMe/e0fx62pJ93DXaloABSD+uqWljwWe/NAgjdtOSBZkDkrbAQU8jcuMGnB+LpaWVla6tOTUMeRgGkHkND3EjI64mD7Qe5daugIDdX9NUT6oHIG3vg4rV6MTjY0dHFRfRVyxcFkAb07Onk5ObG73ynTqWnJyeLvmpCPRB54zV0xdDQ1ZNRAGlAv34uLjzrVPz++927cXGir5pQD0Te9u5NTo6P53c+0fVq5I4CSANYwSBeubH+/DMtLSmp4cp7hOgztuoqNjY/PydH++djc6ADB7q6tm8v+urliwJIA1ia7cBArBehbawW+969d+/yfMIiD6Pehzzt3Hnnzs2b/M43dKi7u6enujIkeTwKII0YMaJdO29vfufbtSsx8XElVQkftBNdnnbvTkriOcQ7atTD6fzJ41EAacTEiZ6e/v78znfsWFpaYiLAvXslJYWFoq9e8+ReElTpubCMjHSr4FF4eHZ2RgbAzZv5+dnZ/M47erSHh4+P6KuXPx36VdMONonGK0svq6i3enVMTHi46KvXvM6d7eycnES3omFKDR4sCSgbetUV330XHX3pEr/z+flhJgpvb2trOzvRVy9/FEAawZ6YJ0709PTz43fedevi4q5d41/zWdu+/rpv3+HD+W3UbC6lrcKysjI2NjEBWL9+yJDx49U7p5UuIwNr2e/YwXfuY/p0H5/OnUVfvXLQ9FATzZ7t69u1K8CaNTdvRkRo/3xsNdbmzQkJ0dEACxcGBHTrJvpTaL2hQ93cPD0BYmNnzPiv/wLYujUh4cYNgEuXsrLS0gCSk3HozsYGS4caGOBN0dYWC/pYWBgZmZgAWFoaGxsb49HE5NE/NzU1NDQ0BNi37+7dW7cADhy4d+/27cbbd/x4ampSEsDLL58+feCA+v3m5l7q1MnOztERf2+6dFG/z/5dWSGkoqLq6spKgMJCVuMda7sXFeGOa3NzDLTW1nidXl74ZDxkiKtrhw4A48Z16ODrC+DsjDXVdQXrgVdV1dXV1mr/fCzwzp/v7x8UJPrqlYMCSBP17+/i4uEB4OtrY2NvD3D7dmEhj2ygX38dFXXxIsC8eX5+QUG6M8bN6iu8/35wcL9+2jsP+/dqagBhgaK1yfq++qpPn+HDAcaMwRrrpGlYido1a27evHqV33mHDcNl+zR01Tw6cCvigz2hzJvH9wklLq6gICcHYMOG+PjISNGfgvLwKjhUHxUgaplvvrl+/eJFgOxsviWfFywICAgOFn31ykMBpJlefNHfPzhYPUTCyyefXL16+jRAWVlNTXW16E9BOaqqsHAXb0ZGKpUu9BR5ycoqLy8tBfjqq6ioCxf4ndfe3tTU3Bxg8mQvr4AA0Z+C8tCveDOx1VgzZ/r4BAbyO29aWmlpcTHAqlU3bly+LPpTII1R2mS8aMuX4wNScTEOYfHC5qhow2DLUABpoTff7NKlVy/+5/3yy2vXzp0DSE/HgEKIksXHYxbqtWtjY3ksTmGMjXEu8e23u3bt3Vv0p6BcFEBaqFs3TPPMe6c6q4ewaNHDq4QIURK24/+ll06fDg1Vp/LhZd48HIpm9T5Iy1AAaaVPPunZc8gQ/udlq4q2bUtIiIkR/SkQ0jxsKJZ3enbW8/jHP7p1699f9KegfBRAWqlPn7Zt3d0BRo4Uk/rg9dfPnTt8WD0JSYicJSUVFxcUACxdeuXKqVP8zz9nDi6H9/KinocmUADRkC++6NVr6FD+uZ5YRcOFC8PCQkNp4pbIE0vRM3fuyZN796r3e/DC9k9Rz0OzKIBoSPfujo6urviE07Ur//Pv35+cfOsWwBdfREScPSv60yDkYR9+eOnSiRP8h6yYl17CTA4+PrRRUJMogGjY558//fTQoeJyPX38cXj4qVMAhw+npNy5I/rTIPru998xDTvbIMhb27aY4uXzz3v1GjZM9KeheyiAaJibm4WFlRXAsmU9ew4ezP/8bHXLCy/8+ecffwDcvYtjzoTwFBOD6dfnzMEhK1FDqytW9OkTEgJgZ4e50ohmUQDRkrff7tKld2+A4GAHBxcX/udncyMjRx44sGULTbITPtiG1/HjDx3ato3/XAczZIibW4cOALNnixlS1hcUQLSETdr99NPgwePGARgaiimkdOtWYWFuLsCoUQcPbtmi3kdCiCax3FXDhx848Ntv6tVWvJmYGBgYGgKsXj1gwJgxupPeXq4ogGhZz55OTq6uAP/8Z7duAwaIa8e1azk5mZkAEyYcPrxtm+7VGSFisAeSUaOwpxsbm5+fkyOuPWyVFUunT7SLAggnH3/co8egQQC9ejk7u7mJa8fp07gKZty4w4e3buWfe4johoICrFsyduyhQ1u3AkRE5ORkZIhrz8CBrq7t2wMsWdK9+8CBoj8d/UEBhBM2pLV587BhkycDWFtjwSRR/vwzLe3uXYAhQ/bt27QJ4P59miMhjWM52AYN2rt340aAc+cyM1NSxLWHlfDdsuWZZyZP1p16OUpBHzVnHTtigaNNm4YOnThR/Bgte3Ls2/f333/+mV+hLKIsbGiqb98//tiwofUFt1qLfW/Wrx88ePx4gHbtLCyo/gp/FEAEmTjR09PfX/sV+ZqKTXoOHLh37y+/AJw8mZ5+967oVhHRwsIyMpKTAQYMwN+Le/ew5LBo77wTFNS3L8CECZ6efn6iW6O/KIAIxjY4yaX0KRvKGj48NPS33wC++OLatbNnKUWKvmD7iD7/HDMahITg70FeXmVlebno1qmX537xBW0MlAMKIIKx5b3bt4eETJ2qThMvWm0t3kg++ujy5ZMn1QGF9pPoJrZvaNw43L+xZMmVKydPqnNYiRYYaG/v7AywZ8+IEdOnq7PqErHon0AmLC2NjU1MAPbvHzVq5kyA9u0tLW1sRLdK7cSJtLSkJIDg4F271q4F2LkzMfHmTdGtIq3FcqgFBe3cuXYtwKFDKSkJCaJbpca+B4cPjxnz3HO0o1xuKIDIjLs7pkI5cWLcuNmzAVxdsYSuXGRklJWVlABMn37s2O7d6mWcycnFxXIYGydPxlZRsRQjEyYcPrx9O0B6elmZnCpc2tjgKsXQ0NGjZ85Ufy+IvFAAkSm2Wuvo0bFjn38ewMHBzMzcXHSrHnXw4L17CQkAgYE7d/74I8C//x0Zef48QFlZTU11tejWEVbpb+XK6OhLlwACArZvX70a4Ndfb926fl106x5lbm5kZGQEcODA6NGzZgF06YJDV0SeKIDIHBv7PX4ceyTOzphdVG5YziOWttvHZ+vW779XV56rrKytra0V3UrdxwLGzz/HxUVGqgPG22+fP3/0qHw3jlpZ4RDuwYOjRz/3HED//i4uHh6iW0UaQwFEIVhSxrCwCRPmzJF/lz4zE4e63nzz3LkjRwB8fbdt+/57gB9+iIkJDwcoKqKcXJrQUMBYsCAsbP9+gMTEoqL8fNGtbBjrWZ84MX78Cy+oV1kRZTAS3QDSPAEBtraOjgBnzkycOG+eOgcRS5ooVykpJSVFRQCvvXb27KFD6p7Kc8917BgYCPDyy507d++uLsxFHo9t9Fy/Pi7u2jWAjRtxKIoFbKVwc2vTxsoK4NixceOefx6gc2c7Oycn0a0izUUBRKFYTecLFyZPnj8fYPLkI0d27FDnupI7NuS1dm1sbESE+siSTz77rLd3584A48d36ODrq383GLasls0xbdgQHx8ZCRAWlp6enKzcfTmsIuCxYzgkS7XJlY0CiMLZ25uampvjZPvs2QCLFp0+HRoKsGmTPCdJGxMenp2dkaE+qudU8MYzbhwGlBEj2rXz8VEHHLnODTWEbdhj18mWzx46hAHjypXs7PR09d9TuqFD3dw8PQG2bQsJmTJFef9e5PFUUp1UJ9X99BOoQAWqhQtFN4hoBptrWLwYJ0+rqurqdHkS28PD0tLaGqBHDxwC69nTycnNTZ019quvoqIuXODXnl9/HTZs0iSA0tLq6upqgMjI3NzMTPUxOjo3NysLoLRUN1ersVxV772HqXpYqWdKdqgjJJBAWreOAoiOu3Dh/v3UVICZM48f37NHPrmMiG5iWaZ/+WXIkAkTACZP9vIKCBDdKqJxDwIIPQvouL5927Zt1w4gKmratEWL1JPWhGgS269x5cqUKQsWUODQFxRA9IStrYmJmRnA5s1YN4HVT2D1FAhpDlY6lhVKu3JlypSFCwH8/GxsHBxEt47wQpPoemrWLOyJjBrl4dGxo3qy+qefcDWULkzcEs1jy6zXrRs8eNw4+ST/JGIY4NyHHPemEh5Ycro1awYNGjsW4OhRXF7JdsAT/caSfH73Xf/+I0eqh6gocOg5FahAVVFhgJMhcsj0T+QgJMTd3csLIDLy2WcXLQL4z38GDhwzhpZd6guWJp1t7IyNnTHj1VcB3ngjMLBXLwADAyw/QPScBBJIFRUqSZIkSfrsM3z3o49Et4vIE1tuum5dbOy1awD/8z9YaIpqqSsbCwhTp3p5deqEhZqGDlUn8ySkYZ9++iCALF2KbyxfLrpJRBlYUr7Vq3G/yapV0dGXL8svLTh5GAsY06bhTv9//atnz0GD1ClyCGm6jz56sA/k3XdxTGvFCtFNIsrENiru2HHnzs2bAN99h+nD2U5rIoaLC9aTefFFf//gYICFCzt16taNUogQTXjnnQc9kPnz8Y2ffxbdJKJbbt7Mz8/OVqdWYVljs7Mx1xPRDNazGDYMU4YsWoRzGJMmeXoGBFAJWKJhEkggzZ37oAcyciT2QA4fFt0uottYT4WVyN21KzExNhZg7967d+PjAXJzKypoSUfD2AT20087O7u5qTfsTZ+OQ1Le3pgzjBCtkkACafjwBwEkMBADSHS06HYR/VRTg3UtLl3KykpLAzh+HAPMsWOpqYmJAJcv4/us/oWuY6vehg1zd/f0BBg+3N3d2xtgxAgPD29vgHbtLCysrUW3kui3zp0fDGGxZ5a8PNFNIuRxystrampqACIicnIyMtSBhmWtjY3Nz8/JAYiLKyjIyZFvBUS28/+ppzA9fdeuDg7OzgC9ejk7u7vj0c0NwNcXd3TTklkiSxJIINnY/PXriYGEjUrLsfo2IY2rrcX050lJWIkvORmTR6allZYWF6sLW2Vl4fLjkpKamqoqgOLiqqqqKoD8/MrKJw2hmZoaGhoZqZMGslKsLDC0bdumjYWFuofACid17GhjY2dHqWOIwkkggVRaqjJQGagMLC3VAaROqpPqrl3DoazgYNHtJIQQIjMSSCCFh2MAefpp9boMFahAFRkpun2EEEJkSgUqUEVFsZf1Fvap/4AQQgh5FAUQQgghzSWBBJI6TtSbRGersXJy8EhbjwghhAAA1NZiAHFwwDmQwsK/AoRKpVKpVPn5+Co8XHRTCSGEyMmlSyxwsHca6GHQjnRCCCF/d+RI/XcMmvoXCSGE6CkJJJAejQuP7HPFuRBDQ3yVlYVHqgxACCF6RwIJpJwcXL7r4oJTHeocD4/0QB7+C1u3im4/IYQQQVSgAtWWLfUDh/qPG4A707t2rb9xhBBCiJ6QQAIpOBgnzx+NAw0u08X/4fp1fHX1qujrIIQQwokEEkgXLzYUOJjG93lIIIG0Zo3o6yGEEMKJClSgWru28b/WCBzKMjHBV7Gx+IO9vUVfHyGEEG1ISsKOQ0AA9kCqqhr6m432QP76ASpQgerTT0VfGiGEEG1aurSxwME0uVzNw8t72dxI586iL5UQQogm3LiBx6AgXHXVeO3PJue6+msZlwQSSIsX47uSJPqSCSGEtAa7j7/1VlMDB9PsZInYtWE7EmlynRBClO2HHzBwnDjR3P+zxRWXcUjLwgJfXbuGR19f0R8FIYSQRkgggZSYiC+CgrBjUFLS3B/T4nTtGLFKS/HV3Ll4rKgQ/bkQQgh5kvJyPM6a1dLAwbS63gcGkgsXMKLNmYPvNn0MjRBCCA/svvzCCxg4Ll9u7U/UWMEobNDOnfjqvffEfECEEEIe75138IF/925N/USNVxzEBn7zDb5avpzfh0MIIeRRn3yC9+WVKzX9k1s8id5UONk+fz6+Yqu2jI21fV5CCNFPLGvua69h4PjxR22dSesBhMGUKOPG4Y52libe0pLX+QkhRLexyfAZMzBwHDyo7TNqfAirIThHEhqKr7p2xePp07zOTwghuoktYurRg1fgYLgFEAYvMCkJXw0dise33sJjZSXv9hBCiLJUV+Pxk0/wOHAgPqDfusW7JdyGsBqDQ1x+fjjExT6Y6dPxaMA90BFCiDyw5bfbt2NPY9kyDBi3b4tumWwCSH04+R4cjK8++wyPY8eKbhchhPCxfz8GjCVLHi7wJx+yDSD1YUDx98dXbFUXOzo7i24fIYS0TH4+HnfuxIDx/fcYMKKjRbesMYoJIPXhkJepKQ55TZqE706ZgseQEDza24tuJyGEoLw8PB4/jsfduzFg/PFHU+tvyI1iA0hDHq5b0qsXHkeOxH+owYMx4AQF4ft2dqLbSwjRFawnERmJx7AwPLLs5Veu/FUWQ0foXABpKuzBdOjwcEDp0gUDjbc3vu/igu97eOD7rq74vqOj6PYTQrQlOxuPmZl4TEnB739mJn7/ExPxNZuTiIrCHsS9e6JbzpveBpCWwh6OmRm+MjfHXyRLS/zFMjZ+5DUhRDwJJJCqq/F7WVLy+NdlZRgIaDtBU/0/CcjUvHkIqd8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDctMjZUMTc6MjE6MjArMDg6MDAGZGoZAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA3LTI2VDE3OjIxOjIwKzA4OjAwdznSpQAAAFx0RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vaG9tZS9hZG1pbi9pY29uLWZvbnQvdG1wL2ljb25fNWU4bG9hMzJ4eW8vemhvbmdndW9ub25neWV5aW5oYW5nbG9nby5zdmfOsX+pAAAAAElFTkSuQmCC"

/***/ }),
/* 50 */
/*!*****************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static/arrow.png ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA5UExURf///9/f39jY2OHh4dnZ2djY2NjY2NnZ2dnZ2dnZ2dvb29nZ2dra2tjY2NnZ2dnZ2dvb29jY2NjY2Eqh6sMAAAASdFJOUwMe4Q9k8bmBnGZHmzbLkFxQd2EucX0AAADKSURBVHja7dVNDoIwGAZhyp+gtGjvf1gNC6cLDAmDu74HmDz5kqZNXV1d3f+3xCHeG78w5M8enQ7NeVurUbetA0qFQMkQKBsCpUOgbAiUDoGyIVA6BMqGQOkQKBE6RPVp+rmY2RFqzCe2g3rm85tAcQWBIiS2yhAmGWLdRaF4kWhYvqGX6Yyh+AEFZ27KJcvBtM7l+nLjAUe8fjguBEeF4LgQHBWC40JwVAiOC8FRITguBEeF4KgQHLcejlvXwnELaUyhqaurq9vdGzj4Uup+LNgJAAAAAElFTkSuQmCC"

/***/ }),
/* 51 */
/*!*******************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static/bank_v2.png ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 52 */
/*!****************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static/card.png ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 53 */
/*!***************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static/ccb.png ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 54 */
/*!*******************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static/checked.png ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 55 */
/*!******************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static/delete.png ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 56 */
/*!***************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static/boc.png ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 57 */
/*!****************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static/icbc.png ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 58 */
/*!****************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static/logo.png ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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UmVhZHlxyWU8AAADKmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzIgNzkuMTU5Mjg0LCAyMDE2LzA0LzE5LTEzOjEzOjQwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRkE0MjcxNTdEQzYxMUU4QkZBOERDOEVCQ0U0NTBGMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRkE0MjcxNDdEQzYxMUU4QkZBOERDOEVCQ0U0NTBGMSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkE4RkFCN0M3REM1MTFFOEJGQThEQzhFQkNFNDUwRjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkE4RkFCN0Q3REM1MTFFOEJGQThEQzhFQkNFNDUwRjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5BZZ+3AAAB1ElEQVR42mJkAALtmZb/GfAAJkIKwIoYiAA4FV1JO0Ylk0hWxILLHTgV6cyywqoIIIAYiQinb8S4iYs036E7esgEJq6ABAGAACImMBmo5m6yDcLlR5gcNnnaumhADWIhJoOTbRC+9ILPa9+o4TWAAAIlyDVAOphCc1SYqGAICNwZxumIidi8NILz2qhBdCyPaOcicgq1wRnYAAFErRKSgZo+GzSOoWpQD1sHsRCjCDnzkpp90DM+If2jUTbqoFEHjZZDpJYroyFESeNmNFHTykEqg8g9bwACCNRiVAYyLgEx1wA7Zu3V9OMhVBt1opajBlsaCh7NZaMOGnXQgFeupHZjKO1CjUbZqINGHTTqoFEHjTpo1EGjDhqMgw342kejUTaahggpoOdg1WiUjTpoODoIvL7tzSBykB5AgPbtGIdBGIYCaBR16swROEQvzT06cxjm1lRFDC0LcpXC+xJzpIdJhOW8e4z359MVWSde1C32xRYasC0mCmascDZzrQz+7NgABAgQINnRY/iUrb5D9v9l9toqCBAgQIAAAQIESAABAgQIEKCD5ZK9QPaMigoCdIJP7NdjOyoIECBAgGQBGjB8zVDjam153T0OqInJbBAWfdg8AExKZVcA71uIAAAAAElFTkSuQmCC"

/***/ }),
/* 59 */
/*!*****************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static/logo1.png ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACcUExURf///1VVVVpaWllZWYpzc+JUVFVVVVZWVlZWVlVVVdNMTFVVVVVVVcNDQ6k2Nqo2NutZWVZWVldXV1ZWVlxcXK44OMhFRbQ7O7w/P+hYWNtdXc9ISKEwMK48PMJBQaAyMr1BQdZNTe1ZWVVVVbY8PMpGRsVERNhNTc9ISNNLS9xQULs+Pq03N8FBQbI5Ob5AQOFSUudVVag0NKMyMhFK6zMAAAAjdFJOUwOyP1cMmsWaZ8ya+OScZMyYiGyiLGbMzMxtHMrGPcyJkerOPKKJ2AAAAXJJREFUeNrt2olugkAUhWGQcUHQ4lIWty5DXVAKlfd/t8K0KFWkaeKdSZrzv8And8SYzNUQQgghhJD8puNR9+6NxtNfWMPkRJlGA8t0TpjObrodTlrnljzhxE3q3RYnr1UL6/SwXucyqzyK7t0rvzwWa5h0TyOo1zBrg4tsjSSbi4zbH8qkgc3vcQIGDPg/w3aPJLsJJg0wYHWwZZJk4ZcLMGDAgAEDBgwY8J8bPg+K+qJ2keMEjB4ehPskjtfrt+12t9tsoij9yHtl1PAyDPe5nMOlnKYFHVDDj+9VWTyygB16uJCT5MewUxnw4UuOxTMLWRZ8qA77JLep4eHxShbDlgPn8sU7JQM+ycm6POYoiujh7HgedlwOWxZ8fcz08DLLKsM+v1MBNawtsnLYYWXYLzNymD0tHoo8z/N9f7VyXXc+78/wRwAwYEJY2aWmsmtcZRfXqq7qVS4nqF/HUL+AQr9yo2jJSNVaFUIIIYQQkt4nJy2ekR0kTCgAAAAASUVORK5CYII="

/***/ }),
/* 60 */
/*!*****************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static/logo2.png ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 61 */
/*!**************************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static/rmb_logo_black.png ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 62 */
/*!**************************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static/rmb_logo_white.png ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 63 */
/*!************************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static/select_cards.png ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 64 */
/*!********************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static/topup_v2.png ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIEAYAAAD9yHLdAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAI9hJREFUeNrtnWmYFsW1x6uGYROGfXEEYUCURGW4iiBGogEh6GMIhggBRSXmuhPj4+5VEX3ckngNXkWRCIGrF4iBhCtqwICoYYniAgOyXCVsssOgTGCGgem6H/5TjD0wzPZWnX67/78vh+oe3jp1qrpOV3XVKa0ISSNMYAITNG2KVE6O0kor3akT0h07Qp5yijLKKNOqFe63bInrrVrhesuWuF6/Pq43a1aWgTLK1KuH+40aha8fOIDrxcVhrb7+GvcPHcL9vXtxfc8eXN+7F9f37MH1bdsgN27E/Y0bkd6wQWfoDJ2xf7+0nQmpClpaAZJsjDHGmGbN0JHm5qKj7dYNd3Nzcb17d1w//XRcb9FCWm+35Oej3P/3fyh3Xh6u5+Xhel4erq9cqbXWWn/9tbTGJJnQgRCnwEF07oyOr08fdHwXXoi7ffpAfve7kJrtsUZs3w77LloE+y5ejOuLFkF++ikcjTHSmpJ4wQeW1ApMKbVpg9Sll6IDu+wydGj9+yPdqpW0nslm927I+fNRL3/9K9Jz52LKzN4npHrQgZAqgZHEWWchNXQoOqLLL4eDOPdcXM/IkNaTVIcggPzkE8i33oJ8/XWMWNaskdaQRBs6EBICjiInB6nBgyGHDoW0U08kGaxeDfmnP0FOnw7Hsm6dtGYkGtCBJBQ4CrvKaPhwjChuuAEjivPPl9aPRJmlSyF//3tIO2I5cEBaM+IXOpCEAIdxzjlI3Xgj5FVXQTZpIq0fSWe++QZy2jTIiRPhUJYvl9aMuIUOJGbAUWiNEcUll2BE8atf4e6PfiStH0kSixejHf7612iHb77J1WDxgg4kzcEqKLsh7ppr8KDeeSfSdnksIVHg888hn30WjuW117AKrPzGTJIu0IGkGXAYdesiNWIE5COPwHF07iytHyFVZ/NmyCeegEOZPBkO5cgRac1I1aADiTiYksrIwAP205/CUTzxBO7andmExAEb0uWppyAnTcKUV0mJtGbk+NCBRBQ4jn79kBo3DtKG+CAnxsaS2roV0sagsjGqvhWrSimllH3jLSgI/05RUTjdoEE4nZUFmZkZjrFlY2+Vl9nZkHEPxZIqVqyAvOMOOJL33pPWiIShA4kIcBinnYbUb38L+ZOfSOsli+3Y166FLB8Tav16dNgbNuD6hg3oaPLzpTWvCExB2lVvNvijDQrZpQvSdsOmjQV25pnHBHdMJLNmQd5zD+rZ1juRgg5ECDgM+0b70EOQd98NaT+Kx50tWyAXLUJHuWQJOsqlS5FetQpz4ocOSWsqRXgK075g9O4NO11wAdJ2g6d1PHXqSOvtFjsytC9aTz4Jh1J+xEhIzMAb6EUXoWNYt87Emm++gZw5E/IXv0D5O3SQroe4AbtmZcHOP/4x5PjxuL5+vXRLcEZgAhOsWQNpg3MSEhPs+RVo7RMmlLb6QPq5Sy3btkE+9xxk377h1WJEGtTH6adD3n036unDD+PVHktKIF98MTxVSEiagYZ88cWQmzdLP1qpIT8f8uWXIfv2hYz7lEl8Qf3l5KDDvecepFeskG5pqWHjRjvil7YzIScEDTUzEw137FjII0ekH6Ha8fHHkDfeCJn0j7jJAfXdowekHVnu3SvdImuGHWE99xye03r1pO1LiFLKOo4zzoBctkz6UakZhYWQL7+Mcpx9trRdSbRA+2jUCO3jppuQXrtWuuXWjA8/RDnsqjdCPIOGeMUVkPZjcbpg3yQffxwPUtu20vYk6QXaT0YG2s+PfoT0u+9Kt+zqsW8f9B80SNqeJOagwdWpA/nEE5Dp8vHRfrt44AE8MI0bS9uTxBO0swsvRDtbsEC65VcN+xw/+igkD0YjKQINqkULyLlzpZt61SgogHz8cchmzaTtSJIJ2p9dTPLBB9JPRqUEJjDB228j0by5tP1ImoIG1Lnz0XXmkaakBHpOmsQpKRJl0F6HDEmP/SmrV0PaEzoJqQQ0mN69IXfulG7CFRKYwARLl0L27CltN0Kqgz2GAI35vvsg9++XfqyOz44dfM7ICUFDGTIE8uBB6SZ7fPbtg/zFLyA1Q9GQWID23K4d5OzZ0k/a8TlwAHLwYGl7kYiAN4uRI9EwDh+WbqLH5623oGf79tL2IsQHdnUU2v+WLdJPYBi7v+v666XtRIRAAx09Gg0haqup7Kope2AUIckEz0GzZpDTp0s/mWFsv3HrrdJ2Ip5Ahd97r3TTO7Ytln7TMMYY06mTtJ0IiSJ4ToYOxXNiX7Siwpgx0vYhjkAFP/igdBMLY6fMHn4YkjGlCKkKeF5yciCXLJF+ksM88IC0fUiKwBvL7bdLN6kwe/ZAXnKJtH0ISWfCMeieflr6yT5KadRjafuQGoJa/PnPS2tT/htHYAITfPYZElxXTogL8HxdfTWkXTUl9tAHNnaYtF1IFQk3IHs+gDTTpkE2bChtH0KSAJ43G03Ynlcjhe2Hhg+XtgupgPBJf0VFsg3GYsNgM7YOIRLg+TvlFPQPn34q2x8UF0Ny6joyoELOPBPSbrSTwq4Pv+UWabsQQso4ejJoYAITvPOObD9ho2F/5zvSdkksNuYTKmLDBtkGYUc83KFKSJSxB0rheZ05U6zLsLHAAhOYoE0babskhqMxdEL7JqSwBzFddpm0XQghVQfPrT2e4b//W7YfWbyYJyV6Aga3Z3JLceAAKrx/f2l7EEJqDp7njAzICRNk+5UXX5S2R2yBgW0QQSlskMUf/EDaHoSQ1IHnWmvIyZNl+5lRo6TtERtg0HPOCXfgvikutkd3StuDEOIOPO92assuv/dNYSH6m/POk7ZH2gIDNmkCg/7znzIVyfXbhCQR9D916+L5nzPHe9cTmMAEX34JmZUlbY+0A1Z89VUZx2FhlE1Ckgz6gZNOgvzoI5l+aMoUaTukDfC4V14p5jMCE5jg2Wel7UAIiQ7oF1q3PjoyEIEzIRWCiunYEYaS2hD4xhuQjIpLCDkW9A9nnSXTT+Xno5/s0EHaDpEBhtFadofoihXIv3FjaXsQQqIP+o3LL4f0HXNv7lzp8kcGGGTUKBnHYd8gTjtN2g6EkPQD/cfYsd67rsAEJrjmGunyyxk+MIEJWrWC3L3bs/VLw7sPGSJtB0JI+oJ+xG5EfPNNv/3Ynj2JDYUCA8yY4dfglqefli4/ISQ+oF9p0QJyyxa//dm0adLl92zofv1kHMfHH9v13dJ2IITEj/CxEjY6twcCE5hgwADp8rszrDGmbIdnXp5fx2FPJuvaVdoOhJD4gw79t7/128+tWmWP+JUuf+oNaowx5rbb/BrUwg2BhBB/HI0abowxZvlyv/1djM4jQoHs3OCePd5sGFoWrLW0HQghyQP9UM+e6Ic8TGmFFiU1by5d/hQZ8JlnvDkOY0zZlFXnztLljyvWMUPm5KCeu3WLTcONCagPe6Rr9+72IDZpvZKGjXDhrQsMTGCC3/xGutw1N5gxxpjs7HCH7ov77pMuf9wID8nvvx/yq6+Ob/+SEvz9woWQffpI6x93YHfr0EeNgt3XrDlxB/PZZ5BDh0rrH3dg9JNOOnoSoRds9PJTTpEufw0N9vzzfgxlsTvKucoqVcCuzZtDLl5cs3qxQ/c775QuT9wIH9E6fXrtnp+XXoLklK8rYN/Bg/32i889J13uqhuoNFYLFLdnhXugdPmcdPnjgu1IYNe//S21lfXgg9LlS3fCjsPGcEvVc/TQQ9Llizsw9rx5HnpGY0xREer11FOly11Fw3g8GjIwgQlmzZIud9ywUxtuK4+OpLo4cxwh7IFG7dtLlzeuwL65ubC3r/0i48dLl7sSg7RpA0V9nRx46BDy7dJFuvxxA/b1dZAOHUll+HEc5bnrLulyxx3Y2dcL94EDNoSUdLkrMITHoGI8t8MpMPKGDd7q0xhjzMMPS5c7aoQdx+zZfuvjD3+QLn/cgZ3btYMsLPRTr488Il3ucgawqws8BEUMTGCCf/0rsUHEPAFjSx0lTEci6zgskydL2yEpwN7jxvmp1127IBs2rK3eGakp/rXXKq200h6GRlpppceP1xk6Q2fs2uU8v0Tz+ecy+T72GBp48qa2rONAO585E1cHD5bRRqr+k4oN8nrwoNt8WrdWRhllrr1WusSlnnPFCj+es6DAHi0pXe64A3sPG+anXisj/o5E5htHRaTRqp2Y4XfD4fLlcgU1xhjTu7ffhv3rX0tXcFKAve0y3gUL/NZzRcTPkUTLcVjGjJG2S1IJb4M4fNh5VQcmMEGvXkIFnTTJT4MuLuYbkQywf8uWkCtX+qnvykh/RxJNxzFtGmRGiqa2SU0J14dDAhOYYOJEfwULTGCCrCzkXlDgp2H/z/9IV2jSsVOHqA/f4fgrIv0+tkfj4/i3CExggtdfj20Y8DQFldOjh59GYD8NNGnivmCBCUxwww1+G3jPntIVSgAdSW3sRsdBqgcq6+9/99Morr/efYECE5hg/nw/BVqyRLoCyfGhI6mOneg4SM1ApV13nZ928c47jgty8smQvrbee/CIpFbQkZzILnQcpHag8ho2hNy3z20jOXLE2f46/PDo0X5au52Ty8qSrkBSNehIvm0HOg6SWlCZNlqya26+2VEB3n/fTwFeeUW6wkjNSKojoeMgLkE9nn++n3azcGHqFDfGlC3j9HUkIw8gSneS4kjoOIgPULn2wDDXMepsP9+iRYoUv+oqP63fnnDHdehxIa6OhI6DSGCPqvXTqH72s9orbIwx5tVX/Sg8bpx0BRE3xMWR0HEQSey2Bj+Na8qUmitqjDEmIwPSRm90/SBw6irupKsjoeMgUQCVb6eyNm1y28h27LD5VV9Rr55u+3ZITl0lhXRxJHQcJIqgMbz8sp9Gd+65FelRSYd98cV+zDF3rtZaax0EPiuByIFw/Lt3I6z0JZfg6sqVslrZMPIPPxwOq/7667gvFVZdKdjpT39C4qqrYL8jR2TtRWRxuPEvxEUXVfu/4EH6y1/8eLjhwz1bnkSMyI1IAhOYYM0aaTU44iDHw8auQiMpLnbbCO2LS3UUNMaUzYG5oqQksmf0EhEi50ikoOMgVQCNZdEit41x27aK8j9mCgsN9vTTkWrb1m3xP/kEQ/E9e2SrgUSFaE5teYRTVaTaLFrk9vezs+FITjut/J0KvoFccIHzMhtllHFdcJKuJM6R0HGQGuMr6Gzv3uWvVOBAunePV8FJunJ8R7JqlbReqWXGDHysHzGCjoNUC6OMOhq13Bi3+RzrFypwILm5zguulVZ66VLn+ZBYEHYk/frharo7khkzIEeOxCrEkhJpjUh6Ef4E8MUX7jJSWukq+AXMde3c6fajzKZN0oYn6U34Y3tUjtqtKtOnQ9apI21HEg/QnmbMcNtuj/2YnhFWIDsbKQfx4EN88om0wUl6k54jEo44iCOMMsq4bv/Z2eXPCyk3hfXd7/opbdQfdJIuHN+RROhju/04bpRR5ppr6DiIE7TSSnto91pppcv8RJkDMcoo07mzcwWMMsrk5TnPhySKaH5s58dx4hNf7b1TJ/uvMgeilVY6J8d53r48JUkk4lNbRhll/vY3JDhVRXyyYQPkoUNu8zmeA1FKKeXagRw+jAds/Xq3+ZCkc3xHsn27+4yVVnrMGDoO4pNwLMEtW9zmVqEDKbvhhq++4lCe+CTsSH7+c+cZGmWUYVBQIoRRRpmNG91mUjbQKOdATj3VbcG4fJdIsm+ftAaEuMe1A+nQwf6rnANxGNRQK62064IRQkiC0UorvXmzs983yihT5icysf/jpJOQbNjQbekcFox4Ae3FnlDWrJm0PtUjK8t5FlpppbOyYKfmzaVLXCFGGWVKSjDFt3+/tDoklTgMTquVVrpRI7TvBg0y0ZBat8YN1wXbudN1DiQ12AaC1M03Q15zDeS//RskT5A8PvPnS2tQKaXPO+q5qOhocFOttNLjx+Oj7OzZ0mqSmrB3r/MsSkcimWgwvs7j8FAwUivCO03ffhuyRw9pvYhLGjRAP9C/P9L9+8OxTJ2K9PXX88TQdMJDP1vqN0rfIJs2dZ6hUUaZ/Hzn+ZDaoZVW2obcoONINtddB/nQQ9KakOrg60W9WbNSB1K/vvO8tNJK8+CoqIKRxw9/iFTfvtL6kIhglFHm3nsj/02HAKOMMgcO+MmnXr1SB1Kvnp8MCwqc50NqhlZa6SuukFaDRIzSj6ZIDBggrQ6pCq53olvq1/c3AlFKKVVc7CcfUm2MMsrYo4wJKYdRRpkzzpBWg1SCVlppX/1s/foZdigSr4KRmpGZKa0BiShaaaXr1pVWg1QFDyMQrbTS9epl4B++DrahA4ksWmmlt26VVoNEFKOMMq5jLJFaY5RR5vBhP5kd/QbiIUOvBSM1Iw32LxABjMELxoIF0pqQKGFM6RSWh5GB15EOqRl2+S4jBpBv8/rr2Adiw4WTaONhg29p0NDSjDzMmRlllPH1sZ5UF3QQdkfy0KG4yhAXyWb1ashbb5XWhFQH7TymCDCm1IH4+jbh4WM9qRWIjfTRR0j16gX55puQ3IkcbwoLIV94AS8SF1yAFwtuAE4vfO3rO3KkNJRJUZGfDOlA0gV0HOvWITVoEDYa2pA3NhZWGm0s00or3aULEk8+6Taz//gPdMBffild7BPbIwig586dSH/yCerdOhKSdoT27bimsDDzaIgR18EUjTLK+CoYSTUYmdhIAun3sR0OsFcvP+18wYLwSI4Qn9jo6g4xyihTWJjhLcSIVlrpli2d50MIIUnFKKO8hZwpLCxdhWUdiDFuC0YHQgghztBKK+3wZNkQ+/ZlYKht92e4jlVFB0IIIW7x5UB27Ci3XnjXLmd5eT13hBBCkkrZmeVuOHIE/Xl+fpkDMcoo43oDmS/PSAghSeXcc93+/u7d9oCxMgeilVbOd5rm5Lj9fUIISR44r8VG+uje3V1G4YFGuRHIxo1uM+7Y0dnvE0JIUjHKKHPWWUg4XMarlVbaRij4tgNxPQLRSiudkwNP6WurPSGEJACttNLnnecns7Vr7b/Knf+wfr3bjBs0gLQjEYcjHpIS4PDbtUNq2DBIO8faqhXefNLgHBGttNJNmvjJ5/nnsXExwrHEbAQKo4wyO3YgvWgRbs6ciTluD0ejkhSSm+s8C6OMMmvWHHs9MIEJsrLQYQSBcUVgAhMMGiRtanJ87AgR8v77IYuKnLUHEkF27IC89FLp9kiqBurrd79z3jQCE5ig7OTSo1NY2A9SUAAP43oqq1s3aYOTCjDKKPPgg0g89RQkoygni7ZtIefMQa/Rt6+0RqQq5OW5/f0jRyA3bbJXjo0br5VW2rUidCBRAx1F586o/zFjpPUhUcBOTb70EtoHz/OJNn/5C+S+fW5+f948DDTKordXcPCIQwdilFHGRnMl0WLkSEiefU2+TdeueG6/9z1pTcjxwTerr79G6q67Uvvr9ryohx4qf6cCB/LZZ+5KqrTSXbvijYahTaKFr1UcJO3QSittz4chUQWO5A9/QGrUKMhvvqnZr9n/N2QIfnf58vJ/cezqGaOMMkuWoMHY4IqpXnartT2wBml7YBGRpVkzaQ1IlEmj818SDjr8qVPxoj5zJvrbyy5Dv24/gtvVlJ06hY/1WLgQ6d//PnyMw7Ec40DwH3btQsb2QJyyr+6pK6HSStOBRAs7BCbkePBkwnQjvBx75sxU/34lh6/bdeGu6NPH7e+T6rFsmbQGJKIYZZThAVkkTCUOZPFit9lfcAHWFTdtKm0IopRSr74KWbbKgiQco4wya9dixmDpUml1SLSoxIG8957b7OvWRcPkOnNpMNS1kQHGjpXWh0QBe07QTTehfZSUSGtEokWFISjQYNavx7eQL77AVQffQpRSSg0cCDl7trRBkg7q/amnMDI8fBgO/rHHcLdhQ2n9iA+2bcPIY9QofBP94ANpjVJNeBXogAEob5cuaO+ZmUhv3Yr0/Pl4LlxHK08/Kl1dBUOPG4fUr37lRo1Nm1BBDPceNVD/2dlIXXklZI8ekK1b40GrV09az0oJxcJyvRz1o49gl6jHwjp4EIlt2yDtN88//xnPY2GhtJqpIrwR8tFHIe+8E7KyF6MggPzjHyFvuw32cbVhL0bgTXTgQD8xVrgPgbgB7atXLz/tmPslogIqxcZ2mzYtNZWcl2djB0qXT5qMSv9CK630++8jYd9YHKCVVnroUGmDEELihu1XRoxIze/ZUEx2JJNcKnUgGKoVFSH19ttu1Rk61L4xSBuGEBIXbrst5T+plVb6hhswEkmDKVxHVD4CsRhllLFzgK6wOyI5lUUIqTl4EbXfPOyG5VTTuDFkcmP7Vd2BaKWVtjvGHX4c1EorbWO4EEJIDTDKKGNDrzgMDqqVVvrkk6WLK0WVHUh4Kuutt9yqdfXVeINweLYvISS+aKWV9hVVOrnRq6s+ArEYZZSZPt2tWk2bIh+7bJQQQkjUqL4DUUop9de/Qtr14w7QSiv97/8uYBNCCCFVoNoOBDtT7dGGNu68K77/faxy6NlTwjiEEEIqpoYjEFU6lTVxIhIOY+RopZV2tQOeEEJITamxA8FIZPNmpObPd6vmsGEYibRv79M4hBBCKqbmI5AQzz/vVk27yoEjEUIIiQopciB2h/rnn7tV95ZbMBJp29ZtPoQQQiqj1g4E+0Ps2em/+50zTbXSSjdqhMS993qxDokPWmml7eIPVxiDfHbtki4uIT5I0QhElX5Uf+01JLZvd6axVlrpW2/FRsN27VwbiMQEo4wyrjv2t94KH8xFSLxJmQPBR/VDh5D6r/9yq3aDBpAPPug2HxIX0D6/+gopu/gj1TzzjHQ5CfFJ6kYgIexH9Z073ap/4434JmLDKxNSFSZMSO3vzZ6NkYc99oCQZJByB4IH6cABpH7zG7fq22ib9sREQirBKKPMs88isWRJ7X5s1Sp79Kt0sQiJFfhG0bAh5Natzk+CM8YY8+MfS5ebpAcYuTZujHYzZQpkSUnV2tncuZD2TG0SNVA/2dl++p2f/lS6vFI4P7gJBr7lFqRefNFtbvbj5dlnh0dChJwYtNNOnZAaOBAji86dsWijuBjXFyxAu1q4UFpfcmKsA0HKYcw+pZRSV16JdjFrlnS5Ywcqsk4dyLw85y8DgQlM8J//KV1uQogcHIH4wdFH9DLgmW2srDvucF4irbTSd9yBiu3d23l+hBCSUJw7EAscybvvIvXGG46LVVquCROSfmYxIYS4wpsDOYpRRpm770bC7htxRffukI8/7r2chBASc7w7EGzo+uILpJ56yn2GSit9112Y0urXz3d5CSEkrvgfgViMMspYB7JqleNilpZz6lQ4khYtxMpNCCExQcyBYCRSXAxHYo+udXgwlVJKqfbtkd+MGXZ1mFT5CSEk3ZEbgZQCR/Lhh0i98IL7DJVWesAAJB5+WLr8hBBCaglGBA0aeNsvgk0jAeRPfiJdfkJI6uA+ED9kSitgwTLfoiJUyHXX4eo//gHpahmuLt2JP3ky8l23DnqsXi1tD0J8gGXuWVkYmfftiynenBykGzaU1q92ZGX5yeeKK9B/dOkiXeLacfgwpD2OY+FC9Ic7dkhrVm3QsO+5x88bhGXDBsiTT5YuPyEuQPu2kSEeeQSyoMDvc0bSgyNHIKdMQX/ctGn59uQ8FlbtGnpGBt6I5s3DG1H//n5yX7YM8gc/gAc+eFDaHoTUBjxPdsQ9bRrk8OHSepF0YuVK9McXXohv1wUF4h/RKwIddxAgdfXVkFu2+Mm9Z0/IP/4RnrduXWl7EFIrjDLKjByJBB0HqQnduuFF/skn7ZXIjkDKgzeoc85BavFiSA9ztEYZZf78ZyR+9jN4XtdnaxOSWvAitGwZOoDzzpPWh6QzRUWQrVpFdgRSHoxIPvsMKQ9BGY9mrLTSQ4ZAvvLK0ak1QtIAe+4J2u+550rrQ+KAPVK8V6+06wjhSCZORMpKX9jVYS++SEdC0gKttNJt2iDB9kpSSXZ2+jYoo4wyo0cj8c47fjO/6SbI117DG15mZJZDExLCKKMMD1YjLsjPT5tvIBURXsf+97/jqo3C64s5cyCHDbP7WaTtQohS5Vcz7tyJ56RVK2m9SDpjo6i3a5e+I5BS7HIyPCCDBuGq6yMsyzNoEPKfM6ei9dKESHB0NaNWWumZM6X1IXFgyhS0q717034EUh504Lm5eGDs2dW+o++uWgWHcvnlcHCbN0vbhSQbjETatUPKLkZp3VpaL5JO2H6tTx/0a998k/YjkPKgYHl5KOill+Lq/v1+tTj7bDiwf/wDD26PHtJ2IckGb4xbt9oXG1z1PVInaYdRRpl334Xs3986Dns7diOQY8pvjDHme99Dat48yMaN/Wphv4mMHo0HedIkabuQZIORepMmeNG5+WZctVPAnTtDpnssLLvqzOGUsl2koJVWurhYusS1o6gI5Vm+HOnJk1GuWbPQbxkjraEYeGB++EM4lIMHZWPMjB/Ps9oJcQeeM0bjdU3sprAqAkMvu9zXDuH/9S8ZbW69FfL999EAc3Kk7UMIIdUlMQ7EgqHYwoUYqvXti6t79/pXRGmle/dGYsUKOJIbb5S2DyGEVJXEORALRiQff4yUPaFw924ZbZo0gXz5ZTiS6dMhmzeXthMhhFREYh2IJRxjq3dvjEzWrpXVykZLXbMG30quvVZWH0IIOZbEOxALHMk//4mppQsvxNX335fVqm1b6DN1KkYkb74Jh9Khg7S9CCGEDqQccCT5+RiJDByIqzNmSOsFLr8cDmXVKjiU+++HtNExCSGERAZ00FpD3ncfpD3qMSps3mynuqy+0nYjRBI8B1zGSyJGeD/Jnj3SruP4LFoE2a+ftL0IkQDtnw7ENZzCqibh/ST2ZLdPP5XWK4z9hrNgARr4e+/B8V10kbRmhJD4QAdSQ/CtZONGpGyHPW4cZNS2/F98Mb6d2I2LVg4eDMmDhgghRBy86Q8ciI55+3bpyayqsW4d5M03QzZqJG1HQmoD2jGnsFzDN88UgymuefOwiis3F1ffeENarxNzxhmQL70EuX07HOHEiZDnny+tISGEJBa8qQwfDrlzp/SYo2asXAlpV6PZqK2ERAu0T45ASMxAg2vZEtJuEExjAhOYYNkyyHvuwcWuXaXtTJIN2iEdCIk56Hj790dD/PxzaX+QWjZsgJwwAfKKK3jkL/EB2hsdCEkI6FgzMyFvvx0NMz9f2gW4oaQE0k6JTZgQ3gjZtStknTrS9ULSE7QfOhDXcMdyREHDbNkSqcceg7zhBsi6daX180NhIeTq1ZArV0KuWgW5fj2kXU69cSOWV3/9tbTmVQWO09bnmWdC2sUXublYft2jBxZldOsW/t/LluH+44+j3EuWSJcnKlgHgpTro3uvvBL2nzVLuty+oQNJE/BA2I/WY8ZAjhwJyTf1MNaB2I7DnvdiY5zZ9N696ICDAOl9+8K/Y48ito7MYo9E/pYjN8ooU7cufq9x43DahuVv0yYsbQdn0zU9oTIIkN9NN2EV4CuvyNpfHjoQP9CBpCl2qgepsWMhhw2D5MbAZHLkiD0oDY5k0SJpjaSgA/EDO5o0BQ123TrIESPQcXznO7g7YQJk+TdnEm8yMzHieeEFdKB8kSBuYQOLCXjj/OILOJRbboFD6dgRdx99FFLqxEXil+7dIe1xBIS4gQ4kpsCh7N4NhzJ2LBzKqafirh2xvPsu0lGL3UVSw4gR0hqQeEMHkhDgUA4dgkOZMQPpSy6BI7GhTJ5+GvKrr6T1JamgVy9pDUi8oQNJOHAkX34Jx/LAA7jasSMcy/e/j/QLL0Du2CGtL6kO9etLayCLr5F1ckfwdCAkBBxJENhVPEj/8pe42749ZN++cDDPPIO03ZdBosXy5dIayLJ/v5987D6k5MFlvCQlYENchw5YBXTppbg6YABknz6QJ58srWdiMMooc/HFeBH44ANpdcTMYIwxZtMmpDp0SO2v2xen3Fy8aCV3JEKIU/Agn3ba0ZAloXDxn36K+4cO+Qk9EXfuu0+6vqMC2tezz6bWviUlPOETcARCIoGNBYYRjN0gaUN3dO8e/tjfqRP+LicHabvTO6ls3w75y18mdUNbRaDDtyPfFSsg7c7/mnL77bDz889Ll08aOhCS1qCDaNYMqU6dILOz4XBatoSjsTHFrGzVCrJpU/yddVyZmUhnZUmX68QcPgx958xBeupUdGgHD0prFlXwgtKzJ+z2v/+Lq3anemXYkDajR8POkyZJl4cQQohn8MLRvDnkmDGQH38MWVAAaaNgT5sGaSM8kPL8Pwq2Lyq+nioPAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA3LTIwVDEwOjAxOjMxKzA4OjAwGje3TgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNy0yMFQxMDowMTozMSswODowMGtqD/IAAABEdEVYdHN2ZzpiYXNlLXVyaQBmaWxlOi8vL2hvbWUvYWRtaW4vaWNvbi1mb250L3RtcC9pY29uXzhkcm9vYWtjc2U5LzMuc3ZnfulrjQAAAABJRU5ErkJggg=="

/***/ }),
/* 65 */
/*!*****************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static/trans.png ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABaCAMAAAAhM5CiAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA2UExURf/Z2f9xcf84NP84NP9/f/9OTv9/f/+UlP+Li0xpcf9JRv88Of9AQP82Mf9AQP9DQ/9AQP82MvOqohoAAAAQdFJOUwMJgoMIAwIGBQAjfMTc9Wh0y3o9AAACGklEQVR42u3YYVPiMBSFYdHovbQg+P//rLmTbc/W0ySnGR1nZ3m/Eh6SFkrTp/P5/PQ9BfXg/lPOqVHOGx3kbpf3e7P3y03mpstd6DJpnIemeC5w7re8lnmyZtOcj8bNvce5x+Rm6zbH9NzbnOfy5059bspr8BxzW83yYTGhGLZ4xEFbuVRt5eBVOFu41Gwdts9BK+NSt8LBI87BJSFwXuPsOGc/z0EDdzpN8wuap6LECydw8JrcKXf9+LsruFyP84VLPS6tXFo43+Ns5co7vizWNh44k7hUsk3wRC6VxULb9/4MUzlo+16Hc+KgkcecCxw0z8HTOPvClTP7vAnfZ3BmGnf92O06xlmNsxEu/q6ed4o/uSEOx3n7MxzkoMEb4kgjT+WMxiH6VBM563F2lKuf2TGu+r37NW58seOn4sE9uPFLwM9foPTL5+9f3MH5oo1y5JEmc7GJIo+02ERJXGzxwEXAwMUWD1zjlqdsQNu3PGUDKt1BJXV7nGpceODUzXtS7j4j5dFCSj0OnnCrHZnKwYOIjYDEYbV4B8DEWnWbwtPbeluNJ9fmInAIL7Q48rSgNTkTtS4HT9eYo+mZqvGjhdJb9Br5gV6jtygM5qIjGnPsDWvg4EUiBg0ce5GIQWMOXtTEoDEHDyBQhoBBA8eeGDTmAEaqBQwce5FiQQPHIKpIjDHHIMcYc9wgBo4TKJFDksSc3r/MfQLZ26dowTCPUgAAAABJRU5ErkJggg=="

/***/ }),
/* 66 */
/*!********************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static/trans_v2.png ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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YYYtLkZ7+eWtK5kOr3rV8rZvDz4YrQCZF6awAKgiQACoIkAAqCJAAKgiQACoIkAAqCJAAKgiQACoIkAAqCJAAKjiUSbMsPHDDB95pHUlyz372dGu6ejzdehQtAcPth7pck880boC+iVAmEnx0L5PfSp647a9eIjh3r3R27Rp8htIJZXbboun7W7e3Hq8zDdTWABUESAAVBEgAFQRIABUESAAVBEgAFQRIABUcR8IMynut3jve+O+iMsua13Pcqee2tmqc8opv+Y1ZVRGZfTd77Ye6fK6vvrVuD/n619vXQ79ECDMsJe8JA5c557bupJ+nXjidI77+99vXQH9MoUFQBUBAkAVAQJAFQECQBUBAkAVAQJAFQECQBUBAkAVAQJAFQECQBWPMmGG/eY38SysW25pXckROeWUX/va6Kxf381GHn44xn3vva2Hu3zcv/1t6zLolwBhJsVD+3bujN64bS8e8rh3b/Q2bZr8BiI48kJeyAubN7ceL/PNFBYAVQQIAFUECABVBAgAVQQIAFUECABVBAgAVQQIAFUECABVBAgAVQQIAFUECABVBAgAVQQIAFUECABV/D8QmLhPfzraa6+d+Kpzyinv3996hJCSAIGJin90dcMNreuAPpjCAqCKAAGgigABoIoAAaCKAAGgigABoIoAAaCKAAGgigABoIoAAaCKAAGgigABoIoAAaCKAAGgigABoIoAAaCKAAGgigABoIoAAaCKAAGgigABoIoAAaCKAAGgigABoIoAAaDKwAJkNOp2/ccc03qEQNfWrOl2/V0fp/ozsAB5/PHOVl1SSWXDhtYjBLq2cWNnqy6ppHLwYOsRTsrAAuSRRzpbdU455bPOaj1CYPJKKaWUnKN35pmdbSinnPLDD7ce76QMJ0BKKqns29ftRl72sjIqozK64ILWwwUmbdu2aF/0om6386tftR7ppAwnQHLKKd9/fz/b2bEjzlg6vNQFOhcnhCefHL3Pfa77DaaSSg/HqZ4MJ0BSSil973v9bOeFL4z2hz+MN+DrXtd65MDqxQng6afHCeEPfhBL+/qOs6/jVPdy6wImJQ7k69ZF78CBeGM861k9bb1Ee9NN0d58c7S/+12ccTz55OrWk3PU/Z3vdFvvzp1R17XX9rN/oJGccspr10bnxS+OdjwFff75h/+op+PgX/4S7caNOeec89JS691ztAYTIGNxZvG1r0Xv3e9uXQ9A+PKXIzi2b29dyaQMNEBe/ero3Xvv4WEObpzArBiN4or/tNPyQl7ICz//eeuKJmVg34GkFAl/333R27OndT3AvPvGN4YWHGODPTOP70TGP8d74IF+vxMBeOyxaF/+8jix3b+/dUWTNrgrkLFI/AcfjOD46Edb1wPMm6uuGmpwjA32CmSl+G5k587ovec9resBhuqLX4zguOKK1pV0bX4CZFRGZXTssXFFcv31sfStb21dFzAUu3dHu21bBMg//tG6oq4NdgprpZjSOnQofg1x8cWx9LrrWtcFzLrxfVXvfOe8BMfY3ATIWATJ+Ma+Sy+N9iMfifbQodb1AdPuqaei/djHon3f+46coM6ZuZnC+l9iiuu002KK6wtfiKWnn966LmBa3H57XGlceWUExs9+1rqi1ubuCuS/iTfET38avTe+MdqtW6P90Y9a1wf0Zfxoottvj3bLlpiaOuMMwbGcK5BVil9xnXJK9N7+9jgTOeecuGJZXIzl69e3rhNYrfH/D7r77mhvvTXaXbsiMH7969YVTjsBMiExBXbSSdHbsCGCZd26CJrjj29dH8ylnHLKf/tbfA7HN/YdOBBXEg891Lo8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgLF/AqPhIWvXPwQBAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTA3LTIwVDA5OjUzOjQwKzA4OjAw2b0iAgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wNy0yMFQwOTo1Mzo0MCswODowMKjgmr4AAABLdEVYdHN2ZzpiYXNlLXVyaQBmaWxlOi8vL2hvbWUvYWRtaW4vaWNvbi1mb250L3RtcC9pY29uX2d4ZnltNnFodDg2L3poYW5nYmVuLnN2Z7xjQSUAAAAASUVORK5CYII="

/***/ }),
/* 67 */
/*!******************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static/wallet.png ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 68 */
/*!******************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static/下载 (6).png ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAB+UExURauqq8kCD8cDD8YFEsoCDckCDscGFExpcb29vccCDsgAC8cAC8IOHccAC8gAC8YACscEEcYDEcYFEscAC8cIGcUDD8AePr8/f8YAC8QmTscDD8UEE8gAC8gAC8YADMgAC8cAC8gAC8YDD8YAC8gCDcgCDscAC8gAC8cBDMcACylpTq4AAAApdFJOUwJlRilbaCQAAVW16xH9z4w5Si/6G0IIBJ0GQDXf1qWv79pRmXF2wcOBuOfEAAAAAftJREFUeNqVltl6ozAMhU9YPAKc0Aw7k6ZNA0nz/i9YyxDswtDic+Xt/xCSLBl/5iLCJKLF9gwgoPHS+JJkWXKJU68B6AeAUEbn94el93NUglYAAoLTY6FTABuBdd47jGeSQ1zX8SEZpwcPtASoSvXu/tYJjBLdba8X04rmAGTMO9k1xzfl14zXY4nvAMQrr7/5WMh/451XARsgyeezHf6rMGNCkgGoYnuSFitqE7aqoidASPm8wKoEEyloBOCxPS3EzkiW1sRHy1Z5GAAC+38HRA8jX1qTEAg5HiANIGD/4GcA7KsADFB5Ugb5vwG+MupUkgL0uStG4EMMaip/kDcCuKpBBAbOKh/yJ/CycNATyFWWnNVxalQ+3/A7gJvK9oZA/M1uAvpIKwfkh1Y4AT17lqCDJkZgkgf8s356+lYKIFZBxhYAKtwxgAtHZAvA8b1MHEu+aHUG+BxW2IfGFhWQGraOBghgq1YBdgdsk/JCq7dMarUsk5x/2t2tzoGbp0Z31JKAHEa7WWo4JN9dJ59rei8uUPB3UFmNg+MTqPUFcriie31FnYuAKTPhxjJjClmBPDCSjTURKEwhM6XSx6p8UyrtYlxgRYVdjO1yH24s9+4NxbSs/aJl1fuxZa02xXtvmmJ/N03Rpe0WINfG7vh02P44KZaPE+fnzxfXDpGDVIksHAAAAABJRU5ErkJggg=="

/***/ }),
/* 69 */
/*!******************************************************************************!*\
  !*** /Users/yolanehe/Desktop/HbuilderApp/digitWallet_icbc/static/下载 (7).png ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACiUExURf///1VVVVVVVVZWVmBgYMBHR7E+PlxcXFVVVVZWVuRZWV1dXdFRUb9LS1dXV1VVVVVVVV1dXaqqqlZWVnV1dVVVVdJKSuRVVdxQUOxsbM5ISM1ISMREROpXV+5jY8hHR8RDQ+xZWaMzM8xISFVVVbc8PMpGRsVERNJKSsJCQtZMTLI6Os9ISL5AQNpOTrs+PuZVVd1QUKo1Na43N+FSUqYzMzHh6iwAAAAkdFJOUwP93aQlQUJCwIFBMEIoY+TzPAaHDenAwMAN0MBx6S6W6aaWpk1U17IAAAEYSURBVHja7dVdb4IwFIDho1CZg/otoLi5aUFQmUzl//+1nXZNtkQtp4ne+V5BwpNyuDjAswc2coeesaE7gn95bdFY2/t7vtcShFo90LkDQWrgauAIYo4GffmGqE25csq+vpETjKGhsZxCXwuse/EEXydhGMdxFEWf7wBdgZnA7CPL9nm+/fo+V9XbrBmwYrNBsZXiXL0SQPkrciUo4FAWxTxJwjkKCuikaVkyvAjkGRSwS9ODAnsUFHBCsWAsWMjRaUCegaNnKAICOB5PWuDHIgBeK6HP4M0AVnWNYqfEEggAeEfFGONgBpfdCfjOy40c/xqYTMXNppMrwBeG/HucQJ/BfgnQ14z1IrNelbbL2HbdW/9Qnj2uHz7HbjkcRLAbAAAAAElFTkSuQmCC"

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map