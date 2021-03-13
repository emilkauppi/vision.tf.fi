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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 79);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(39);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 17 */,
/* 18 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 19 */,
/* 20 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 */
const convertKeys = __webpack_require__(29);
const strToCamelCase = __webpack_require__(113);

/**
 * Convert object keys to camel case
 */
module.exports = function toCamelCase(obj, ignored) {
  return convertKeys(obj, strToCamelCase, ignored);
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Deep cloning helper for objects
 */
module.exports = function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 */
const convertKeys = __webpack_require__(29);
const strToSnakeCase = __webpack_require__(114);

/**
 * Convert object keys to snake case
 */
module.exports = function toSnakeCase(obj, ignored) {
  return convertKeys(obj, strToSnakeCase, ignored);
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(10);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(43);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Helper to convert an object's keys
 */
module.exports = function convertKeys(obj, converter, ignored) {

  //Validate
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Non object passed to convertKeys: ' + obj);
  }

  //Ignore arrays
  if (Array.isArray(obj)) {
    return obj;
  }

  //Ensure array for ignored values
  if (!Array.isArray(ignored)) {
    ignored = [];
  }

  //Process all properties
  for (const key in obj) {
    //istanbul ignore else
    if (obj.hasOwnProperty(key)) {

      //Convert key to snake case
      const converted = converter(key);

      //Recursive for child objects, unless ignored
      //The ignored check checks both variants of the key
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (!ignored.includes(key) && !ignored.includes(converted)) {
          obj[key] = convertKeys(obj[key], converter, ignored);
        }
      }

      //Convert key to snake case and set if needed
      if (converted !== key) {
        obj[converted] = obj[key];
        delete obj[key];
      }
    }
  }

  //Return object
  return obj;
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 */
const splitNameEmail = __webpack_require__(51);

/**
 * Email address class
 */
class EmailAddress {

  /**
	 * Constructor
	 */
  constructor(data) {

    //Construct from data
    if (data) {
      this.fromData(data);
    }
  }

  /**
   * From data
   */
  fromData(data) {

    //String given
    if (typeof data === 'string') {
      const [name, email] = splitNameEmail(data);
      data = {name, email};
    }

    //Expecting object
    if (typeof data !== 'object') {
      throw new Error('Expecting object or string for EmailAddress data');
    }

    //Extract name and email
    const {name, email} = data;

    //Set
    this.setEmail(email);
    this.setName(name);
  }

  /**
   * Set name
   */
  setName(name) {
    if (typeof name === 'undefined') {
      return;
    }
    if (typeof name !== 'string') {
      throw new Error('String expected for `name`');
    }
    this.name = name;
  }

  /**
   * Set email (mandatory)
   */
  setEmail(email) {
    if (typeof email === 'undefined') {
      throw new Error('Must provide `email`');
    }
    if (typeof email !== 'string') {
      throw new Error('String expected for `email`');
    }
    this.email = email;
  }

  /**
	 * To JSON
	 */
  toJSON() {

    //Get properties
    const {email, name} = this;

    //Initialize with mandatory properties
    const json = {email};

    //Add name if present
    if (name !== '') {
      json.name = name;
    }

    //Return
    return json;
  }

  /**************************************************************************
   * Static helpers
   ***/

  /**
   * Create an EmailAddress instance from given data
   */
  static create(data) {

    //Array?
    if (Array.isArray(data)) {
      return data
        .filter(item => !!item)
        .map(item => this.create(item));
    }

    //Already instance of EmailAddress class?
    if (data instanceof EmailAddress) {
      return data;
    }

    //Create instance
    return new EmailAddress(data);
  }
}

//Export class
module.exports = EmailAddress;


/***/ }),
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 */
const {Client} = __webpack_require__(82);
const {classes: {Mail}} = __webpack_require__(49);

/**
 * Mail service class
 */
class MailService {

  /**
   * Constructor
   */
  constructor() {

    // Set client, initialize substitution wrappers and secret rules filter.
    this.setClient(new Client());
    this.setSubstitutionWrappers('{{', '}}');
    this.secretRules = [];
  }

  /**
   * Set client
   */
  setClient(client) {
    this.client = client;

    return this;
  }

  /**
   * SendGrid API key passthrough for convenience.
   */
  setApiKey(apiKey) {
    this.client.setApiKey(apiKey);

    return this;
  }

  /**
   * Twilio Email Auth passthrough for convenience.
   */
  setTwilioEmailAuth(username, password) {
    this.client.setTwilioEmailAuth(username, password);
  }

  /**
   * Set client timeout
   */
  setTimeout(timeout) {
    if (typeof timeout === 'undefined') {
      return;
    }

    this.client.setDefaultRequest('timeout', timeout);
  }

  /**
   * Set substitution wrappers
   */
  setSubstitutionWrappers(left, right) {
    if (typeof left === 'undefined' || typeof right === 'undefined') {
      throw new Error('Must provide both left and right side wrappers');
    }
    if (!Array.isArray(this.substitutionWrappers)) {
      this.substitutionWrappers = [];
    }
    this.substitutionWrappers[0] = left;
    this.substitutionWrappers[1] = right;

    return this;
  }

  /**
   * Set secret rules for filtering the e-mail content
   */
  setSecretRules(rules) {
    if (!(rules instanceof Array)) {
      rules = [rules];
    }

    const tmpRules = rules.map(function (rule) {
      const ruleType = typeof rule;

      if (ruleType === 'string') {
        return {
          pattern: new RegExp(rule),
        };
      } else if (ruleType === 'object') {
        // normalize rule object
        if (rule instanceof RegExp) {
          rule = {
            pattern: rule,
          };
        } else if (rule.hasOwnProperty('pattern')
          && (typeof rule.pattern === 'string')
        ) {
          rule.pattern = new RegExp(rule.pattern);
        }

        try {
          // test if rule.pattern is a valid regex
          rule.pattern.test('');
          return rule;
        } catch (err) {
          // continue regardless of error
        }
      }
    });

    this.secretRules = tmpRules.filter(function (val) {
      return val;
    });
  }

  /**
   * Check if the e-mail is safe to be sent
   */
  filterSecrets(body) {
    if ((typeof body === 'object') && !body.hasOwnProperty('content')) {
      return;
    }

    const self = this;

    body.content.forEach(function (data) {
      self.secretRules.forEach(function (rule) {
        if (rule.hasOwnProperty('pattern')
          && !rule.pattern.test(data.value)
        ) {
          return;
        }

        let message = `The pattern '${rule.pattern}'`;

        if (rule.name) {
          message += `identified by '${rule.name}'`;
        }

        message += ' was found in the Mail content!';

        throw new Error(message);
      });
    });
  }

  /**
   * Send email
   */
  send(data, isMultiple = false, cb) {

    //Callback as second parameter
    if (typeof isMultiple === 'function') {
      cb = isMultiple;
      isMultiple = false;
    }

    //Array? Send in parallel
    if (Array.isArray(data)) {

      //Create promise
      const promise = Promise.all(data.map(item => {
        return this.send(item, isMultiple);
      }));

      //Execute callback if provided
      if (cb) {
        promise
          .then(result => cb(null, result))
          .catch(error => cb(error, null));
      }

      //Return promise
      return promise;
    }

    //Send mail
    try {

      //Append multiple flag to data if not set
      if (typeof data.isMultiple === 'undefined') {
        data.isMultiple = isMultiple;
      }

      //Append global substitution wrappers if not set in data
      if (typeof data.substitutionWrappers === 'undefined') {
        data.substitutionWrappers = this.substitutionWrappers;
      }

      //Create Mail instance from data and get JSON body for request
      const mail = Mail.create(data);
      const body = mail.toJSON();

      //Filters the Mail body to avoid sensitive content leakage
      this.filterSecrets(body);

      //Create request
      const request = {
        method: 'POST',
        url: '/v3/mail/send',
        body,
      };

      //Send
      return this.client.request(request, cb);
    } catch (error) {

      //Pass to callback if provided
      if (cb) {
        // eslint-disable-next-line callback-return
        cb(error, null);
      }

      //Reject promise
      return Promise.reject(error);
    }
  }

  /**
   * Send multiple emails (shortcut)
   */
  sendMultiple(data, cb) {
    return this.send(data, true, cb);
  }
}

//Export class
module.exports = MailService;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const axios = __webpack_require__(84);
const pkg = __webpack_require__(110);
const {
  helpers: {
    mergeData,
  },
  classes: {
    Response,
    ResponseError,
  },
} = __webpack_require__(49);

const API_KEY_PREFIX = 'SG.';
const SENDGRID_BASE_URL = 'https://api.sendgrid.com/';
const TWILIO_BASE_URL = 'https://email.twilio.com/';

class Client {
  constructor() {
    this.auth = '';
    this.impersonateSubuser = '';

    this.defaultHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'sendgrid/' + pkg.version + ';nodejs',
    };

    this.defaultRequest = {
      baseUrl: SENDGRID_BASE_URL,
      url: '',
      method: 'GET',
      headers: {},
      maxContentLength: Infinity, // Don't limit the content length.
      maxBodyLength: Infinity,
    };
  }

  setApiKey(apiKey) {
    this.auth = 'Bearer ' + apiKey;
    this.setDefaultRequest('baseUrl', SENDGRID_BASE_URL);

    if (!this.isValidApiKey(apiKey)) {
      console.warn(`API key does not start with "${API_KEY_PREFIX}".`);
    }
  }

  setTwilioEmailAuth(username, password) {
    const b64Auth = Buffer.from(username + ':' + password).toString('base64');
    this.auth = 'Basic ' + b64Auth;
    this.setDefaultRequest('baseUrl', TWILIO_BASE_URL);

    if (!this.isValidTwilioAuth(username, password)) {
      console.warn('Twilio Email credentials must be non-empty strings.');
    }
  }

  isValidApiKey(apiKey) {
    return this.isString(apiKey) && apiKey.trim().startsWith(API_KEY_PREFIX);
  }

  isValidTwilioAuth(username, password) {
    return this.isString(username) && username
      && this.isString(password) && password;
  }

  isString(value) {
    return typeof value === 'string' || value instanceof String;
  }

  setImpersonateSubuser(subuser) {
    this.impersonateSubuser = subuser;
  }

  setDefaultHeader(key, value) {
    if (key !== null && typeof key === 'object') {
      // key is an object
      Object.assign(this.defaultHeaders, key);
      return this;
    }

    this.defaultHeaders[key] = value;
    return this;
  }

  setDefaultRequest(key, value) {
    if (key !== null && typeof key === 'object') {
      // key is an object
      Object.assign(this.defaultRequest, key);
      return this;
    }

    this.defaultRequest[key] = value;
    return this;
  }

  createHeaders(data) {
    // Merge data with default headers.
    const headers = mergeData(this.defaultHeaders, data);

    // Add auth, but don't overwrite if header already set.
    if (typeof headers.Authorization === 'undefined' && this.auth) {
      headers.Authorization = this.auth;
    }

    if (this.impersonateSubuser) {
      headers['On-Behalf-Of'] = this.impersonateSubuser;
    }

    return headers;
  }

  createRequest(data) {
    let options = {
      url: data.uri || data.url,
      baseUrl: data.baseUrl,
      method: data.method,
      data: data.body,
      params: data.qs,
      headers: data.headers,
    };

    // Merge data with default request.
    options = mergeData(this.defaultRequest, options);
    options.headers = this.createHeaders(options.headers);
    options.baseURL = options.baseUrl;
    delete options.baseUrl;

    return options;
  }

  request(data, cb) {
    data = this.createRequest(data);

    const promise = new Promise((resolve, reject) => {
      axios(data)
        .then(response => {
          return resolve([
            new Response(response.status, response.data, response.headers),
            response.data,
          ]);
        })
        .catch(error => {
          if (error.response) {
            if (error.response.status >= 400) {
              return reject(new ResponseError(error.response));
            }
          }
          return reject(error);
        });
    });

    // Throw an error in case a callback function was not passed.
    if (cb && typeof cb !== 'function') {
      throw new Error('Callback passed is not a function.');
    }

    if (cb) {
      return promise
        .then(result => cb(null, result))
        .catch(error => cb(error, null));
    }

    return promise;
  }
}

