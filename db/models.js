const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/gzhipin')
const conn=mongoose.connection
conn.on('connected',function () {
    console.log('连接成功')
})
const userSchema = mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    type:{type:String,required:true},
    header:{type:String},
    post:{type:String},
    info:{type:String},
    company:{type:String},
    salary:{type:String},
})
// const chatSchema=mongoose.Schema({
//     from:{type:String,required:true},//发送用户的id
//     to:{type:String,required:true},//接收用户的id
//     chat_id:{type:String,required:true},//from/to组成的字符串
//     content:{type:String,required:true},//内容
//     read:{type:Boolean,default:false},//标识是否已读
//     create_time:{type:Number},//创建时间，聊天记录的顺序

// })
// const ChatModel=mongoose.model('chat',chatSchema)
const UserModel = mongoose.model('user',userSchema)
exports.UserModel=UserModel
// exports.ChatModel=ChatModel