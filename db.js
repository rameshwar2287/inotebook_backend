const mongoose = require('mongoose');
const mongoUrl='mongodb+srv://rameshwarahir22:banti1234@banticluster.rfgsugw.mongodb.net/';
// const mongoUrl='mongodb+srv://rameshwarahir22%2F:banti1234@banticluster.rfgsugw.mongodb.net/<database>?retryWrites=true&w=majority'

const mongoConnect = async()=>{
   const connect= await mongoose.connect(mongoUrl);
    console.log("DATA base connected");
}
module.exports =  mongoConnect;