module.exports = Client;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(10);
var normalizeHeaderName = __webpack_require__(90);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(91);
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(97);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(28);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(93);
var combineURLs = __webpack_require__(94);

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var url = __webpack_require__(16);
var URL = url.URL;
var http = __webpack_require__(20);
var https = __webpack_require__(23);
var Writable = __webpack_require__(11).Writable;
var assert = __webpack_require__(98);
var debug = __webpack_require__(99);

// Create handlers that pass events from native requests
var eventHandlers = Object.create(null);
["abort", "aborted", "connect", "error", "socket", "timeout"].forEach(function (event) {
  eventHandlers[event] = function (arg1, arg2, arg3) {
    this._redirectable.emit(event, arg1, arg2, arg3);
  };
});

// Error types with codes
var RedirectionError = createErrorType(
  "ERR_FR_REDIRECTION_FAILURE",
  ""
);
var TooManyRedirectsError = createErrorType(
  "ERR_FR_TOO_MANY_REDIRECTS",
  "Maximum number of redirects exceeded"
);
var MaxBodyLengthExceededError = createErrorType(
  "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
  "Request body larger than maxBodyLength limit"
);
var WriteAfterEndError = createErrorType(
  "ERR_STREAM_WRITE_AFTER_END",
  "write after end"
);

// An HTTP(S) request that can be redirected
function RedirectableRequest(options, responseCallback) {
  // Initialize the request
  Writable.call(this);
  this._sanitizeOptions(options);
  this._options = options;
  this._ended = false;
  this._ending = false;
  this._redirectCount = 0;
  this._redirects = [];
  this._requestBodyLength = 0;
  this._requestBodyBuffers = [];

  // Attach a callback if passed
  if (responseCallback) {
    this.on("response", responseCallback);
  }

  // React to responses of native requests
  var self = this;
  this._onNativeResponse = function (response) {
    self._processResponse(response);
  };

  // Perform the first request
  this._performRequest();
}
RedirectableRequest.prototype = Object.create(Writable.prototype);

// Writes buffered data to the current native request
RedirectableRequest.prototype.write = function (data, encoding, callback) {
  // Writing is not allowed if end has been called
  if (this._ending) {
    throw new WriteAfterEndError();
  }

  // Validate input and shift parameters if necessary
  if (!(typeof data === "string" || typeof data === "object" && ("length" in data))) {
    throw new TypeError("data should be a string, Buffer or Uint8Array");
  }
  if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Ignore empty buffers, since writing them doesn't invoke the callback
  // https://github.com/nodejs/node/issues/22066
  if (data.length === 0) {
    if (callback) {
      callback();
    }
    return;
  }
  // Only write when we don't exceed the maximum body length
  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
    this._requestBodyLength += data.length;
    this._requestBodyBuffers.push({ data: data, encoding: encoding });
    this._currentRequest.write(data, encoding, callback);
  }
  // Error when we exceed the maximum body length
  else {
    this.emit("error", new MaxBodyLengthExceededError());
    this.abort();
  }
};

// Ends the current native request
RedirectableRequest.prototype.end = function (data, encoding, callback) {
  // Shift parameters if necessary
  if (typeof data === "function") {
    callback = data;
    data = encoding = null;
  }
  else if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Write data if needed and end
  if (!data) {
    this._ended = this._ending = true;
    this._currentRequest.end(null, null, callback);
  }
  else {
    var self = this;
    var currentRequest = this._currentRequest;
    this.write(data, encoding, function () {
      self._ended = true;
      currentRequest.end(null, null, callback);
    });
    this._ending = true;
  }
};

// Sets a header value on the current native request
RedirectableRequest.prototype.setHeader = function (name, value) {
  this._options.headers[name] = value;
  this._currentRequest.setHeader(name, value);
};

// Clears a header value on the current native request
RedirectableRequest.prototype.removeHeader = function (name) {
  delete this._options.headers[name];
  this._currentRequest.removeHeader(name);
};

// Global timeout for all underlying requests
RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
  if (callback) {
    this.once("timeout", callback);
  }

  if (this.socket) {
    startTimer(this, msecs);
  }
  else {
    var self = this;
    this._currentRequest.once("socket", function () {
      startTimer(self, msecs);
    });
  }

  this.once("response", clearTimer);
  this.once("error", clearTimer);

  return this;
};

function startTimer(request, msecs) {
  clearTimeout(request._timeout);
  request._timeout = setTimeout(function () {
    request.emit("timeout");
  }, msecs);
}

function clearTimer() {
  clearTimeout(this._timeout);
}

// Proxy all other public ClientRequest methods
[
  "abort", "flushHeaders", "getHeader",
  "setNoDelay", "setSocketKeepAlive",
].forEach(function (method) {
  RedirectableRequest.prototype[method] = function (a, b) {
    return this._currentRequest[method](a, b);
  };
});

// Proxy all public ClientRequest properties
["aborted", "connection", "socket"].forEach(function (property) {
  Object.defineProperty(RedirectableRequest.prototype, property, {
    get: function () { return this._currentRequest[property]; },
  });
});

RedirectableRequest.prototype._sanitizeOptions = function (options) {
  // Ensure headers are always present
  if (!options.headers) {
    options.headers = {};
  }

  // Since http.request treats host as an alias of hostname,
  // but the url module interprets host as hostname plus port,
  // eliminate the host property to avoid confusion.
  if (options.host) {
    // Use hostname if set, because it has precedence
    if (!options.hostname) {
      options.hostname = options.host;
    }
    delete options.host;
  }

  // Complete the URL object when necessary
  if (!options.pathname && options.path) {
    var searchPos = options.path.indexOf("?");
    if (searchPos < 0) {
      options.pathname = options.path;
    }
    else {
      options.pathname = options.path.substring(0, searchPos);
      options.search = options.path.substring(searchPos);
    }
  }
};


// Executes the next native request (initial or redirect)
RedirectableRequest.prototype._performRequest = function () {
  // Load the native protocol
  var protocol = this._options.protocol;
  var nativeProtocol = this._options.nativeProtocols[protocol];
  if (!nativeProtocol) {
    this.emit("error", new TypeError("Unsupported protocol " + protocol));
    return;
  }

  // If specified, use the agent corresponding to the protocol
  // (HTTP and HTTPS use different types of agents)
  if (this._options.agents) {
    var scheme = protocol.substr(0, protocol.length - 1);
    this._options.agent = this._options.agents[scheme];
  }

  // Create the native request
  var request = this._currentRequest =
        nativeProtocol.request(this._options, this._onNativeResponse);
  this._currentUrl = url.format(this._options);

  // Set up event handlers
  request._redirectable = this;
  for (var event in eventHandlers) {
    /* istanbul ignore else */
    if (event) {
      request.on(event, eventHandlers[event]);
    }
  }

  // End a redirected request
  // (The first request must be ended explicitly with RedirectableRequest#end)
  if (this._isRedirect) {
    // Write the request entity and end.
    var i = 0;
    var self = this;
    var buffers = this._requestBodyBuffers;
    (function writeNext(error) {
      // Only write if this request has not been redirected yet
      /* istanbul ignore else */
      if (request === self._currentRequest) {
        // Report any write errors
        /* istanbul ignore if */
        if (error) {
          self.emit("error", error);
        }
        // Write the next buffer if there are still left
        else if (i < buffers.length) {
          var buffer = buffers[i++];
          /* istanbul ignore else */
          if (!request.finished) {
            request.write(buffer.data, buffer.encoding, writeNext);
          }
        }
        // End the request if `end` has been called on us
        else if (self._ended) {
          request.end();
        }
      }
    }());
  }
};

// Processes a response from the current native request
RedirectableRequest.prototype._processResponse = function (response) {
  // Store the redirected response
  var statusCode = response.statusCode;
  if (this._options.trackRedirects) {
    this._redirects.push({
      url: this._currentUrl,
      headers: response.headers,
      statusCode: statusCode,
    });
  }

  // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
  // that further action needs to be taken by the user agent in order to
  // fulfill the request. If a Location header field is provided,
  // the user agent MAY automatically redirect its request to the URI
  // referenced by the Location field value,
  // even if the specific status code is not understood.
  var location = response.headers.location;
  if (location && this._options.followRedirects !== false &&
      statusCode >= 300 && statusCode < 400) {
    // Abort the current request
    this._currentRequest.removeAllListeners();
    this._currentRequest.on("error", noop);
    this._currentRequest.abort();
    // Discard the remainder of the response to avoid waiting for data
    response.destroy();

    // RFC7231§6.4: A client SHOULD detect and intervene
    // in cyclical redirections (i.e., "infinite" redirection loops).
    if (++this._redirectCount > this._options.maxRedirects) {
      this.emit("error", new TooManyRedirectsError());
      return;
    }

    // RFC7231§6.4: Automatic redirection needs to done with
    // care for methods not known to be safe, […]
    // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
    // the request method from POST to GET for the subsequent request.
    if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" ||
        // RFC7231§6.4.4: The 303 (See Other) status code indicates that
        // the server is redirecting the user agent to a different resource […]
        // A user agent can perform a retrieval request targeting that URI
        // (a GET or HEAD request if using HTTP) […]
        (statusCode === 303) && !/^(?:GET|HEAD)$/.test(this._options.method)) {
      this._options.method = "GET";
      // Drop a possible entity and headers related to it
      this._requestBodyBuffers = [];
      removeMatchingHeaders(/^content-/i, this._options.headers);
    }

    // Drop the Host header, as the redirect might lead to a different host
    var previousHostName = removeMatchingHeaders(/^host$/i, this._options.headers) ||
      url.parse(this._currentUrl).hostname;

    // Create the redirected request
    var redirectUrl = url.resolve(this._currentUrl, location);
    debug("redirecting to", redirectUrl);
    this._isRedirect = true;
    var redirectUrlParts = url.parse(redirectUrl);
    Object.assign(this._options, redirectUrlParts);

    // Drop the Authorization header if redirecting to another host
    if (redirectUrlParts.hostname !== previousHostName) {
      removeMatchingHeaders(/^authorization$/i, this._options.headers);
    }

    // Evaluate the beforeRedirect callback
    if (typeof this._options.beforeRedirect === "function") {
      var responseDetails = { headers: response.headers };
      try {
        this._options.beforeRedirect.call(null, this._options, responseDetails);
      }
      catch (err) {
        this.emit("error", err);
        return;
      }
      this._sanitizeOptions(this._options);
    }

    // Perform the redirected request
    try {
      this._performRequest();
    }
    catch (cause) {
      var error = new RedirectionError("Redirected request failed: " + cause.message);
      error.cause = cause;
      this.emit("error", error);
    }
  }
  else {
    // The response is not a redirect; return it as-is
    response.responseUrl = this._currentUrl;
    response.redirects = this._redirects;
    this.emit("response", response);

    // Clean up
    this._requestBodyBuffers = [];
  }
};

