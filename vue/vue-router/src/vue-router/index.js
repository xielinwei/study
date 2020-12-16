import install from "./install"
import createMatcher from "./create-matcher"
export default class VueRouter {
  constructor(options) {
    this.matcher = createMatcher(options.routes || [])
  }
  init(app) {
  }
}
VueRouter.install = install;