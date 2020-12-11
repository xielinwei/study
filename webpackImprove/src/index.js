import jquery from "jquery";
import moment from 'moment';
import "../node_modules/moment/locale/zh-cn"
moment.locale("zh-cn")
let r = moment().startOf("day").fromNow();
document.write(r);
document.write(moment([2007, 0, 29]).fromNow())