// Wraps the key/value object of protocols with redirect functionality
function wrap(protocols) {
  // Default settings
  var exports = {
    maxRedirects: 21,
    maxBodyLength: 10 * 1024 * 1024,
  };

  // Wrap each protocol
  var nativeProtocols = {};
  Object.keys(protocols).forEach(function (scheme) {
    var protocol = scheme + ":";
    var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
    var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

    // Executes a request, following redirects
    function request(input, options, callback) {
      // Parse parameters
      if (typeof input === "string") {
        var urlStr = input;
        try {
          input = urlToOptions(new URL(urlStr));
        }
        catch (err) {
          /* istanbul ignore next */
          input = url.parse(urlStr);
        }
      }
      else if (URL && (input instanceof URL)) {
        input = urlToOptions(input);
      }
      else {
        callback = options;
        options = input;
        input = { protocol: protocol };
      }
      if (typeof options === "function") {
        callback = options;
        options = null;
      }

      // Set defaults
      options = Object.assign({
        maxRedirects: exports.maxRedirects,
        maxBodyLength: exports.maxBodyLength,
      }, input, options);
      options.nativeProtocols = nativeProtocols;

      assert.equal(options.protocol, protocol, "protocol mismatch");
      debug("options", options);
      return new RedirectableRequest(options, callback);
    }

    // Executes a GET request, following redirects
    function get(input, options, callback) {
      var wrappedRequest = wrappedProtocol.request(input, options, callback);
      wrappedRequest.end();
      return wrappedRequest;
    }

    // Expose the properties on the wrapped protocol
    Object.defineProperties(wrappedProtocol, {
      request: { value: request, configurable: true, enumerable: true, writable: true },
      get: { value: get, configurable: true, enumerable: true, writable: true },
    });
  });
  return exports;
}

/* istanbul ignore next */
function noop() { /* empty */ }

// from https://github.com/nodejs/node/blob/master/lib/internal/url.js
function urlToOptions(urlObject) {
  var options = {
    protocol: urlObject.protocol,
    hostname: urlObject.hostname.startsWith("[") ?
      /* istanbul ignore next */
      urlObject.hostname.slice(1, -1) :
      urlObject.hostname,
    hash: urlObject.hash,
    search: urlObject.search,
    pathname: urlObject.pathname,
    path: urlObject.pathname + urlObject.search,
    href: urlObject.href,
  };
  if (urlObject.port !== "") {
    options.port = Number(urlObject.port);
  }
  return options;
}

function removeMatchingHeaders(regex, headers) {
  var lastValue;
  for (var header in headers) {
    if (regex.test(header)) {
      lastValue = headers[header];
      delete headers[header];
    }
  }
  return lastValue;
}

function createErrorType(code, defaultMessage) {
  function CustomError(message) {
    Error.captureStackTrace(this, this.constructor);
    this.message = message || defaultMessage;
  }
  CustomError.prototype = new Error();
  CustomError.prototype.constructor = CustomError;
  CustomError.prototype.name = "Error [" + code + "]";
  CustomError.prototype.code = code;
  return CustomError;
}

// Exports
module.exports = wrap({ http: http, https: https });
module.exports.wrap = wrap;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(102);

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(10);

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Load support assets
 */
const classes = __webpack_require__(111);
const helpers = __webpack_require__(122);

/**
 * Export
 */
module.exports = {classes, helpers};


/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Split name and email address from string
 */
module.exports = function splitNameEmail(str) {

  //If no email bracket present, return as is
  if (str.indexOf('<') === -1) {
    return ['', str];
  }

  //Split into name and email
  let [name, email] = str.split('<');

  //Trim and fix up
  name = name.trim();
  email = email.replace('>', '').trim();

  //Return as array
  return [name, email];
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 */
const EmailAddress = __webpack_require__(30);
const toCamelCase = __webpack_require__(21);
const toSnakeCase = __webpack_require__(24);
const deepClone = __webpack_require__(22);
const deepMerge = __webpack_require__(116);
const wrapSubstitutions = __webpack_require__(53);

/**
 * Personalization class
 */
class Personalization {

  /**
   * Constructor
   */
  constructor(data) {

    //Init array and object placeholders
    this.to = [];
    this.cc = [];
    this.bcc = [];
    this.headers = {};
    this.customArgs = {};
    this.substitutions = {};
    this.substitutionWrappers = ['{{', '}}'];
    this.dynamicTemplateData = {};

    //Build from data if given
    if (data) {
      this.fromData(data);
    }
  }

  /**
   * From data
   */
  fromData(data) {

    //Expecting object
    if (typeof data !== 'object') {
      throw new Error('Expecting object for Mail data');
    }

    //Convert to camel case to make it workable, making a copy to prevent
    //changes to the original objects
    data = deepClone(data);
    data = toCamelCase(data, ['substitutions', 'dynamicTemplateData', 'customArgs', 'headers']);

    //Extract properties from data
    const {
      to, cc, bcc, subject, headers, customArgs, sendAt,
      substitutions, substitutionWrappers, dynamicTemplateData,
    } = data;

    //Set data
    this.setTo(to);
    this.setCc(cc);
    this.setBcc(bcc);
    this.setSubject(subject);
    this.setHeaders(headers);
    this.setSubstitutions(substitutions);
    this.setSubstitutionWrappers(substitutionWrappers);
    this.setCustomArgs(customArgs);
    this.setDynamicTemplateData(dynamicTemplateData);
    this.setSendAt(sendAt);
  }

  /**
   * Set subject
   */
  setSubject(subject) {
    if (typeof subject === 'undefined') {
      return;
    }
    if (typeof subject !== 'string') {
      throw new Error('String expected for `subject`');
    }
    this.subject = subject;
  }

  /**
   * Set send at
   */
  setSendAt(sendAt) {
    if (typeof sendAt === 'undefined') {
      return;
    }
    if (!Number.isInteger(sendAt)) {
      throw new Error('Integer expected for `sendAt`');
    }
    this.sendAt = sendAt;
  }

  /**
   * Set to
   */
  setTo(to) {
    if (typeof to === 'undefined') {
      return;
    }
    if (!Array.isArray(to)) {
      to = [to];
    }
    this.to = EmailAddress.create(to);
  }

  /**
   * Add a single to
   */
  addTo(to) {
    if (typeof to === 'undefined') {
      return;
    }
    this.to.push(EmailAddress.create(to));
  }

  /**
   * Set cc
   */
  setCc(cc) {
    if (typeof cc === 'undefined') {
      return;
    }
    if (!Array.isArray(cc)) {
      cc = [cc];
    }
    this.cc = EmailAddress.create(cc);
  }

  /**
   * Add a single cc
   */
  addCc(cc) {
    if (typeof cc === 'undefined') {
      return;
    }
    this.cc.push(EmailAddress.create(cc));
  }

  /**
   * Set bcc
   */
  setBcc(bcc) {
    if (typeof bcc === 'undefined') {
      return;
    }
    if (!Array.isArray(bcc)) {
      bcc = [bcc];
    }
    this.bcc = EmailAddress.create(bcc);
  }

  /**
   * Add a single bcc
   */
  addBcc(bcc) {
    if (typeof bcc === 'undefined') {
      return;
    }
    this.bcc.push(EmailAddress.create(bcc));
  }

  /**
   * Set headers
   */
  setHeaders(headers) {
    if (typeof headers === 'undefined') {
      return;
    }
    if (typeof headers !== 'object' || headers === null) {
      throw new Error('Object expected for `headers`');
    }
    this.headers = headers;
  }

  /**
   * Add a header
   */
  addHeader(key, value) {
    if (typeof key !== 'string') {
      throw new Error('String expected for header key');
    }
    if (typeof value !== 'string') {
      throw new Error('String expected for header value');
    }
    this.headers[key] = value;
  }

  /**
   * Set custom args
   */
  setCustomArgs(customArgs) {
    if (typeof customArgs === 'undefined') {
      return;
    }
    if (typeof customArgs !== 'object' || customArgs === null) {
      throw new Error('Object expected for `customArgs`');
    }
    this.customArgs = customArgs;
  }

  /**
   * Add a custom arg
   */
  addCustomArg(key, value) {
    if (typeof key !== 'string') {
      throw new Error('String expected for custom arg key');
    }
    if (typeof value !== 'string') {
      throw new Error('String expected for custom arg value');
    }
    this.customArgs[key] = value;
  }

  /**
   * Set substitutions
   */
  setSubstitutions(substitutions) {
    if (typeof substitutions === 'undefined') {
      return;
    }
    if (typeof substitutions !== 'object') {
      throw new Error('Object expected for `substitutions`');
    }
    this.substitutions = substitutions;
  }

  /**
   * Add a substitution
   */
  addSubstitution(key, value) {
    if (typeof key !== 'string') {
      throw new Error('String expected for substitution key');
    }
    if (typeof value !== 'string' && typeof value !== 'number') {
      throw new Error('String or Number expected for substitution value');
    }
    this.substitutions[key] = value;
  }

  /**
   * Reverse merge substitutions, preserving existing ones
   */
  reverseMergeSubstitutions(substitutions) {
    if (typeof substitutions === 'undefined' || substitutions === null) {
      return;
    }
    if (typeof substitutions !== 'object') {
      throw new Error(
        'Object expected for `substitutions` in reverseMergeSubstitutions'
      );
    }
    this.substitutions = Object.assign({}, substitutions, this.substitutions);
  }

  /**
   * Set substitution wrappers
   */
  setSubstitutionWrappers(wrappers) {
    if (typeof wrappers === 'undefined' || wrappers === null) {
      return;
    }

    if (!Array.isArray(wrappers) || wrappers.length !== 2) {
      throw new Error(
        'Array expected with two elements for `substitutionWrappers`'
      );
    }
    this.substitutionWrappers = wrappers;
  }

  /**
   * Reverse merge dynamic template data, preserving existing ones
   */
  deepMergeDynamicTemplateData(dynamicTemplateData) {
    if (typeof dynamicTemplateData === 'undefined' || dynamicTemplateData === null) {
      return;
    }
    if (typeof dynamicTemplateData !== 'object') {
      throw new Error(
        'Object expected for `dynamicTemplateData` in deepMergeDynamicTemplateData'
      );
    }
    this.dynamicTemplateData = deepMerge(dynamicTemplateData, this.dynamicTemplateData);
  }

  /**
   * Set dynamic template data
   */
  setDynamicTemplateData(dynamicTemplateData) {
    if (typeof dynamicTemplateData === 'undefined') {
      return;
    }
    if (typeof dynamicTemplateData !== 'object') {
      throw new Error('Object expected for `dynamicTemplateData`');
    }
    this.dynamicTemplateData = dynamicTemplateData;
  }

  /**
   * To JSON
   */
  toJSON() {

    //Get data from self
    const {
      to, cc, bcc, subject, headers, customArgs, sendAt,
      substitutions, substitutionWrappers, dynamicTemplateData,
    } = this;

    //Initialize with mandatory values
    const json = {to};

    //Arrays
    if (Array.isArray(cc) && cc.length > 0) {
      json.cc = cc;
    }
    if (Array.isArray(bcc) && bcc.length > 0) {
      json.bcc = bcc;
    }

    //Objects
    if (Object.keys(headers).length > 0) {
      json.headers = headers;
    }
    if (substitutions && Object.keys(substitutions).length > 0) {
      const [left, right] = substitutionWrappers;
      json.substitutions = wrapSubstitutions(substitutions, left, right);
    }
    if (Object.keys(customArgs).length > 0) {
      json.customArgs = customArgs;
    }

    if (dynamicTemplateData && Object.keys(dynamicTemplateData).length > 0) {
      json.dynamicTemplateData = dynamicTemplateData;
    }

    //Simple properties
    if (typeof subject !== 'undefined') {
      json.subject = subject;
    }
    if (typeof sendAt !== 'undefined') {
      json.sendAt = sendAt;
    }

    //Return as snake cased object
    return toSnakeCase(json, ['substitutions', 'dynamicTemplateData', 'customArgs', 'headers']);
  }
}

//Export class
module.exports = Personalization;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Wrap substitutions
 */
module.exports = function wrap(substitutions, left = '{{', right = '}}') {

  //Process arrays
  if (Array.isArray(substitutions)) {
    return substitutions.map(subs => wrap(subs, left, right));
  }

  //Initialize new wrapped object
  const wrapped = {};

  //Map substitutions and ensure string for value
  for (const key in substitutions) {
    //istanbul ignore else
    if (substitutions.hasOwnProperty(key)) {
      wrapped[left + key + right] = String(substitutions[key]);
    }
  }

  //Return wrapped substitutions
  return wrapped;
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Helper to convert an array of objects to JSON
 */
module.exports = function arrayToJSON(arr) {
  return arr.map(item => {
    if (typeof item === 'object' && item !== null && typeof item.toJSON === 'function') {
      return item.toJSON();
    }
    return item;
  });
};


/***/ }),
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

