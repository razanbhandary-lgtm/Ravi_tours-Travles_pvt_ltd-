const db=require("../config/db");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

exports.register=async(req,res)=>{

try{

const{
full_name,
email,
phone,
password
}=req.body;

const hash=await bcrypt.hash(password,10);

await db.query(
"INSERT INTO users(full_name,email,phone,password) VALUES(?,?,?,?)",
[
full_name,
email,
phone,
hash
]
);

res.json({
success:true,
message:"Account Created"
});

}catch(err){

res.status(500).json({
success:false,
message:err.message
});

}

};

exports.login=async(req,res)=>{

const{
email,
password
}=req.body;

const[result]=await db.query(
"SELECT * FROM users WHERE email=?",
[email]
);

if(result.length===0){

return res.status(400).json({
success:false,
message:"User Not Found"
});

}

const user=result[0];

const match=await bcrypt.compare(password,user.password);

if(!match){

return res.status(400).json({
success:false,
message:"Wrong Password"
});

}

const token=jwt.sign({

id:user.id,
role:user.role

},

process.env.JWT_SECRET,

{

expiresIn:"7d"

});

res.json({

success:true,

token,

user:{

id:user.id,

name:user.full_name,

email:user.email,

role:user.role

}

});

};