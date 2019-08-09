//登录接口
let express=require("express");
let router=express.Router();
let mgdb=require("../../utils/mgdb")
let bcrypt=require("bcrypt");
router.post("/",(req,res,next)=>{
    // console.log("login");
    let {username,password}=req.body;
    if(!username||!password){
        res.send({err:1,msg:'用户和密码是必传参数'});
        return;
    }

    //校验username和password
    mgdb({
        collectionName:'user',
    },(collection,client)=>{
        collection.find({
            username,
            // password   拿到密码
        },{
            projection:{username:0}
        }).toArray((err,result)=>{
            if(!err){
                if(result.length>0){
                    let userdata=result[0];
                    let pass=bcrypt.compareSync(password,userdata.password);//铭文密码和加盐密码进行比较，校验
                    if(pass){
                        req.session['newsapp_user_session']=userdata._id;
                        res.send({err:0,msg:"登录成功",data:userdata});
                    }else{
                        res.send({err:1,msg:"用户名或者密码有误"}); 
                    }  
                }else{
                    res.send({err:1,msg:"用户名不存在"});
                }
                
                client.close();
            }else{
                res.send({err:1,msg:"user集合操作失败"});
                client.close();
        }
    })
})
})

module.exports=router;