const client = __webpack_require__(80);

__webpack_require__(124).config();

function sendEmail(client, senderEmail, senderName, pdf, contactPerson, formData) {
  const confirmation = sendConfirmationEmailToDonator(client, senderEmail, senderName, contactPerson, pdf);
  const copy = sendCopyToAdmin(client, senderEmail, senderName, contactPerson, pdf, formData);
  return Promise.all([confirmation, copy]);
}

function sendConfirmationEmailToDonator(client, senderEmail, senderName, contactPerson, pdf) {
  return new Promise((fulfill, reject) => {
    const data = confirmationEmailContent(senderEmail, senderName, contactPerson, pdf);
    client.send(data).then(([response, body]) => {
      fulfill(response);
    }).catch(error => reject(error));
  });
}

function sendCopyToAdmin(client, senderEmail, senderName, contactPerson, pdf, formData) {
  return new Promise((fulfill, reject) => {
    const data = formDataEmailContent(senderEmail, senderName, contactPerson, pdf, formData);
    client.send(data).then(([response, body]) => {
      fulfill(response);
    }).catch(error => reject(error));
  });
}

function confirmationEmailContent(senderEmail, senderName, contactPerson, pdf) {
  return {
    from: {
      email: senderEmail,
      name: senderName
    },
    subject: "Netlify Function - Sendgrid Email",
    to: contactPerson.email,
    bcc: admin,
    templateId: "d-33584d7b4baa43c1983328625af08a54",
    dynamicTemplateData: {
      first_name: contactPerson.firstName,
      donationSum: contactPerson.donationSum
    },
    attachments: [donationLetterAttachment(pdf, contactPerson)]
  };
}

function formDataEmailContent(senderEmail, senderName, contactPerson, pdf, formData) {
  return {
    from: {
      email: senderEmail,
      name: senderName
    },
    subject: "Kopia av donationsbrev och formulärdatan",
    to: admin,
    templateId: "d-33584d7b4baa43c1983328625af08a54",
    dynamicTemplateData: {
      first_name: contactPerson.firstName,
      donationSum: contactPerson.donationSum
    },
    attachments: [donationLetterAttachment(pdf, contactPerson), formDataAttachment(formData)]
  };
}

function donationLetterAttachment(pdf, contactPerson) {
  return {
    content: pdf,
    filename: "donationsbrev-" + contactPerson.firstName + "-" + contactPerson.lastName + ".pdf",
    type: "application/pdf",
    disposition: "attachment"
  };
}

function formDataAttachment(formData) {
  return {
    content: Buffer.from(JSON.stringify(formData)).toString("base64"),
    filename: "donation-form.json",
    type: "application/json",
    disposition: "attachment"
  };
}

const admin = "emil.kauppi@tf.fi";

exports.handler = function (event, context, callback) {
  const {
    SENDGRID_API_KEY,
    SENDGRID_SENDER_EMAIL,
    SENDGRID_SENDER_NAME
  } = process.env;
  const body = JSON.parse(event.body);
  const pdf = body.pdf;
  const contactPerson = body.contactPerson;
  const formData = body.formData;
  console.log("Donation form data", formData);
  client.setApiKey(SENDGRID_API_KEY);
  sendEmail(client, SENDGRID_SENDER_EMAIL, SENDGRID_SENDER_NAME, pdf, contactPerson, formData).then(() => callback(null, {
    statusCode: 200,
    body: "Emails sent"
  })).catch(err => callback(err, null));
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const mailer = __webpack_require__(81);
const MailService = __webpack_require__(37);

module.exports = mailer;
module.exports.MailService = MailService;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 */
const MailService = __webpack_require__(37);

//Export singleton instance
module.exports = new MailService();


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const client = __webpack_require__(83);
const Client = __webpack_require__(38);

module.exports = client;
module.exports.Client = Client;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 */
const Client = __webpack_require__(38);

//Export singleton instance
module.exports = new Client();


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(85);

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(10);
var bind = __webpack_require__(39);
var Axios = __webpack_require__(86);
var mergeConfig = __webpack_require__(47);
var defaults = __webpack_require__(41);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(48);
axios.CancelToken = __webpack_require__(107);
axios.isCancel = __webpack_require__(40);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(108);

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(109);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(10);
var buildURL = __webpack_require__(27);
var InterceptorManager = __webpack_require__(87);
var dispatchRequest = __webpack_require__(88);
var mergeConfig = __webpack_require__(47);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(10);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(10);
var transformData = __webpack_require__(89);
var isCancel = __webpack_require__(40);
var defaults = __webpack_require__(41);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(10);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(10);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(10);
var settle = __webpack_require__(42);
var cookies = __webpack_require__(92);
var buildURL = __webpack_require__(27);
var buildFullPath = __webpack_require__(44);
var parseHeaders = __webpack_require__(95);
var isURLSameOrigin = __webpack_require__(96);
var createError = __webpack_require__(28);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(10);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(10);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(10);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(10);
var settle = __webpack_require__(42);
var buildFullPath = __webpack_require__(44);
var buildURL = __webpack_require__(27);
var http = __webpack_require__(20);
var https = __webpack_require__(23);
var httpFollow = __webpack_require__(45).http;
var httpsFollow = __webpack_require__(45).https;
var url = __webpack_require__(16);
var zlib = __webpack_require__(12);
var pkg = __webpack_require__(106);
var createError = __webpack_require__(28);
var enhanceError = __webpack_require__(43);

var isHttps = /https:?/;

/**
 *
 * @param {http.ClientRequestArgs} options
 * @param {AxiosProxyConfig} proxy
 * @param {string} location
 */
function setProxy(options, proxy, location) {
  options.hostname = proxy.host;
  options.host = proxy.host;
  options.port = proxy.port;
  options.path = location;

  // Basic proxy authorization
  if (proxy.auth) {
    var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
    options.headers['Proxy-Authorization'] = 'Basic ' + base64;
  }

  // If a proxy is used, any redirects must also pass through the proxy
  options.beforeRedirect = function beforeRedirect(redirection) {
    redirection.headers.host = redirection.host;
    setProxy(redirection, proxy, redirection.href);
  };
}

/*eslint consistent-return:0*/
module.exports = function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
    var resolve = function resolve(value) {
      resolvePromise(value);
    };
    var reject = function reject(value) {
      rejectPromise(value);
    };
    var data = config.data;
    var headers = config.headers;

    // Set User-Agent (required by some servers)
    // Only set header if it hasn't been set in config
    // See https://github.com/axios/axios/issues/69
    if (!headers['User-Agent'] && !headers['user-agent']) {
      headers['User-Agent'] = 'axios/' + pkg.version;
    }

    if (data && !utils.isStream(data)) {
      if (Buffer.isBuffer(data)) {
        // Nothing to do...
      } else if (utils.isArrayBuffer(data)) {
        data = Buffer.from(new Uint8Array(data));
      } else if (utils.isString(data)) {
        data = Buffer.from(data, 'utf-8');
      } else {
        return reject(createError(
          'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
          config
        ));
      }

      // Add Content-Length header if data exists
      headers['Content-Length'] = data.length;
    }

    // HTTP basic authentication
    var auth = undefined;
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      auth = username + ':' + password;
    }

    // Parse url
    var fullPath = buildFullPath(config.baseURL, config.url);
    var parsed = url.parse(fullPath);
    var protocol = parsed.protocol || 'http:';

    if (!auth && parsed.auth) {
      var urlAuth = parsed.auth.split(':');
      var urlUsername = urlAuth[0] || '';
      var urlPassword = urlAuth[1] || '';
      auth = urlUsername + ':' + urlPassword;
    }

    if (auth) {
      delete headers.Authorization;
    }

    var isHttpsRequest = isHttps.test(protocol);
    var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;

    var options = {
      path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
      method: config.method.toUpperCase(),
      headers: headers,
      agent: agent,
      agents: { http: config.httpAgent, https: config.httpsAgent },
      auth: auth
    };

    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname;
      options.port = parsed.port;
    }

    var proxy = config.proxy;
    if (!proxy && proxy !== false) {
      var proxyEnv = protocol.slice(0, -1) + '_proxy';
      var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
      if (proxyUrl) {
        var parsedProxyUrl = url.parse(proxyUrl);
        var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
        var shouldProxy = true;

        if (noProxyEnv) {
          var noProxy = noProxyEnv.split(',').map(function trim(s) {
            return s.trim();
          });

          shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
            if (!proxyElement) {
              return false;
            }
            if (proxyElement === '*') {
              return true;
            }
            if (proxyElement[0] === '.' &&
                parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
              return true;
            }

            return parsed.hostname === proxyElement;
          });
        }

        if (shouldProxy) {
          proxy = {
            host: parsedProxyUrl.hostname,
            port: parsedProxyUrl.port,
            protocol: parsedProxyUrl.protocol
          };

          if (parsedProxyUrl.auth) {
            var proxyUrlAuth = parsedProxyUrl.auth.split(':');
            proxy.auth = {
              username: proxyUrlAuth[0],
              password: proxyUrlAuth[1]
            };
          }
        }
      }
    }

    if (proxy) {
      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
      setProxy(options, proxy, protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path);
    }

    var transport;
    var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttpsProxy ? https : http;
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }
      transport = isHttpsProxy ? httpsFollow : httpFollow;
    }

    if (config.maxBodyLength > -1) {
      options.maxBodyLength = config.maxBodyLength;
    }

    // Create the request
    var req = transport.request(options, function handleResponse(res) {
      if (req.aborted) return;

      // uncompress the response body transparently if required
      var stream = res;

      // return the last request in case of redirects
      var lastRequest = res.req || req;


      // if no content, is HEAD request or decompress disabled we should not decompress
      if (res.statusCode !== 204 && lastRequest.method !== 'HEAD' && config.decompress !== false) {
        switch (res.headers['content-encoding']) {
        /*eslint default-case:0*/
        case 'gzip':
        case 'compress':
        case 'deflate':
        // add the unzipper to the body stream processing pipeline
          stream = stream.pipe(zlib.createUnzip());

          // remove the content-encoding in order to not confuse downstream operations
          delete res.headers['content-encoding'];
          break;
        }
      }

      var response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config: config,
        request: lastRequest
      };

      if (config.responseType === 'stream') {
        response.data = stream;
        settle(resolve, reject, response);
      } else {
        var responseBuffer = [];
        stream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk);

          // make sure the content length is not over the maxContentLength if specified
          if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
            stream.destroy();
            reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
              config, null, lastRequest));
          }
        });

        stream.on('error', function handleStreamError(err) {
          if (req.aborted) return;
          reject(enhanceError(err, config, null, lastRequest));
        });

        stream.on('end', function handleStreamEnd() {
          var responseData = Buffer.concat(responseBuffer);
          if (config.responseType !== 'arraybuffer') {
            responseData = responseData.toString(config.responseEncoding);
            if (!config.responseEncoding || config.responseEncoding === 'utf8') {
              responseData = utils.stripBOM(responseData);
            }
          }

          response.data = responseData;
          settle(resolve, reject, response);
        });
      }
    });

    // Handle errors
    req.on('error', function handleRequestError(err) {
      if (req.aborted && err.code !== 'ERR_FR_TOO_MANY_REDIRECTS') return;
      reject(enhanceError(err, config, null, req));
    });

    // Handle request timeout
    if (config.timeout) {
      // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
      // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
      // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
      // And then these socket which be hang up will devoring CPU little by little.
      // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
      req.setTimeout(config.timeout, function handleRequestTimeout() {
        req.abort();
        reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', req));
      });
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (req.aborted) return;

        req.abort();
        reject(cancel);
      });
    }

    // Send the request
    if (utils.isStream(data)) {
      data.on('error', function handleStreamError(err) {
        reject(enhanceError(err, config, null, req));
      }).pipe(req);
    } else {
      req.end(data);
    }
  });
};


