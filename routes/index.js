const UserModel=require('../db/models').UserModel
// const ChatModel=require('../db/models').ChatModel
const md5=require('blueimp-md5')
const filter={password:0,__v:0}
var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.post('/register',function (req,res,next) {
  // console.log('req')
  const {username,password,type}=req.body
  UserModel.findOne({username},function (error,user) {
      if(user){
        res.send({code:1,msg:'用户已存在'})
      }
      else{
        new UserModel({username,password:md5(password),type}).save(function (error, user) {
          const data={username,type,_id:user._id}
          res.cookie('userid',user._id,{maxAge:1000*60*60*24*7})
          res.send({code:0,data})
        })
      }
  })
})
router.post('/login',function (req, res) {
  const {username,password}=req.body
  UserModel.findOne({username,password:md5(password)},filter,function (error, user) {
    // console.log(user)
    if(!user){
      res.send({code:1,msg:'用户名或者密码错误'})
    }
    else{
        res.cookie('userid',user._id,{maxAge:1000*60*60*24*7})
      res.send({code:0,data:user})
    }

  })
})
router.post('/update',function (req, res) {
const userid=req.cookies.userid
    // console.log(req.cookies)
    if(!userid){
       return res.send({code:1,msg:'请先登录'})
    }
    UserModel.findByIdAndUpdate({_id:userid},req.body,function (error, user) {
        if(!user){
            res.clearCookie('userid')
            res.send({code:1,msg:'请先登录'})
        }else {
            const {_id, username, type} = user
            const data = Object.assign(req.body, {_id, username, type})
            res.send({code: 0, data})
        }
    })
})
router.get('/user',function(req,res){
   const userid=req.cookies.userid
   if(!userid){
     return res.send({code:1,msg:'请先登录'})
   }
   UserModel.findOne({_id:userid},function(error,user){
     return res.send({code:0,data:user})
   })

})
router.get('/list',function (req,res)
{
    // console.log(req)
    const {type}=req.query
    UserModel.find({type},function (error, users) {
        return res.json({code:0,data:users})
    })
})
//获取消息列表
// router.get('/msglist',function(req,res){
//   const userid=req.cookies.userid
//   UserModel.find(function(error,userDocs){
//     const users={}
//     userDocs.forEach(doc=>{
//       users[doc._id]={username:doc.username,header:doc.header}
//     })//将请求到的users数组数据转换成对象
//     ChatModel.find({'$or':[{from:userid},{to:userid}]},filter,function(error,chatMsgs){
//         res.send({code:0,data:{users,chatMsgs}})
//     })
//   })
  
// })
// router.post('/readmsg',function(req,res){
//   const from =req.body.from
//   const to =req.cookies.userid
//   ChatModel.update({from,to,read:false},{read:true},{multi:true},function(err,doc){
//     console.log('/readmsg',doc);
//     res.send({code:0,data:doc.nModified})
//   })
// })
module.exports = router;
