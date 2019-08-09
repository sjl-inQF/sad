let https = require('https');

//返回请求对象reqHttp
let options={
  hostname:'douban.uieee.com',
  port:443,
  path:'/v2/movie/top250?start=1&count=1',
  method:'GET'
};
// let reqHttp = https.request({配置},(resHttp)=>{
let reqHttp = https.request(options,(resHttp)=>{
  // resHttp 响应对象
  // resHttp.statusCode 状态码  200 OK
  // resHttp.headers 获取响应头信息
  // resHttp.setEncoding('utf-8') 设置编码方式
  // resHttp.on('data/end',fn)  ->send给前端
  let str = '';
  resHttp.on('data',(chunk)=>{str+=chunk}) 
  resHttp.on('end',()=>{
    console.log(JSON.parse(str))
  }) 

})	
	  

	  //reqHttp 请求对象
reqHttp.on('error',(err)=>{console.log(err)});	//监听请求失败信息
reqHttp.end();//一定 主动请求结束