/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var debug;

module.exports = function () {
  if (!debug) {
    try {
      /* eslint global-require: off */
      debug = __webpack_require__(100)("follow-redirects");
    }
    catch (error) {
      debug = function () { /* */ };
    }
  }
  debug.apply(null, arguments);
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Detect Electron renderer process, which is node, but we should
 * treat as a browser.
 */

if (typeof process !== 'undefined' && process.type === 'renderer') {
  module.exports = __webpack_require__(101);
} else {
  module.exports = __webpack_require__(103);
}


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(46);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}


/***/ }),
/* 102 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var tty = __webpack_require__(104);
var util = __webpack_require__(25);

/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(46);
exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // camel-case
  var prop = key
    .substring(6)
    .toLowerCase()
    .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

  // coerce string value into JS value
  var val = process.env[key];
  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
  else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
  else if (val === 'null') val = null;
  else val = Number(val);

  obj[prop] = val;
  return obj;
}, {});

/**
 * The file descriptor to write the `debug()` calls to.
 * Set the `DEBUG_FD` env variable to override with another value. i.e.:
 *
 *   $ DEBUG_FD=3 node script.js 3>debug.log
 */

var fd = parseInt(process.env.DEBUG_FD, 10) || 2;

if (1 !== fd && 2 !== fd) {
  util.deprecate(function(){}, 'except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)')()
}

var stream = 1 === fd ? process.stdout :
             2 === fd ? process.stderr :
             createWritableStdioStream(fd);

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts
    ? Boolean(exports.inspectOpts.colors)
    : tty.isatty(fd);
}

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

exports.formatters.o = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts)
    .split('\n').map(function(str) {
      return str.trim()
    }).join(' ');
};

/**
 * Map %o to `util.inspect()`, allowing multiple lines if needed.
 */

exports.formatters.O = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var name = this.namespace;
  var useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var prefix = '  \u001b[3' + c + ';1m' + name + ' ' + '\u001b[0m';

    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push('\u001b[3' + c + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
  } else {
    args[0] = new Date().toUTCString()
      + ' ' + name + ' ' + args[0];
  }
}

/**
 * Invokes `util.format()` with the specified arguments and writes to `stream`.
 */

function log() {
  return stream.write(util.format.apply(util, arguments) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  return process.env.DEBUG;
}

/**
 * Copied from `node/src/node.js`.
 *
 * XXX: It's lame that node doesn't expose this API out-of-the-box. It also
 * relies on the undocumented `tty_wrap.guessHandleType()` which is also lame.
 */

function createWritableStdioStream (fd) {
  var stream;
  var tty_wrap = process.binding('tty_wrap');

  // Note stream._type is used for test-module-load-list.js

  switch (tty_wrap.guessHandleType(fd)) {
    case 'TTY':
      stream = new tty.WriteStream(fd);
      stream._type = 'tty';

      // Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;

    case 'FILE':
      var fs = __webpack_require__(18);
      stream = new fs.SyncWriteStream(fd, { autoClose: false });
      stream._type = 'fs';
      break;

    case 'PIPE':
    case 'TCP':
      var net = __webpack_require__(105);
      stream = new net.Socket({
        fd: fd,
        readable: false,
        writable: true
      });

      // FIXME Should probably have an option in net.Socket to create a
      // stream from an existing fd which is writable only. But for now
      // we'll just add this hack and set the `readable` member to false.
      // Test: ./node test/fixtures/echo.js < /etc/passwd
      stream.readable = false;
      stream.read = null;
      stream._type = 'pipe';

      // FIXME Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;

    default:
      // Probably an error on in uv_guess_handle()
      throw new Error('Implement me. Unknown stream file type!');
  }

  // For supporting legacy API we put the FD here.
  stream.fd = fd;

  stream._isStdio = true;

  return stream;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init (debug) {
  debug.inspectOpts = {};

  var keys = Object.keys(exports.inspectOpts);
  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());


/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 106 */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"axios\",\"version\":\"0.21.1\",\"description\":\"Promise based HTTP client for the browser and node.js\",\"main\":\"index.js\",\"scripts\":{\"test\":\"grunt test && bundlesize\",\"start\":\"node ./sandbox/server.js\",\"build\":\"NODE_ENV=production grunt build\",\"preversion\":\"npm test\",\"version\":\"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json\",\"postversion\":\"git push && git push --tags\",\"examples\":\"node ./examples/server.js\",\"coveralls\":\"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js\",\"fix\":\"eslint --fix lib/**/*.js\"},\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/axios/axios.git\"},\"keywords\":[\"xhr\",\"http\",\"ajax\",\"promise\",\"node\"],\"author\":\"Matt Zabriskie\",\"license\":\"MIT\",\"bugs\":{\"url\":\"https://github.com/axios/axios/issues\"},\"homepage\":\"https://github.com/axios/axios\",\"devDependencies\":{\"bundlesize\":\"^0.17.0\",\"coveralls\":\"^3.0.0\",\"es6-promise\":\"^4.2.4\",\"grunt\":\"^1.0.2\",\"grunt-banner\":\"^0.6.0\",\"grunt-cli\":\"^1.2.0\",\"grunt-contrib-clean\":\"^1.1.0\",\"grunt-contrib-watch\":\"^1.0.0\",\"grunt-eslint\":\"^20.1.0\",\"grunt-karma\":\"^2.0.0\",\"grunt-mocha-test\":\"^0.13.3\",\"grunt-ts\":\"^6.0.0-beta.19\",\"grunt-webpack\":\"^1.0.18\",\"istanbul-instrumenter-loader\":\"^1.0.0\",\"jasmine-core\":\"^2.4.1\",\"karma\":\"^1.3.0\",\"karma-chrome-launcher\":\"^2.2.0\",\"karma-coverage\":\"^1.1.1\",\"karma-firefox-launcher\":\"^1.1.0\",\"karma-jasmine\":\"^1.1.1\",\"karma-jasmine-ajax\":\"^0.1.13\",\"karma-opera-launcher\":\"^1.0.0\",\"karma-safari-launcher\":\"^1.0.0\",\"karma-sauce-launcher\":\"^1.2.0\",\"karma-sinon\":\"^1.0.5\",\"karma-sourcemap-loader\":\"^0.3.7\",\"karma-webpack\":\"^1.7.0\",\"load-grunt-tasks\":\"^3.5.2\",\"minimist\":\"^1.2.0\",\"mocha\":\"^5.2.0\",\"sinon\":\"^4.5.0\",\"typescript\":\"^2.8.1\",\"url-search-params\":\"^0.10.0\",\"webpack\":\"^1.13.1\",\"webpack-dev-server\":\"^1.14.1\"},\"browser\":{\"./lib/adapters/http.js\":\"./lib/adapters/xhr.js\"},\"jsdelivr\":\"dist/axios.min.js\",\"unpkg\":\"dist/axios.min.js\",\"typings\":\"./index.d.ts\",\"dependencies\":{\"follow-redirects\":\"^1.10.0\"},\"bundlesize\":[{\"path\":\"./dist/axios.min.js\",\"threshold\":\"5kB\"}]}");

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(48);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};


/***/ }),
/* 110 */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"@sendgrid/client\",\"description\":\"Twilio SendGrid NodeJS API client\",\"version\":\"7.4.2\",\"author\":\"Twilio SendGrid <help@twilio.com> (sendgrid.com)\",\"contributors\":[\"Kyle Partridge <kyle.partridge@sendgrid.com>\",\"David Tomberlin <david.tomberlin@sendgrid.com>\",\"Swift <swift@sendgrid.com>\",\"Brandon West <brandon.west@sendgrid.com>\",\"Scott Motte <scott.motte@sendgrid.com>\",\"Robert Acosta <robert.acosta@sendgrid.com>\",\"Elmer Thomas <ethomas@twilio.com>\",\"Adam Reis <adam@reis.nz>\"],\"license\":\"MIT\",\"homepage\":\"https://sendgrid.com\",\"repository\":{\"type\":\"git\",\"url\":\"git://github.com/sendgrid/sendgrid-nodejs.git\"},\"publishConfig\":{\"access\":\"public\"},\"main\":\"index.js\",\"engines\":{\"node\":\"6.* || 8.* || >=10.*\"},\"dependencies\":{\"@sendgrid/helpers\":\"^7.4.2\",\"axios\":\"^0.21.1\"},\"devDependencies\":{\"nock\":\"^10.0.6\"},\"tags\":[\"http\",\"rest\",\"api\",\"mail\",\"sendgrid\"],\"gitHead\":\"b2a7be0bd10ad3de154b4160a65e6c9f9b745094\"}");

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Expose classes
 */
const Attachment = __webpack_require__(112);
const EmailAddress = __webpack_require__(30);
const Mail = __webpack_require__(115);
const Personalization = __webpack_require__(52);
const Response = __webpack_require__(119);
const ResponseError = __webpack_require__(120);
const Statistics = __webpack_require__(121);

/**
 * Export
 */
module.exports = {
  Attachment,
  EmailAddress,
  Mail,
  Personalization,
  Response,
  ResponseError,
  Statistics,
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 */
const toCamelCase = __webpack_require__(21);
const toSnakeCase = __webpack_require__(24);
const deepClone = __webpack_require__(22);
const fs = __webpack_require__(18);
const path = __webpack_require__(50);

/**
 * Attachment class
 */
class Attachment {

  /**
   * Constructor
   */
  constructor(data) {

    //Create from data
    if (data) {
      this.fromData(data);
    }
  }

  /**
   * From data
   */
  fromData(data) {

    //Expecting object
    if (typeof data !== 'object') {
      throw new Error('Expecting object for Mail data');
    }

    //Convert to camel case to make it workable, making a copy to prevent
    //changes to the original objects
    data = deepClone(data);
    data = toCamelCase(data);

    //Extract properties from data
    const {
      content,
      filename,
      type,
      disposition,
      contentId,
      filePath,
    } = data;

    if ((typeof content !== 'undefined') && (typeof filePath !== 'undefined')) {
      throw new Error(
        "The props 'content' and 'filePath' cannot be used together."
      );
    }

    //Set data
    this.setFilename(filename);
    this.setType(type);
    this.setDisposition(disposition);
    this.setContentId(contentId);
    this.setContent(filePath ? this.readFile(filePath) : content);
  }

  /**
   * Read a file and return its content as base64
   */
  readFile(filePath) {
    return fs.readFileSync(path.resolve(filePath));
  }

  /**
   * Set content
   */
  setContent(content) {
    //Duck type check toString on content if it's a Buffer as that's the method that will be called.
    if (typeof content === 'string') {
      this.content = content;
      return;
    } else if (content instanceof Buffer && content.toString !== undefined) {
      this.content = content.toString();

      if (this.disposition === 'attachment') {
        this.content = content.toString('base64');
      }

      return;
    }

    throw new Error('`content` expected to be either Buffer or string');
  }

  /**
   * Set content
   */
  setFileContent(content) {
    if (content instanceof Buffer && content.toString !== undefined) {
      this.content = content.toString('base64');
      return;
    }

    throw new Error('`content` expected to be Buffer');
  }

  /**
   * Set filename
   */
  setFilename(filename) {
    if (typeof filename === 'undefined') {
      return;
    }
    if (filename && typeof filename !== 'string') {
      throw new Error('String expected for `filename`');
    }
    this.filename = filename;
  }

  /**
   * Set type
   */
  setType(type) {
    if (typeof type === 'undefined') {
      return;
    }
    if (typeof type !== 'string') {
      throw new Error('String expected for `type`');
    }
    this.type = type;
  }

  /**
   * Set disposition
   */
  setDisposition(disposition) {
    if (typeof disposition === 'undefined') {
      return;
    }
    if (typeof disposition !== 'string') {
      throw new Error('String expected for `disposition`');
    }
    this.disposition = disposition;
  }

  /**
   * Set content ID
   */
  setContentId(contentId) {
    if (typeof contentId === 'undefined') {
      return;
    }
    if (typeof contentId !== 'string') {
      throw new Error('String expected for `contentId`');
    }
    this.contentId = contentId;
  }

  /**
   * To JSON
   */
  toJSON() {

    //Extract properties from self
    const {content, filename, type, disposition, contentId} = this;

    //Initialize with mandatory properties
    const json = {content, filename};

    //Add whatever else we have
    if (typeof type !== 'undefined') {
      json.type = type;
    }
    if (typeof disposition !== 'undefined') {
      json.disposition = disposition;
    }
    if (typeof contentId !== 'undefined') {
      json.contentId = contentId;
    }

    //Return
    return toSnakeCase(json);
  }
}

//Export class
module.exports = Attachment;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Internal conversion helper
 */
module.exports = function strToCamelCase(str) {
  if (typeof str !== 'string') {
    throw new Error('String expected for conversion to snake case');
  }
  return str
    .trim()
    .replace(/_+|\-+/g, ' ')
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
      if (Number(match) === 0) {
        return '';
      }
      return (index === 0) ? match.toLowerCase() : match.toUpperCase();
    });
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Internal conversion helper
 */
