import User from "../model/userModel.js";
import bcryptjs from 'bcryptjs'

export const signup = async (req,res)=>{
    try {
        const {fullname, email, password} = req.body
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"User already exists"})
        }

        const hashPassword = await bcryptjs.hash(password,10)
        const createdUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword
        })
        let data = await User.create(createdUser)
        res.status(201).json({message:"User created successfully",
            user:data})
    } catch (error) {
        console.log("Error: "+ error.message);
        res.status(500).json({message:"Internal server error"})
    }
}

export const login = async (req,res)=>{
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid username or password"})
        }
        const isMatch = await bcryptjs.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid username or password"})
        }
  
            res.status(200).json({
                message:"Login successful", 
                user:user})
        
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({message:"Internal server error"})
    }
}


export const editUser = async (req,res)=>{
    try {
        const data = req.body

    
        const user = await User.findByIdAndUpdate(data._id,data,{new:true})
        if(!user){
            return res.status(400).json({message:"User is not updated.."})
        }
  
            res.status(200).json({
                message:"User successfully updated", 
                data:user
              })
        
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({message:"Internal server error"})
    }
}




