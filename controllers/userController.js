const expressAsyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

//@Desc user register
//@route post api/user
//access public
const registerUser =expressAsyncHandler(async(req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }

    //check user 

    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User Already Registered!");
    }

    //hash password

    const hashPassword = await bcrypt.hash(password,10);
    
    const user = await User.create({
        username,
        email,
        password:hashPassword
    })

  console.log("user reg",user)
  if(user){
    res.status(201).json({_id:user.id, email:user.email});
  }else{
    res.status(400);
    throw new Error("User data is not valid");
  }

    res.status(201).json("user registered");
})

//@Desc user login
//@route post api/user
//access public
const loginUser = expressAsyncHandler(async(req,res)=>{

  const {email,password} = req.body;
  if(!email || !password){
    res.status(400);
    throw new Error("All field are mandatory");
  } 
  const user = await User.findOne({email});
  if(user && ( await bcrypt.compare(password,user.password))){
   const accessToken  = jwt.sign({
    user:{
      username: user.username,
      email: user.email,
      id: user.id 
    }
   },process.env.ACCESS_TOKEN_SECRET,
   {
    expiresIn:"15m"
   })
   
    res.status(200).json({accessToken});
  }else{
    res.status(401);
    throw new Error("Email or Password id not valid");
  }
})


//@Desc current user
//@route get api/user
//access private
const currentUser = expressAsyncHandler(async(req,res)=>{
    res.status(200).json(req.user);
})


module.exports = {registerUser,loginUser,currentUser}