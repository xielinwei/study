export let _Vue;
export default function install(Vue) {
  _Vue = Vue;
  // vue mixin 引入后mixin文件中定义的方法属性都会复制到引入到的组建的对应位置，比如方法复制到methods中，定义的字段会复制到data中，以此类推，各个钩子函数都会匹配到组件对应的钩子函数中
  // 1.对于created，mounted 等生命周期函数 mixin文件中的代码先执行，组件中的后执行
  // 2.对于data中定义的字段，组件中定义组件覆盖mixin中同名字段
  // 3.对于 method中的同名方法，组件内的同名方法覆盖mixin中的方法
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) { //根实例 
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this)
      } else { //子组件实例
        //深度优先  先加载根组件 再加载子组件  再加载孙子组件  
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
    }
  })
}