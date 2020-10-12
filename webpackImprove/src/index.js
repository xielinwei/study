import jquery from "jquery";
import moment from 'moment';
moment.locale("zh-cn")
let r = moment().endOf("day").fromNow();
document.write(r)