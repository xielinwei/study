export default function createMatcher(routes){

  let {pathList, pathMap} = createRouteMap(routes)

  // 动态添加路由的方法
  function addRoutes(){

  }

  function match(){

  }
  return {
    match,
    addRoutes
  }
}