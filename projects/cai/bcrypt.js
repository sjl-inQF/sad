let bcrypt=require("bcrypt");
let password='alex123';


//加密:hashSync
var hash=bcrypt.hashSync(password,1);
console.log(hash);


//校验:compareSync
let pass=bcrypt.compareSync(password,hash);//铭文密码，加盐数（密码的加密的程度）
console.log(pass);


