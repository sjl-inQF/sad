//注销接口
let express=require("express");
let router=express.Router();

router.delete("/",(req,res,next)=>{
    // console.log("logout");
    req.session['newsapp_user_session']=undefined;
    res.send({err:0,msg:"注销成功"})

})


module.exports=router;