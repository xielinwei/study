import install from "./install"
export default class VueRouter {
  constructor(options) {
    console.log(options)

  }
  init(app) {
    console.log(app)
  }
}
VueRouter.install = install;