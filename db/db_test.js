/*测试mongodbre*/
const md5=require('blueimp-md5')
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
    header:{type:String}
})
const UserModel = mongoose.model('user',userSchema)
function testSave(){
    const userModel =new UserModel({username: 'Tom2',password: md5('123'),type:'dashen'})
    userModel.save(function (error, user) {
        console.log('save()',error,user)
        console.log(userModel)

    })
}//保存数据库
// testSave()
function testFind() {
    UserModel.find({_id:'5df71451fb7c602bf4253f8b'},function (error, users) {
        console.log('find()',error,users)
    })
    UserModel.findOne({_id:'5df71451fb7c602bf4253f8b'},function (error, user) {
        console.log('findOne:',user)
    })
}
// testFind()
function testUpdate() {
    UserModel.findByIdAndUpdate({_id:'5df71451fb7c602bf4253f8b'},{username:'jack'},function (error, user) {
        console.log('Update:',user)
    })
}
// testUpdate()
function testDelete() {
    UserModel.remove({header:'1'},function (error, user) {
        console.log('remove:', user)
    })
}
// testDelete()