let express = require('express')
let router = express.Router()
let mgdb = require('../../utils/mgdb')
router.get('/',(req,res,next)=>{
  if(!req.session['newsapp_user_session']){
    mgdb({
      collectionName:'user'
    },(collection,client,ObjectID)=>{
      collection.find({
        _id:ObjectID(req.session['newsapp_user_session'])
      },{
        projection:{username:0,password:0}
      }).toArray((err,result)=>{
        if(!err){
          res.send({err:0,msg:'自动登录',data:result[0]})
        }else{
          res.send({err:1,msg:'集合操作失败'})
        }
      })
    })
   
  }else{
    res.send({err:1,msg:'未登录'})
  }
})
module.exports = router;

// //用户接口
// let express=require("express");
// let router=express.Router();
// let mgdb=require("../../utils/mgdb");
// router.get("/",(req,res,next)=>{
//     // console.log("user");
//     if(!req.session['newsapp_user_session']){
//         res.send({err:1,msg:"未登录"});
//     }else{
//         mgdb({
//             collectionName:'user',
//         },(collection,client,objectID)=>{
//             collection.find({
//                 _id:objectID(req.session['newsapp_user_session'])
//             },{
//                 projection:{username:0,password:0}
//             }).toArray((err,result)=>{
//                 if(!err){
//                     res.send({err:1,msg:"自动登录",data:result[0]})
//                 }else{
//                     res.send({err:0,msg:"集合操作失败"})
//                 }  

//             })
//         })

//     }
// })



// module.exports=router;