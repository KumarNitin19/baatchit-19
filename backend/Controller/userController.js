const asyncHandler = require('express-async-handler');
const { generateToken } = require('../Config/generateToken');
const { count } = require('./../Modal/userModel');
const User = require('./../Modal/userModel');


const registerUser = asyncHandler(async (req,res) =>{
    const {name , email, password, pic, country, language} = req.body;
    
    if(!name || !email || !password || !country || !language){
        res.status(400);
        throw new Error("Please Enter all the Fields");
    }

    const userExist = await User.findOne({email});

    if(userExist){
        res.status(400);
        throw new Error("User already Exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
        country,
        language
    });

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            country:user.country,
            language:user.language,
            token: generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error("Failed to create the user");
    }
})

const authUser = asyncHandler(async(req,res)=>{
            const {email,password} = req.body;
            const user = await User.findOne({email});
            
            
            if( user && (await user.matchPassword(password))){
                res.status(201).json({
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    pic:user.pic,
                    country:user.country,
                    language:user.language,
                    token: generateToken(user._id)
                })
            }else{
                res.status(400);
                throw new Error("Failed to create the user");
            }
})


const allUsers = asyncHandler(async(req,res)=>{
    console.log(req.query.search);
    const keyword = req.query.search ? {
        $or:[
            {name: {$regex :req.query.search, $options: "i"}},
            {email: {$regex :req.query.search, $options: "i"}},
        ],
    }:{} 
    // console.log(keyword);
   const users = await User.find(keyword).find({ _id :{$ne:req.user._id}});
   res.send(users);
})


module.exports = {registerUser, authUser, allUsers}