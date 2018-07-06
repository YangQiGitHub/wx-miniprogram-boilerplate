// 全局app实例
// const app = getApp();

Page({
  data: {
    num: 1
  },
  onLoad() {
    // Do some initialize when page load.
  },
  onReady() {
    // Do something when page ready.
  },
  onShow() {
    // Do something when page show.
  },
  onHide() {
    // Do something when page hide.
  },
  onUnload() {
    // Do something when page close.
  },
  onPullDownRefresh() {
    // Do something when pull down.
  },
  onReachBottom() {
    // Do something when page reach bottom.
  },
  onShareAppMessage() {
    // return custom share data when user share.
  },
  onPageScroll() {
    // Do something when page scroll
  },
  onTabItemTap() {
    // 当前是 tab 页时，点击 tab 时触发
    // console.log(item.index);
    // console.log(item.pagePath);
    // console.log(item.text);
  },
  // Event handler.
  clickInPage() {
    this.setData({ num: this.data.num + 1 });
  },
  clickInTemplate() {
    this.setData({ num: this.data.num - 1 });
  },
  addNum() {
    this.setData({ num: this.data.num + 1 });
  },
  customData: {
    hi: 'MINA'
  }
});
