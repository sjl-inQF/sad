let express = require('express')
let router = express.Router()
let mgdb = require('../../utils/mgdb')
let fs = require('fs');
let pathLib = require('path');
let bcrypt = require('bcrypt');

router.post('/',(req,res,next)=>{
  
  let {username,password,nikename,icon} = req.body;
  // username/password 是必传参数 不传不兜库
  if(!username || !password){
    res.send({err:1,msg:'username,password为必传参数'});
    return;
  }
  let follow = 0;
  let fans = 0;
  let time = Date.now();//生成注册时间
  password = bcrypt.hashSync(password, 10); 
  nikename = nikename || '系统给的'; //借助第三方昵称生成库

  // console.log('reg',req.file);// multer === dest  req.files   multer ===storage req.file

  if(!req.file && req.files.length>0 ){
    //改名 整合路径 存到 icon
    fs.renameSync(
      req.files[0].path,
      req.files[0].path + pathLib.parse(req.files[0].originalname).ext
    )
    icon = '/upload/user/' + req.files[0].filename + pathLib.parse(req.files[0].originalname).ext
  }else{
    icon = '/upload/noimage.png';
  }

  // 兜库校验username/password 
  mgdb({
    collectionName: 'user'
  },(collection,client)=>{
    collection.find({
      username
    },{

    }).toArray((err,result)=>{
      if(!err){
        if(result.length>0){
          //不通过 返回错误信息
          res.send({err:1,msg:'用户名已存在'})
          // fs.unlink('./public'+icon,(err)=>{})
          if(icon.indexOf('noimage') === -1){
            fs.unlinkSync('./public'+icon)
          }
          
          client.close()

        }else{
          //通过   返回用户数据  插入库 返回插入后的数据
          collection.insertOne({
            username,password,nikename,follow,fans,time,icon
          },(err,result)=>{
            if(!err){
              // req.session[key]=result.insertedId
              delete result.ops[0].password
              res.send({err:0,msg:'注册成功',data:result.ops[0]})
            }else{
              res.send({err:1,msg:'user集合操作失败'})
              client.close()
            }
          })
        }
      }else{
        res.send({err:1,msg:'user集合操作失败'})
        client.close()
      }
    })
  })
  
   
})

module.exports = router;
// //注册接口
// let express=require("express");
// let router=express.Router();
// let mgdb=require("../../utils/mgdb");//从当前文件开始
// let fs=require("fs");
// let pathLib=require("path");
// let bcrypt=require("bcrypt");

// router.post("/",(req,res,next)=>{
//     // console.log("reg");
//     let {username,password,nikename,icon}=req.body;
//     if(!username||!password){
//         res.send({err:1,msg:"用户名和密码是必传参数"});
//         return;
//     }

//     let follow=0;
//     let fan=0;
//     password=bcrypt.hashSync(password,10);//讲铭文密码加盐，再设置回去，所以这边开始都是加盐的
//     let time=Date.now();//时间戳，生成当时注册的时间
//     nikename=nikename||"系统给的";//借助第三方库，自动生成昵称---nikename
//     // icon=icon||"/upload/noimage.png";

//     // console.log("req",req.file);//multer===dest  req.files   mmulter===storage  req.file


//     if(!req.file&&req.files.length>0){
//         fs.renameSync(
//             req.files[0].path,
//             req.files[0].path+pathLib.parse(req.files[0].originalname).ext,
//         )
//         icon = '/upload/user/' + req.files[0].filename + pathLib.parse(req.files[0].originalname).ext
        
       
//     }else{
//         icon="/upload/noimage.png";
//     }


//     //校验用户名和密码username,password
//     mgdb({
//         collectionName:"user"  //查看的表，集合
//     },(collection,client)=>{
//         collection.find({
//             username          
//             //看用户名存不存在
//         },{}).toArray((err,result)=>{//返回的结果
//             if(!err){
//                 if(result.length>0){
//                     res.send({err:1,msg:"用户名已经存在了"});
//                     fs.unlinkSync("./public"+icon);//网络路径
//                     client.close();
//                 }else{
//                     //插入库
//                     collection.insertOne({
//                         username,password,icon,nikename, follow,fan,time,
//                     },(err,result)=>{
//                         if(!err){

//                             res.send({err:1,msg:"注册成功",data:result.ops[0]})
//                         }else{
//                             res.send({err:1,msg:"user集合操作失败"});
//                             client.close();
//                         }
//                     })
//                 }
//             }else{
//                 res.send({err:1,msg:"user集合操作失败"});
//                 client.close();
//             }
//         })
//     })


// })

// module.exports=router;