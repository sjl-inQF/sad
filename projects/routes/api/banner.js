let express = require('express')
let router = express.Router()

let mgdb = require('../../utils/mgdb')

router.get('/',(req,res,next)=>{
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin) 允许banner接口被跨域访问
  console.log('banner')
  mgdb({
    url:'mongodb://127.0.0.1:27017',
    dbName:'newsapp',
    collectionName:'banner'
  },(collection)=>{
    collection.find({

    },{
      limit: req.query._limit,
      skip:req.query._page * req.query._limit,
      sort: { [req.query._sort]: -1 }
    }).toArray((err,result)=>{
      console.log('err',err)
      if(!err){
        res.send({err:1,msg:'成功',data:result})
      }
    })
  })
})
router.get('/:_id',(req,res,next)=>{
  console.log(req.params)
  let _id = req.params._id;
  mgdb({
    url:'mongodb://127.0.0.1:27017',
    dbName:'newsapp',
    collectionName:'banner',
  },(collection,client,ObjectID)=>{
    collection.find({
      _id:ObjectID(_id)
    }).toArray((err,result)=>{
      console.log('result',result)
      if(!err){
        res.send({err:1,msg:'查无数据',data:result[0]})
      }
    })
  })
})



module.exports = router;