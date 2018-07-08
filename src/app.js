App({
  onLaunch() {
    // Do something initial when launch.
  },
  onShow() {
    // Do something when show.
  },
  onHide() {
    // Do something when hide.
  },
  onError() {
    // 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
  },
  onPageNotFound() {
    // 当要打开的页面并不存在时，会回调这个监听器
  },
  globalData: {
    userInfo: null
  }
});
