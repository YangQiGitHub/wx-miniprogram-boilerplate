const base = {
  /**
   * [isXXX 基础方法]
   * @param  {[type]}  item [description]
   * @return {Boolean}      [description]
   */
  isUndefined(item) {
    return typeof item === 'undefined';
  },
  isDefined(item) {
    return !base.isUndefined(item);
  },
  isString(item) {
    return typeof item === 'string';
  },
  isNumber(item) {
    return typeof item === 'number';
  },
  isArray(item) {
    return Object.prototype.toString.apply(item) === '[object Array]';
  },
  isObject(item) {
    return item && typeof item === 'object' && !base.isArray(item);
  },
  isFunction(item) {
    return typeof item === 'function';
  },

  /**
   * [功能方法]
   * @param  {[type]}  item [description]
   * @return {Boolean}      [description]
   */
  isPhone(str) {
    return /^1\d{10}$/.test(str);
  },

  /**
   * [公共方法]
   * @param  {[type]}  item [description]
   * @return {Boolean}      [description]
   */
  noop() {
    return null;
  },
  hasOwn(obj, type) {
    return Object.prototype.hasOwnProperty.call(obj, type);
  },

  /**
   * [getXXX 增强方法]
   * @param  {[type]}  item [description]
   * @return {Boolean}      [description]
   */
  getString(item, defaultStr) {
    if (base.isString(item)) return item.trim();
    if (base.isNumber(item)) return `${item}`.trim();
    return defaultStr || '';
  },
  /**
   * [
   *   getNumber(0),
   *   getNumber(-0),
   *   getNumber('0'),
   *   getNumber('-0'),
   *   getNumber(123),
   *   getNumber(-12),
   *   getNumber(1/0),
   *   getNumber(-1/0),
   *   getNumber(''),
   *   getNumber('a'),
   *   getNumber(true),
   *   getNumber(false),
   *   getNumber([]),
   *   getNumber({}),
   *   getNumber(null),
   *   getNumber(undefined)
   * ]
   */
  getNumber(item, defaultNum) {
    const isValidNumber =
      ['NaN', 'Infinity', '-Infinity'].indexOf(`${+item}`) === -1;
    const hasStrNumber = /\d+/.test(`${item}`);
    return isValidNumber && hasStrNumber ? +item : base.isDefined(defaultNum) ? defaultNum : -1;
  },
  getArray(item, defaultArr) {
    return base.isArray(item) ? item : defaultArr || [];
  },
  getObject(item, defaultObj) {
    return item && base.isObject(item) ? item : defaultObj || {};
  },
  getFunction(item) {
    return base.isFunction(item) ? item : null;
  },

  /**
   * [JSON方法]
   * @param  {[type]}  item [description]
   * @return {Boolean}      [description]
   */
  _json(item) {
    let str = { type: Object.prototype.toString.call(item) };
    try {
      str = JSON.stringify(item, null, 2);
    } catch (e) {
      str.error = (e && e.message) || '';
    }
    return base.isString(str) ? str : base.getString(str, `${str}`);
  },
  _parse(item) {
    let obj = { type: Object.prototype.toString.call(item) };
    try {
      obj = JSON.parse(item);
    } catch (e) {
      obj.error = (e && e.message) || '';
    }
    return base.isObject(obj) ? obj : base.$parse(obj);
  },
  /**
   * [自定义导航方法]
   * @param  {...[type]} arg [description]
   * @return {[type]}        [description]
   */
  _navigateTo(obj) {
    const len = getCurrentPages().length;
    if (len >= 10) {
      /* eslint-disable */
      console.warn('[getCurrentPages] length: ', len, '. navigateTo -> redirectTo');
      /* eslint-enable */
      wx.redirectTo(obj);
    } else {
      wx.navigateTo(obj);
    }
  }
};

module.exports = base;
