const {
  isUndefined,
  isDefined,
  isString,
  isObject,
  isFunction,
  getString,
} = require('./base.js');

const ajax = (
  url,
  {
    data,
    method = 'GET',
    header = {},
    success = () => {},
    fail = () => {},
    complete = () => {},
    failToast = true,
    modalLoading = '',
    navBarLoading = false,
    showLog = true
  }
) => {
  // 第三方登录态
  const session_3rd = updataStorageData('session_3rd');
  // 构造请求体
  const request = {
    url,
    method: ['GET', 'POST'].indexOf(method) > -1 ? method : 'GET',
    header: Object.assign({ SESSION: session_3rd }, header),
    data: Object.assign({}, data)
  };

  showLog && console.table && console.table(request); // eslint-disable-line

  modalLoading && wx.showLoading({ title: getString(modalLoading) });
  navBarLoading && wx.showNavigationBarLoading();

  wx.request(
    Object.assign(request, {
      success: ({ data, statusCode }) => {
        modalLoading && wx.hideLoading();

        showLog && console.log && console.log('[AJAX SUCCESS]', statusCode, typeof data === 'object' ? data : data.toString().substring(0, 100)); // eslint-disable-line

        // 状态码正常 & 确认有数据
        if (data && +data.code === 0 && data.data) {
          isFunction(success) && success(Object.assign({ statusCode }, data));
          return;
        }

        // 非正常业务码处理（如登录态失效等）
        if (data && +data.code === 12000010) {
          // 
        }

        // 其他情况，执行错误回调
        failToast &&
          wx.showToast({ title: data.message || '获取数据出错', icon: 'none' });
        isFunction(fail) && fail(Object.assign({ statusCode }, data));
      },
      fail: ({ error, errorMessage }) => {
        modalLoading && wx.hideLoading();
        showLog && console.log && console.log('[AJAX FAIL]', error, errorMessage); // eslint-disable-line
        failToast && wx.showToast({ title: errorMessage || '获取数据出错', icon: 'none' });
        isFunction(fail) && fail({ error, errorMessage });
      },
      complete: () => {
        navBarLoading && wx.hideNavigationBarLoading();
        isFunction(complete) && complete();
      }
    })
  );
};

const app = getApp();

const updataGlobalData = (key, value) => {
  const globalData = app.globalData;
  // 校验 globalData
  if (!globalData) {
    return console.error('[$updateGlobalData] globalData Not Find!'); // eslint-disable-line
  }
  // 校验: 操作字段
  if (!isString(key) || key === '') {
    return console.error('[$updateGlobalData] key 不能为空!'); // eslint-disable-line
  }
  // 取出已有信息
  const data = globalData[key] || {};
  // 更新缓存
  if (value && isObject(value) && isObject(data)) {
    // Object合并第一层
    globalData[key] = Object.assign({}, data, value);
  } else if (isDefined(value)) {
    // 其他非undefined数据直接覆盖
    globalData[key] = value;
  }
  return globalData[key];
};

const updataStorageData = (key, value) => {
  try {
    if (!isString(key) || key === '') {
      return console.error('[$updateStorageData] key 不能为空!'); // eslint-disable-line
    }
    let data = wx.getStorageSync(key);
    // 只有key情况下，直接返回data
    if (isUndefined(value)) return data;
    // Object合并
    if (isObject(value) && isObject(data)) {
      let info = Object.assign({}, data, value);
      wx.setStorageSync(key, info);
      return info;
    }
    // 其他数据直接覆盖
    wx.setStorageSync(key, value);
    return value;
  } catch (e) {
    console.error(`[ERROR]: ${value ? 'UPDATE' : 'GET'} Storage ${key} : `, e.stack); // eslint-disable-line
  }
};

module.exports = {
  ajax,
  app,
  updataGlobalData,
  updataStorageData
};
