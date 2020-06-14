// module.exports = function (server) { 
//     // 引 入 操 作 chats 集 合 数 据 的 Model
//      const ChatModel = require('./db/models').ChatModel
//       // 得 到 操 作 服 务 器 端 sokectIO 的 io 对 象
//        const io = require('socket.io')(server)
// //绑 定 监 听 回 调 :客 户 端 连 接 上 服 务 器 
// io.on('connection', function(socket) {
//      // socket代 表 连 接
// console.log('有客户端连接上了服务器')
//  // 绑 定 sendMsg 监 听 , 接 收 客 户 端 发 送 的 消 息 
//  socket.on('sendMessage', function({from, to, content}) {
//       console.log('服务器接收到数据', {from, to, content}) 
//       // 将 接 收 到 的 消 息 保 存 到 数 据 库 
//       const chat_id = [from, to].sort().join('_') 
//       const create_time = Date.now() 
//       const chatModel = new ChatModel({chat_id, from, to, create_time, content})
//        chatModel.save(function (err, chatMsg) {
//             // 保 存 完 成 后 , 向 所 有 连 接 的 客 户 端 发 送 消 息
//              io.emit('receiveMessage', chatMsg) 
//              console.log('向所有连接的客户段发送消息',chatMsg);
//        })
//     })
// })
// }