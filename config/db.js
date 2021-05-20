if(process.env.NODE_ENV !="production{"){
    require('dotenv').config();
}


const mongoose  = require('mongoose');


function connectDB(){
    
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/quickSend' ;



mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false

})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error :')); // testing db connected or not 
db.once('open', () => {
    console.log('---------------DataBase Connected -------------- ');
})
}

module.exports =  connectDB;