const mongoose =require('mongoose')
const dbConfig = {
    url: "mongodb://localhost:27017/test",  
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,  
    }
};


const dbConnect =()=>{
  mongoose
  .connect(dbConfig.url, dbConfig.options)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
  mongoose.set('strictPopulate', false);
}
module.exports = dbConnect;