module.exports = function strToSnakeCase(str) {
  if (typeof str !== 'string') {
    throw new Error('String expected for conversion to snake case');
  }
  return str.trim().replace(/(\s*\-*\b\w|[A-Z])/g, function($1) {
    $1 = $1.trim().toLowerCase().replace('-', '');
    return ($1[0] === '_' ? '' : '_') + $1;
  }).slice(1);
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 */
const EmailAddress = __webpack_require__(30);
const Personalization = __webpack_require__(52);
const toCamelCase = __webpack_require__(21);
const toSnakeCase = __webpack_require__(24);
const deepClone = __webpack_require__(22);
const arrayToJSON = __webpack_require__(54);
const { DYNAMIC_TEMPLATE_CHAR_WARNING } = __webpack_require__(117);
const {validateMailSettings, validateTrackingSettings} = __webpack_require__(118);

/**
 * Mail class
 */
class Mail {

  /**
   * Constructor
   */
  constructor(data) {

    //Initialize array and object properties
    this.isDynamic = false;
    this.hideWarnings = false;
    this.personalizations = [];
    this.attachments = [];
    this.content = [];
    this.categories = [];
    this.headers = {};
    this.sections = {};
    this.customArgs = {};
    this.trackingSettings = {};
    this.mailSettings = {};
    this.asm = {};

    //Helper properties
    this.substitutions = null;
    this.substitutionWrappers = null;
    this.dynamicTemplateData = null;

    //Process data if given
    if (data) {
      this.fromData(data);
    }
  }

  /**
   * Build from data
   */
  fromData(data) {

    //Expecting object
    if (typeof data !== 'object') {
      throw new Error('Expecting object for Mail data');
    }

    //Convert to camel case to make it workable, making a copy to prevent
    //changes to the original objects
    data = deepClone(data);
    data = toCamelCase(data, ['substitutions', 'dynamicTemplateData', 'customArgs', 'headers', 'sections']);

    //Extract properties from data
    const {
      to, from, replyTo, cc, bcc, sendAt, subject, text, html, content,
      templateId, personalizations, attachments, ipPoolName, batchId,
      sections, headers, categories, category, customArgs, asm, mailSettings,
      trackingSettings, substitutions, substitutionWrappers, dynamicTemplateData, isMultiple,
      hideWarnings,
    } = data;

    //Set data
    this.setFrom(from);
    this.setReplyTo(replyTo);
    this.setSubject(subject);
    this.setSendAt(sendAt);
    this.setTemplateId(templateId);
    this.setBatchId(batchId);
    this.setIpPoolName(ipPoolName);
    this.setAttachments(attachments);
    this.setContent(content);
    this.setSections(sections);
    this.setHeaders(headers);
    this.setCategories(category);
    this.setCategories(categories);
    this.setCustomArgs(customArgs);
    this.setAsm(asm);
    this.setMailSettings(mailSettings);
    this.setTrackingSettings(trackingSettings);
    this.setHideWarnings(hideWarnings);

    if (this.isDynamic) {
      this.setDynamicTemplateData(dynamicTemplateData);
    } else {
      this.setSubstitutions(substitutions);
      this.setSubstitutionWrappers(substitutionWrappers);
    }

    //Add contents from text/html properties
    this.addTextContent(text);
    this.addHtmlContent(html);

    //Using "to" property for personalizations
    if (personalizations) {
      this.setPersonalizations(personalizations);
    } else if (isMultiple && Array.isArray(to)) {
      //Multiple individual emails
      to.forEach(to => this.addTo(to, cc, bcc));
    } else {
      //Single email (possibly with multiple recipients in the to field)
      this.addTo(to, cc, bcc);
    }
  }

  /**
   * Set from email
   */
  setFrom(from) {
    if (this._checkProperty('from', from, [this._checkUndefined])) {
      if (typeof from !== 'string' && typeof from.email !== 'string') {
        throw new Error('String or address object expected for `from`');
      }
      this.from = EmailAddress.create(from);
    }
  }

  /**
   * Set reply to
   */
  setReplyTo(replyTo) {
    if (this._checkProperty('replyTo', replyTo, [this._checkUndefined])) {
      if (typeof replyTo !== 'string' && typeof replyTo.email !== 'string') {
        throw new Error('String or address object expected for `replyTo`');
      }
      this.replyTo = EmailAddress.create(replyTo);
    }
  }

  /**
   * Set subject
   */
  setSubject(subject) {
    this._setProperty('subject', subject, 'string');
  }

  /**
   * Set send at
   */
  setSendAt(sendAt) {
    if (this._checkProperty('sendAt', sendAt, [this._checkUndefined, this._createCheckThatThrows(Number.isInteger, 'Integer expected for `sendAt`')])) {
      this.sendAt = sendAt;
    }
  }

  /**
   * Set template ID, also checks if the template is dynamic or legacy
   */
  setTemplateId(templateId) {
    if (this._setProperty('templateId', templateId, 'string')) {
      if (templateId.indexOf('d-') === 0) {
        this.isDynamic = true;
      }
    }
  }

  /**
   * Set batch ID
   */
  setBatchId(batchId) {
    this._setProperty('batchId', batchId, 'string');
  }

  /**
   * Set IP pool name
   */
  setIpPoolName(ipPoolName) {
    this._setProperty('ipPoolName', ipPoolName, 'string');
  }

  /**
   * Set ASM
   */
  setAsm(asm) {
    if (this._checkProperty('asm', asm, [this._checkUndefined, this._createTypeCheck('object')])) {
      if (typeof asm.groupId !== 'number') {
        throw new Error('Expected `asm` to include an integer in its `groupId` field');
      }
      if (asm.groupsToDisplay &&
        (!Array.isArray(asm.groupsToDisplay) || !asm.groupsToDisplay.every(group => typeof group === 'number'))) {
        throw new Error('Array of integers expected for `asm.groupsToDisplay`');
      }
      this.asm = asm;
    }
  }

  /**
   * Set personalizations
   */
  setPersonalizations(personalizations) {
    if (!this._doArrayCheck('personalizations', personalizations)) {
      return;
    }

    if (!personalizations.every(personalization => typeof personalization === 'object')) {
      throw new Error('Array of objects expected for `personalizations`');
    }

    //Clear and use add helper to add one by one
    this.personalizations = [];
    personalizations
      .forEach(personalization => this.addPersonalization(personalization));
  }

  /**
   * Add personalization
   */
  addPersonalization(personalization) {
    //We should either send substitutions or dynamicTemplateData
    //depending on the templateId
    if (this.isDynamic && personalization.substitutions) {
      delete personalization.substitutions;
    } else if (!this.isDynamic && personalization.dynamicTemplateData) {
      delete personalization.dynamicTemplateData;
    }

    //Convert to class if needed
    if (!(personalization instanceof Personalization)) {
      personalization = new Personalization(personalization);
    }

    //If this is dynamic, set dynamicTemplateData, or set substitutions
    if (this.isDynamic) {
      this.applyDynamicTemplateData(personalization);
    } else {
      this.applySubstitutions(personalization);
    }

    //Push personalization to array
    this.personalizations.push(personalization);
  }

  /**
   * Convenience method for quickly creating personalizations
   */
  addTo(to, cc, bcc) {
    if (
      typeof to === 'undefined' &&
      typeof cc === 'undefined' &&
      typeof bcc === 'undefined'
    ) {
      throw new Error('Provide at least one of to, cc or bcc');
    }
    this.addPersonalization(new Personalization({to, cc, bcc}));
  }

  /**
   * Set substitutions
   */
  setSubstitutions(substitutions) {
    this._setProperty('substitutions', substitutions, 'object');
  }

  /**
   * Set substitution wrappers
   */
  setSubstitutionWrappers(substitutionWrappers) {
    let lengthCheck = (propertyName, value) => {
      if (!Array.isArray(value) || value.length !== 2) {
        throw new Error('Array expected with two elements for `' + propertyName + '`');
      }
    };

    if (this._checkProperty('substitutionWrappers', substitutionWrappers, [this._checkUndefined, lengthCheck])) {
      this.substitutionWrappers = substitutionWrappers;
    }
  }

  /**
   * Helper which applies globally set substitutions to personalizations
   */
  applySubstitutions(personalization) {
    if (personalization instanceof Personalization) {
      personalization.reverseMergeSubstitutions(this.substitutions);
      personalization.setSubstitutionWrappers(this.substitutionWrappers);
    }
  }

  /**
   * Helper which applies globally set dynamic_template_data to personalizations
   */
  applyDynamicTemplateData(personalization) {
    if (personalization instanceof Personalization) {
      personalization.deepMergeDynamicTemplateData(this.dynamicTemplateData);
    }
  }

  /**
   * Set dynamicTemplateData
   */
  setDynamicTemplateData(dynamicTemplateData) {
    if (typeof dynamicTemplateData === 'undefined') {
      return;
    }
    if (typeof dynamicTemplateData !== 'object') {
      throw new Error('Object expected for `dynamicTemplateData`');
    }

    // Check dynamic template for non-escaped characters and warn if found
    if (!this.hideWarnings) {
      Object.values(dynamicTemplateData).forEach(value => {
        if (/['"&]/.test(value)) {
          console.warn(DYNAMIC_TEMPLATE_CHAR_WARNING);
        }
      });
    }

    this.dynamicTemplateData = dynamicTemplateData;
  }

  /**
   * Set content
   */
  setContent(content) {
    if (this._doArrayCheck('content', content)) {
      if (!content.every(contentField => typeof contentField === 'object')) {
        throw new Error('Expected each entry in `content` to be an object');
      }
      if (!content.every(contentField => typeof contentField.type === 'string')) {
        throw new Error('Expected each `content` entry to contain a `type` string');
      }
      if (!content.every(contentField => typeof contentField.value === 'string')) {
        throw new Error('Expected each `content` entry to contain a `value` string');
      }
      this.content = content;
    }
  }

  /**
   * Add content
   */
  addContent(content) {
    if (this._checkProperty('content', content, [this._createTypeCheck('object')])) {
      this.content.push(content);
    }
  }

  /**
   * Add text content
   */
  addTextContent(text) {
    if (this._checkProperty('text', text, [this._checkUndefined, this._createTypeCheck('string')])) {
      this.addContent({
        value: text,
        type: 'text/plain',
      });
    }
  }

  /**
   * Add HTML content
   */
  addHtmlContent(html) {
    if (this._checkProperty('html', html, [this._checkUndefined, this._createTypeCheck('string')])) {
      this.addContent({
        value: html,
        type: 'text/html',
      });
    }
  }

  /**
   * Set attachments
   */
  setAttachments(attachments) {
    if (this._doArrayCheck('attachments', attachments)) {
      if (!attachments.every(attachment => typeof attachment.content === 'string')) {
        throw new Error('Expected each attachment to contain a `content` string');
      }
      if (!attachments.every(attachment => typeof attachment.filename === 'string')) {
        throw new Error('Expected each attachment to contain a `filename` string');
      }
      if (!attachments.every(attachment => !attachment.type || typeof attachment.type === 'string')) {
        throw new Error('Expected the attachment\'s `type` field to be a string');
      }
      if (!attachments.every(attachment => !attachment.disposition || typeof attachment.disposition === 'string')) {
        throw new Error('Expected the attachment\'s `disposition` field to be a string');
      }
      this.attachments = attachments;
    }
  }

  /**
   * Add attachment
   */
  addAttachment(attachment) {
    if (this._checkProperty('attachment', attachment, [this._checkUndefined, this._createTypeCheck('object')])) {
      this.attachments.push(attachment);
    }
  }

  /**
   * Set categories
   */
  setCategories(categories) {
    let allElementsAreStrings = (propertyName, value) => {
      if (!Array.isArray(value) || !value.every(item => typeof item === 'string')) {
        throw new Error('Array of strings expected for `' + propertyName + '`');
      }
    };

    if (typeof categories === 'string') {
      categories = [categories];
    }

    if (this._checkProperty('categories', categories, [this._checkUndefined, allElementsAreStrings])) {
      this.categories = categories;
    }
  }

  /**
   * Add category
   */
  addCategory(category) {
    if (this._checkProperty('category', category, [this._createTypeCheck('string')])) {
      this.categories.push(category);
    }
  }

  /**
   * Set headers
   */
  setHeaders(headers) {
    this._setProperty('headers', headers, 'object');
  }

  /**
   * Add a header
   */
  addHeader(key, value) {
    if (this._checkProperty('key', key, [this._createTypeCheck('string')])
      && this._checkProperty('value', value, [this._createTypeCheck('string')])) {
      this.headers[key] = value;
    }
  }

  /**
   * Set sections
   */
  setSections(sections) {
    this._setProperty('sections', sections, 'object');
  }

  /**
   * Set custom args
   */
  setCustomArgs(customArgs) {
    this._setProperty('customArgs', customArgs, 'object');
  }

  /**
   * Set tracking settings
   */
  setTrackingSettings(settings) {
    if (typeof settings === 'undefined') {
      return;
    }
    validateTrackingSettings(settings);
    this.trackingSettings = settings;
  }

  /**
   * Set mail settings
   */
  setMailSettings(settings) {
    if (typeof settings === 'undefined') {
      return;
    }
    validateMailSettings(settings);
    this.mailSettings = settings;
  }

  /**
   * Set hide warnings
   */
  setHideWarnings(hide) {
    if (typeof hide === 'undefined') {
      return;
    }
    if (typeof hide !== 'boolean') {
      throw new Error('Boolean expected for `hideWarnings`');
    }
    this.hideWarnings = hide;
  }

  /**
   * To JSON
   */
  toJSON() {

    //Extract properties from self
    const {
      from, replyTo, sendAt, subject, content, templateId,
      personalizations, attachments, ipPoolName, batchId, asm,
      sections, headers, categories, customArgs, mailSettings,
      trackingSettings,
    } = this;

    //Initialize with mandatory values
    const json = {
      from, subject,
      personalizations: arrayToJSON(personalizations),
    };

    //Array properties
    if (Array.isArray(attachments) && attachments.length > 0) {
      json.attachments = arrayToJSON(attachments);
    }
    if (Array.isArray(categories) && categories.length > 0) {
      json.categories = categories.filter(cat => cat !== '');
    }
    if (Array.isArray(content) && content.length > 0) {
      json.content = arrayToJSON(content);
    }

    //Object properties
    if (Object.keys(headers).length > 0) {
      json.headers = headers;
    }
    if (Object.keys(mailSettings).length > 0) {
      json.mailSettings = mailSettings;
    }
    if (Object.keys(trackingSettings).length > 0) {
      json.trackingSettings = trackingSettings;
    }
    if (Object.keys(customArgs).length > 0) {
      json.customArgs = customArgs;
    }
    if (Object.keys(sections).length > 0) {
      json.sections = sections;
    }
    if (Object.keys(asm).length > 0) {
      json.asm = asm;
    }

    //Simple properties
    if (typeof replyTo !== 'undefined') {
      json.replyTo = replyTo;
    }
    if (typeof sendAt !== 'undefined') {
      json.sendAt = sendAt;
    }
    if (typeof batchId !== 'undefined') {
      json.batchId = batchId;
    }
    if (typeof templateId !== 'undefined') {
      json.templateId = templateId;
    }
    if (typeof ipPoolName !== 'undefined') {
      json.ipPoolName = ipPoolName;
    }

    //Return as snake cased object
    return toSnakeCase(json, ['substitutions', 'dynamicTemplateData', 'customArgs', 'headers', 'sections']);
  }

  /**************************************************************************
   * Static helpers
   ***/

  /**
   * Create a Mail instance from given data
   */
  static create(data) {

    //Array?
    if (Array.isArray(data)) {
      return data
        .filter(item => !!item)
        .map(item => this.create(item));
    }

    //Already instance of Mail class?
    if (data instanceof Mail) {
      return data;
    }

    //Create instance
    return new Mail(data);
  }

  /**************************************************************************
   * helpers for property-setting checks
   ***/

  /**
   * Perform a set of checks on the new property value. Returns true if all
   * checks complete successfully without throwing errors or returning true.
   */
  _checkProperty(propertyName, value, checks) {
    return !checks.some((e) => e(propertyName, value));
  }

  /**
   * Set a property with normal undefined and type-checks
   */
  _setProperty(propertyName, value, propertyType) {
    let propertyChecksPassed = this._checkProperty(
      propertyName,
      value,
      [this._checkUndefined, this._createTypeCheck(propertyType)]);

    if (propertyChecksPassed) {
      this[propertyName] = value;
    }

    return propertyChecksPassed;
  }

  /**
   * Fail if the value is undefined.
   */
  _checkUndefined(propertyName, value) {
    return typeof value === 'undefined';
  }

  /**
   * Create and return a function that checks for a given type
   */
  _createTypeCheck(propertyType) {
    return (propertyName, value) => {
      if (typeof value !== propertyType) {
        throw new Error(propertyType + ' expected for `' + propertyName + '`');
      }
    };
  }

  /**
   * Create a check out of a callback. If the callback
   * returns false, the check will throw an error.
   */
  _createCheckThatThrows(check, errorString) {
    return (propertyName, value) => {
      if (!check(value)) {
        throw new Error(errorString);
      }
    };
  }

  /**
   * Set an array property after checking that the new value is an
   * array.
   */
  _setArrayProperty(propertyName, value) {
    if (this._doArrayCheck(propertyName, value)) {
      this[propertyName] = value;
    }
  }

  /**
   * Check that a value isn't undefined and is an array.
   */
  _doArrayCheck(propertyName, value) {
    return this._checkProperty(
      propertyName,
      value,
      [this._checkUndefined, this._createCheckThatThrows(Array.isArray, 'Array expected for`' + propertyName + '`')]);
  }
}

//Export class
module.exports = Mail;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key, options) {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge = options.customMerge(key);
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target) {
	return Object.getOwnPropertySymbols
		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
			return target.propertyIsEnumerable(symbol)
		})
		: []
}

