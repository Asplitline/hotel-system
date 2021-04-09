// 'repeat(10)':{
//     username: '{{firstName()}}',
//     state:'{{random(0,1)}}',
//      email(tags) {
//         return '123@123.com';
//       },
//      sex:'{{random(0,1)}}',
//      level:'{{random(0,1)}}',
//      phone:'1388888888',
//      url: 'http://placehold.it/40x40',
// }

const user = require('./user.json')
const room = require('./room.json')
const comment = require('./comment.json')
const notice = require('./notice.json')
const category = require('./category.json')
const order = require('./order.json')
module.exports = {
    user,
    room,
    comment,
    notice,
    category,
    order
}
