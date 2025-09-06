import mongoose from "mongoose"


const connect = async() =>{

    try{
        // await mongoose.connect(process.env.MONGO)
        await mongoose.connect(process.env.MONGO)
        console.log("MongoDB connected!")
    }catch(err){
        console.log(err)
    }

}

export default connect