function getKeys(target) {
	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object, property) {
	try {
		return property in object
	} catch(_) {
		return false
	}
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target, key) {
	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		getKeys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	getKeys(source).forEach(function(key) {
		if (propertyIsUnsafe(target, key)) {
			return
		}

		if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
		} else {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		}
	});
	return destination
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;
	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
	// implementations can use it. The caller may not replace it.
	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, options)
	}, {})
};

var deepmerge_1 = deepmerge;

module.exports = deepmerge_1;


/***/ }),
/* 117 */
/***/ (function(module, exports) {

const DYNAMIC_TEMPLATE_CHAR_WARNING = `
Content with characters ', " or & may need to be escaped with three brackets
{{{ content }}}
See https://sendgrid.com/docs/for-developers/sending-email/using-handlebars/ for more information.`;

module.exports = {
  DYNAMIC_TEMPLATE_CHAR_WARNING,
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const validate = (parent, parentName, childName, childType) => {
  if (typeof parent === 'undefined' || typeof parent[childName] === 'undefined') {
    return;
  }
  if (typeof parent[childName] !== childType) {
    throw new Error(`${childType} expected for \`${parentName}.${childName}\``)
  }
};

module.exports = {
  validateMailSettings(settings) {
    if (typeof settings !== 'object') {
      throw new Error('Object expected for `mailSettings`');
    }
    const {
      bcc,
      bypassListManagement,
      footer,
      sandboxMode,
      spamCheck,
    } = settings;
    validate(bcc, 'bcc', 'enable', 'boolean');
    validate(bcc, 'bcc', 'email', 'string');
    validate(bypassListManagement, 'bypassListManagement', 'enable', 'boolean');
    validate(footer, 'footer', 'enable', 'boolean');
    validate(footer, 'footer', 'text', 'string');
    validate(footer, 'footer', 'html', 'string');
    validate(sandboxMode, 'sandboxMode', 'enable', 'boolean');
    validate(spamCheck, 'spamCheck', 'enable', 'boolean');
    validate(spamCheck, 'spamCheck', 'threshold', 'number');
    validate(spamCheck, 'spamCheck', 'postToUrl', 'string');
  },

  validateTrackingSettings(settings) {
    if (typeof settings !== 'object') {
      throw new Error('Object expected for `trackingSettings`');
    }
    const {
      clickTracking,
      openTracking,
      subscriptionTracking,
      ganalytics,
    } = settings;
    validate(clickTracking, 'clickTracking', 'enable', 'boolean');
    validate(clickTracking, 'clickTracking', 'enableText', 'boolean');
    validate(openTracking, 'openTracking', 'enable', 'boolean');
    validate(openTracking, 'openTracking', 'substitutionTag', 'string');
    validate(subscriptionTracking, 'subscriptionTracking', 'enable', 'boolean');
    validate(subscriptionTracking, 'subscriptionTracking', 'text', 'string');
    validate(subscriptionTracking, 'subscriptionTracking', 'html', 'string');
    validate(subscriptionTracking, 'subscriptionTracking', 'substitutionTag', 'string');
    validate(ganalytics, 'ganalytics', 'enable', 'boolean');
    validate(ganalytics, 'ganalytics', 'utm_source', 'string');
    validate(ganalytics, 'ganalytics', 'utm_medium', 'string');
    validate(ganalytics, 'ganalytics', 'utm_term', 'string');
    validate(ganalytics, 'ganalytics', 'utm_content', 'string');
    validate(ganalytics, 'ganalytics', 'utm_campaign', 'string');
  },
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class Response {
  constructor(statusCode, body, headers) {
    this.statusCode = statusCode;
    this.body = body;
    this.headers = headers;
  }

  toString() {
    return 'HTTP ' + this.statusCode + ' ' + this.body;
  }
}

module.exports = Response;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Response error class
 */
class ResponseError extends Error {

  /**
   * Constructor
   */
  constructor(response) {

    //Super
    super();

    //Extract data from response
    const { headers, status, statusText, data } = response;

    //Set data
    this.code = status;
    this.message = statusText;
    this.response = { headers, body: data };

    //Capture stack trace
    if (!this.stack) {
      Error.captureStackTrace(this, this.constructor);
    }

    //Clean up stack trace
    const regex = new RegExp(process.cwd() + '/', 'gi');
    this.stack = this.stack.replace(regex, '');
  }

  /**
   * Convert to string
   */
  toString() {
    const { body } = this.response;
    let err = `${this.message} (${this.code})`;
    if (body && Array.isArray(body.errors)) {
      body.errors.forEach(error => {
        const message = error.message;
        const field = error.field;
        const help = error.help;
        err += `\n  ${message}\n    ${field}\n    ${help}`;
      });
    }
    return err;
  }

  /**
   * Convert to simple object for JSON responses
   */
  toJSON() {
    const { message, code, response } = this;
    return { message, code, response };
  }
}

//Export
module.exports = ResponseError;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Dependencies
 */
const toCamelCase = __webpack_require__(21);
const deepClone = __webpack_require__(22);

/**
 * Options
 */
const AggregatedByOptions = ['day', 'week', 'month'];
const CountryOptions = ['us', 'ca'];
const SortByDirection = ['desc', 'asc'];

/**
 * Statistics class
 */
class Statistics {
  constructor(data) {
    this.startDate = null;
    this.endDate = null;
    this.aggregatedBy = null;

    if (data) {
      this.fromData(data);
    }
  }

  /**
   * Build from data
   */
  fromData(data) {

    //Expecting object
    if (typeof data !== 'object') {
      throw new Error('Expecting object for Statistics data');
    }

    //Convert to camel case to make it workable, making a copy to prevent
    //changes to the original objects
    data = deepClone(data);
    data = toCamelCase(data, ['substitutions', 'customArgs']);

    const { startDate,
      endDate,
      aggregatedBy,
    } = data;

    this.setStartDate(startDate);
    this.setEndDate(endDate);
    this.setAggregatedBy(aggregatedBy);
  }

  /**
   * Set startDate
   */
  setStartDate(startDate) {
    if (typeof startDate === 'undefined') {
      throw new Error('Date expected for `startDate`');
    }

    if ((new Date(startDate) === 'Invalid Date') ||
        isNaN(new Date(startDate))) {
      throw new Error('Date expected for `startDate`');
    }

    console.log(startDate);

    this.startDate = new Date(startDate).toISOString().slice(0, 10);
  }

  /**
   * Set endDate
   */
  setEndDate(endDate) {
    if (typeof endDate === 'undefined') {
      this.endDate = new Date().toISOString().slice(0, 10);
      return;
    }

    if (new Date(endDate) === 'Invalid Date' || isNaN(new Date(endDate))) {
      throw new Error('Date expected for `endDate`');
    }

    this.endDate = new Date(endDate).toISOString().slice(0, 10);
  }

  /**
   * Set aggregatedBy
   */
  setAggregatedBy(aggregatedBy) {
    if (typeof aggregatedBy === 'undefined') {
      return;
    }

    if (typeof aggregatedBy === 'string' &&
        AggregatedByOptions.includes(aggregatedBy.toLowerCase())) {
      this.aggregatedBy = aggregatedBy;
    } else {
      throw new Error('Incorrect value for `aggregatedBy`');
    }
  }

  /**
   * Get Global
   */
  getGlobal() {
    const { startDate, endDate, aggregatedBy } = this;

    return { startDate, endDate, aggregatedBy };
  }

  /**
   * Get Advanced
   */
  getAdvanced(country) {
    const json = this.getGlobal();

    if (typeof country === 'undefined') {
      return json;
    }

    if (typeof country === 'string' &&
        CountryOptions.includes(country.toLowerCase())) {
      json.country = country;
    }

    return json;
  }

  /**
   * Get Advanced Mailbox Providers
   */
  getAdvancedMailboxProviders(mailBoxProviders) {
    const json = this.getGlobal();

    if (typeof mailBoxProviders === 'undefined') {
      return json;
    }

    if (Array.isArray(mailBoxProviders) &&
        mailBoxProviders.some(x => typeof x !== 'string')) {
      throw new Error('Array of strings expected for `mailboxProviders`');
    }

    json.mailBoxProviders = mailBoxProviders;

    return json;
  }

  /**
   * Get Advanced Browsers
   */
  getAdvancedBrowsers(browsers) {
    const json = this.getGlobal();

    if (typeof browsers === 'undefined') {
      return json;
    }

    if (Array.isArray(browsers) && browsers.some(x => typeof x !== 'string')) {
      throw new Error('Array of strings expected for `browsers`');
    }

    json.browsers = browsers;

    return json;
  }

  /**
   * Get Categories
   */
  getCategories(categories) {
    if (typeof categories === 'undefined') {
      throw new Error('Array of strings expected for `categories`');
    }

    if (!this._isValidArrayOfStrings(categories)) {
      throw new Error('Array of strings expected for `categories`');
    }

    const json = this.getGlobal();
    json.categories = categories;

    return json;
  }

  /**
   * Get Subuser
   */
  getSubuser(subusers) {
    if (typeof subusers === 'undefined') {
      throw new Error('Array of strings expected for `subusers`');
    }

    if (!this._isValidArrayOfStrings(subusers)) {
      throw new Error('Array of strings expected for `subusers`');
    }

    const json = this.getGlobal();
    json.subusers = subusers;

    return json;
  }

  /**
   * Get Subuser Sum
   */
  getSubuserSum(sortByMetric = 'delivered',
    sortByDirection = SortByDirection[0], limit = 5, offset = 0) {
    if (typeof sortByMetric !== 'string') {
      throw new Error('string expected for `sortByMetric`');
    }

    if (!SortByDirection.includes(sortByDirection.toLowerCase())) {
      throw new Error('desc or asc expected for `sortByDirection`');
    }

    if (typeof limit !== 'number') {
      throw new Error('number expected for `limit`');
    }

    if (typeof offset !== 'number') {
      throw new Error('number expected for `offset`');
    }

    const json = this.getGlobal();

    json.sortByMetric = sortByMetric;
    json.sortByDirection = sortByDirection;
    json.limit = limit;
    json.offset = offset;

    return json;
  }

  /**
   * Get Subuser Monthly
   */
  getSubuserMonthly(sortByMetric = 'delivered',
    sortByDirection = SortByDirection[0], limit = 5, offset = 0) {
    if (typeof sortByMetric !== 'string') {
      throw new Error('string expected for `sortByMetric`');
    }

    if (!SortByDirection.includes(sortByDirection.toLowerCase())) {
      throw new Error('desc or asc expected for `sortByDirection`');
    }

    if (typeof limit !== 'number') {
      throw new Error('number expected for `limit`');
    }

    if (typeof offset !== 'number') {
      throw new Error('number expected for `offset`');
    }

    const json = this.getGlobal();

    json.sortByMetric = sortByMetric;
    json.sortByDirection = sortByDirection;
    json.limit = limit;
    json.offset = offset;

    return json;
  }

  _isValidArrayOfStrings(arr) {
    if (!Array.isArray(arr)) {
      return false;
    }

    if (arr.length < 1 || arr.some(x => typeof x !== 'string')) {
      return false;
    }

    return true;
  }
}

//Export class
module.exports = Statistics;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Expose helpers
 */
const arrayToJSON = __webpack_require__(54);
const convertKeys = __webpack_require__(29);
const deepClone = __webpack_require__(22);
const mergeData = __webpack_require__(123);
const splitNameEmail = __webpack_require__(51);
const toCamelCase = __webpack_require__(21);
const toSnakeCase = __webpack_require__(24);
const wrapSubstitutions = __webpack_require__(53);

/**
 * Export
 */
module.exports = {
  arrayToJSON,
  convertKeys,
  deepClone,
  mergeData,
  splitNameEmail,
  toCamelCase,
  toSnakeCase,
  wrapSubstitutions,
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Merge data helper
 */
module.exports = function mergeData(base, data) {

  //Validate data
  if (typeof base !== 'object' || base === null) {
    throw new Error('Not an object provided for base');
  }
  if (typeof data !== 'object' || data === null) {
    throw new Error('Not an object provided for data');
  }

  //Copy base
  const merged = Object.assign({}, base);

  //Add data
  for (const key in data) {
    //istanbul ignore else
    if (data.hasOwnProperty(key)) {
      if (data[key] && Array.isArray(data[key])) {
        merged[key] = data[key];
      } else if (data[key] && typeof data[key] === 'object') {
        merged[key] = Object.assign({}, data[key]);
      } else if (data[key]) {
        merged[key] = data[key];
      }
    }
  }

  //Return
  return merged;
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

/* @flow */
/*::

type DotenvParseOptions = {
  debug?: boolean
}

// keys and values from src
type DotenvParseOutput = { [string]: string }

type DotenvConfigOptions = {
  path?: string, // path to .env file
  encoding?: string, // encoding of .env file
  debug?: string // turn on logging for debugging purposes
}

type DotenvConfigOutput = {
  parsed?: DotenvParseOutput,
  error?: Error
}

*/

const fs = __webpack_require__(18)
const path = __webpack_require__(50)

function log (message /*: string */) {
  console.log(`[dotenv][DEBUG] ${message}`)
}

const NEWLINE = '\n'
const RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/
const RE_NEWLINES = /\\n/g
const NEWLINES_MATCH = /\n|\r|\r\n/

// Parses src into an Object
function parse (src /*: string | Buffer */, options /*: ?DotenvParseOptions */) /*: DotenvParseOutput */ {
  const debug = Boolean(options && options.debug)
  const obj = {}

  // convert Buffers before splitting into lines and processing
  src.toString().split(NEWLINES_MATCH).forEach(function (line, idx) {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    const keyValueArr = line.match(RE_INI_KEY_VAL)
    // matched?
    if (keyValueArr != null) {
      const key = keyValueArr[1]
      // default undefined or missing values to empty string
      let val = (keyValueArr[2] || '')
      const end = val.length - 1
      const isDoubleQuoted = val[0] === '"' && val[end] === '"'
      const isSingleQuoted = val[0] === "'" && val[end] === "'"

      // if single or double quoted, remove quotes
      if (isSingleQuoted || isDoubleQuoted) {
        val = val.substring(1, end)

        // if double quoted, expand newlines
        if (isDoubleQuoted) {
          val = val.replace(RE_NEWLINES, NEWLINE)
        }
      } else {
        // remove surrounding whitespace
        val = val.trim()
      }

      obj[key] = val
    } else if (debug) {
      log(`did not match key and value when parsing line ${idx + 1}: ${line}`)
    }
  })

  return obj
}

// Populates process.env from .env file
function config (options /*: ?DotenvConfigOptions */) /*: DotenvConfigOutput */ {
  let dotenvPath = path.resolve(process.cwd(), '.env')
  let encoding /*: string */ = 'utf8'
  let debug = false

  if (options) {
    if (options.path != null) {
      dotenvPath = options.path
    }
    if (options.encoding != null) {
      encoding = options.encoding
    }
    if (options.debug != null) {
      debug = true
    }
  }

  try {
    // specifying an encoding returns a string instead of a buffer
    const parsed = parse(fs.readFileSync(dotenvPath, { encoding }), { debug })

    Object.keys(parsed).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
        process.env[key] = parsed[key]
      } else if (debug) {
        log(`"${key}" is already defined in \`process.env\` and will not be overwritten`)
      }
    })

    return { parsed }
  } catch (e) {
    return { error: e }
  }
}

module.exports.config = config
module.exports.parse = parse


/***/ })
/******/ ])));