import mongoose from "mongoose";

async function dBconnect() {
  try {
    mongoose.connect(process.env.MONGO_URI!)
    const connection = mongoose.connection
    connection.on('connected', ()=>{
        console.log('MondoDB connected successfully');
    })

    connection.on('error', (err)=>{
        console.log('MongoDb connection error. Please make sure MongoDb is running' + err );
        process.exit()
    })
  } catch (error) {
    console.log('something went wrong')
    console.log(error);
    
  }
}

export default dBconnect